var questionnaire = {
  "libelle": "Autodiagnostic Développement Durable",
  "complement_information": "Afin de vous faire une idée du positionnement de votre exploitation en terme d'environnement et de développement durable dans le vignoble, le BIVC met à disposition cet outil d'autodiagnostic vous permettant de vous évaluer sur ces questions environnementales.",
  "questions": [
{
      "type": "categorie",
      "id": "INFORMATIONS",
      "libelle": "Informations générales",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#d3ba9b",
      "opacite": "#e6d4bc",
      "couleur_texte": "#fff"
    },
    {
      "type": "question",
      "id": "SURFACE_EXPLOITATION",
      "libelle": "Quelle est la surface de votre exploitation ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "APPELLATIONS",
      "libelle": "Vous produisez en",
      "multiple": true,
      "reponses": [
        {
          "id": "SANCERRE",
          "libelle": "AOC Sancerre"
        },
        {
          "id": "POUILLY_FUME",
          "libelle": "AOC Pouilly-Fumé"
        },
        {
          "id": "MENETOU_SALON",
          "libelle": "AOC Menetou-Salon"
        },
        {
          "id": "QUINCY",
          "libelle": "AOC Quincy"
        },
        {
          "id": "REUILLY",
          "libelle": "AOC Reuilly"
        },
        {
          "id": "COT_GIENNOIS",
          "libelle": "AOC Coteaux du Giennois"
        },
        {
          "id": "CHATEAUMEILLANT",
          "libelle": "AOC Châteaumeillant"
        },
        {
          "id": "COTES_CHARITE",
          "libelle": "IGP Côtes de la Charité"
        },
        {
          "id": "COT_TANNAY",
          "libelle": "IGP Coteaux de Tannay"
        }
      ]
    },
    {
      "type": "question",
      "id": "SURFACE_SANCERRE",
      "libelle": "Quelle est la surface d'AOC Sancerre ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "SURFACE_POUILLY_FUME",
      "libelle": "Quelle est la surface d'AOC Pouilly-Fumé ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "SURFACE_MENETOU_SALON",
      "libelle": "Quelle est la surface d'AOC Menetou-Salon ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "SURFACE_QUINCY",
      "libelle": "Quelle est la surface d'AOC Quincy ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "SURFACE_REUILLY",
      "libelle": "Quelle est la surface d'AOC Reuilly ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "SURFACE_COT_GIENNOIS",
      "libelle": "Quelle est la surface d'AOC Coteaux du Giennois ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "SURFACE_CHATEAUMEILLANT",
      "libelle": "Quelle est la surface d'AOC Châteaumeillant ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "SURFACE_COTES_CHARITE",
      "libelle": "Quelle est la surface d'IGP Côtes de la Charité ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "SURFACE_COT_TANNAY",
      "libelle": "Quelle est la surface d'IGP Coteaux de Tannay ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "VENTE_RECOLTE_RAISIN",
      "libelle": "Vendez-vous l'intégralité de votre récolte en raisin ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ]
    },
    {
      "type": "categorie",
      "id": "CERTIFICATION",
      "libelle": "Certification",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#bb0001",
      "opacite": "#fd5b5b",
      "couleur_texte": "#fff"
    },
    {
      "type": "question",
      "id": "SELECTION_CERTIF",
      "libelle": "Quelles sont vos certifications actuelles ?",
      "complement_information": "En fonction de vos choix, certaines des réponses seront préremplies.",
      "multiple": true,
      "reponses": [
        {
          "id": "BIO_CONVERSION",
          "libelle": "En conversion vers AB",
          "reponses_automatiques": {
            "SURFACE_NON_TRAITEE": 100,
            "DESHERBAGE_CHIMIQUE": "NON",
            "SURFACE_SANS_HERBICIDE": 100,
            "PRODUITS_CMR": 0,
            "INSECTICIDES_NON_AB": 0,
            "ANTI_BROTRYTIS": 0
          }
        },
        {
          "id": "BIO",
          "libelle": "AB",
          "reponses_automatiques": {
            "SURFACE_NON_TRAITEE": 100,
            "DESHERBAGE_CHIMIQUE": "NON",
            "SURFACE_SANS_HERBICIDE": 100,
            "PRODUITS_CMR": 0,
            "INSECTICIDES_NON_AB": 0,
            "ANTI_BROTRYTIS": 0
          }
        },
        {
          "id": "HVE",
          "libelle": "HVE3"
        },
        {
          "id": "TERRAVITIS",
          "libelle": "Terra vitis"
        },
        {
          "id": "DEMETER",
          "libelle": "Demeter",
          "reponses_automatiques": {
            "SURFACE_NON_TRAITEE": 100,
            "DESHERBAGE_CHIMIQUE": "NON",
            "SURFACE_SANS_HERBICIDE": 100,
            "PRODUITS_CMR": 0,
            "INSECTICIDES_NON_AB": 0,
            "ANTI_BROTRYTIS": 0
          }
        },
        {
          "id": "BIODYVIN",
          "libelle": "Biodyvin",
          "reponses_automatiques": {
            "SURFACE_NON_TRAITEE": 100,
            "DESHERBAGE_CHIMIQUE": "NON",
            "SURFACE_SANS_HERBICIDE": 100,
            "PRODUITS_CMR": 0,
            "INSECTICIDES_NON_AB": 0,
            "ANTI_BROTRYTIS": 0
          }
        }
      ]
    },
    {
      "type": "question",
      "id": "SELECTION_SANS_CERTIF",
      "libelle": "Même sans être certifié, suivez-vous un ou plusieurs de ces cahiers des charges ?",
      "multiple": true,
      "reponses": [
        {
          "id": "BIO",
          "libelle": "AB"
        },
        {
          "id": "HVE",
          "libelle": "HVE3"
        },
        {
          "id": "TERRAVITIS",
          "libelle": "Terra vitis"
        },
        {
          "id": "DEMETER",
          "libelle": "Demeter"
        },
        {
          "id": "BIODYVIN",
          "libelle": "Biodyvin"
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
      "complement_information": "SAU = surface agricole utile = 1 action agricole par an / SAU non traitée = parcelle(s) en AB ou conversion, parcelles n'ayant reçu aucun produit phyto de synthèse en cours de campgane étudiées (hors traitement obligatoires comme flavescence dorée), prairie permanente paturée ou fauchée, surface non plantée, ...",
      "unite": "%"
    },
    {
      "type": "question",
      "id": "SURFACE_ALTERNATIVE_CHIMIE",
      "libelle": "Sur quel pourcentage de votre surface utilisez-vous au moins une méthode alternative à la lutte chimique ?",
      "complement_information": "Liste des principales méthodes alternatives en viticulture : désherbage mécanique, épamprage manuel ou mécanique, tonte de l’enherbement permanent, confusion sexuelle",
      "unite": "%"
    },
    {
      "type": "question",
      "id": "MATERIELS",
      "libelle": "Utilisez vous un ou plusieurs matériels ou équipements de la liste ci-contre permettant de limiter les fuites vers l'environnement au-delà des obligations règlementaires ?",
      "complement_information": "cocher le ou les matériels utilisés sur l'exploitation",
      "multiple": true,
      "reponses": [
        {
          "id": "AMENAGEMENT",
          "libelle": "Aménagement de l’aire de remplissage et de lavage étanche avec système de récupération de débordements accidentels"
        },
        {
          "id": "POTENCE",
          "libelle": "Potence, réserve d’eau surélevée"
        },
        {
          "id": "RETENTION",
          "libelle": "Plateau de stockage avec bac de rétention pour le local phytosanitaire"
        },
        {
          "id": "PAILLASSE",
          "libelle": "Aménagement d’une paillasse ou plate-forme stable pour préparer les bouillies, matériel de pesée et outils de dosage"
        },
        {
          "id": "COLLECTE",
          "libelle": "Réserves de collecte des eaux de pluie et réseau correspondant (équipements à l’échelle des bâtiments de l’exploitation)"
        },
        {
          "id": "VOLUCOMPTEUR",
          "libelle": "Volucompteur programmable pour éviter le débordement des cuves"
        },
        {
          "id": "ANTIGOUTTES",
          "libelle": "Système anti-gouttes (à la rampe pour la régularité de la pulvérisation)|Panneaux récupérateurs de bouillie"
        },
        {
          "id": "PRECISION",
          "libelle": "Matériel de précision permettant de réduire les doses de produits phytosanitaires (traitement face par face)"
        },
        {
          "id": "RINCAGE",
          "libelle": "Cuve de rinçage embarquée sur le pulvérisateur (ou sur le tracteur) avec kit de rinçage intérieur des cuves ou kit d’automisation de rinçage des cuves"
        }
      ],
      "notation": {
        "EQ": {
          "AMENAGEMENT": {
            "score": 1
          },
          "POTENCE": {
            "score": 1
          },
          "RETENTION": {
            "score": 1
          },
          "PAILLASSE": {
            "score": 1
          },
          "COLLECTE": {
            "score": 1
          },
          "VOLUCOMPTEUR": {
            "score": 1
          },
          "ANTIGOUTTES": {
            "score": 1
          },
          "PRECISION": {
            "score": 1
          },
          "RINCAGE": {
            "score": 1
          }
        }
      }
    },
    {
      "type": "question",
      "id": "IFT_HERBICIDE",
      "libelle": "Quel est votre IFT herbicides ?",
      "complement_information": "IFT (Indice de Fréquence de Traitement) comptabilise le nombre de doses de référence appliquées par hectare sur une campagne. Cet indicateur permet d'évaluer la réduction de l'utilisation de produits phytosanitaire. Vous pouvez le calculer à l'aide de l'outil suivant",
      "notation": {
        "GTE": {
          "1.08": {
            "score": 0
          },
          "0.945": {
            "score": 2
          },
          "0.81": {
            "score": 4
          },
          "0.675": {
            "score": 6
          },
          "0.54": {
            "score": 8
          },
          "0.00": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "IFT_HORS_HERBICIDE",
      "libelle": "Quel est votre IFT hors herbicides ?",
      "complement_information": "IFT (Indice de Fréquence de Traitement) comptabilise le nombre de doses de référence appliquées par hectare sur une campagne. Cet indicateur permet d'évaluer la réduction de l'utilisation de produits phytosanitaire. L'IFT Hors Herbicides correspond à la somme des IFT Fongicides, Insecticides-acaricides et Autre. Les produits de Biocontrôle n'entrent pas dans le calcul de l'IFT",
      "notation": {
        "GTE": {
          "10.89": {
            "score": 0
          },
          "9.53": {
            "score": 2
          },
          "8.17": {
            "score": 4
          },
          "6.81": {
            "score": 6
          },
          "5.45": {
            "score": 8
          },
          "0.00": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "DESHERBAGE_CHIMIQUE",
      "libelle": "Utilisez-vous du désherbage chimique sur votre exploitation ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        },
        {
          "id": "PENTES",
          "libelle": "Uniquement sur les pentes d'au moins 40% de dénivelé"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 0
          },
          "NON": {
            "score": 2
          },
          "PENTES": {
            "score": 2
          }
        }
      }
    },
    {
      "type": "question",
      "id": "SURFACE_SANS_HERBICIDE",
      "libelle": "Quel est le pourcentage de vos surfaces sans aucun herbicide cette année ?",
      "unite": "%",
      "notation": {
        "LTE": {
          "10": {
            "score": 1
          },
          "20": {
            "score": 2
          },
          "30": {
            "score": 3
          },
          "40": {
            "score": 4
          },
          "50": {
            "score": 5
          },
          "60": {
            "score": 6
          },
          "70": {
            "score": 7
          },
          "80": {
            "score": 8
          },
          "90": {
            "score": 9
          },
          "100": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "PASSAGE_OUTILS_HORS_HERBICIDES",
      "libelle": "Sur ces parcelles sans herbicides, combien de passages d'outils avez-vous fait hors tonte ?"
    },
    {
      "type": "question",
      "id": "PASSAGE_OUTILS_HERBICIDES",
      "libelle": "Sur les parcelles ayant reçu un ou plusieurs herbicides, combien de passages d'outils avez-vous fait (hors tonte) ?"
    },
    {
      "type": "question",
      "id": "DESHERBAGE_CHIMIQUE_AVANT_PRODUCTION",
      "libelle": "Utilisez vous du désherbage chimique avant l’entrée en production ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 0
          },
          "NON": {
            "score": 5
          }
        }
      }
    },
    {
      "type": "question",
      "id": "DESHERBAGE_SUP_MOITIE_PARCELLES",
      "libelle": "Désherbez-vous plus de 50% de la surface d'une ou plusieurs de vos parcelles ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 0
          },
          "NON": {
            "score": 5
          }
        }
      }
    },
    {
      "type": "question",
      "id": "DESHERBAGE_CHIMIQUE_VERAISON",
      "libelle": "Utilisez-vous du désherbage chimique entre la véraison et le mois de février ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": -5
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "PRODUITS_CMR",
      "libelle": "Combien de CMR avez-vous utilisés sur la campagne ?",
      "complement_information": "CMR = produit cancérigène, mutagène et/ou reprotoxique. Se référer à l'index phytosanitaire SICAVAC ou l'étiquette du produit",
      "notation": {
        "GTE": {
          "3": {
            "score": -5
          },
          "2": {
            "score": -2
          },
          "1": {
            "score": 0
          },
          "0": {
            "score": 1
          }
        }
      }
    },
    {
      "type": "question",
      "id": "INSECTICIDES_NON_AB",
      "libelle": "Combien d’insecticides non autorisés en AB avez-vous utilisés sur la campagne, hors traitements obligatoires ?",
      "notation": {
        "GTE": {
          "3": {
            "score": 3
          },
          "1": {
            "score": 5
          },
          "0": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "INSECTICIDES_AB",
      "libelle": "Combien d’insecticides autorisés en AB avez-vous utilisés sur la campagne, hors traitements obligatoires ?"
    },
    {
      "type": "question",
      "id": "SURFACE_RAKS",
      "libelle": "Sur quelle surface en ha avez-vous mis en place des Raks ou Puffer cette année ?",
      "unite": "ha"
    },
    {
      "type": "question",
      "id": "DATE_PREMIER_MILDIOU",
      "libelle": "Quelle est la date de votre premier traitement mildiou ?"
    },
    {
      "type": "question",
      "id": "DATE_DERNIER_MILDIOU",
      "libelle": "Quelle est la date de votre dernier traitement mildiou ? (hors plantes pas encore en production)"
    },
    {
      "type": "question",
      "id": "PASSAGES_MILDIOU",
      "libelle": "Sur une parcelle représentative de votre domaine, combien avez-vous fait de passages contre le mildiou ?"
    },
    {
      "type": "question",
      "id": "SUPPLEMENT_MILDIOU",
      "libelle": "Combien de traitements mildiou supplémentaires avez-vous fait sur ces parcelles ?"
    },
    {
      "type": "question",
      "id": "CUIVRE",
      "libelle": "En bio ou en conventionnel : quelle quantité de cuivre avez-vous utilisé cette année ?",
      "unite": "kg"
    },
    {
      "type": "question",
      "id": "PASSAGE_OIDIUM",
      "libelle": "Sur une parcelle représentative de votre domaine, combien avez-vous fait de passages contre l'oïdium ?"
    },
    {
      "type": "question",
      "id": "SUPPLEMENT_OIDIUM",
      "libelle": "Combien de traitements oïdium supplémentaires avez-vous fait sur ces parcelles ?"
    },
    {
      "type": "question",
      "id": "POUDRAGE",
      "libelle": "Avez-vous fait des poudrages ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ]
    },
    {
      "type": "question",
      "id": "ANTI_BROTRYTIS",
      "libelle": "Combien d’applications d'antibotrytis (hors biocontrôle) avez vous réalisées sur la campagne ?",
      "notation": {
        "GTE": {
          "1": {
            "score": -5
          },
          "0": {
            "score": 0
          },
          "-1": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "STADE_ANTI_BROTRYTIS",
      "libelle": "A quel stade avez-vous réalisé ces applications d'antibotrytis (hors biocontrôle) ?",
      "reponses": [
        {
          "id": "A",
          "libelle": "A"
        },
        {
          "id": "B",
          "libelle": "B"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "A": {
            "score": 0
          },
          "B": {
            "score": 0
          },
          "AUTRE": {
            "score": -5
          }
        }
      }
    },
    {
      "type": "question",
      "id": "CLONES",
      "libelle": "Quel nombre de clones différents utilisez-vous ?",
      "reponses": [
        {
          "id": 0,
          "libelle": 0
        },
        {
          "id": 1,
          "libelle": 1
        },
        {
          "id": 2,
          "libelle": 2
        },
        {
          "id": "3_PLUS",
          "libelle": "3 ou plus"
        }
      ]
    },
    {
      "type": "question",
      "id": "REMPLACEMENT_SAUVIGNON",
      "libelle": "Combien de pieds avez-vous remplacés sur cette campagne en sauvignon (nombre total) ?",
      "complement_information": "Comptabilisez vos complantations réalisées sur l'automne et le printemps précédant la campagne étudiée."
    },
    {
      "type": "question",
      "id": "CURETAGE",
      "libelle": "Pratiquez vous le curetage sur votre domaine ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        },
        {
          "id": "ESSAI",
          "libelle": "Oui en essai"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ]
    },
    {
      "type": "question",
      "id": "CURETAGE_SAUVIGNON",
      "libelle": "Sur la dernière campagne, quel pourcentage de votre surface en Sauvignon avez-vous cureté ?",
      "unite": "%"
    },
    {
      "type": "categorie",
      "id": "FERTILISATION",
      "libelle": "Fertilisation",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#f98901",
      "opacite": "#ff9d01",
      "couleur_texte": "#fff"
    },
    {
      "type": "question",
      "id": "BILAN_AZOTE",
      "libelle": "Quel est votre bilan azoté global ?",
      "unite": "kg N/ha",
      "notation": {
        "GTE": {
          "60": {
            "score": 0
          },
          "40": {
            "score": 10
          },
          "0": {
            "score": 20
          }
        }
      }
    },
    {
      "type": "question",
      "id": "AZOTE_ORGANIQUE",
      "libelle": "Utilisez-vous exclusivement de l’azote 100% organique ?",
      "complement_information": "Attention, certains engrais organo-minéraux contiennent de l'azote chimique. Se référer à la fiche SICAVAC sur le lien suivant",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 20
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "UNITE_AZOTE",
      "libelle": "Combien d’unités d’azote chimique avez-vous utilisé sur la campagne ?",
      "unite": "N/ha",
      "notation": {
        "GTE": {
          "15": {
            "score": -5
          },
          "0": {
            "score": 0
          }
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
      "id": "POURCENTAGE_SAU_IAE",
      "libelle": "Quel pourcentage de votre SAU est dédié à des infrastructures agro-écologiques (IAE) sur l’exploitation ?",
      "unite": "%",
      "notation": {
        "LTE": {
          "10": {
            "score": 1
          },
          "20": {
            "score": 2
          },
          "30": {
            "score": 3
          },
          "40": {
            "score": 4
          },
          "50": {
            "score": 5
          },
          "60": {
            "score": 6
          },
          "70": {
            "score": 7
          },
          "80": {
            "score": 8
          },
          "90": {
            "score": 9
          },
          "100": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "POSSESSION_RUCHES",
      "libelle": "Disposez-vous d’une ou plusieurs ruches dont vous êtes propriétaire ?",
      "complement_information": "La ou les ruches doivent être sédentaires et en bon état de fonctionnement.",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 1
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "DESHERBAGE_CHIMIQUE_AUTOMNE",
      "libelle": "Pratiquez vous un desherbage chimique ou mécanique à l'automne sur au moins une partie de votre exploitation ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 0
          },
          "NON": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "POURCENTAGE_COUVERT_VEGETAL",
      "libelle": "Sur quel pourcentage de vos surfaces conservez vous un couvert végétal ?",
      "unite": "%",
      "notation": {
        "LTE": {
          "10": {
            "score": 1
          },
          "20": {
            "score": 2
          },
          "30": {
            "score": 3
          },
          "40": {
            "score": 4
          },
          "50": {
            "score": 5
          },
          "60": {
            "score": 6
          },
          "70": {
            "score": 7
          },
          "80": {
            "score": 8
          },
          "90": {
            "score": 9
          },
          "100": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "categorie",
      "id": "EAU",
      "libelle": "Gestion de l'eau",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#3498db",
      "opacite": "#8dc1e4",
      "couleur_texte": "#fff"
    },
    {
      "type": "question",
      "id": "RECUPERATION_EAU",
      "libelle": "Avez-vous un système de récupération des eaux de pluie ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 10
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "ECONOMIE_EAU",
      "libelle": "Avez-vous un ou plusieurs systèmes permettant une économie d'eau, et le cas échéant, le(s)quel(s) ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ]
    },
    {
      "type": "categorie",
      "id": "PLASTIQUE",
      "libelle": "Zéro plastique",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#babab8",
      "opacite": "#d1d1d1",
      "couleur_texte": "#fff"
    },
    {
      "type": "question",
      "id": "POT_PLASTIQUE",
      "libelle": "Achetez-vous encore des plants de vigne en pot en plastique ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 10
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "MANCHONS_PLASTIQUE",
      "libelle": "Achetez-vous encore des manchons en plastique ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 10
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "AGRAPHES_PLASTIQUE",
      "libelle": "Achetez-vous encore des agrafes en plastique ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 5
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "POTEAUX_PLASTIQUE",
      "libelle": "Achetez-vous encore des poteaux en PVC ou Tetrapack ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 5
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "LIENS_PLASTIQUE",
      "libelle": "Achetez-vous encore des liens d'accolage en plastique ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 10
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "MARQUEUR_PLASTIQUE",
      "libelle": "Utilisez-vous encore des éléments en plastique pour marquer vos poteaux (manchons, bouchons, ...) ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 5
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "TUTEURS_PLASTIQUE",
      "libelle": "Achetez-vous encore des tuteurs en plastique ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 10
          },
          "NON": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "categorie",
      "id": "RECYCLAGE",
      "libelle": "Recyclage et gestion des déchets",
      "complement_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus varius ligula vitae fermentum. Etiam ac dolor tempus, vestibulum ante eget, mollis urna. Fusce sit amet velit cursus turpis fringilla blandit. Pellentesque eu ipsum urna.",
      "couleur": "#2ecc71",
      "opacite": "#8adbaf",
      "couleur_texte": "#fff"
    },
    {
      "type": "question",
      "id": "QUOI_RAKS_USAGES",
      "libelle": "Que faites vous des Raks usagés ?",
      "reponses": [
        {
          "id": "PARTENAIRE",
          "libelle": "Je les élimine via mon distributeur partenaire A.DI.VALOR"
        },
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "PARCELLE",
          "libelle": "Je les laisse dans la parcelle"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "PARTENAIRE": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_EMBALLAGES_PHYTO",
      "libelle": "Que faites vous des emballages vides de produits phytopharmaceutiques ?",
      "reponses": [
        {
          "id": "PARTENAIRE",
          "libelle": "Je les élimine via mon distributeur partenaire A.DI.VALOR"
        },
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "PARTENAIRE": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_FILMS_LIENS_BOUTEILLES",
      "libelle": "Que faites vous des films étirables à palettes, des liens à cartons et bouteilles ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          },
          "STOCK": {
            "score": 0
          },
          "AUTRE": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_EMBALLAGES_INTRANTS",
      "libelle": "Que faites vous des emballages vides d'intrants oenologiques : sucre, tartre, levure, Kieselguhr ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_EMBALLAGES_OENO",
      "libelle": "Que faites vous des emballages vides de produits oenologiques et de produits d'hygiène de cave ?",
      "reponses": [
        {
          "id": "PARTENAIRE",
          "libelle": "Je les élimine via mon distributeur partenaire A.DI.VALOR"
        },
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "PARTENAIRE": {
            "score": 10
          },
          "DECHETTERIE": {
            "score": 0
          },
          "STOCK": {
            "score": 0
          },
          "AUTRE": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_POTEAUX_PLASTIQUE",
      "libelle": "Que faites vous des poteaux PVC ou Tetrapack ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          },
          "STOCK": {
            "score": 5
          },
          "AUTRE": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_AGRAFES",
      "libelle": "Que faites vous des agrafes en plastique ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          },
          "STOCK": {
            "score": 5
          },
          "AUTRE": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_MANCHONS",
      "libelle": "Que faites vous des manchons en plastique ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          },
          "STOCK": {
            "score": 5
          },
          "AUTRE": {
            "score": 0
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_SARMENTS",
      "libelle": "Que faites vous des sarments ?",
      "reponses": [
        {
          "id": "BRULAGE",
          "libelle": "Brûlage"
        },
        {
          "id": "VALORISATION",
          "libelle": "Valorisation énergétique"
        },
        {
          "id": "BROYAGE",
          "libelle": "Broyage et retour à la parcelle"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "VALORISATION": {
            "score": 5
          },
          "BRULAGE": {
            "score": 5
          },
          "BROYAGE": {
            "score": 5
          },
          "AUTRE": {
            "score": 5
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_PALETTES",
      "libelle": "Que faites vous des palettes ?",
      "reponses": [
        {
          "id": "REPRISE",
          "libelle": "Reprise par le fournisseur"
        },
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "REUTILISATION",
          "libelle": "Réutilisation"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "REPRISE": {
            "score": 10
          },
          "DECHETTERIE": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_CARTONS",
      "libelle": "Que faites vous des cartons usagés ou inutilisables ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "BRULAGE",
          "libelle": "Je les brûle"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          },
          "STOCK": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_POTEAUX_METAL",
      "libelle": "Que faites vous des poteaux en métal ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie ou au recycleur"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          },
          "STOCK": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_FIL_METAL",
      "libelle": "Que faites vous du fil à vigne en métal ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie ou au recycleur"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_BOUTEILLES",
      "libelle": "Que faites vous des bouteilles vides usagées ?",
      "reponses": [
        {
          "id": "CONTENEUR",
          "libelle": "Je les dépose en conteneur à verre"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "CONTENEUR": {
            "score": 10
          },
          "STOCK": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_VAISSELLE",
      "libelle": "Que faites vous des verres de dégustation et autre vaisselle en verre déterioriés ou inutilisables ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "CONTENEUR",
          "libelle": "Je les dépose en conteneur à verre"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_TUTEURS",
      "libelle": "Que faites vous des tuteurs en fibre de verre ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_HUILE",
      "libelle": "Que faites vous des huiles usagées ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "GARAGISTE",
          "libelle": "Je les dépose chez un garagiste ou concessionnaire automobile"
        },
        {
          "id": "COLLECTEUR",
          "libelle": "Je les dépose chez un collecteur agréé"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "EAUX_USEES",
          "libelle": "Je les rejette dans les eaux usées"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "GARAGISTE": {
            "score": 10
          },
          "DECHETTERIE": {
            "score": 10
          },
          "COLLECTEUR": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "QUOI_BATTERIES",
      "libelle": "Que faites vous des batteries usagées ?",
      "reponses": [
        {
          "id": "DECHETTERIE",
          "libelle": "Je les dépose en déchetterie"
        },
        {
          "id": "DISTRIBUTEUR",
          "libelle": "Je les dépose chez mon distributeur"
        },
        {
          "id": "STOCK",
          "libelle": "Je les stocke"
        },
        {
          "id": "AUTRE",
          "libelle": "Autre"
        }
      ],
      "notation": {
        "EQ": {
          "DECHETTERIE": {
            "score": 10
          },
          "DISTRIBUTEUR": {
            "score": 10
          }
        }
      }
    },
    {
      "type": "question",
      "id": "RAPPEL_EQUIPE_DECHETS",
      "libelle": "Rappelez-vous à vos équipes de ne pas jeter leurs déchets sur le terrain ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 10
          },
          "NON": {
            "score": -5
          }
        }
      }
    },
    {
      "type": "question",
      "id": "MISE_A_DISPO_EQUIPE",
      "libelle": "Mettez-vous à disposition des sacs poubelles à vos équipes sur le terrain ?",
      "reponses": [
        {
          "id": "OUI",
          "libelle": "Oui"
        },
        {
          "id": "NON",
          "libelle": "Non"
        }
      ],
      "notation": {
        "EQ": {
          "OUI": {
            "score": 10
          },
          "NON": {
            "score": -5
          }
        }
      }
    }
  ]
};
