<?php

namespace Controllers;

use Base;
use Questions;
use Reponses\Exporter\ReponseExporter;
use Reponses\Exporter\ReponsesExporter;
use Reponses\Reponse;
use Reponses\Reponses;
use Session;
use Statistiques;
use Template;

class Admin
{
    public function beforeroute(Base $f3)
    {
        new Session();
        $f3->clear('SESSION.flash');
        $f3->set('SESSION.user', 'ADMIN');
        // check droits admin
    }

    public function afterroute()
    {
        echo Template::instance()->render('layout.html');
    }

    public function config(Base $f3)
    {
        $questions = new Questions();
        $f3->set('questionnaire', $questions);
        $f3->set('inc', 'admin.htm');
        $f3->set('sub', 'config.htm');
    }

    public function index(Base $f3)
    {
        $files = glob($f3->get('UPLOADS').'*.json');
        if ($files === false) {
            $f3->set('SESSION.flash', 'Une erreur est survenue dans la récupération des réponses');
            $files = [];
        }

        $md5s = array_map('md5_file', $files);
        $files = array_map('basename', $files);

        $f3->set('reponses', $files);
        $f3->set('md5s', $md5s);
        $f3->set('inc', 'admin.htm');
        $f3->set('sub', 'files.htm');
    }

    public function exportGlobal(Base $f3)
    {
        $reponses = new Reponses(
            glob($f3->get('UPLOADS').'[!{VISITEUR}]*.json', GLOB_BRACE)
        );

        $reponsesExporter = new ReponsesExporter($reponses);
        $reponsesExporter->export();
        exit;
    }

    public function export(Base $f3, $args)
    {
        $file = $f3->get('UPLOADS').$args['file'].'.json';

        if (is_file($file) === false) {
            $f3->error(404);
        }

        $reponse = new Reponse($file);

        $reponseExporter = new ReponseExporter($reponse);
        $reponseExporter->export();
        exit;
    }

    public function showReponses(Base $f3, $args)
    {
        $file = $f3->get('UPLOADS').$args['file'].'.json';

        if (is_file($file) === false) {
            $f3->error(404);
        }

        $file = new Reponse($file);
        $statistiques = new Statistiques(file_get_contents($f3->get('UPLOADS').$args['file'].'.json'));
        $questions = new Questions();

        $f3->set('inc', 'admin_show.htm');
        $f3->set('statistiques', $statistiques);
        $f3->set('questions', $questions);
        $f3->set('reponse', $file);
    }

    public function deleteReponse(Base $f3, $args)
    {
        $file = $f3->get('UPLOADS').$args['file'].'.json';

        if (is_file($file) === false) {
            $f3->error(404);
        }

        unlink($file);

        $f3->reroute('@admin');
    }
}
