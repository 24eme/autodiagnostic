<?php

ini_set('session.gc_maxlifetime', 86400);

$f3 = require(__DIR__.'/../vendor/fatfree-core/base.php');
$f3->config(__DIR__.'/../config/config.ini');
$f3->config(__DIR__.'/../config/routes.ini');

$f3->set('urlbase', $f3->get('SCHEME').'://'.$_SERVER['SERVER_NAME'].(!in_array($f3->get('PORT'),[80,443])?(':'.$f3->get('PORT')):'').$f3->get('BASE'));

$f3->run();
