# SocialPrompt

Générateur de prompts professionnels pour éducateurs spécialisés en foyer d'hébergement pour adultes en situation de handicap.

## Principe

SocialPrompt ne fait **aucun appel à une API IA**. L'application génère un prompt optimisé à partir d'un formulaire, que l'éducateur copie-colle dans [Claude.ai](https://claude.ai) ou [ChatGPT](https://chatgpt.com).

**Zéro clé API · Zéro backend · Zéro coût · Zéro donnée transmise**

## Fonctionnement

1. L'éducateur remplit le profil du résident (prénom fictif, âge, type de handicap, niveau d'autonomie, mode de communication, axes PPA)
2. Il choisit le type de contenu souhaité
3. L'app génère un prompt professionnel prêt à l'emploi
4. Il copie le prompt en un clic et le colle dans Claude.ai ou ChatGPT

## Types de contenus générés

| Type | Description |
|---|---|
| **Support d'animation** | Activité adaptée avec objectifs éducatifs, matériel, déroulement étape par étape et points de vigilance |
| **Objectifs PPA** | 4 à 5 objectifs SMART pour le Projet Personnalisé d'Accompagnement |
| **Fiche de médiation** | Approche éducative structurée pour aborder un sujet sensible |

## Stack technique

- [Next.js 15](https://nextjs.org/) — App Router, rendu côté client uniquement
- [TypeScript](https://www.typescriptlang.org/) — typage strict
- [Tailwind CSS](https://tailwindcss.com/) — styles utilitaires
- [shadcn/ui](https://ui.shadcn.com/) — composants UI (Radix UI + CVA)
- Déploiement sur [Vercel](https://vercel.com/) (plan gratuit)

## Lancer le projet en local

```bash
# Cloner le dépôt
git clone https://github.com/<votre-compte>/socialprompt.git
cd socialprompt

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'app est disponible sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx        # Layout racine (font, métadonnées)
│   ├── page.tsx          # Page principale (orchestration formulaire ↔ résultat)
│   └── globals.css       # Styles globaux Tailwind + variables shadcn
├── components/
│   ├── ResidentForm.tsx  # Formulaire de saisie du profil résident
│   ├── PromptResult.tsx  # Affichage du prompt généré + bouton copier
│   └── ui/               # Composants shadcn/ui
├── lib/
│   ├── prompts/
│   │   ├── animation.ts  # Générateur — support d'animation
│   │   ├── ppa.ts        # Générateur — objectifs PPA
│   │   ├── mediation.ts  # Générateur — fiche de médiation
│   │   └── index.ts      # Point d'entrée (dispatch selon typeContenu)
│   └── utils.ts          # Utilitaire cn() pour Tailwind
└── types/
    └── index.ts          # Types TypeScript + labels d'affichage
```

## Confidentialité

Aucune donnée saisie dans le formulaire n'est transmise à un serveur. Tout le traitement se fait dans le navigateur. Utilisez un **prénom fictif** — ne saisissez jamais le vrai prénom d'un résident.

## Déploiement Vercel

Voir la section **Déploiement** ci-dessous ou suivre le [guide officiel Vercel pour Next.js](https://vercel.com/docs/frameworks/nextjs).

## Licence

MIT
