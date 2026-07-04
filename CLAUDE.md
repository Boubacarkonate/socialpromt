# SocialPrompt — CLAUDE.md

## Identité du projet
App Next.js pour éducateurs spécialisés en foyer d'hébergement pour adultes en situation de handicap (déficience intellectuelle, handicap psychique, polyhandicap léger).

**Principe :** génère un prompt professionnel à partir d'un formulaire. L'éducateur le copie-colle dans Claude.ai ou ChatGPT. Zéro API, zéro backend, zéro coût.

**Auteur :** Boubacar Konaté — éducateur spécialisé reconverti développeur web. Projet MVP de portfolio.

---

## Stack
- **Next.js 15.3.4** · App Router · `"use client"` sur les pages/composants interactifs
- **React 19** · TypeScript strict
- **Tailwind CSS 3** · variables CSS shadcn dans `globals.css` + `tailwind.config.ts`
- **shadcn/ui** — composants écrits manuellement dans `src/components/ui/` (pas via CLI shadcn)
- **Radix UI** — `@radix-ui/react-label`, `react-select`, `react-radio-group`, `react-slot`
- **lucide-react** — icônes dans les composants shadcn
- Pas de backend, pas de base de données, pas de variables d'environnement

---

## Particularités machine (poste de développement)

> ⚠️ À relire avant tout `npm install` ou démarrage du serveur.

- **Proxy SSL** : le réseau intercepte les certificats → `npm config set strict-ssl false` obligatoire
- **Google Fonts bloquées** : `next/font/google` échoue → police système `font-sans antialiased` dans `layout.tsx`
- **Node.js** : v22.16.0 en PowerShell interactif, mais les process background peuvent hériter d'un PATH pointant vers Node 18 → toujours préfixer : `$env:PATH = "C:\Program Files\nodejs;" + $env:PATH`
- **Port** : 3000 souvent occupé → Next.js bascule sur 3001 automatiquement

---

## Lancer le projet

```powershell
cd C:\Users\bbs8\socialprompt
npm run dev
# → http://localhost:3001 (ou 3000 si libre)
```

### Premier lancement sur une nouvelle machine
```powershell
npm config set strict-ssl false
npm install
npm run dev
```

---

## Arborescence complète

```
socialprompt/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout racine — font-sans, suppressHydrationWarning, métadonnées SEO
│   │   ├── page.tsx            # Page principale — orchestration formulaire ↔ résultat (AppState union)
│   │   └── globals.css         # Directives Tailwind + variables CSS shadcn (--border, --primary, etc.)
│   │
│   ├── components/
│   │   ├── ResidentForm.tsx    # Formulaire complet — validation, état local, onSubmit(ResidentProfile)
│   │   ├── PromptResult.tsx    # Affichage prompt — bouton copier (clipboard + fallback), bouton reset
│   │   ├── WarningBanner.tsx   # Bandeau permanent + modale d'avertissement (Échap, overlay, scroll lock)
│   │   └── ui/
│   │       ├── button.tsx      # shadcn Button (CVA variants)
│   │       ├── input.tsx       # shadcn Input
│   │       ├── label.tsx       # shadcn Label (Radix)
│   │       ├── textarea.tsx    # shadcn Textarea
│   │       ├── select.tsx      # shadcn Select (Radix — Portal, ScrollUp/Down)
│   │       └── radio-group.tsx # shadcn RadioGroup (Radix)
│   │
│   ├── lib/
│   │   ├── prompts/
│   │   │   ├── animation.ts    # generateAnimationPrompt(profile) → string
│   │   │   ├── ppa.ts          # generatePPAPrompt(profile) → string
│   │   │   ├── mediation.ts    # generateMediationPrompt(profile) → string
│   │   │   └── index.ts        # generatePrompt(profile) → GeneratedPrompt (dispatch)
│   │   └── utils.ts            # cn(...) — clsx + tailwind-merge
│   │
│   └── types/
│       └── index.ts            # Tous les types + Record de labels d'affichage
│
├── CLAUDE.md                   # Ce fichier
├── README.md                   # Documentation utilisateur + étapes déploiement Vercel
├── package.json
├── next.config.ts
├── tailwind.config.ts          # Couleurs CSS variables shadcn (border, primary, muted, etc.)
├── tsconfig.json               # alias @/* → src/*
├── postcss.config.mjs
└── components.json             # Config shadcn/ui (style default, base slate)
```

---

## Types TypeScript (`src/types/index.ts`)

```ts
type TypeHandicap   = "deficience_intellectuelle_legere" | "deficience_intellectuelle_moderee"
                    | "handicap_psychique" | "polyhandicap_leger"
type NiveauAutonomie = "faible" | "moyen" | "eleve"
type ModeCommunication = "verbal" | "non_verbal" | "caa"
type ContentType    = "animation" | "ppa" | "mediation"

interface ResidentProfile {
  prenom: string          // fictif, obligatoire
  age: number             // 18–99, obligatoire
  typeHandicap: TypeHandicap
  niveauAutonomie: NiveauAutonomie
  modeCommunication: ModeCommunication
  axesPPA: string         // texte libre, obligatoire
  typeContenu: ContentType
  contexte?: string       // optionnel
}

interface GeneratedPrompt {
  content: string         // texte du prompt
  contentType: ContentType
  generatedAt: Date
  charCount: number
}
```

Les labels d'affichage (`TYPE_HANDICAP_LABELS`, `CONTENT_TYPE_LABELS`, etc.) sont tous centralisés dans ce fichier.

---

## Logique de génération (`src/lib/prompts/`)

Chaque fichier exporte une fonction `generate*Prompt(profile: ResidentProfile): string`.

| Fichier | Fonction | Structure du prompt généré |
|---|---|---|
| `animation.ts` | `generateAnimationPrompt` | 8 sections : titre, objectifs, cadre, matériel, déroulement, adaptations, vigilance, évaluation |
| `ppa.ts` | `generatePPAPrompt` | 4–5 objectifs SMART avec gabarit (formulation / indicateur / moyens / échéance) |
| `mediation.ts` | `generateMediationPrompt` | 6 sections : analyse, objectifs, posture, déroulement, supports, trace écrite |

`index.ts` expose `generatePrompt(profile): GeneratedPrompt` — dispatch via objet map, retourne le `GeneratedPrompt` complet.

---

## Composants clés

### `ResidentForm.tsx`
- État local `FormState` avec setter générique `set(key, value)`
- Validation à la soumission, messages d'erreur par champ, effacés à la modification
- `contexte` → `undefined` si vide (pas de string vide dans le profil)
- Prop : `onSubmit(profile: ResidentProfile)` + `isLoading?: boolean`

### `PromptResult.tsx`
- `navigator.clipboard.writeText` + fallback `execCommand("copy")`
- État `copied` → bouton vert "Prompt copié !" pendant 2,5 s
- Prop : `result: GeneratedPrompt` + `onReset: () => void`

### `WarningBanner.tsx`
- Bandeau ambre permanent en haut de page (`role="alert"`)
- Modale : fermeture Échap, clic overlay, bouton ✕, scroll lock body
- Contenu : 4 sections (données personnelles, IA, mise en production, statut)
- Auteur en pied de modale : Boubacar Konaté

### `page.tsx`
- `AppState` union : `{ step: "form" }` | `{ step: "result"; result: GeneratedPrompt }`
- `handleSubmit` → appelle `generatePrompt` → bascule en `"result"`
- `handleReset` → revient en `"form"`
- Indicateur d'étapes (1 → 2) avec états inactive / active / terminée

---

## Ce qui reste à faire

- [ ] Vérifier `npm run build` sans erreur (build de production)
- [ ] Tester la soumission du formulaire en vrai navigateur (interactivité Select, RadioGroup)
- [ ] Initialiser git et pousser sur GitHub
- [ ] Connecter à Vercel et déployer

### Idées d'évolution (non planifiées)
- Historique local des prompts générés (localStorage)
- Export PDF du prompt
- Mode sombre
- Association à une IA auto-hébergée (Ollama) pour usage en production RGPD-compatible

---

## Déploiement Vercel

```powershell
# 1. Initialiser git (depuis C:\Users\bbs8\socialprompt)
git init
git add .
git commit -m "feat: initial SocialPrompt MVP"

# 2. Créer le repo GitHub (via gh CLI ou github.com)
gh repo create socialprompt --public --push --source .

# 3. Déployer sur Vercel
# → vercel.com > Add New Project > Import le repo GitHub
# → Aucune variable d'environnement à configurer
# → Framework preset : Next.js (détecté automatiquement)
```

> Vercel détecte Next.js automatiquement. Le plan gratuit (Hobby) couvre largement ce projet.
