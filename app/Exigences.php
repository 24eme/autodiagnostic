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
            if (isset($formule['func']) === true) {
                $reponse = $formule['func'];
                $value = eval('return '.$formule['func'].';');
                $question = $formule['qid'];
                $success = call_user_func($value, $reponses);
                $value = $formule['func'];
            } elseif ($formule['op'] === 'SCORE') {
                $reponse = $this->statistiques->getScores()[$formule['cat']];
                $value = $formule['score'];
                $question = $formule['cat'];

                foreach ($formule['mod'] as $mod) {
                    $questionnaire = new Questions();

                    foreach ($mod['questions'] as $q) {
                        $infosQuestion = $questionnaire->findQuestion($q);
                        $notation = $this->statistiques->getNotation($infosQuestion);

                        $reponse -= $notation['score'];
                        $reponse += $notation['score'] * $mod['ratio'];
                    }
                }

                $success = $reponse >= $value;
            } else {
                $reponse = $reponses->get($formule['qid']);

                if ($reponse === null) {
                    throw new LogicException('La réponse '.$formule['qid'].' n\'existe pas.');
                }

                $reponse = $reponse['reponse'];
                $value = $formule['value'];
                $question = $formule['qid'];

                $success = Statistiques::isNotationSatisfaite($reponse, $formule['op'], $value);
            }

            $this->explain[$exigence][$question] = [
                'reponse' => $reponse,
                'requis' => $value,
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
