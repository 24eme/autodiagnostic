<?php

namespace Auth\Type;

use Base;
use ArgumentCountError;

class Visiteur
{
    const AUTH_TYPE = 'Visiteur';
    private $user = null;

    public function __construct() {}

    public function getAuthType()
    {
        return self::AUTH_TYPE;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function auth()
    {
        $this->user = 'VISITEUR-'.uniqid();
        return true;
    }
}
