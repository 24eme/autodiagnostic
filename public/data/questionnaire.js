var questionnaire = {
  "libelle": "Autodiagnostic Développement Durable",
  "complement_information": "Afin de vous faire une idée du positionnement de votre exploitation en terme de d'environnement et de développement durable dans le vignoble, le BIVC met à disposition cet outil d'autodiagnostic vous permettant de vous évaluer sur ces questions environnementales.",
  "questions": [
    {
      "type": "categorie",
      "id": "CERTIFICATION",
      "libelle": "Certification",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#2ecc71",
      "opacite": "#8adbaf",
      "couleur_texte": "#fff"

    },
    {
      "type": "question",
      "id": "SELECTION_CERTIF",
      "libelle": "Sélection de la certification",
      "complement_information": "En fonction de vos choix, certaines des réponses seront préremplies.",
      "multiple": true,
      "reponses": [
        {"id": "BIO", "libelle": "Bio"}, {"id": "HVE", "libelle": "HVE"}, {"id": "TERRAVITIS", "libelle": "Terravitis"}
      ]
    },
    {
      "type": "categorie",
      "id": "PROTECTION_VIGNE",
      "libelle": "Protection de la vigne",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#f39c12",
      "opacite": "#eec37f",
      "couleur_texte": "#fff"

    },
    {
      "type": "question",
      "id": "SURFACE_NON_TRAITEE",
      "libelle": "Quelle part de mon exploitation représente la surface non traitée ?",
      "complement_information": "SAU non traitée : parcelle en AB ou conversion, parcelles et bordures n'ayant reçu aucun produit phyto de synthèse en cours de campgane étudiées (hors traitement obligatoires comme flavescence dorée), ZNT et IAE",
      "unite": "%"
    },
    {
      "type": "question",
      "id": "IFT_HERBICIDE",
      "libelle": "Mon IFT herbicides",
      "complement_information": "IFT (Indice de Fréquence de Traitement) comptabilise le nombre de doses de référence appliquées par hectare sur une campagne. Cet indicateur permet d'évaluer la réduction de l'utilisation de produits phytosanitaire. Vous pouvez le calculer à l'aide de l'outil suivant",
    },
    {
      "type": "question",
      "id": "IFT_HORS_HERBICIDE",
      "libelle": "Mon IFT hors herbicides",
      "complement_information": "IFT (Indice de Fréquence de Traitement) comptabilise le nombre de doses de référence appliquées par hectare sur une campagne. Cet indicateur permet d'évaluer la réduction de l'utilisation de produits phytosanitaire. Vous pouvez le calcul à l'aide de l'outil suivant. L'IFT Hors Herbicide correspond à la somme des IFT Fongicides, Insecticides-acaricides et Autre. Le Biocontrôle n'est pas pris en compte.",
    },
    {
      "type": "question",
      "id": "SURFACE_ALTERNATIVE_CHIMIE",
      "libelle": "Surface sur laquelle j'utilise au moins une méthode alternative à la lutte chimique",
      "complement_information": "Les méthodes physiques (ex: désherbage mécanique) et biologiques sont prises en compte. Voir liste des méthodes",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "MATERIELS",
      "libelle": "J'utilise du matériels ou équipements permettant de limiter les fuites vers l'environnement, au-delà des obligations règlementaires ?",
      "complement_information": "Liste des équipements",
      "reponses": [
        {
          "id": 1,
          "libelle": "Oui"
        },
        {
          "id": 0,
          "libelle": "Non",
        }
      ]
    },
    {
      "type": "question",
      "id": "PLANT_MASSALE",
      "libelle": "J'utilise des plants issus de sélection massale ?",
      "complement_information": "La sélection massale permet de préserver la diversité génétique, qui au sein d'une même parcelle, concourt à la complexité du vin et assure une complémentarité de la vigne là où une sélection clonage est plus homogène.",
      "reponses": [
          {
            "id": 1,
            "libelle": "Oui"
          },
          {
            "id": 0,
            "libelle": "Non",
          }
      ]
    },
    {
      "type": "question",
      "id": "ANTI_BROTRYTIS",
      "libelle": "J'utilise de l'anti brotrytis ?",
      "complement_information": "https://www.vignevin.com/wp-content/uploads/2021/04/fiche-biocontrole-vigne-mars-2021.pdf",
      "reponses": [
          {
            "id": 1,
            "libelle": "Oui"
          },
          {
            "id": 0,
            "libelle": "Non",
          }
      ]
    }
  ]
};
