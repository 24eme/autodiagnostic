<?php
$f3 = require(__DIR__.'/../vendor/fatfree-core/base.php');
$f3->config(__DIR__.'/../config/config.ini');
$f3->config(__DIR__.'/../config/routes.ini');

$f3->run();