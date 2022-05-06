<?php

namespace Reponses\Exporter;

use Questions;
use Reponses\Exporter\AbstractExporter;
use Reponses\Reponse;

class ReponseExporter extends AbstractExporter
{
    private $reponse;
    private $headers = ['operateur', 'categorie', 'id question', 'question', 'reponse', 'complement reponse'];
    private $separator = ';';

    public function __construct(Reponse $reponse)
    {
        $this->reponse = $reponse;
    }

    public function export()
    {
        $questions = new Questions();
        $this->setHeaders('text/csv', $this->reponse->id.'.csv');

        $out = fopen('php://output', 'w');
        fputcsv($out, $this->headers, $this->separator);
        foreach ($this->reponse->export() as $line) {
            $l = [
                $this->reponse->id,
                $questions->getQuestionCategorie($line['id']),
                $line['id'],
                $questions->findQuestion($line['id'])['libelle'],
                $line['reponse'],
                $line['complement']
            ];

            fputcsv($out, $l, $this->separator);
        }

        fclose($out);
    }

    public function setSeparator($sep)
    {
        $this->separator = $sep;
    }
}

