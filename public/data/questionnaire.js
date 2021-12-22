var questionnaire = {
  "libelle": "Autodiagnostic Développement Durable",
  "complement_information": "Afin de vous faire une idée du positionnement de votre exploitation en terme d'environnement et de développement durable dans le vignoble, le BIVC met à disposition cet outil d'autodiagnostic vous permettant de vous évaluer sur ces questions environnementales.",
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
        {
          "id": "BIO",
          "libelle": "Bio",
          "reponses_automatiques": {
            "IFT_HORS_HERBICIDE": 5,
            "PLANT_MASSALE": 1,
            "ANTI_BROTRYTIS": 0
          }
        },
        {
          "id": "HVE",
          "libelle": "HVE",
          "reponses_automatiques": {
            "SURFACE_ALTERNATIVE_CHIMIE": 46,
            "PLANT_MASSALE": 1,
            "IFT_HERBICIDE": 0.53
          }
        },
        {
          "id": "TERRAVITIS",
          "libelle": "Terravitis",
          "reponses_automatiques": {
            "IFT_HORS_HERBICIDE": 6
          }
        }
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
      "unite": "%",
      "notation": {
        "LTE": {
          "0": {"score": 0, "bilan_poids": -9, "bilan_phrase": "Arreter de traiter une partie de mon exploitation"},
          "10": {"score": 1, "bilan_poids": 0, "bilan_phrase": ""},
          "20": {"score": 2, "bilan_poids": 0, "bilan_phrase": ""},
          "30": {"score": 3, "bilan_poids": 0, "bilan_phrase": ""},
          "40": {"score": 4, "bilan_poids": 0, "bilan_phrase": ""},
          "50": {"score": 5, "bilan_poids": 0, "bilan_phrase": ""},
          "60": {"score": 6, "bilan_poids": 0, "bilan_phrase": ""},
          "70": {"score": 7, "bilan_poids": 0, "bilan_phrase": ""},
          "80": {"score": 8, "bilan_poids": 0, "bilan_phrase": ""},
          "90": {"score": 9, "bilan_poids": 0, "bilan_phrase": ""},
          "100": {"score": 10, "bilan_poids": 9, "bilan_phrase": "Totalité de l'exploitation non traitée"}
        }
      }
    },
    {
      "type": "question",
      "id": "IFT_HERBICIDE",
      "libelle": "Mon IFT herbicides",
      "complement_information": "IFT (Indice de Fréquence de Traitement) comptabilise le nombre de doses de référence appliquées par hectare sur une campagne. Cet indicateur permet d'évaluer la réduction de l'utilisation de produits phytosanitaire. Vous pouvez le calculer à l'aide de l'outil suivant",
      "notation": {
        "GTE": {
          "1.08": {"score": 0, "bilan_poids": -8, "bilan_phrase": "Traiter moins fréquement"},
          "0.945": {"score": 1, "bilan_poids": 0, "bilan_phrase": ""},
          "0.81": {"score": 2, "bilan_poids": 0, "bilan_phrase": ""},
          "0.675": {"score": 3, "bilan_poids": 0, "bilan_phrase": ""},
          "0.54": {"score": 4, "bilan_poids": 0, "bilan_phrase": ""},
          "0": {"score": 5, "bilan_poids": 0, "bilan_phrase": ""}
        }
      }
    },
    {
      "type": "question",
      "id": "IFT_HORS_HERBICIDE",
      "libelle": "Mon IFT hors herbicides",
      "complement_information": "IFT (Indice de Fréquence de Traitement) comptabilise le nombre de doses de référence appliquées par hectare sur une campagne. Cet indicateur permet d'évaluer la réduction de l'utilisation de produits phytosanitaire. Vous pouvez le calcul à l'aide de l'outil suivant. L'IFT Hors Herbicide correspond à la somme des IFT Fongicides, Insecticides-acaricides et Autre. Le Biocontrôle n'est pas pris en compte.",
      "notation": {
        "GTE": {
          "10.89": {"score": 0, "bilan_poids": -7, "bilan_phrase": "Traiter moins fréquement"},
          "9.53": {"score": 1, "bilan_poids": 0, "bilan_phrase": ""},
          "8.17": {"score": 2, "bilan_poids": 0, "bilan_phrase": ""},
          "6.81": {"score": 3, "bilan_poids": 0, "bilan_phrase": ""},
          "5.45": {"score": 4, "bilan_poids": 0, "bilan_phrase": ""},
          "0": {"score": 5, "bilan_poids": 0, "bilan_phrase": ""}
        }
      }
    },
    {
      "type": "question",
      "id": "SURFACE_ALTERNATIVE_CHIMIE",
      "libelle": "Surface sur laquelle j'utilise au moins une méthode alternative à la lutte chimique",
      "complement_information": "Les méthodes physiques (ex: désherbage mécanique) et biologiques sont prises en compte. Voir liste des méthodes",
      "unite": "%",
      "notation": {
        "GTE": {
          "75": {"score": 3, "bilan_poids": 6, "bilan_phrase": "Utilisation d'alternatives chimiques"},
          "50": {"score": 2, "bilan_poids": 0, "bilan_phrase": ""},
          "25": {"score": 1, "bilan_poids": 0, "bilan_phrase": ""},
          "0": {"score": 0, "bilan_poids": -6, "bilan_phrase": "Utilisation d'alternatives chimiques"}
        }
      }
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
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "0": {"score": 0, "bilan_poids": -5, "bilan_phrase": "Equipements permettant de limiter les fuites vers l'environnement"},
          "1": {"score": 2, "bilan_poids": 5, "bilan_phrase": "Equipements permettant de limiter les fuites vers l'environnement"}
        }
      }
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
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "0": {"score": 0, "bilan_poids": -4, "bilan_phrase": "Utilisation de plants issus de sélection massale"},
          "1": {"score": 2, "bilan_poids": 4, "bilan_phrase": "Utilisation de plants issus de sélection massale"}
        }
      }
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
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "0": {"score": 2, "bilan_poids": 0, "bilan_phrase": ""},
          "1": {"score": 0, "bilan_poids": -3, "bilan_phrase": "Eviter l'anti brotrytis"}
        }
      }
    },
    {
      "type": "categorie",
      "id": "FERTILISATION",
      "libelle": "Fertilisation",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#3498db",
      "opacite": "#8dc1e4",
      "couleur_texte": "#fff"
    },
    {
      "type": "question",
      "id": "BILAN_AZOTE",
      "libelle": "Que représente mon bilan azote global ?",
      "complement_information": "",
      "unite": "kg N/ha",
      "notation": {
        "GTE": {
          "60": {"score": 0, "bilan_poids": 0, "bilan_phrase": ""},
          "0": {"score": 2, "bilan_poids": 3, "bilan_phrase": "Très bon bilan azote"}
        }
      }
    },
    {
      "type": "question",
      "id": "AZOTE_ORGANIQUE",
      "libelle": "J'utilise de l'azote 100% organique ?",
      "complement_information": "",
      "reponses": [
        {
          "id": 1,
          "libelle": "Oui"
        },
        {
          "id": 0,
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "0": {"score": 0, "bilan_poids": -2, "bilan_phrase": "Préférer l'azote organique"},
          "1": {"score": 2, "bilan_poids": 2, "bilan_phrase": "Azote 100% organique"}
        }
      }
    },
    {
      "type": "question",
      "id": "UNITE_AZOTE",
      "libelle": "Combien d'unité d'azote chimique/ha ai-je utilisé sur la campagne ?",
      "complement_information": "",
      "unite": "N/ha",
      "notation": {
        "GTE": {
          "15": {"score": 0, "bilan_poids": -1, "bilan_phrase": "Réduction d'unite d'azote chimique"},
          "10": {"score": 1, "bilan_poids": 0, "bilan_phrase": ""},
          "5": {"score": 2, "bilan_poids": 0, "bilan_phrase": ""},
          "0": {"score": 3, "bilan_poids": 0, "bilan_phrase": ""}
        }
      }
    },
    {
      "type": "categorie",
      "id": "BIODIVERSITE",
      "libelle": "Biodiversité",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#c582af",
      "opacite": "#debdd3",
      "couleur_texte": "#fff"
    },
    {
      "type": "question",
      "id": "SED_A_SAPIEN",
      "libelle": "Duis eu eros sit amet purus vehicula vestibulum ut id risus.",
      "complement_information": "",
      "notation": {
        "GTE": {
          "15": {"score": 0, "bilan_poids": 0, "bilan_phrase": ""},
          "10": {"score": 1, "bilan_poids": 0, "bilan_phrase": ""},
          "5": {"score": 2, "bilan_poids": 0, "bilan_phrase": ""},
          "0": {"score": 3, "bilan_poids": 0, "bilan_phrase": ""}
        }
      }
    },
    {
      "type": "question",
      "id": "SUSPENDISSE_POTENTI",
      "libelle": "Duis semper vel libero nec ullamcorper.",
      "complement_information": "",
      "notation": {
        "GTE": {
          "15": {"score": 0, "bilan_poids": 0, "bilan_phrase": ""},
          "10": {"score": 1, "bilan_poids": 0, "bilan_phrase": ""},
          "5": {"score": 2, "bilan_poids": 0, "bilan_phrase": ""},
          "0": {"score": 3, "bilan_poids": 0, "bilan_phrase": ""}
        }
      }
    }
  ]
};
