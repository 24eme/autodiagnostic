<?php
class Statistiques {

    const COMPARATEUR_SUP_EGAL = 'GTE';
    const COMPARATEUR_INF_EGAL = 'LTE';
    const COMPARATEUR_SUP = 'GT';
    const COMPARATEUR_INF = 'LT';
    const COMPARATEUR_EGAL = 'EQ';
    const DATA_QUESTIONNAIRE = 'data/questionnaire.yml';
    const DATA_FORMULES = 'data/formules.yml';
    const NON_CONCERNE = 'NC';

    private $config;
    private $reponses;

    private $scores;
    private $highScores;
    private $ptsForts;
    private $ptsAmeliorations;
    private $formules;
    private $infosFormules;

    public function __construct($reponses) {
        $this->config = yaml_parse_file(self::DATA_QUESTIONNAIRE);
        $this->reponses = $reponses;
        $this->scores = [];
        $this->highScores = [];
        $this->ptsForts = [];
        $this->ptsAmeliorations = [];
        $this->formules = ['horsformule' => true, 'formule1' => true, 'formule2' => true, 'formule3' => true];
        $this->infosFormules = yaml_parse_file(self::DATA_FORMULES);
        $this->synthetiserReponses();
    }

    public function renderTabKeysScores() {
        return implode(',', array_keys($this->scores));
    }

    public function renderTabValuesScores($pourcent = true) {
        if ($pourcent === false) {
            return implode(',', $this->scores);
        }

        return implode(',', $this->scoresEnPourcent());
    }

    public function getScores() {
        return $this->scores;
    }

    public function getHighScores() {
        return $this->highScores;
    }

    private function scoresEnPourcent()
    {
        $highScores = $this->highScores;
        return array_map(function ($categorie, $score) use ($highScores) {
            if ($highScores[$categorie] === 0) {
                return 0;
            }
            return round(($score * 100) / $highScores[$categorie]);
        }, array_keys($this->scores), array_values($this->scores));
    }

    public function getFormules()
    {
        return array_keys($this->formules);
    }

    public function getFormuleIcone($formule)
    {
        return $this->infosFormules[$formule]['icone'];
    }

    public function getFormuleTexte($formule)
    {
        return $this->infosFormules[$formule]['texte'];
    }

    public function getFormuleTitre($formule)
    {
        return $this->infosFormules[$formule]['titre'];
    }

    public function getHighestFormule()
    {
        return $this->formules['formule3'] === true
                ?  'formule3'
                : ($this->formules['formule2'] === true
                    ? 'formule2'
                    : ($this->formules['formule1'] === true
                        ? 'formule1'
                        : 'horsformule'));
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

    public function isCertified($certif)
    {
        return in_array($certif, json_decode($this->reponses)->{'SELECTION_CERTIF'});
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
                throw new Exception('Une réponse est attendue pour la question : '.$question['id']);
            }

            if ($reponses[$question['id']] === self::NON_CONCERNE) {
                continue;
            }

            $this->highScores[$categorieCourante] += $this->getNotationByReponse($question['notation']);

            $couranteReponses = $reponses[$question['id']];
            if(!is_array($reponses[$question['id']])) {
                $couranteReponses = array($couranteReponses);
            }

            foreach($couranteReponses as $couranteReponse) {
                $notation = $this->getNotationByReponse($question['notation'], $couranteReponse);

                $this->scores[$categorieCourante] += $notation['score'];
                if (isset($notation['faiblesse'])) {
                    $this->ptsAmeliorations[$notation['faiblesse']] = $notation['faiblesse'];
                }
                if (isset($notation['atout'])) {
                    $this->ptsForts[$notation['atout']] = $notation['atout'];
                }
                foreach($this->formules as $key => $val) {
                    if ($val && isset($notation[$key]) && !$notation[$key]) {
                        $this->formules[$key] = false;
                    }
                }
            }
        }

        foreach($this->highScores as $key => $value) {
            if($this->highScores[$key] < $this->scores[$key]) {
                $this->highScores[$key] = $this->scores[$key];
            }
            if(!$this->highScores[$key]) {
                unset($this->highScores[$key]);
                unset($this->scores[$key]);
            }
        }
    }

    public function getNotationByReponse($notations, $reponse = null) {
        if (!$notations) return null;
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

    public function calculMoyenneVignoble()
    {
        $all = [];
        $nb_categorie = 0;

        $f3 = Base::instance();
        foreach (glob($f3->get('UPLOADS').'[!{VISITEUR}]*.json', GLOB_BRACE) as $file) {
            $stat = new Statistiques(file_get_contents($file));
            $all[] = $stat->scoresEnPourcent();
            $nb_categorie = count(current($all));
            unset($stat);
        }

        $avg = [];

        for ($i = 0; $i < $nb_categorie; $i++) {
            $col = array_column($all, $i);
            $avg[] = round(
                array_sum($col) / count($col)
            );
        }

        return $avg;
    }

    public function organiseFichesByFaiblesses($fiches) {
        $fiches['ameliorations'] = array();
        $toUnset = array();
        foreach($this->ptsAmeliorations as $faiblesse) {
            foreach($fiches['fiches'] as $k => $fiche) {
                if (isset($fiche['faiblesses']) && in_array($faiblesse, $fiche['faiblesses'])) {
                    $fiches['ameliorations'][$faiblesse][] = $fiche;
                    $toUnset[] = $k;
                }
            }
        }
        foreach($toUnset as $k) {
            unset($fiches['fiches'][$k]);
        }
        return $fiches;
    }
}
