<?php

namespace Auth\Type;

use Base;

class CVI
{
    const AUTH_TYPE = 'CVI';
    private $user = null;

    public function __construct($cvi)
    {
        $this->user = $cvi;
    }

    public static function getAuthType()
    {
        return self::AUTH_TYPE;
    }

    public function getUser()
    {
        if ($this->verifyCVI() === false) {
            return null;
        }

        return $this->user;
    }

    public function auth()
    {
        return $this->verifyCVI();
    }

    private function verifyCVI()
    {
        return preg_match('/^[0-9A-Za-z]{10}$/', $this->user) === 1;
    }
}
