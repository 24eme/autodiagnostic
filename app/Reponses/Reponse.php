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

        if (is_file($file) === false) {
            throw new \InvalidArgumentException("Le fichier n'existe pas");
        }

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

    public static function getFichierNameWithAuth(string $file, string $md5)
    {
        if (!is_file($file)) {
            return false;
        }

        if (md5_file($file) !== $md5) {
            return false;
        }

        $file = file_get_contents($file);

        if ($file === false) {
            throw new \Exception("Erreur dans la lecture du fichier de réponse de l'utilisateur");
        }

        return $file;
    }

    public static function getFichier(string $path, string $user)
    {
        return glob(sprintf('%s/%s-%s-*.json', $path, $user, date('Y')));
    }

    public static function rename(string $path, string $olduser, string $newuser)
    {
        $file = self::getFichier($path, $olduser);

        if ($file === false || count($file) === 0 || is_file(current($file)) === false) {
            return false;
        }

        $filename = current($file);
        $new = str_replace($olduser, $newuser, $filename);

        rename($filename, $new);
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

    public function get($id)
    {
        if (array_key_exists($id, $this->decoded) === false) {
            return null;
        }

        $reponse = $this->decoded[$id];

        return [
            'reponse' => $this->hasMultiplesReponses($id) ? implode(',', $reponse) : $reponse,
            'complement' => $this->hasComplementReponse($id) ? $this->decoded[self::PREFIX_COMPLEMENT.$id] : null
        ];
    }
}
