# autodiagnostic
Diagnostic réalisé sur soi-même à partir de formulaires questions / réponses

## License

Logiciel libre sous license AGPL V3

## Librairies requises

Le module `php-yaml` et `php-mbstring`

## Installation

Récupération des sources :

```
git clone https://github.com/24eme/autodiagnostic.git
```

Copier le fichier config/config.ini.example en config/config.ini


```
cp config/config.ini.example config/config.ini
```


Pour le lancer :

```
php -S localhost:8000 -t public
```

## Librairies utilisées

- **Fat-Free** micro framework PHP : https://github.com/bcosca/fatfree (GPLv3)
- **Bootstrap** framework html, css et javascript : https://getbootstrap.com/ (MIT)
- **Vue.js** framework javascript : https://github.com/vuejs/vue (MIT)
