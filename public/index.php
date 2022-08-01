<?php

ini_set('session.gc_maxlifetime', 86400);
require_once(__DIR__.'/../vendor/CAS-1.3.8/CAS.php');

$f3 = require(__DIR__.'/../vendor/fatfree-core/base.php');
$f3->config(__DIR__.'/../config/config.ini');
$f3->config(__DIR__.'/../config/routes.ini');

$f3->run();
