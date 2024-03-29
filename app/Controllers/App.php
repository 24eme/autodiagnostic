<?php

namespace Controllers;

use Auth\Auth;
use Auth\Type\{BIVC,CVI,Visiteur};
use Base;
use Exigences;
use phpCAS;
use Reponses\Exporter\ReponseExporter;
use Reponses\Reponse;
use SMTP;
use Statistiques;
use Questions;
use Template;
use Web;

class App
{
    private static $storage;
    private static $storage_engage;
    private $auth;

    public function __construct(Base $f3)
    {
        self::$storage = $f3->get('UPLOADS');
        self::$storage_engage = $f3->get('UPLOADS').'engages/';
    }

    public function beforeroute(Base $f3)
    {
        $this->auth = new Auth();

        if ($f3->exists('GET.ticket') || isset($_SESSION["phpCAS"]["user"])) {
            $bivc = new BIVC($f3);

            $this->auth->store([
                'type' => BIVC::getAuthType(),
                'user' => $bivc->getUser()
            ]);

            // Renommage du fichier
            if (($olduser = $this->auth->getOldUser()) && strpos($olduser, 'VISITEUR') === 0) {
                Reponse::rename(self::$storage, $olduser, $this->auth->getUser());
            }
        }
    }

    public function index(Base $f3)
    {
        $f3->set('inc', 'index.htm');

        if ($this->auth->isAuthenticated()) {
            $file = $this->findReponse($this->auth->getUser(),$f3->get('CAMPAGNE_COURANTE'));
            if ($file !== false) {
                $f3->set('inc', 'alreadydone.htm');
                $f3->set('file', basename($file, '.json'));
                $f3->set('md5', md5_file($file));
                $f3->set('showLinks', $this->auth->getAuthType() !== CVI::getAuthType());
                $f3->set('engage', Reponse::getFichierNameWithAuth(self::$storage_engage.$f3->get('file').'.json', $f3->get('md5')) !== false);
            }

            $lastCampagneReponseFile = $this->findReponseFile($this->auth->getUser(),$f3->get('CAMPAGNE_COURANTE')-1);
            if($lastCampagneReponseFile){
                $lastCampagneReponse = new Reponse($lastCampagneReponseFile);
                $f3->set('lastCampagneReponse', $lastCampagneReponse);
                $f3->set('lastCampagneReponseFile', $lastCampagneReponseFile);
            }
        }
    }

    public function auth(Base $f3)
    {
        if ($f3->get('GET.visiteur') || $f3->get('GET.cvi') || $f3->get('GET.bivcauth')) {
            if ($f3->get('GET.visiteur')) { $type = new Visiteur(); }
            elseif ($f3->get('GET.cvi')) {
                $type = new CVI($f3);
                if ($type->isViticonnectPossible()) {
                    $f3->reroute('@auth?bivcauth=1');
                }
            }
            elseif ($f3->get('GET.bivcauth')) { $type = new BIVC($f3); }
            else { throw new \LogicException('Méthode non reconnue'); }

            $service = ($f3->get('GET.service')) ?: '@home';

            $this->auth->authenticate($type);

            // Renommage du fichier
            if (($olduser = $this->auth->getOldUser()) && strpos($olduser, 'VISITEUR') === 0) {
                Reponse::rename(self::$storage, $olduser, $this->auth->getUser());
                $service = str_replace($olduser, $this->auth->getUser(), $service);
            }

            if ($this->auth->isAuthenticated()) {
                $f3->reroute($service);
            }
        }

        $f3->set('inc', 'authmodal.htm');
    }

    public function logout(Base $f3)
    {
        $this->auth->logout();

        if ($this->auth->getAuthType() === BIVC::getAuthType()) {
            BIVC::logout($f3);
        }

        $f3->reroute('@home');
    }

    public function synthetiser(Base $f3)
    {
        if ($this->isAuthorized() === false) {
            $f3->reroute('@auth');
        }

        $web = Web::instance();
        $user = $this->auth->getUser();
        $uniqid = substr(bin2hex(random_bytes(13)), 0, 13);

        $generatedFilename = implode('-', [
            $user, $f3->get("CAMPAGNE_COURANTE"), $uniqid
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

        $filename = self::$storage_engage.$args['file'].'.json';

        $engage = Reponse::getFichierNameWithAuth($filename, $args['md5']) !== false;

        if (!$engage) {
            $filename = self::$storage.$args['file'].'.json';
        }

        if (Reponse::getFichierNameWithAuth($filename, $args['md5']) === false) {
            return $f3->reroute('@home');
        }

        $statistiques = new Statistiques(new Reponse($filename));
        $campagne = $statistiques->getReponses()->getCampagne();
        $f3->set('statistiques', $statistiques);
        $f3->set('engage', $engage);
        $f3->set('inc', 'resultats.htm');
        $f3->set('file', $args['file']);
        $f3->set('md5', $args['md5']);
        $f3->set('campagne',$campagne);

        $user = $this->findUserFromFileName($filename);

        $lastCampagne = $campagne-1;
        $lastCampagneReponsesFile = $this->findReponseFile($user,$lastCampagne);
        if($lastCampagneReponsesFile){
            $statistiqueslastCampagne = new Statistiques(new Reponse($lastCampagneReponsesFile));
            $f3->set('statistiqueslastCampagne', $statistiqueslastCampagne);
        }

        $tabOtherCampagne = array();
        for($c = $lastCampagne;$c < $lastCampagne+3; $c++){
            if($this->findReponseFile($user,$c)){
                $tabOtherCampagne[$c]= $this->findReponseFile($user,$c);
            }
        }

        $f3->set('tabOtherCampagne', $tabOtherCampagne);
    }

    public function engagement(Base $f3)
    {
        if ($f3->exists('POST.file') === false || $f3->exists('POST.md5') === false) {
            $f3->reroute('@home');
        }

        $file = $f3->clean($f3->get('POST.file'));
        $md5 = $f3->clean($f3->get('POST.md5'));

        if ($this->auth->isAuthenticated() === false) {
            $user = explode('-', $file);
            $this->auth->store(['user' => $user[0].'-'.$user[1], 'type' => 'Visiteur']);
        }

        if ($this->isAuthorized([Visiteur::getAuthType()]) === false) {
            $service = $f3->alias('resultats', ['file' => $f3->get('POST.file'), 'md5' => $f3->get('POST.md5')]);
            $service = urlencode($service);
            $f3->reroute(['auth', null, 'service='.$service]);
        }

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
        $campagne = $reponse->getCampagne();

        $statistiques = new Statistiques($reponse);
        $exigences = new Exigences($statistiques);

        $fiches = yaml_parse_file($f3->get('ROOT').'/../config/fiches.yml');
        $fichesByFaiblesses = $statistiques->organiseFichesByFaiblesses($fiches);

        $f3->set('statistiques', $statistiques);
        $f3->set('exigences', $exigences);
        $f3->set('fichesByFaiblesses', $fichesByFaiblesses);
        $f3->set('isauthenticated', $this->auth->isAuthenticated()||$f3->get('GET.force')==1);
        $f3->set('inc', 'formules.htm');
        $f3->set('file', $args['file']);
        $f3->set('md5', $args['md5']);
        $f3->set('campagne',$campagne);

        $user = $this->findUserFromFileName($filename);
        $tabOtherCampagne = array();
        for($c = $campagne-1;$c < $campagne+3; $c++){
            if($this->findReponseFile($user,$c)){
                $tabOtherCampagne[$c]= $this->findReponseFile($user,$c);
            }
        }
        $f3->set('tabOtherCampagne', $tabOtherCampagne);
    }

    public function envoiMail(Base $f3, array $args)
    {
        $f3->set('file', $f3->clean($f3->get('POST.file')));
        $f3->set('md5', $f3->clean($f3->get('POST.md5')));
        $emailTo = $f3->clean($f3->get('POST.email'));

        $smtp = new SMTP($f3->get('SMTP_HOST'), $f3->get('SMTP_PORT'));
        $smtp->set('From', $f3->get('SMTP_FROM'));
        $smtp->set('To', $emailTo);
        $smtp->set('Subject', 'Résultats de mon autodiagnostic');
        $smtp->send(Template::instance()->render('emails/envoiResultats.txt'));

        $f3->reroute('@formules(@file='.$f3->get('file').',@md5='.$f3->get('md5').')');
    }

    public function userExport(Base $f3, $args)
    {
        $f3->scrub($args['file']);
        $f3->scrub($args['md5']);

        $filename = self::$storage_engage.$args['file'].'.json';

        if (Reponse::getFichierNameWithAuth($filename, $args['md5']) === false) {
            $f3->error(404);
        }

        $reponse = new Reponse($filename);

        $reponseExporter = new ReponseExporter($reponse);
        $reponseExporter->export();
        exit;
    }

    public function afterroute(Base $f3)
    {
        $f3->set('auth', $this->auth);
        $f3->set('campagne_courante',$f3->get('CAMPAGNE_COURANTE'));
        echo Template::instance()->render('layout.html');
    }

    public function apiReponse(Base $f3,$args)
    {
        $campagne = (int)$args['campagne'];
        $questions = new Questions($campagne);
        $reponseFile = $this->findReponseFile($this->auth->getUser(),$campagne);
        if($reponseFile){
            $reponse = new Reponse($reponseFile);
        }
        $data = $reponse->decoded;

        foreach($data as $idquestion => $reponses){
            if(!is_array($data[$idquestion])){
                continue;
            }
            foreach($data[$idquestion] as $i => $r){
                $data[$idquestion][] = $questions->getReponseLibelle($idquestion,$r);
            }
        }

        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    private function findReponseFile(string $user,$campagne){
        $file = Reponse::getFichier(self::$storage_engage, $user,$campagne);
        if(!$file){
            return null;
         }
        return current($file);
    }

    private function findReponse(string $user,$campagne)
    {
        $files = Reponse::getFichier(self::$storage_engage, $user,$campagne);

        if ($files === false || count($files) === 0) {
            $files = Reponse::getFichier(self::$storage, $user,$campagne);

            if ($files === false || count($files) === 0) {
                return false;
            }
        }

        return current($files);
    }

    private function isAuthorized(array $unauthorized = [])
    {
        return $this->auth->isAuthenticated() &&
               in_array($this->auth->getAuthType(), $unauthorized) === false;
    }

    private function findUserFromFileName($filename){
        $result = explode("-",basename($filename));
        if($result[0] != "VISITEUR"){
            return $result[0];
        }
        return false;
    }
}
