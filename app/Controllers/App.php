<?php

namespace Controllers;

use Base;
use phpCAS;
use Statistiques;
use Template;
use Web;

class App
{
    public function beforeroute(Base $f3)
    {
        require_once $f3->get('CAS_PATH').'/CAS.php';
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
            // Si on vient de se logger
            if (
                $f3->get('SESSION.user')
                && $f3->get('SESSION.user') !== phpCAS::getUser()
                && is_file($this->getFichierName($f3->get('UPLOADS'), $f3->get('SESSION.user')))
            ) {
                rename(
                    $this->getFichierName($f3->get('UPLOADS'), $f3->get('SESSION.user')),
                    $this->getFichierName($f3->get('UPLOADS'), phpCAS::getUser())
                );
            }

            $f3->set('SESSION.user', phpCAS::getUser());
        }

        if ($f3->get('GET.visiteur')) {
            $f3->set('SESSION.user', 'VISITEUR-'.uniqid());
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

        if ($f3->get('SESSION.user') && $this->getFichierReponse($f3->get('UPLOADS'), $f3->get('SESSION.user'))) {
            $f3->set('inc', 'alreadydone.htm');
        }
    }

    public function synthetiser(Base $f3)
    {
        $web = Web::instance();
        $files = $web->receive(function ($file, $formFieldName) {
            if ($file['type'] !== 'application/json') {
                return false;
            }
            return true;
        }, true, function (string $fileBaseName, string $formFieldName) use ($f3) : string {
            return $f3->get('SESSION.user').'-'.date('Y').'.json';
        });

        $jsonFile = null;
        foreach ($files as $file => $valid) {
            if (!$valid) {
                continue;
            }
            $jsonFile = $file;
        }

        if (!$jsonFile) {
            $f3->error(415, 'Type de fichier non supportés');
        }

        $f3->reroute('@results');
    }

    public function resultats(Base $f3)
    {
        if ($f3->get('SESSION.user') === null) {
            $f3->reroute('@home');
        }

        $file = $this->getFichierReponse($f3->get('UPLOADS'), $f3->get('SESSION.user'));

        if ($file === false) {
            $f3->reroute('@home');
        }

        $statistiques = new Statistiques($file);
        $f3->set('statistiques', $statistiques);
        $f3->set('inc', 'resultats.htm');
    }

    public function formules(Base $f3)
    {
        if (phpCAS::isAuthenticated() === false) {
            phpCAS::forceAuthentication();
        }

        $file = $this->getFichierReponse($f3->get('UPLOADS'), $f3->get('SESSION.user'));

        $fiches = yaml_parse_file($f3->get('FICHES_FILE'));

        if ($file === false) {
            $f3->reroute('@home');
        }

        $statistiques = new Statistiques($file);
        $f3->set('statistiques', $statistiques);
        $f3->set('fiches', $fiches);
        $f3->set('isauthenticated', phpCAS::isAuthenticated()||$f3->get('GET.force')==1);
        $f3->set('inc', 'formules.htm');
    }

    public function afterroute()
    {
        echo Template::instance()->render('layout.html');
    }

    private function getFichierName(string $path, string $user)
    {
        return sprintf('%s/%s-%s.json', $path, $user, date('Y'));
    }

    private function getFichierReponse(string $path, string $user)
    {
        $filename = $this->getFichierName($path, $user);

        if (is_file($filename) === false) {
            return false;
        }

        $file = file_get_contents($filename);

        if ($file === false) {
            throw new \Exception("Erreur dans la lecture du fichier de réponse de l'utilisateur ".$user);
        }

        return $file;
    }
}
