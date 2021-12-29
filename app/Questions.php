<?php

class Questions
{
    const DATA_QUESTIONNAIRE = 'data/questionnaire.js';

    private array $questions = [];
    private array $categories = [];

    public function __construct()
    {
        $questionnaire = json_decode(preg_replace('/;$/', '', preg_replace('/^.+{/', '{', file_get_contents(self::DATA_QUESTIONNAIRE))), true);
        $this->questions = $this->extract('question', $questionnaire['questions']);
        $this->categories = $this->extract('categorie', $questionnaire['questions']);
    }

    private function extract(string $type, array $content)
    {
        return array_filter($content, function (array $question) use ($type) {
            return $question['type'] === $type;
        });

    }
}
