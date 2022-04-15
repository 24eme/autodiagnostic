<?php

namespace Reponses;

class Reponse
{
    public $id;
    public $decoded;
    private $raw;

    public function __construct($file)
    {
        $this->id = basename($file, '.json');
        $this->raw = file_get_contents($file);

        $decoded = json_decode($this->raw);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \ValueError(
                "Invalid JSON for file: ".basename($file) .".".PHP_EOL.
                "Err: ".json_last_error_msg()
            );
        }

        foreach ($decoded as $id => $rep) {
            $this->decoded[$id] = $rep;
        }
    }

    public function export()
    {
        foreach ($this->decoded as $id => $rep) {
            yield ['id' => $id, 'reponse' => $rep];
        }
    }
}
