<?php
class Statistiques {

    const COMPARATEUR_SUP_EGAL = 'GTE';
    const COMPARATEUR_INF_EGAL = 'LTE';
    const COMPARATEUR_EGAL = 'EQ';

    private $config;
    private $reponses;

    private $scores;
    private $hightScores;
    private $ptsForts;
    private $ptsAmeliorations;

    public function __construct($reponses) {
        $this->config = json_decode(preg_replace('/;$/', '', preg_replace('/^.+{/', '{', file_get_contents('data/questionnaire.js'))), true);
        $this->setReponses($reponses);
        $this->scores = [];
        $this->hightScores = [];
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

    public function getHightScores() {
        return $this->hightScores;
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

    public function setReponses($reponses) {
        $this->reponses = $reponses;
    }

    private function synthetiserReponses() {
        $reponses = json_decode($this->reponses, true);
        $categorieCourante = "";
        foreach($this->config['questions'] as $question) {
            if ($question['type'] == 'categorie') {
                $categorieCourante = $question['libelle'];
                continue;
            }
            if (!isset($question['notation']) && isset($reponses[$question['id']])) {
                continue;
            }
            if (isset($question['notation']) && !isset($reponses[$question['id']])) {
                throw new sfException('Une réponse est attendue pour la question : '.$question['id']);
            }
            $notation = $this->getNotationByReponse($question['notation'], $reponses[$question['id']]);
            if (!$notation) {
                throw new sfException('Réponse non traitée dans les notations de la question '.$question['id'].' : '.$reponses[$question['id']]);
            }
            if (!isset($this->scores[$categorieCourante])) {
                $this->scores[$categorieCourante] = 0;
            }
            if (!isset($this->hightScores[$categorieCourante])) {
                $this->hightScores[$categorieCourante] = 0;
            }
            $this->scores[$categorieCourante] += $notation['score'];
            $this->hightScores[$tegorieCourante] += $this->getNotationByReponse($question['notation']);
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
        $hightScore = 0;
        foreach($valeurs as $valeur => $notation) {
            if ($reponse !== null && $this->isNotationSatisfaite($reponse, $comparateur, $valeur)) {
                return $notation;
            }
            if ($reponse === null && $notation['score'] > $hightScore) {
                $hightScore = $notation['score'];
            }
        }
        return ($reponse === null)? $hightScore : null;
    }

    private function isNotationSatisfaite($reponse, $comparateur, $valeur) {
        switch ($comparateur) {
            case self::COMPARATEUR_INF_EGAL:
                return ($reponse <= $valeur);
                break;
            case self::COMPARATEUR_SUP_EGAL:
                return ($reponse >= $valeur);
                break;
            case self::COMPARATEUR_EGAL:
                return ($reponse == $valeur);
                break;
            default:
                throw new sfException('Comparateur non connu : '.$comparateur);
                break;
        }
    }
}
