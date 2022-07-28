<?php

use Reponses\Reponse;

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
    private Reponse $reponses;

    private $scores;
    private $highScores;
    private $ptsForts;
    private $ptsAmeliorations;
    private $formules;
    private $infosFormules;

    public function __construct(Reponse $reponses) {
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

    public function getFormuleDescription($formule)
    {
        return $this->infosFormules[$formule]['description'];
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

    public function isCertified($certif)
    {
        return in_array($certif, explode(',', $this->reponses->get('SELECTION_CERTIF')['reponse']));
    }

    public function getElementsAValider($formule)
    {
        return $this->infosFormules[$formule]['exigences'];
    }

    private function synthetiserReponses()
    {
        $categorieCourante = "";

        foreach($this->config['questions'] as $question) {
            if ($question['type'] == 'categorie') {
                $categorieCourante = $question['libelle'];
                continue;
            }

            if (!isset($question['notation'])) {
                continue;
            }

            $reponse = $this->reponses->get($question['id']);

            if (isset($question['notation']) && null === $reponse) {
                throw new \Exception('Une réponse est attendue pour la question : '.$question['id']);
            }

            if ($reponse['reponse'] === self::NON_CONCERNE
                || is_array($reponse['reponse']) && $reponse['reponse'] === [self::NON_CONCERNE]
            ) {
                continue;
            }

            $this->highScores[$categorieCourante] += $this->getNotationByReponse($question['notation']);

            $couranteReponses = $reponse['reponse'];

            if(is_array($couranteReponses) === false) {
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
            if ($reponse !== null && self::isNotationSatisfaite($reponse, $comparateur, $valeur)) {
                return $notation;
            }
            if ($reponse === null && $notation['score'] > $highScore) {
                $highScore = $notation['score'];
            }
        }
        return ($reponse === null)? $highScore : null;
    }

    public static function isNotationSatisfaite($reponse, $comparateur, $valeur) {
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
            $stat = new Statistiques(new Reponse($file));
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

    public function organiseFichesByFaiblesses(array $fiches) {
        $faiblesses = [];
        $exclude = [];

        foreach($this->ptsAmeliorations as $faiblesse) {
            foreach($fiches['fiches'] as $k => $fiche) {
                if (isset($fiche['faiblesses']) && in_array($faiblesse, $fiche['faiblesses'])) {
                    $faiblesses[$faiblesse][] = $fiche;
                    $exclude[] = $k;
                }
            }
        }

        foreach ($fiches['fiches'] as $k => $fiche) {
            if (in_array($k, $exclude) === false) {
                $faiblesses['autres'][] = $fiche;
            }
        }

        return $faiblesses;
    }
}
