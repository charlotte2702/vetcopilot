# VetCopilot

Assistant intelligent pour vétérinaires — planning, dossiers patients, aide au diagnostic et comptes rendus SOAP.

Premier déploiement de test : application Next.js 16 / React 19 / Tailwind v4, données mockées, installable en PWA.

## Stack

- **Next.js 16** (App Router, TypeScript, src/ layout)
- **React 19**
- **Tailwind CSS v4** (configuration via `@theme` dans `globals.css`)
- **Polices** Playfair Display + Inter via `next/font/google`
- **PWA** : `manifest.json` + service worker basique (cache réseau-d'abord)

Pas de backend pour cette version : toutes les données sont dans `src/lib/mock-data.ts`.

## Pages disponibles

| Route                | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| `/login`             | Écran de connexion simulé (sélection de rôle)                 |
| `/dashboard`         | Tableau de bord : welcome, stats du jour, prochains RDV       |
| `/planning`          | Timeline des consultations avec filtre par vétérinaire        |
| `/animals`           | Liste des patients avec recherche et filtre par espèce        |
| `/animals/[id]`      | Fiche patient : vaccins, historique, poids, traitements       |
| `/diagnostic`        | Aide diagnostic IA (simulée, hypothèses + examens conseillés) |
| `/soap`              | Comptes rendus SOAP avec toggle vétérinaire / propriétaire    |

## Démarrage local

```bash
npm install
npm run dev
# → http://localhost:3000
```

Pour la première visite, l'application redirige vers `/login`. Les identifiants sont pré-remplis, cliquez simplement sur "Se connecter".

### Build de production

```bash
npm run build
npm start
```

## Déploiement sur Vercel

### Via la CLI Vercel (le plus rapide)

```bash
npm i -g vercel
vercel        # premier déploiement (preview)
vercel --prod # déploiement en production
```

### Via l'interface Vercel

1. Pousser ce dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com), cliquer **Add New → Project**, sélectionner le dépôt.
3. Vercel détecte Next.js automatiquement. Aucune variable d'environnement requise pour ce premier test.
4. Cliquer **Deploy**.

L'URL `https://vetcopilot-XXX.vercel.app` peut être partagée immédiatement avec un vétérinaire testeur.

## Installation en PWA sur téléphone

- **iOS Safari** : ouvrir l'URL, partager → "Sur l'écran d'accueil"
- **Android Chrome** : ouvrir l'URL, menu → "Ajouter à l'écran d'accueil"

Une fois installée, l'app s'ouvre en plein écran sans la barre de navigation et fonctionne hors-ligne après une première visite (les pages visitées sont mises en cache par le service worker).

## Structure du code

```
src/
├── app/                  # App Router : layout + pages
│   ├── layout.tsx        # racine + polices + PwaRegister
│   ├── page.tsx          # redirige vers /login
│   ├── globals.css       # design tokens (Tailwind v4 @theme)
│   ├── login/
│   ├── dashboard/
│   ├── planning/
│   ├── animals/
│   ├── animals/[id]/
│   ├── diagnostic/
│   └── soap/
├── components/
│   ├── AppShell.tsx      # sidebar + header + bottom nav mobile
│   ├── AppointmentRow.tsx
│   ├── PwaRegister.tsx   # enregistrement du service worker
│   └── icons.tsx         # icônes SVG
└── lib/
    ├── types.ts
    └── mock-data.ts      # Rex, Luna, Milo, Noisette, RDV, etc.

public/
├── manifest.json
├── sw.js                 # service worker
├── icon.svg              # logo source
├── icon-192.png          # PWA icon
├── icon-512.png          # PWA icon HD
└── apple-touch-icon.png  # iOS
```

## Palette de design

Les couleurs sont définies dans `src/app/globals.css` via la directive `@theme` de Tailwind v4 :

| Token         | Valeur        | Usage                       |
| ------------- | ------------- | --------------------------- |
| `--color-navy`| `#0B1D34`     | Texte principal, headers    |
| `--color-teal`| `#2BA08F`     | Boutons primaires, accents  |
| `--color-gold`| `#C8A45C`     | Accents secondaires         |
| `--color-bg`  | `#F5F7FA`     | Arrière-plan                |

Typographies : **Playfair Display** (titres) et **Inter** (corps).

## Prochaines étapes

- [ ] Connecter Supabase (auth + base de données réelle)
- [ ] Intégrer Anthropic / OpenAI pour l'aide diagnostic réelle
- [ ] Génération SOAP via LLM avec validation humaine
- [ ] Notifications push (5 min avant RDV)
- [ ] Dark mode

## Notes

- Le service worker n'est actif qu'en production (`NODE_ENV === "production"`).
- Le bouton "Déconnexion" de la sidebar renvoie vers `/login` mais ne nettoie rien (auth simulée).
