<?php

namespace Auth\Type;

use Base;
use phpCAS;

class BIVC
{
    const AUTH_TYPE = 'BIVC';
    private $_debug = false;
    private $user = null;
    private $f3;

    public function __construct(Base $f3)
    {
        require_once(__DIR__.'/../../../vendor/CAS-1.3.8/CAS.php');
        phpCAS::setVerbose(false);
        $this->_debug = $f3->get('DEBUG');
        $this->f3 = $f3;

        if ($this->_debug) {
            phpCAS::setDebug();
            phpCAS::setVerbose(true);
        }

        phpCAS::client(
            CAS_VERSION_2_0,
            $f3->get('CAS_HOST'),
            $f3->get('CAS_PORT'),
            $f3->get('CAS_CONTEXT')
        );

        phpCAS::setNoCasServerValidation();

        phpCAS::setFixedServiceURL($f3->get('urlbase'));
    }

    public static function getAuthType()
    {
        return self::AUTH_TYPE;
    }

    private function isAuthenticated()
    {
        return phpCAS::isAuthenticated();
    }

    public function getUser()
    {
        if ($this->isAuthenticated() === false) {
            $this->auth();
            // stop
        }

        if ($this->user) {
            return $this->user;
        }

        $this->user = phpCAS::getAttribute('viticonnect_entities_all_cvi');
        if (! $this->user) $this->user = phpCAS::getAttribute('viticonnect_entities_all_siret');
        if (! $this->user) $this->user = phpCAS::getUser();

        return $this->user;
    }

    public function auth()
    {
        return phpCAS::forceAuthentication();
    }

    public function logout()
    {
        phpCAS::logoutWithRedirectService($this->f3->get('urlbase'));
    }
}
