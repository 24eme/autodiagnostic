<?php
class Statistiques {

    const COMPARATEUR_SUP_EGAL = 'GTE';
    const COMPARATEUR_INF_EGAL = 'LTE';
    const COMPARATEUR_SUP = 'GT';
    const COMPARATEUR_INF = 'LT';
    const COMPARATEUR_EGAL = 'EQ';
    const DATA_QUESTIONNAIRE = 'data/questionnaire.yml';

    private $config;
    private $reponses;

    private $scores;
    private $highScores;
    private $ptsForts;
    private $ptsAmeliorations;

    public function __construct($reponses) {
        $this->config = yaml_parse_file(self::DATA_QUESTIONNAIRE);
        $this->reponses = $reponses;
        $this->scores = [];
        $this->highScores = [];
        $this->ptsForts = [];
        $this->ptsAmeliorations = [];
        $this->synthetiserReponses();
    }

    public function renderTabKeysScores() {
        return implode(',', array_keys($this->scores));
    }

    public function renderTabValuesScores() {
        return implode(',', $this->scores);
    }

    public function getScores() {
        return $this->scores;
    }

    public function getHighScores() {
        return $this->highScores;
    }

    public function getPtsForts($limit = null) {
        return ($limit)? array_slice($this->ptsForts, 0, $limit, true) : $this->ptsForts;
    }

    public function getPtsAmeliorations($limit = null) {
        return ($limit)? array_slice($this->ptsAmeliorations, 0, $limit, true) : $this->ptsAmeliorations;
    }

    public function getReponses() {
        return json_encode(json_decode($this->reponses), JSON_PRETTY_PRINT);
    }

    private function synthetiserReponses() {
        $reponses = json_decode($this->reponses, true);
        $categorieCourante = "";
        foreach($this->config['questions'] as $question) {
            if ($question['type'] == 'categorie') {
                $categorieCourante = $question['libelle'];
                continue;
            }
            if (is_array($reponses[$question['id']])) {
                continue;
            }
            if (!isset($question['notation']) && isset($reponses[$question['id']])) {
                continue;
            }
            if (isset($question['notation']) && !isset($reponses[$question['id']])) {
                throw new Exception('Une réponse est attendue pour la question : '.$question['id']);
            }
            $notation = $this->getNotationByReponse($question['notation'], $reponses[$question['id']]);
            if (!$notation) {
                throw new Exception('Réponse non traitée dans les notations de la question '.$question['id'].' : '.$reponses[$question['id']]);
            }
            if (!isset($this->scores[$categorieCourante])) {
                $this->scores[$categorieCourante] = 0;
            }
            if (!isset($this->highScores[$categorieCourante])) {
                $this->highScores[$categorieCourante] = 0;
            }
            $this->scores[$categorieCourante] += $notation['score'];
            $this->highScores[$categorieCourante] += $this->getNotationByReponse($question['notation']);
            if ($notation['bilan_poids'] < 0) {
                $this->ptsAmeliorations[$notation['bilan_poids']*(-1)] = $notation['bilan_phrase'];
            }
            if ($notation['bilan_poids'] > 0) {
                $this->ptsForts[$notation['bilan_poids']] = $notation['bilan_phrase'];
            }
        }
        krsort($this->ptsAmeliorations);
        krsort($this->ptsForts);

    }

    private function getNotationByReponse($notations, $reponse = null) {
        $comparateur = key($notations);
        $valeurs = current($notations);
        $highScore = 0;
        foreach($valeurs as $valeur => $notation) {
            if ($reponse !== null && $this->isNotationSatisfaite($reponse, $comparateur, $valeur)) {
                return $notation;
            }
            if ($reponse === null && $notation['score'] > $highScore) {
                $highScore = $notation['score'];
            }
        }
        return ($reponse === null)? $highScore : null;
    }

    private function isNotationSatisfaite($reponse, $comparateur, $valeur) {
        switch ($comparateur) {
            case self::COMPARATEUR_INF_EGAL:
                return ($reponse <= $valeur);
                break;
            case self::COMPARATEUR_SUP_EGAL:
                return ($reponse >= $valeur);
                break;
            case self::COMPARATEUR_INF:
                return ($reponse < $valeur);
                break;
            case self::COMPARATEUR_SUP:
                return ($reponse > $valeur);
                break;
            case self::COMPARATEUR_EGAL:
                return ($reponse == $valeur);
                break;
            default:
                throw new Exception('Comparateur non connu : '.$comparateur);
                break;
        }
    }
}
