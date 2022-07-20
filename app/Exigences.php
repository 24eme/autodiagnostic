<?php

use Reponses\Reponse;

class Exigences
{
    const DATA_EXIGENCES = 'data/exigences.yml';

    private $reponses;
    private $exigences;
    private $explain = [];

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

        $exigenceDetail = $this->exigences[$exigence];
        $satisfied = true;

        foreach ($exigenceDetail['formule'] as $cle => $requis) {
            if (is_array($requis)) {
                $xor = false;

                foreach ($requis as $id => $rep) {
                    if (is_array($rep)) {
                        $and = true;
                        foreach ($rep as $id_and => $rep_and) {
                            $and = $and && ($this->reponses->get($id_and)['reponse'] === $rep_and);
                        }

                        $xor = $xor || $and;
                    } else {
                        $xor = $xor || ($this->reponses->get($id)['reponse'] === $rep);
                    }
                }

                continue;
            }

            if (strpos($cle, '+') !== false) {
                $cles = explode('+', $cle);
                $reponse = 0;

                foreach ($cles as $c) {
                    $reponse += $this->reponses->get($c)['reponse'];
                }
            } else {
                $reponse = $this->reponses->get($cle)['reponse'];
            }

            if ($requis === 0 && $reponse === 0) {
                continue;
            }

            if (is_numeric($requis) && $reponse <= $requis) {
                continue;
            }

            if (is_string($requis) && $reponse === $requis) {
                continue;
            }

            $this->explain[$exigence][$cle] = [
                'requis' => $requis,
                'reponse' => $reponse
            ];

            $satisfied = false;
        }

        return $satisfied;
    }

    public function explain($exigence)
    {
        return $this->explain[$exigence];
    }
}
