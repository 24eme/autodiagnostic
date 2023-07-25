<?php

class Questions
{
    const DATA_QUESTIONNAIRE = 'data/questionnaire';

    private $file = [];
    private $questions = [];
    private $categories = [];
    private $questionnaire = [];
    private $qfound = [];
    private $cfound = [];

    public function __construct($campagne = null)
    {
        if(!$campagne){
            $f3 = Base::instance();
            $campagne = $f3->get("CAMPAGNE_COURANTE");
        }
        $questionnaire = yaml_parse_file(self::DATA_QUESTIONNAIRE.".$campagne.yml");
        $this->questions = $this->extract('question', $questionnaire['questions']);
        $this->categories = $this->extract('categorie', $questionnaire['questions']);
        $this->questionnaire = $this->build($questionnaire['questions']);
        $this->file = array_map('trim', file(self::DATA_QUESTIONNAIRE.".$campagne.yml"));
    }

    private function extract($type, array $content)
    {
        return array_values(array_filter($content, function (array $question) use ($type) {
            return $question['type'] === $type;
        }));
    }

    private function build(array $content)
    {
        $build = [];
        $categorie = '';
        foreach ($content as $question) {
            if ($question['type'] === 'categorie') {
                $categorie = $question['id'];
                $build[$categorie] = [];
            }

            $build[$categorie][$question['id']] = $question;
        }

        return $build;
    }

    public function getQuestions()
    {
        return $this->questions;
    }

    public function getCategories()
    {
        return $this->categories;
    }

    public function getQuestionnaire()
    {
        return $this->questionnaire;
    }

    public function findQuestion($id)
    {
        if (array_key_exists($id, $this->qfound)) {
            return $this->qfound[$id];
        }

        $key = array_search($id, array_column($this->getQuestions(), 'id'));
        $this->qfound[$id] = $this->getQuestions()[$key];
        return $this->qfound[$id];
    }

    public function findQuestionCategorie($idquestion)
    {
        if (array_key_exists($idquestion, $this->cfound)) {
            return $this->cfound[$idquestion];
        }

        $found = null;

        foreach ($this->getQuestionnaire() as $categorie => $questions) {
            if (array_key_exists($idquestion, $questions) === false) {
                continue;
            }

            $found = $categorie;
            break;
        }

        if ($found === null) {
            return $found;
        }

        $key = array_search($found, array_column($this->getCategories(), 'id'));
        $this->cfound[$idquestion] = $this->getCategories()[$key];

        return $this->cfound[$idquestion];
    }

    public function getQuestionIcon($id)
    {
        $question = $this->findQuestion($id);

        $icon = '';

        switch ($this->getQuestionType($id)) {
            case 'Choix multiple':
                $icon = 'bi-ui-checks';
                break;
            case 'Choix unique':
                $icon = 'bi-ui-radios';
                break;
            case 'Nombre':
            default:
                $icon = 'bi-type';
                break;
        }

        return $icon;
    }

    public function getQuestionType($id)
    {
        $question = $this->findQuestion($id);

        if (isset($question['reponses'])) {
            return (isset($question['multiple'])) ? 'Choix multiple' : 'Choix unique';
        } else {
            return 'Nombre';
        }
    }

    public function getQuestionUnite($id,$withoutSansUnite=null)
    {
        $question = $this->findQuestion($id);
        if($withoutSansUnite){
            return isset($question['unite']) ? $question['unite'] : '';
        }
        return isset($question['unite']) ? $question['unite'] : 'Sans unité';
    }


    public function getQuestionAide($id)
    {
        $question = $this->findQuestion($id);
        return $question['complement_information'];
    }

    public function getQuestionCategorie($id)
    {
        $categorie = $this->findQuestionCategorie($id);

        if ($categorie === null) {
            return 'Non catégorisée';
        }

        return $categorie['libelle'];
    }

    public function getCategorieCouleur($id)
    {
        $categorie = $this->findQuestionCategorie($id);

        if ($categorie === null) {
            return '#111111';
        }

        return $categorie['couleur'];
    }

    public function getCategoriePosition($id)
    {
        return array_search($id, array_column($this->getCategories(), 'id')) + 1;
    }

    public function getQuestionPosition($id)
    {
        $categorie = $this->findQuestionCategorie($id);

        if ($categorie === null) {
            return 0;
        }

        return array_search($id, array_keys($this->getQuestionnaire()[$categorie['id']]));
    }

    public function hasReponses($id)
    {
        $question = $this->findQuestion($id);
        return isset($question['reponses']);
    }

    public function getReponses($id)
    {
        if ($this->hasReponses($id) === false) {
            return [];
        }

        $question = $this->findQuestion($id);
        return $question['reponses'];
    }

    public function hasReponsesAutomatiques($id)
    {
        $question = $this->findQuestion($id);
        return isset($question['reponses']) && array_column($question['reponses'], 'reponses_automatiques');
    }

    public function getReponsesAutomatiques($id)
    {
        if ($this->hasReponsesAutomatiques($id) === false) {
            return [];
        }

        $question = $this->findQuestion($id);
        return array_column($question['reponses'], 'reponses_automatiques', 'libelle');
    }

    public function hasNotation($id)
    {
        $question = $this->findQuestion($id);
        return isset($question['notation']);
    }

    public function getNotation($id)
    {
        if ($this->hasNotation($id) === false) {
            return [];
        }

        $question = $this->findQuestion($id);
        return $question['notation'];
    }

    public function getQuestionNumeroLigne($id)
    {
        return array_search('id: '.$id, $this->file) + 1;
    }

    public function isMultipleQuestions($id)
    {
        if(strpos($id, '+')){
            return true;
        }
        return false;
    }

    public function getMultipleQuestionCategorie($id)
    {
        $result = '';
        $questions = explode('+',$id);
        $position = null;
        foreach($questions as $idquestion){
            $result .= $this->getCategoriePosition($this->findQuestionCategorie($idquestion)['id']).'. '.$this->findQuestionCategorie($idquestion)['libelle']."<br>";
            break;
        }
        return $result;
    }

    public function getMultipleQuestion($id,$campagne)
    {
        $result = '';
        $questions = explode('+',$id);
        foreach($questions as $idquestion){
            $result .= $this->getQuestionPosition($idquestion).'. '.$this->findQuestion($idquestion)['libelle']."<a class='float-end text-dark' href='../_config/$campagne#modal-".$this->findQuestionCategorie($idquestion)['id']."-".$this->findQuestion($idquestion)['id']."' title=\"Plus d'info sur la question\"><i class='bi-eye'></i></a>"."<br>";
        }
        return $result;
    }

    public function getReponseLibelle($idquestion,$idreponse)
    {
        $question = $this->findQuestion($idquestion);
        foreach($question['reponses'] as $k => $v){
            if($question['reponses'][$k]['id'] === $idreponse){
                return $question['reponses'][$k]['libelle'];
            }
        }
        return;
    }

    public function isPrerempli($idquestion){
        $question = $this->findQuestion($idquestion);
        return $question['prerempli'] ?  $question['prerempli'] : false;
    }

}
