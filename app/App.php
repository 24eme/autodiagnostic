<?php
class App {
    function index($f3) {
        $f3->set('inc','index.htm');
    }
    function synthetiser($f3) {
        $web = \Web::instance();
        $files = $web->receive(function($file, $formFieldName) { return true; }, true, true);
        $jsonFile = null;
        foreach($files as $file => $valid) {
            if(!$valid) {
                continue;
            }
            $jsonFile = $file;
        }
        if(!$jsonFile) {
            $f3->error(403);
        }
        $f3->reroute('/resultats');
    }
    function resultats($f3) {
        $f3->set('inc','resultats.htm');
    }
    function afterroute() {
		echo Template::instance()->render('layout.html');
	}
}
