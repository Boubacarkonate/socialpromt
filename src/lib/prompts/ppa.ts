import type { ResidentProfile } from "@/types";
import {
  TYPE_HANDICAP_LABELS,
  NIVEAU_AUTONOMIE_LABELS,
  MODE_COMMUNICATION_LABELS,
} from "@/types";

export function generatePPAPrompt(profile: ResidentProfile): string {
  const {
    prenom,
    age,
    typeHandicap,
    niveauAutonomie,
    modeCommunication,
    axesPPA,
    contexte,
  } = profile;

  const ligneContexte = contexte?.trim()
    ? `Éléments contextuels à intégrer : ${contexte.trim()}`
    : "Pas d'élément contextuel particulier.";

  return `Tu es un travailleur social expert en élaboration de Projets Personnalisés d'Accompagnement (PPA) pour adultes en situation de handicap en foyer d'hébergement, en conformité avec les recommandations de bonnes pratiques professionnelles (RBPP) de la HAS et de l'ANESM.

## Profil du résident

- Prénom : ${prenom}
- Âge : ${age} ans
- Type de handicap : ${TYPE_HANDICAP_LABELS[typeHandicap]}
- Niveau d'autonomie : ${NIVEAU_AUTONOMIE_LABELS[niveauAutonomie].toLowerCase()}
- Mode de communication principal : ${MODE_COMMUNICATION_LABELS[modeCommunication]}
- Axes actuels du PPA : ${axesPPA}
- ${ligneContexte}

## Ta mission

Rédige 4 à 5 objectifs opérationnels et mesurables pour le prochain cycle du PPA de ${prenom}. Ces objectifs doivent être directement intégrables dans le document PPA officiel de l'établissement.

## Critères de qualité — cadre SMART appliqué au médico-social

Chaque objectif doit être :
- **Spécifique** : centré sur une compétence ou un comportement précis
- **Mesurable** : avec un indicateur d'observation ou de fréquence
- **Adapté** : réaliste au regard du profil et des capacités de la personne
- **Relevant** : en lien direct avec les axes PPA et le projet de vie
- **Temporel** : avec une échéance suggérée (trimestrielle ou semestrielle)

## Structure attendue pour chaque objectif

**Objectif N°[X] — [Domaine : autonomie / socialisation / communication / santé / loisirs]**
- Formulation : "${prenom} sera en mesure de… / développera… / participera à…"
- Indicateur d'évaluation : [observable, quantifiable]
- Moyens / supports mis en place par l'équipe : [à préciser]
- Échéance : [3 mois / 6 mois]

## Domaines à couvrir en priorité

En cohérence avec les axes PPA indiqués, priorise parmi : autonomie dans les actes de la vie quotidienne, participation sociale, expression et communication, bien-être et santé, activités significatives.

## Consignes de rédaction

- Approche centrée sur la personne (langage positif, valorisation des capacités)
- Vocabulaire professionnel des établissements médico-sociaux français
- Formulations à la troisième personne ou en "la personne…"
- Non stigmatisant, respectueux de la dignité et de l'autodétermination`;
}
