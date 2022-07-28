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

        foreach ($exigenceDetail['formule'] as $formule) {
            if (isset($formule['func']) === true) {
                $reponse = $formule['func'];
                $value = eval('return '.$formule['func'].';');
                $success = call_user_func($value, $this->reponses);
            } else {
                $reponse = $this->reponses->get($formule['qid']);

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
