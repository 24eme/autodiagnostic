<?php

use Reponses\Reponse;
use Statistiques;

class Exigences
{
    const DATA_EXIGENCES = 'data/exigences.yml';

    private $statistiques;
    private $exigences;
    private $explain = [];

    public function __construct(Statistiques $statistiques)
    {
        $this->exigences = yaml_parse_file(self::DATA_EXIGENCES);
        $this->statistiques = $statistiques;
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
        $reponses = $this->statistiques->getReponses();
        $satisfied = true;

        foreach ($exigenceDetail['formule'] as $formule) {
            if ($formule['op'] === 'SCORE') {
                continue;
            }

            if (isset($formule['func']) === true) {
                $reponse = $formule['func'];
                $value = eval('return '.$formule['func'].';');
                $success = call_user_func($value, $reponses);
            } else {
                $reponse = $reponses->get($formule['qid']);

                if ($reponse === null) {
                    throw new LogicException('La réponse '.$formule['qid'].' n\'existe pas.');
                }

                $reponse = $reponse['reponse'];
                $value = $formule['value'];

                $success = Statistiques::isNotationSatisfaite($reponse, $formule['op'], $value);
            }

            $this->explain[$exigence][$formule['qid']] = [
                'reponse' => $reponse,
                'requis' => $formule['value'],
                'success' => $success
            ];

            if ($success === true) {
                continue;
            }

            $satisfied = false;
        }

        return $satisfied;
    }

    public function explain($exigence)
    {
        return $this->explain[$exigence];
    }
}
