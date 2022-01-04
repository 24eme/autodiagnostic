<?php

class Questions
{
    const DATA_QUESTIONNAIRE = 'data/questionnaire.js';

    private $questions = [];
    private $categories = [];
    private $questionnaire = [];
    private $found = [];

    public function __construct()
    {
        $questionnaire = json_decode(preg_replace('/;$/', '', preg_replace('/^.+{/', '{', file_get_contents(self::DATA_QUESTIONNAIRE))), true);
        $this->questions = $this->extract('question', $questionnaire['questions']);
        $this->categories = $this->extract('categorie', $questionnaire['questions']);
        $this->questionnaire = $this->build($questionnaire['questions']);
    }

    private function extract(string $type, array $content): array
    {
        return array_values(array_filter($content, function (array $question) use ($type) {
            return $question['type'] === $type;
        }));
    }

    private function build(array $content): array
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

    public function getQuestions(): array
    {
        return $this->questions;
    }

    public function getCategories(): array
    {
        return $this->categories;
    }

    public function getQuestionnaire(): array
    {
        return $this->questionnaire;
    }

    public function find(string $id): array
    {
        if (array_key_exists($id, $this->found)) {
            return $this->found[$id];
        }

        $key = array_search($id, array_column($this->getQuestions(), 'id'));
        $this->found[$id] = $this->getQuestions()[$key];
        return $this->found[$id];
    }

    public function getQuestionType(string $id): string
    {
        $question = $this->find($id);

        if (isset($question['reponses'])) {
            return (isset($question['multiple'])) ? 'Choix multiple' : 'Choix unique';
        } else {
            return 'Nombre';
        }
    }

    public function getQuestionUnite(string $id): string
    {
        $question = $this->find($id);
        return $question['unite'] ?? '';
    }

    public function getQuestionAide(string $id): string
    {
        $question = $this->find($id);
        return $question['complement_information'];
    }

    public function hasReponses(string $id): bool
    {
        $question = $this->find($id);
        return isset($question['reponses']);
    }

    public function getReponses(string $id): array
    {
        if ($this->hasReponses($id) === false) {
            return [];
        }

        $question = $this->find($id);
        return $question['reponses'];
    }

    public function hasReponsesAutomatiques(string $id): bool
    {
        $question = $this->find($id);
        return isset($question['reponses']) && array_column($question['reponses'], 'reponses_automatiques');
    }

    public function getReponsesAutomatiques(string $id): array
    {
        if ($this->hasReponsesAutomatiques($id) === false) {
            return [];
        }

        $question = $this->find($id);
        return array_column($question['reponses'], 'reponses_automatiques', 'libelle');
    }

    public function hasNotation(string $id): bool
    {
        $question = $this->find($id);
        return isset($question['notation']);
    }

    public function getNotation(string $id): array
    {
        if ($this->hasNotation($id) === false) {
            return [];
        }

        $question = $this->find($id);
        return $question['notation'];
    }
}
