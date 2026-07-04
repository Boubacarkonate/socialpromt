import type { ResidentProfile } from "@/types";
import {
  TYPE_HANDICAP_LABELS,
  NIVEAU_AUTONOMIE_LABELS,
  MODE_COMMUNICATION_LABELS,
} from "@/types";

export function generateAnimationPrompt(profile: ResidentProfile): string {
  const {
    prenom,
    age,
    typeHandicap,
    niveauAutonomie,
    modeCommunication,
    axesPPA,
    contexte,
  } = profile;

  const ligneContrainte = contexte?.trim()
    ? `Contraintes et contexte particulier : ${contexte.trim()}`
    : "Aucune contrainte particulière signalée.";

  return `Tu es un éducateur spécialisé expert en animation thérapeutique et éducative en foyer d'hébergement pour adultes en situation de handicap.

## Profil du résident

- Prénom : ${prenom}
- Âge : ${age} ans
- Type de handicap : ${TYPE_HANDICAP_LABELS[typeHandicap]}
- Niveau d'autonomie : ${NIVEAU_AUTONOMIE_LABELS[niveauAutonomie].toLowerCase()}
- Mode de communication principal : ${MODE_COMMUNICATION_LABELS[modeCommunication]}
- Axes du Projet Personnalisé d'Accompagnement (PPA) en cours : ${axesPPA}
- ${ligneContrainte}

## Ta mission

Propose un support d'animation complet et adapté à ce profil. Le document doit être directement utilisable par un professionnel du secteur médico-social français.

## Structure attendue

1. **Titre de l'activité** — intitulé clair et non stigmatisant
2. **Objectifs éducatifs** — 3 à 5 objectifs opérationnels en lien avec les axes PPA
3. **Durée et cadre** — durée recommandée, taille de groupe, lieu
4. **Matériel nécessaire** — liste précise et accessible
5. **Déroulement étape par étape** — mise en route / cœur de l'activité / clôture
6. **Adaptations spécifiques** — ajustements selon le niveau d'autonomie et le mode de communication
7. **Points de vigilance** — signaux de fatigue ou d'inconfort, gestion des situations difficiles
8. **Indicateurs d'évaluation** — comment mesurer la participation et les progrès

## Consignes de rédaction

- Vocabulaire professionnel du secteur médico-social français (référentiels HAS / RBPP)
- Registre neutre, bienveillant, non stigmatisant, centré sur les capacités
- Formulations positives et orientées compétences ("la personne peut…", "on favorise…")
- Pas de jargon médical superflu`;
}
