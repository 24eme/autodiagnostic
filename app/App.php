<?php

class App
{
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
        $f3->set('inc', 'resultats.htm');
    }

    public function afterroute()
    {
        echo Template::instance()->render('layout.html');
    }
}
