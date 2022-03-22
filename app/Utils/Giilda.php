<?php

namespace Utils;

use Base;
use Web;

class Giilda
{
    private $f3;
    private $identifiant;
    private $appellations = [];
    private $couchurl = 'http://%s:%s/%s/COMPTE-%s';

    public function __construct(Base $f3, $identifiant)
    {
        if ($f3->exists('COUCHDBHOST') === false
            || $f3->exists('COUCHDBPORT') === false
            || $f3->exists('COUCHDBBASE') === false)
        {
            throw new \LogicException('Il manque un paramètre dans la config parmis : `COUCHDBHOST`, `COUCHDBPORT`, `COUCHDBBASE`');
        }

        $this->f3 = $f3;
        $this->identifiant = $identifiant;
        $this->appellations = $this->getAppellations();
    }

    /**
     * Retourne les appellations de l'opérateur
     * @return array
     */
    public function getAppellations()
    {
        if (empty($this->appellations) === false) {
            return $this->appellations;
        }

        $web = Web::instance();
        $reponse = $web->request(
            sprintf($this->couchurl, $this->f3->get('COUCHDBHOST'), $this->f3->get('COUCHDBPORT'), $this->f3->get('COUCHDBBASE'), $this->identifiant)
        );

        if ($reponse === false) {
            return [];
        }

        $doc = json_decode($reponse['body']);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return [];
        }

        if ($doc->error) {
            return [];
        }

        return $doc->tags->produit;
    }

    public function getSurfaceFor($appellation)
    {
        return 0;
    }
}
