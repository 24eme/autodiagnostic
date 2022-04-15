<?php

namespace Reponses;

use ArrayIterator;
use Questions;
use Reponses\Reponse;

class Reponses implements \Countable, \IteratorAggregate
{
    public static $reponses = [];
    private $questions;

    public function __construct(array $files)
    {
        $this->questions = new Questions();

        foreach ($files as $file) {
            self::$reponses[] = new Reponse($file);
        }
    }

    public function export()
    {
        foreach ($this as $reponse) {
            foreach ($reponse->export() as $line) {
                yield [
                    $reponse->id,
                    $this->questions->getQuestionCategorie($line['id']),
                    $line['id'],
                    $this->questions->findQuestion($line['id'])['libelle'],
                    (is_array($line['reponse'])) ? serialize($line['reponse']) : $line['reponse']
                ];
            }
        }
    }

    public function count()
    {
        return count(self::$reponses);
    }

    public function getIterator()
    {
        return new ArrayIterator(self::$reponses);
    }
}
