var questionnaire = {
  "libelle": "Autodiagnostic Développement Durable",
  "complement_information": "Afin de vous faire une idée du positionnement de votre exploitation en terme de d'environnement et de développement durable dans le vignoble, le BIVC met à disposition cet outil d'autodiagnostic vous permettant de vous évaluer sur ces questions environnementales.",
  "questions" : {
    "SURFACE_NON_TRAITEE": {
      "libelle": "Quelle part de mon exploitation représente la surface non traitée ?",
      "complement_information": "SAU non traitée : parcelle en AB ou conversion, parcelles et bordures n'ayant reçu aucun produit phyto de synthèse en cours de campgane étudiées (hors traitement obligatoires comme flavescence dorée), ZNT et IAE",
      "categorie": "Protection de la vigne",
      "reponses": {
        "0_10POURCENT" : {
          "libelle": "Inférieur ou égal à 10%",
          "point": 1
        },
        "10_20POURCENT" : {
          "libelle": "Entre 10 et 20%",
          "point": 2
        },
        "20_30POURCENT" : {
          "libelle": "Entre 20 et 30%",
          "point": 3
        },
        "30_40POURCENT" : {
          "libelle": "Entre 30 et 40%",
          "point": 4
        },
        "40_50POURCENT" : {
          "libelle": "Entre 40 et 50%",
          "point": 5
        },
        "50_60POURCENT" : {
          "libelle": "Entre 50 et 60%",
          "point": 6
        },
        "60_70POURCENT" : {
          "libelle": "Entre 60 et 70%",
          "point": 7
        },
        "70_80POURCENT" : {
          "libelle": "Entre 70 et 80%",
          "point": 8
        },
        "80_90POURCENT" : {
          "libelle": "Entre 80 et 90%",
          "point": 9
        },
        "90_100POURCENT" : {
          "libelle": "Supérieur à 90%",
          "point": 10
        }
      }
    },
    "IFT_HERBICIDE": {
      "libelle": "Mon IFT herbicides",
      "complement_information": "IFT (Indice de Fréquence de Traitement) comptabilise le nombre de doses de référence appliquées par hectare sur une campagne. Cet indicateur permet d'évaluer la réduction de l'utilisation de produits phytosanitaire. Vous pouvez le calculer à l'aide de l'outil suivant",
      "categorie": "Protection de la vigne",
      "reponses": {
        "1080_SUP" : {
          "libelle": "Supérieur ou égal à 1,08",
          "point": 0
        },
        "0945_1080" : {
          "libelle": "Entre 0,945 et 1,080",
          "point": 1
        },
        "0810_0945" : {
          "libelle": "Entre 0,810 et 0,945",
          "point": 2
        },
        "0675_0810" : {
          "libelle": "Entre 0,675 et 0,810",
          "point": 3
        },
        "0540_0675" : {
          "libelle": "Entre 0,540 et 0,675",
          "point": 4
        },
        "0000_0540" : {
          "libelle": "Inférieur à 0,540",
          "point": 5
        }
      }
    },
    "IFT_HORS_HERBICIDE": {
      "libelle": "Mon IFT hors herbicides",
      "complement_information": "IFT (Indice de Fréquence de Traitement) comptabilise le nombre de doses de référence appliquées par hectare sur une campagne. Cet indicateur permet d'évaluer la réduction de l'utilisation de produits phytosanitaire. Vous pouvez le calcul à l'aide de l'outil suivant. L'IFT Hors Herbicide correspond à la somme des IFT Fongicides, Insecticides-acaricides et Autre. Le Biocontrôle n'est pas pris en compte.",
      "categorie": "Protection de la vigne",
      "reponses": {
        "1089_SUP" : {
          "libelle": "Supérieur ou égal à 10,89",
          "point": 0
        },
        "0953_1089" : {
          "libelle": "Entre 9,53 et 10,89",
          "point": 1
        },
        "0817_0953" : {
          "libelle": "Entre 8,17 et 9,53",
          "point": 2
        },
        "0681_0817" : {
          "libelle": "Entre 6,81 et 8,17",
          "point": 3
        },
        "0545_0681" : {
          "libelle": "Entre 5,45 et 6,81",
          "point": 4
        },
        "0000_0545" : {
          "libelle": "Inférieur à 0,545",
          "point": 5
        }
      }
    },
    "SURFACE_ALTERNATIVE_CHIMIE": {
      "libelle": "Surface sur laquelle j'utilise au moins une méthode alternative à la lutte chimique",
      "complement_information": "Les méthodes physiques (ex: désherbage mécanique) et biologiques sont prises en compte.Voir liste des méthodes",
      "categorie": "Protection de la vigne",
      "reponses": {
        "INF_25POURCENT" : {
          "libelle": "Inférieur à 25%",
          "point": 0
        },
        "25_50POURCENT" : {
          "libelle": "Entre 25 et 50%",
          "point": 1
        },
        "50_75POURCENT" : {
          "libelle": "Entre 50 et 75%",
          "point": 2
        },
        "SUP_75POURCENT" : {
          "libelle": "Supérieur à 75%",
          "point": 3
        }
      }
    },
    "MATERIELS": {
      "libelle": "J'utilise du matériels ou équipements permettant de limiter les fuites vers l'environnement, au-delà des obligations règlementaires ?",
      "complement_information": "Liste des équipements",
      "categorie": "Protection de la vigne",
      "reponses": {
        "NEANT" : {
          "libelle": "Non",
          "point": 0
        },
        "UN" : {
          "libelle": "Oui, un équipement de la liste",
          "point": 1
        },
        "SUP_DEUX" : {
          "libelle": "Oui, au moins deux équipements de la liste",
          "point": 2
        }
      }
    },
    "PLANT_MASSALE": {
      "libelle": "J'utilise des plants issus de sélection massale ?",
      "complement_information": "La sélection massale permet de préserver la diversité génétique, qui au sein d'une même parcelle, concourt à la complexité du vin et assure une complémentarité de la vigne là où une sélection clonage est plus homogène.",
      "categorie": "Protection de la vigne",
      "reponses": {
        "NEANT" : {
          "libelle": "Non",
          "point": 0
        },
        "UN_CLONE" : {
          "libelle": "Oui, 1 clone",
          "point": 2
        },
        "DEUX_CLONE" : {
          "libelle": "Oui, 2 clones",
          "point": 3
        },
        "TROIS_PLUS_CLONE" : {
          "libelle": "Oui, au moins 3 clones",
          "point": 4
        }
      }
    }
  }
};
