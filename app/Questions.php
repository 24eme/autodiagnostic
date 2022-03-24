<?php

class Questions
{
    const DATA_QUESTIONNAIRE = 'data/questionnaire.yml';

    private $questions = [];
    private $categories = [];
    private $questionnaire = [];
    private $found = [];

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

    public function find($id)
    {
        if (array_key_exists($id, $this->found)) {
            return $this->found[$id];
        }

        $key = array_search($id, array_column($this->getQuestions(), 'id'));
        $this->found[$id] = $this->getQuestions()[$key];
        return $this->found[$id];
    }

    public function getQuestionIcon($id)
    {
        $question = $this->find($id);

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
        $question = $this->find($id);

        if (isset($question['reponses'])) {
            return (isset($question['multiple'])) ? 'Choix multiple' : 'Choix unique';
        } else {
            return 'Nombre';
        }
    }

    public function getQuestionUnite($id)
    {
        $question = $this->find($id);
        return isset($question['unite']) ? $question['unite'] : 'Sans unité';
    }

    public function getQuestionAide($id)
    {
        $question = $this->find($id);
        return $question['complement_information'];
    }

    public function getQuestionCategorie($id)
    {
        $found = null;

        foreach ($this->getQuestionnaire() as $categorie => $questions) {
            if (array_key_exists($id, $questions) === false) {
                continue;
            }

            $found = $categorie;
            break;
        }

        if ($found === null) {
            return 'Non catégorisé';
        }

        return array_search($found, array_column($this->getCategories(), 'id', 'libelle'));
    }

    public function getQuestionPosition($id)
    {
        $found = null;

        foreach ($this->getQuestionnaire() as $categorie => $questions) {
            if (array_key_exists($id, $questions) === false) {
                continue;
            }

            $found = $categorie;
            break;
        }

        if ($found === null) {
            return '0';
        }

        return array_search($id, array_keys($this->getQuestionnaire()[$found]));
    }

    public function hasReponses($id)
    {
        $question = $this->find($id);
        return isset($question['reponses']);
    }

    public function getReponses($id)
    {
        if ($this->hasReponses($id) === false) {
            return [];
        }

        $question = $this->find($id);
        return $question['reponses'];
    }

    public function hasReponsesAutomatiques($id)
    {
        $question = $this->find($id);
        return isset($question['reponses']) && array_column($question['reponses'], 'reponses_automatiques');
    }

    public function getReponsesAutomatiques($id)
    {
        if ($this->hasReponsesAutomatiques($id) === false) {
            return [];
        }

        $question = $this->find($id);
        return array_column($question['reponses'], 'reponses_automatiques', 'libelle');
    }

    public function hasNotation($id)
    {
        $question = $this->find($id);
        return isset($question['notation']);
    }

    public function getNotation($id)
    {
        if ($this->hasNotation($id) === false) {
            return [];
        }

        $question = $this->find($id);
        return $question['notation'];
    }
}
