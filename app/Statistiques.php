<?php

use Reponses\Reponse;

class Statistiques
{
    const COMPARATEUR_SUP_EGAL = 'GTE';
    const COMPARATEUR_INF_EGAL = 'LTE';
    const COMPARATEUR_SUP = 'GT';
    const COMPARATEUR_INF = 'LT';
    const COMPARATEUR_EGAL = 'EQ';
    const NOTATION_METHODE_SUM = 'SUM';
    const NOTATION_METHODE_MIN = 'MIN';
    const NOTATION_METHODE_MAX = 'MAX';
    const NOTATION_METHODE_FUNC = 'FUNC';
    const DATA_QUESTIONNAIRE = 'data/questionnaire';
    const DATA_FORMULES = 'data/formules.yml';
    const NON_CONCERNE = 'NC';

    private $config;
    private $reponses;

    private $scores = [];
    private $highScores = [];
    private $blacklist_categories_charts = ['Informations générales', 'Certification'];

    private $ptsForts = [];
    private $ptsAmeliorations = [];
    private $formules = [];
    private $infosFormules;

    public function __construct(Reponse $reponses) {

        $campagne = $reponses->getCampagne();

        $this->config = yaml_parse_file(self::DATA_QUESTIONNAIRE.".$campagne.yml");
        $this->infosFormules = yaml_parse_file(self::DATA_FORMULES);
        $this->reponses = $reponses;
        $this->formules = array_fill_keys(array_keys($this->infosFormules), true);

        $this->synthetiserReponses();
    }

    public function renderTabKeysScores() {
        return implode(',', array_keys($this->getScores(true)));
    }

    public function renderTabValuesScores($pourcent = true) {
        if ($pourcent === false) {
            return implode(',', $this->getScores(true));
        }

        return implode(',', $this->scoresEnPourcent(true));
    }

    public function getScores($blacklist = false) {
        if ($blacklist === true) {
            return $this->blacklist($this->scores);
        }

        return $this->scores;
    }

    public function getHighScores($blacklist = false) {
        if ($blacklist === true) {
            return $this->blacklist($this->highScores);
        }

        return $this->highScores;
    }

    private function blacklist($scores)
    {
            $filtered = [];
            foreach ($scores as $categorie => $score) {
                if (in_array($categorie, $this->blacklist_categories_charts) === false) {
                    $filtered[$categorie] = $score;
                }
            }

            return $filtered;
    }

    public function getReponses()
    {
        return $this->reponses;
    }

    private function scoresEnPourcent($blacklist = false)
    {
        $highScores = $this->getHighScores($blacklist);
        return array_map(function ($categorie, $score) use ($highScores) {
            if ($highScores[$categorie] === 0) {
                return 0;
            }
            return round(($score * 100) / $highScores[$categorie]);
        }, array_keys($this->getScores($blacklist)), array_values($this->getScores($blacklist)));
    }

    public function getFormules()
    {
        return array_keys($this->infosFormules);
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
        $exigences = new Exigences($this);

        foreach ($this->getFormules() as $formule) {
            $aValider = $this->getElementsAValider($formule);

            foreach ($aValider as $exigence) {
                if ($exigences->is($exigence) === false) {
                    $this->formules[$formule] = false;
                }
            }
        }

        unset($exigences);

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

            $notation = $this->getNotation($question);

            $this->highScores[$categorieCourante] += $notation['highScore'];
            $this->scores[$categorieCourante] += $notation['score'];
            $this->ptsForts = array_merge($this->ptsForts, $notation['atouts']);
            $this->ptsAmeliorations = array_merge($this->ptsAmeliorations, $notation['faiblesses']);
        }
    }

    public function getNotation($question) {
        $notation = array('score' => null, 'faiblesses' => array(), 'atouts' => array(), 'highScore' => 0);

        if(!isset($question['notation'])) {

            return $notation;
        }

        if (isset($question['notation']) && null === $this->reponses->get($question['id'])) {
            throw new \Exception('Une réponse est attendue pour la question : '.$question['id']);
        }


        $configNotation = $question['notation'];

        $reponses = explode(',', $this->reponses->get($question['id'])['reponse']);

        $notationMethode = self::NOTATION_METHODE_MAX;

        if(isset($question['notation_methode']) && $question['notation_methode']) {
            $notationMethode = $question['notation_methode'];
        }

        if(isset($question['notation_methode']) && $notationMethode === self::NOTATION_METHODE_FUNC){
            $notation["score"] = eval($question['notation']);
            $notation['highScore'] = $question['notation_highScore'];
            if($notation["score"]>$question['notation_highScore']){
                $notation['score'] = $question['notation_highScore'];
            }
            return($notation);
        }

        foreach($configNotation as $comparateur => $valeurs) {
            foreach($valeurs as $valeur => $configScore) {
                if($notationMethode == self::NOTATION_METHODE_SUM) {
                    $notation['highScore'] += $configScore['score'];
                } elseif($configScore['score'] > $notation['highScore']) {
                    $notation['highScore'] = $configScore['score'];
                }
                if(in_array(self::NON_CONCERNE, $reponses)) {
                    continue;
                }
                foreach($reponses as $reponse) {
                    if ($reponse === null || !self::isNotationSatisfaite($reponse, $comparateur, $valeur)) {
                        continue;
                    }

                    if(is_null($notation['score']) && $notationMethode != self::NOTATION_METHODE_SUM) {
                        $notation['score'] = $configScore['score'];
                    }

                    if($notationMethode == self::NOTATION_METHODE_MIN && $configScore['score'] < $notation['score']) {
                        $notation['score'] = $configScore['score'];
                    } elseif($notationMethode == self::NOTATION_METHODE_SUM) {
                        $notation['score'] += $configScore['score'];
                    } elseif($notationMethode == self::NOTATION_METHODE_MAX && $configScore['score'] > $notation['score']) {
                        $notation['score'] = $configScore['score'];
                    }

                    if (isset($configScore['faiblesse'])) {
                        $notation['faiblesses'][$configScore['faiblesse']] = $configScore['faiblesse'];
                    }
                    if (isset($configScore['atout'])) {
                        $notation['atouts'][$configScore['atout']] = $configScore['atout'];
                    }
                }
            }
        }

        if(is_null($notation['score'])) {
            $notation['score'] = 0;
        }

        return $notation;
    }

    public static function isNotationSatisfaite($reponse, $comparateur, $valeur) {
        switch ($comparateur) {
            case self::COMPARATEUR_INF_EGAL:
                return $reponse <= $valeur;
                break;
            case self::COMPARATEUR_SUP_EGAL:
                return $reponse >= $valeur;
                break;
            case self::COMPARATEUR_INF:
                return $reponse < $valeur;
                break;
            case self::COMPARATEUR_SUP:
                return $reponse > $valeur;
                break;
            case self::COMPARATEUR_EGAL:
                return $reponse === $valeur;
                break;
            default:
                throw new \Exception('Comparateur non connu : '.$comparateur);
                break;
        }
    }

    public function calculMoyenneVignoble()
    {
        $all = [];
        $nb_categorie = 0;

        $f3 = Base::instance();
        foreach (glob($f3->get('UPLOADS').'engages/'.'[!{VISITEUR}]*.json', GLOB_BRACE) as $file) {
            $stat = new self(new Reponse($file));
            $all[] = $stat->scoresEnPourcent(true);
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
