<?php

use Reponses\Reponse;

class Exigences
{
    const DATA_EXIGENCES = 'data/exigences.yml';

    private $reponses;
    private $exigences;

    public function __construct(Reponse $reponses)
    {
        $this->exigences = yaml_parse_file(self::DATA_EXIGENCES);
        $this->reponses = $reponses;
    }

    public function name($exigence) {
        if (array_key_exists($exigence, $this->exigences) === false) {
            return false;
        }

        return $this->exigences[$exigence]['name'];
    }

    public function is($exigence)
    {
        if (array_key_exists($exigence, $this->exigences) === false) {
            return false;
        }

        $exigence = $this->exigences[$exigence];
        $satisfied = true;

        foreach ($exigence['formule'] as $cle => $requis) {
            $reponse = $this->reponses->get($cle)['reponse'];

            if ($requis === 0 && $reponse === 0) {
                continue;
            }

            if (is_numeric($requis) && $reponse <= $requis) {
                continue;
            }

            if (is_string($requis) && $reponse === $requis) {
                continue;
            }

            $satisfied = false;
            break;
        }

        return $satisfied;
    }
}
