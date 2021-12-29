<?php

namespace Controllers;

use Base;
use Session;
use Template;

class Admin
{
    public function beforeroute(Base $f3)
    {
        new Session();
        $f3->clear('SESSION.flash');

        // check droits admin
    }

    public function afterroute()
    {
        echo Template::instance()->render('layout.html');
    }

    public function index(Base $f3)
    {
        $files = glob($f3->get('UPLOADS').'*.json');
        if ($files === false) {
            $f3->set('SESSION.flash', 'Une erreur est survenue dans la récupération des réponses');
            $files = [];
        }

        $files = array_map('basename', $files);

        $f3->set('reponses', $files);
        $f3->set('inc', 'admin.htm');
    }
}
