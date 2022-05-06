<?php

namespace Reponses\Exporter;

abstract class AbstractExporter
{
    abstract public function export();

    public function setHeaders(string $type, string $name)
    {
        header('Content-type: '.$type);
        header("Content-disposition: attachment; filename=".$name);
    }
}
