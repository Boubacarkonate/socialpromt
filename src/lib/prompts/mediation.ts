import type { ResidentProfile } from "@/types";
import {
  TYPE_HANDICAP_LABELS,
  NIVEAU_AUTONOMIE_LABELS,
  MODE_COMMUNICATION_LABELS,
} from "@/types";

export function generateMediationPrompt(profile: ResidentProfile): string {
  const {
    prenom,
    age,
    typeHandicap,
    niveauAutonomie,
    modeCommunication,
    axesPPA,
    contexte,
  } = profile;

  const ligneSujet = contexte?.trim()
    ? `Sujet ou situation à aborder : ${contexte.trim()}`
    : "Sujet ou situation à aborder : [non précisé — proposer une approche générique adaptée au profil]";

  return `Tu es un éducateur spécialisé et formateur en pratiques éducatives adaptées, expert en approche de médiation pour adultes en situation de handicap en foyer d'hébergement.

## Profil du résident concerné

- Prénom : ${prenom}
- Âge : ${age} ans
- Type de handicap : ${TYPE_HANDICAP_LABELS[typeHandicap]}
- Niveau d'autonomie : ${NIVEAU_AUTONOMIE_LABELS[niveauAutonomie].toLowerCase()}
- Mode de communication principal : ${MODE_COMMUNICATION_LABELS[modeCommunication]}
- Axes du PPA en cours : ${axesPPA}
- ${ligneSujet}

## Ta mission

Rédige une fiche de médiation éducative complète pour accompagner ${prenom} sur ce sujet. Cette fiche doit permettre à un professionnel de conduire un entretien ou une séquence éducative structurée, en respectant le rythme et les capacités de compréhension de la personne.

## Structure attendue

### 1. Analyse préalable
- Pourquoi ce sujet est-il important pour ${prenom} au regard de son profil et de ses axes PPA ?
- Quels sont les enjeux éducatifs et les risques à anticiper ?
- Quel cadre éthique respecter (consentement, dignité, autodétermination) ?

### 2. Objectifs de la médiation
- Objectif principal (ce que la personne doit comprendre ou être en mesure de faire à l'issue)
- Objectifs secondaires (habiletés sociales, régulation émotionnelle, verbalisation…)

### 3. Posture éducative recommandée
- Approche non-directive ou directive selon le contexte
- Signaux d'alerte (agitation, repli, incompréhension) et ajustements à prévoir
- Positionnement de l'éducateur (bienveillance, neutralité, étayage)

### 4. Déroulement de la séquence
- **Accroche** : comment introduire le sujet sans brusquer
- **Exploration** : questions ouvertes, supports visuels si nécessaire, reformulations
- **Apport éducatif** : informations ou règles à transmettre, adaptées au niveau de compréhension
- **Consolidation** : vérification de la compréhension, expression des ressentis
- **Clôture** : rituel de fin, réassurance, suite éventuelle

### 5. Supports et outils adaptés
- Matériel recommandé (pictogrammes, images, livrets FALC si pertinent)
- Adaptations spécifiques au mode de communication : ${MODE_COMMUNICATION_LABELS[modeCommunication]}

### 6. Trace écrite et suivi
- Éléments à noter dans le dossier de l'usager
- Indicateurs permettant d'évaluer l'efficacité de la médiation
- Préconisations pour la suite de l'accompagnement

## Consignes de rédaction

- Approche éthique centrée sur la personne et son autodétermination
- Vocabulaire professionnel du travail social et de l'éducation spécialisée
- Formulations non stigmatisantes, respectueuses de la dignité
- Langage accessible dans les parties destinées à la communication directe avec ${prenom}
- Conformité avec les RBPP HAS pertinentes selon le sujet abordé`;
}
