<?php

namespace Controllers;

use Base;
use Exigences;
use phpCAS;
use Reponses\Reponse;
use SMTP;
use Statistiques;
use Template;
use Web;

class App
{
    private static $storage;
    private static $storage_engage;

    public function __construct(Base $f3)
    {
        self::$storage = $f3->get('UPLOADS');
        self::$storage_engage = $f3->get('UPLOADS').'engages/';
    }

    public function beforeroute(Base $f3)
    {
        require_once(__DIR__.'/../../vendor/CAS-1.3.8/CAS.php');
        phpCAS::setVerbose(false);
        if ($f3->get('DEBUG')) {
            phpCAS::setDebug();
            phpCAS::setVerbose(true);
        }

        phpCAS::client(
            CAS_VERSION_2_0,
            $f3->get('CAS_HOST'),
            $f3->get('CAS_PORT'),
            $f3->get('CAS_CONTEXT')
        );

        if ($f3->get('DEBUG')) {
            phpCAS::setNoCasServerValidation();
        }

        if (phpCAS::isAuthenticated()) {
            $casAuth = phpCAS::getAttribute('viticonnect_entities_all_cvi');
            if (! $casAuth) $casAuth = phpCAS::getAttribute('viticonnect_entities_all_siret');
            if (! $casAuth) $casAuth = phpCAS::getUser();

            // Si on vient de se logger
            if (
                $f3->get('SESSION.user')
                && $f3->get('SESSION.user') !== $casAuth
            ) {
                Reponse::rename($f3->get('UPLOADS'), $f3->get('SESSION.user'), $casAuth);
            }

            $f3->set('SESSION.user', $casAuth);
        }

        if ($f3->get('GET.visiteur')) {
            $f3->set('SESSION.user', 'VISITEUR-'.uniqid());
            $f3->reroute('@home');
        }

        if ($f3->get('GET.cvi')) {
            $cvi = $f3->get('GET.cvi');
            if (!preg_match('/^[0-9A-Za-z]{10}$/', $cvi)) {
                $f3->reroute('@auth');
            }
            $api_url = 'https://declaration.vins-centre-loire.com/viticonnect/check/%login%/%epoch%/%md5%';
            $secret =  $f3->get('VITICONNECT_API_SECRET');
            $epoch = time();
            $api_url = str_replace('%epoch%', $epoch, $api_url);
            $api_url = str_replace('%login%', $cvi, $api_url);
            $api_url = str_replace('%md5%', md5($secret."/".$cvi."/".$epoch), $api_url);
            $res = @file_get_contents($api_url);
            if ($res) {
                $f3->set('GET.bivcauth', 1);
            }
        }

        if (!$f3->get('GET.bivcauth') && $f3->get('GET.cvi') && !Reponse::getFichier($f3->get('UPLOADS'), $f3->get('GET.cvi'))) {
            $f3->set('SESSION.user', $f3->get('GET.cvi'));
            $f3->reroute('@home');
        }

        if (!phpCAS::isAuthenticated() && $f3->get('GET.bivcauth')) {
            phpCAS::forceAuthentication();
        }

        if (phpCAS::isAuthenticated() && $f3->get('GET.bivcauth')) {
            $f3->reroute('@home');
        }
    }

    public function index(Base $f3)
    {
        $f3->set('inc', 'index.htm');

        if ($f3->get('SESSION.user')) {
            $file = $this->findReponse($f3->get('SESSION.user'));

            if ($file !== false) {
                $f3->set('inc', 'alreadydone.htm');
                $f3->set('file', basename($file, '.json'));
                $f3->set('md5', md5_file($file));
            }
        }
    }

    public function auth(Base $f3)
    {
        if ($f3->get('SESSION.user')) {
            $service = ($f3->get('GET.service')) ?: '@home';
            $f3->reroute($service);
        }

        $f3->set('inc', 'authmodal.htm');
    }

    public function logout(Base $f3)
    {
        $f3->clear('SESSION.user');

        if (phpCAS::isAuthenticated()) {
            phpCAS::logout();
        }

        $f3->reroute('@auth');
    }

    public function synthetiser(Base $f3)
    {
        $web = Web::instance();
        $user = $f3->get('SESSION.user');
        $uniqid = substr(bin2hex(random_bytes(13)), 0, 13);

        $generatedFilename = implode('-', [
            $user, date('Y'), $uniqid
        ]) . '.json';

        // Destination : $f3->get('UPLOADS')
        $files = $web->receive(function ($file, $formFieldName) {
            if ($file['type'] !== 'application/json') {
                return false;
            }
            return true;
        }, true, function (string $fileBaseName, string $formFieldName) use ($generatedFilename) : string {
            return $generatedFilename;
        });

        $jsonFile = null;
        foreach ($files as $file => $valid) {
            if (!$valid) {
                continue;
            }
            $jsonFile = $file;
        }

        if ($jsonFile === null) {
            $f3->error(415, 'Type de fichier non supportés');
            exit;
        }

        $md5 = md5_file($jsonFile);
        $f3->reroute(
            sprintf('@resultats(@file=%s,@md5=%s)',
                basename($generatedFilename, '.json'), $md5
            )
        );
    }

    public function resultats(Base $f3, array $args)
    {
        $f3->scrub($args['file']);
        $f3->scrub($args['md5']);

        $engage = true;

        $filename = self::$storage_engage.$args['file'].'.json';

        if (Reponse::getFichierNameWithAuth($filename, $args['md5']) === false) {
            $engage = false;
            $filename = self::$storage.$args['file'].'.json';

            if (Reponse::getFichierNameWithAuth($filename, $args['md5']) === false) {
                $f3->reroute('@home');
            }
        }

        $statistiques = new Statistiques(new Reponse($filename));
        $f3->set('statistiques', $statistiques);
        $f3->set('engage', $engage);
        $f3->set('inc', 'resultats.htm');
        $f3->set('file', $args['file']);
        $f3->set('md5', $args['md5']);
    }

    public function engagement(Base $f3)
    {
        if ($f3->exists('POST.file') === false || $f3->exists('POST.md5') === false) {
            $f3->reroute('@home');
        }

        $file = $f3->clean($f3->get('POST.file'));
        $md5 = $f3->clean($f3->get('POST.md5'));

        $filename = self::$storage.$file.'.json';

        if (Reponse::getFichierNameWithAuth($filename, $md5) === false) {
            $f3->reroute(sprintf('@resultats(@file=%s,@md5=%s)', $file, $md5));
        }

        rename($filename, self::$storage_engage.$file.'.json');

        $f3->reroute(sprintf('@formules(@file=%s,@md5=%s)', $file, $md5));
    }

    public function formules(Base $f3, array $args)
    {
        $f3->scrub($args['file']);
        $f3->scrub($args['md5']);

        $filename = self::$storage_engage.$args['file'].'.json';

        if (Reponse::getFichierNameWithAuth($filename, $args['md5']) === false) {
            $f3->reroute('@home');
        }

        $reponse = new Reponse($filename);

        $statistiques = new Statistiques($reponse);
        $exigences = new Exigences($statistiques);

        $fiches = yaml_parse_file($f3->get('ROOT').'/../config/fiches.yml');
        $fichesByFaiblesses = $statistiques->organiseFichesByFaiblesses($fiches);

        $f3->set('statistiques', $statistiques);
        $f3->set('exigences', $exigences);
        $f3->set('fichesByFaiblesses', $fichesByFaiblesses);
        $f3->set('isauthenticated', phpCAS::isAuthenticated()||$f3->get('GET.force')==1);
        $f3->set('inc', 'formules.htm');
        $f3->set('file', $args['file']);
        $f3->set('md5', $args['md5']);
    }

    public function envoiMail(Base $f3, array $args)
    {
        $f3->set('file', $f3->clean($f3->get('POST.file')));
        $f3->set('md5', $f3->clean($f3->get('POST.md5')));
        $emailTo = $f3->clean($f3->get('POST.email'));

        $smtp = new SMTP($f3->get('SMTP_HOST'), $f3->get('SMTP_PORT'));
        $smtp->set('From', 'localhost');
        $smtp->set('To', $emailTo);
        $smtp->set('Subject', 'Résultats de mon autodiagnostic');
        $smtp->send(Template::instance()->render('emails/envoiResultats.txt'));

        $f3->reroute('@resultats', ['file' => $f3->get('file'), 'md5' => $f3->get('md5')]);
    }

    public function afterroute()
    {
        echo Template::instance()->render('layout.html');
    }

    private function findReponse(string $user)
    {
        $files = Reponse::getFichier(self::$storage_engage, $user);

        if ($files === false || count($files) === 0) {
            $files = Reponse::getFichier(self::$storage, $user);

            if ($files === false || count($files) === 0) {
                return false;
            }
        }

        return current($files);
    }
}
