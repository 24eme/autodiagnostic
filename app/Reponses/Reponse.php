<?php

namespace Reponses;

class Reponse
{
    const PREFIX_COMPLEMENT = 'DTL_';
    const PREFIX_COMPLEMENT_SURFACE = 'DTL_SURFACE_';

    public $id;
    public $decoded = [];
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
            if (strpos($id, self::PREFIX_COMPLEMENT) === 0 && strpos($id, self::PREFIX_COMPLEMENT_SURFACE) === false) {
                continue;
            }

            $r = $this->hasMultiplesReponses($id) ? implode(',', $rep) : $rep;
            $cr = $this->hasComplementReponse($id) ? $this->decoded[self::PREFIX_COMPLEMENT.$id] : null;
            yield ['id' => $id, 'reponse' => $r, 'complement' => $cr];
        }
    }

    public function hasMultiplesReponses($id)
    {
        return is_array($this->decoded[$id]) && ! empty($this->decoded[$id]);
    }

    public function hasComplementReponse($id)
    {
        return isset($this->decoded[self::PREFIX_COMPLEMENT.$id]);
    }
}
