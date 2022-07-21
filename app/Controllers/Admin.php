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
    private static $storage;
    private static $storage_engage;

    public function __construct(Base $f3)
    {
        self::$storage = $f3->get('UPLOADS');
        self::$storage_engage = $f3->get('UPLOADS').'engages/';
    }

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
        $files = glob(self::$storage.'*.json');
        $files_engages = glob(self::$storage_engage.'*.json');

        if ($files === false || $files_engages === false) {
            $f3->set('SESSION.flash', 'Une erreur est survenue dans la récupération des réponses');
            $files = [];
            $files_engages = [];
        }

        $files = array_merge($files, $files_engages);

        usort($files, function ($a, $b) {
            return filemtime($b) - filemtime($a);
        });

        $f3->set('reponses', $files);
        $f3->set('engages', $files_engages);
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
        $file = $this->findFile($args['file']);

        $reponse = new Reponse($file);

        $reponseExporter = new ReponseExporter($reponse);
        $reponseExporter->export();
        exit;
    }

    public function showReponses(Base $f3, $args)
    {
        $file = $this->findFile($args['file']);

        $file = new Reponse($file);
        $statistiques = new Statistiques($file);
        $questions = new Questions();

        $f3->set('inc', 'admin_show.htm');
        $f3->set('statistiques', $statistiques);
        $f3->set('questions', $questions);
        $f3->set('reponse', $file);
    }

    public function deleteReponse(Base $f3, $args)
    {
        $file = $this->findFile($args['file']);

        unlink($file);

        $f3->reroute('@admin');
    }

    private function findFile(string $filename)
    {
        $file = self::$storage_engage.$filename.'.json';

        if (is_file($file) === false) {
            $file = self::$storage.$filename.'.json';

            if (is_file($file) === false) {
                Base::instance()->error(404);
            }
        }

        return $file;
    }
}
