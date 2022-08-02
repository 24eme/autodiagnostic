<?php

namespace Auth;

class Auth
{
    private $store;

    public function __construct()
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        $this->store =& $_SESSION['auth'];
    }

    public function authenticate($type)
    {
        $res = $type->auth();

        if ($res) {
            $this->store(['type' => $type->getAuthType(), 'user' => $type->getUser()]);
        }

        return $res;
    }

    public function store($creds)
    {
        $this->store['user'] = $creds['user'];
        $this->store['type'] = $creds['type'];
    }

    public function isAuthenticated()
    {
        return $this->getUser() !== null;
    }

    public function getUser()
    {
        return $this->store['user'];
    }

    public function getAuthType()
    {
        return $this->store['type'];
    }

    public function logout()
    {
        unset($_SESSION['auth']);
    }
}
