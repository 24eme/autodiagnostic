<?php

namespace Reponses\Exporter;

use Reponses\Exporter\AbstractExporter;
use Reponses\Reponses;
use Reponses\Reponse;

class ReponsesExporter extends AbstractExporter
{
    private $reponses;
    private $headers = ['operateur', 'categorie', 'id question', 'question', 'reponse', 'complement reponse'];
    private $separator = ';';

    public function __construct(Reponses $reponses)
    {
        $this->reponses = $reponses;
    }

    public function export()
    {
        $this->setHeaders('text/csv', 'global.csv');

        $out = fopen('php://output', 'w');
        fputcsv($out, $this->headers, $this->separator);
        foreach ($this->reponses->export() as $line) {
            fputcsv($out, $line, $this->separator);
        }

        fclose($out);
    }

    public function setSeparator($sep)
    {
        $this->separator = $sep;
    }
}
