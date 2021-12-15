<?php
class App {
    function index($f3) {
        $f3->set('inc','index.htm');
    }
    function afterroute() {
		echo Template::instance()->render('layout.html');
	}
}
