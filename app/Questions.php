<?php

class Questions
{
    const DATA_QUESTIONNAIRE = 'data/questionnaire.yml';

    private $questions = [];
    private $categories = [];
    private $questionnaire = [];
    private $qfound = [];
    private $cfound = [];

    public function __construct()
    {
        $questionnaire = yaml_parse_file(self::DATA_QUESTIONNAIRE);
        $this->questions = $this->extract('question', $questionnaire['questions']);
        $this->categories = $this->extract('categorie', $questionnaire['questions']);
        $this->questionnaire = $this->build($questionnaire['questions']);
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

    public function getQuestionUnite($id)
    {
        $question = $this->findQuestion($id);
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
        return shell_exec("cat -n ".self::DATA_QUESTIONNAIRE."|grep -E 'id: $id$'|cut -d 'i' -f1|sed 's/ //g'");
    }
}
