// ─── Enums métier ────────────────────────────────────────────────────────────

export type TypeHandicap =
  | "deficience_intellectuelle_legere"
  | "deficience_intellectuelle_moderee"
  | "handicap_psychique"
  | "polyhandicap_leger";

export type NiveauAutonomie = "faible" | "moyen" | "eleve";

export type ModeCommunication = "verbal" | "non_verbal" | "caa";

// ─── ContentType ─────────────────────────────────────────────────────────────

export type ContentType = "animation" | "ppa" | "mediation";

// ─── Profil résident ─────────────────────────────────────────────────────────

export interface ResidentProfile {
  /** Prénom fictif utilisé dans le prompt — jamais le vrai prénom */
  prenom: string;
  /** Âge en années */
  age: number;
  typeHandicap: TypeHandicap;
  niveauAutonomie: NiveauAutonomie;
  modeCommunication: ModeCommunication;
  /** Axes du PPA en cours — texte libre saisi par l'éducateur */
  axesPPA: string;
  typeContenu: ContentType;
  /** Contexte ou contrainte particulière — champ optionnel */
  contexte?: string;
}

// ─── Prompt généré ───────────────────────────────────────────────────────────

export interface GeneratedPrompt {
  /** Texte du prompt prêt à copier-coller */
  content: string;
  /** Type de contenu à l'origine de la génération */
  contentType: ContentType;
  /** Horodatage de génération (pour éventuels logs côté client) */
  generatedAt: Date;
  /** Nombre de caractères du prompt — indicatif pour l'éducateur */
  charCount: number;
}

// ─── Labels d'affichage ───────────────────────────────────────────────────────
// Centralisés ici pour éviter de dupliquer les libellés dans les composants.

export const TYPE_HANDICAP_LABELS: Record<TypeHandicap, string> = {
  deficience_intellectuelle_legere: "Déficience intellectuelle légère",
  deficience_intellectuelle_moderee: "Déficience intellectuelle modérée",
  handicap_psychique: "Handicap psychique",
  polyhandicap_leger: "Polyhandicap léger",
};

export const NIVEAU_AUTONOMIE_LABELS: Record<NiveauAutonomie, string> = {
  faible: "Faible",
  moyen: "Moyen",
  eleve: "Élevé",
};

export const MODE_COMMUNICATION_LABELS: Record<ModeCommunication, string> = {
  verbal: "Verbal",
  non_verbal: "Non verbal",
  caa: "Communication Augmentée et Alternative (CAA)",
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  animation: "Support d'animation",
  ppa: "Objectifs PPA",
  mediation: "Fiche de médiation",
};

export const CONTENT_TYPE_DESCRIPTIONS: Record<ContentType, string> = {
  animation:
    "Activité adaptée avec objectifs, déroulement étape par étape et points de vigilance",
  ppa: "3 à 5 objectifs opérationnels et mesurables pour le Projet Personnalisé d'Accompagnement",
  mediation:
    "Approche éducative structurée pour aborder un sujet sensible avec la personne accompagnée",
};
