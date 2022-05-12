<?php
ini_set('session.gc_maxlifetime', 86400);
$f3 = require(__DIR__.'/../vendor/fatfree-core/base.php');
$f3->config(__DIR__.'/../config/config.ini');
$f3->config(__DIR__.'/../config/routes.ini');

$f3->run();
