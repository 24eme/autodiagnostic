<?php

use Reponses\Reponse;
use Statistiques;

class Exigences
{
    const DATA_EXIGENCES = 'data/exigences';

    private $statistiques;
    private $exigences;
    private $explain = [];

    public function __construct(Statistiques $statistiques=null,$campagne = null)
    {
        if(!$statistiques && !$campagne){
            $f3 = Base::instance();
            $campagne = $f3->get("CAMPAGNE_COURANTE");
        }
        elseif(!$campagne){
            $campagne = $statistiques->getReponses()->getCampagne();
        }

        $this->exigences = yaml_parse_file(self::DATA_EXIGENCES.".$campagne.yml");
        $this->statistiques = $statistiques;
        $this->campagne = $campagne;
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
        $questionnaire = new Questions($reponses->getCampagne());

        foreach ($exigenceDetail['formule'] as $formule) {
            if (isset($formule['func']) === true) {
                $value = eval('return '.$formule['func'].';');
                $question = $formule['qid'];
                $success = call_user_func($value, $reponses);
                $value = 'func:'.mb_substr($formule['func'], 0, 30).'...';
                $reponse = $success;
            } elseif ($formule['op'] === 'SCORE') {
                $reponse = 0;
                foreach($formule['questions'] as $q => $exigenceNotation)  {
                    $notation = $this->statistiques->getNotation($questionnaire->findQuestion($q));
                    $reponse += $notation['score'];
                    if(isset($exigenceNotation['mod'])) {
                        $reponse -= $notation['score'];
                        $reponse += $notation['score'] * $exigenceNotation['mod']['ratio'];
                    }
                }
                $value = $formule['score'];
                $question = $formule['cat'];

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
        $this->is($exigence);
        return $this->explain[$exigence];
    }

    public function getExigences(){
        return $this->exigences;
    }
}
