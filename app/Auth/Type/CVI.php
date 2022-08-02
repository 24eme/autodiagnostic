<?php

namespace Auth\Type;

use Base;

class CVI
{
    const AUTH_TYPE = 'CVI';
    private $user = null;
    private $f3;

    public function __construct($f3)
    {
        $this->user = $f3->get('GET.cvi');
        $this->f3 = $f3;
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

    public function isViticonnectPossible()
    {
        if ($this->verifyCVI() === false) {
            return false;
        }

        $api_url = 'https://declaration.vins-centre-loire.com/viticonnect/check/%login%/%epoch%/%md5%';
        $secret =  $this->f3->get('VITICONNECT_API_SECRET');
        $epoch = time();
        $api_url = str_replace('%epoch%', "".$epoch, $api_url);
        $api_url = str_replace('%login%', $this->user, $api_url);
        $api_url = str_replace('%md5%', md5($secret."/".$this->user."/".$epoch), $api_url);
        $res = @file_get_contents($api_url);

        return $res;
    }

    private function verifyCVI()
    {
        return preg_match('/^[0-9A-Za-z]{10}$/', $this->user) === 1;
    }
}
