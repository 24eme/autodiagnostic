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

        phpCAS::forceAuthentication();
    }

    public function index(Base $f3)
    {
        $f3->set('inc', 'index.htm');
    }

    public function synthetiser(Base $f3)
    {
        $web = Web::instance();
        $files = $web->receive(function ($file, $formFieldName) {
            if ($file['type'] !== 'application/json') {
                return false;
            }
            return true;
        }, true, true);

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
        $statistiques = new Statistiques(file_get_contents($f3->get('UPLOADS').'test.json'));
        $f3->set('statistiques', $statistiques);
        $f3->set('inc', 'resultats.htm');
    }

    public function afterroute()
    {
        echo Template::instance()->render('layout.html');
    }
}
