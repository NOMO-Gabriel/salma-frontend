# 🌍 SALMA Frontend — Plateforme de Bourses d'Études
**AG Technologies** — Next.js 15 · Tailwind CSS v4 · TypeScript

> Plateforme bilingue FR/EN de présentation et gestion de bourses d'études en **Chine** et en **Allemagne**.

---

## 📋 Table des matières

1. [Prérequis](#-prérequis)
2. [Installation](#-installation)
3. [Variables d'environnement](#-variables-denvironnement)
4. [Lancer le projet](#-lancer-le-projet)
5. [Structure du projet](#-structure-du-projet)
6. [Workflow Git](#-workflow-git)
7. [Conventions de commit](#-conventions-de-commit)
8. [Règles d'équipe](#-règles-déquipe)
9. [Contacts](#-contacts)

---

## 🔧 Prérequis

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| Node.js | 18.17+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | 2.30+ | `git --version` |

> ⚠️ **Windows** : Utilisez PowerShell ou Git Bash, pas CMD.

---

## 🚀 Installation

### Étape 1 — Cloner le dépôt

```bash
git clone <url-du-repo>
cd salma-frontend
```

### Étape 2 — Installer les dépendances

```bash
npm install
```

### Étape 3 — Configurer les variables d'environnement

```bash
# Copier le fichier exemple
cp .env.example .env.local
# Puis remplir les valeurs (voir section suivante)
```

### Étape 4 — Lancer le serveur de développement

```bash
npm run dev
```

✅ Le site est disponible sur **http://localhost:3000**

---

## 🔐 Variables d'environnement

Créez un fichier `.env.local` à la racine du projet (jamais commité sur Git).

```bash
# ── API Backend Django ─────────────────────────────────────────────────────
# URL de base de l'API REST (sans slash final)
NEXT_PUBLIC_API_URL=http://localhost:8000

# ── Mode CMS ──────────────────────────────────────────────────────────────
# true  = contenu statique (fichiers dictionnaires locaux, pas d'appel API)
# false = contenu dynamique (appels à l'API Django)
NEXT_PUBLIC_STATIC_CONTENT=true

# ── WhatsApp ───────────────────────────────────────────────────────────────
# Numéro au format international sans espaces ni tirets
NEXT_PUBLIC_WHATSAPP_NUMBER=237699450984

# ── Environnement ─────────────────────────────────────────────────────────
# development | production
NODE_ENV=development
```

> 💡 **Demandez les valeurs de production** à Gabriel (lead) — ne les partagez jamais par email ou chat.

### Tableau récapitulatif

| Variable | Obligatoire | Valeur par défaut | Description |
|----------|-------------|-------------------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ | `http://localhost:8000` | URL de l'API Django |
| `NEXT_PUBLIC_STATIC_CONTENT` | ✅ | `true` | Mode statique ou dynamique |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ✅ | — | Numéro WhatsApp SALMA |
| `NODE_ENV` | ✅ | `development` | Environnement Node |

---

## ▶️ Lancer le projet

```bash
# Développement (hot reload)
npm run dev

# Build de production (vérifier avant de push)
npm run build

# Lancer le build de production localement
npm run start

# Linter (vérifier les erreurs de code)
npm run lint
```

> ⚠️ **`npm run build` doit passer sans erreur avant tout commit.** Si le build échoue, ne commitez pas.

---

## 📂 Structure du projet

```
salma-frontend/
├── src/
│   ├── app/                        # Pages Next.js (App Router)
│   │   ├── (visitor)/              # Pages publiques (accueil, bourses, services...)
│   │   └── (admin)/                # Dashboard administrateur
│   ├── components/                 # Composants UI réutilisables
│   │   ├── layout/                 # Navbar, Footer, Topbar
│   │   └── ui/                     # Boutons, cartes, badges...
│   ├── sections/                   # Sections de pages (Hero, Stats, Témoignages...)
│   │   └── visitor/
│   │       └── hero/               # Carousel Hero (modulaire)
│   ├── dictionaries/               # Système CMS bilingue FR/EN
│   │   └── data/
│   │       ├── static/             # Contenu statique (layout, home, bourses...)
│   │       └── cms-switcher.ts     # Bascule statique ↔ API
│   ├── hooks/                      # Hooks React personnalisés
│   ├── repositories/               # Couche d'accès aux données (API calls)
│   └── types/                      # Types TypeScript
├── public/                         # Assets statiques (images, fonts)
├── .env.local                      # Variables d'env (NON commité)
├── .env.example                    # Modèle de variables d'env (commité)
└── tailwind.config.ts
```

---

## 🌿 Workflow Git

### Règle fondamentale

```
main   → version de production stable (push réservé à Gabriel)
dev    → branche de développement partagée
feat/* → vos branches de travail personnelles
```

### Workflow quotidien — étape par étape

#### 1. Se mettre à jour avant de commencer

```bash
# Se placer sur dev
git checkout dev

# Récupérer les dernières modifications distantes
git fetch origin

# Intégrer les modifications
git pull origin dev
```

#### 2. Créer sa branche de travail

```bash
# Toujours créer depuis dev
git checkout -b feat/nom-de-la-fonctionnalite
# Exemple :
git checkout -b feat/carousel-hero
git checkout -b fix/navbar-dropdown
git checkout -b refactor/hero-modulaire
```

#### 3. Travailler, committer régulièrement

```bash
# Voir l'état de vos fichiers
git status

# Ajouter les fichiers modifiés
git add src/sections/visitor/hero/HeroCarousel.tsx
# Ou tout ajouter (avec prudence)
git add .

# Committer avec un message clair (voir conventions ci-dessous)
git commit -m "feat(hero): ajouter le carousel avec animation spotlight"
```

#### 4. Rester synchronisé pendant le développement

```bash
# Récupérer les modifs de l'équipe sans les intégrer encore
git fetch origin dev

# Rebaser sa branche sur dev pour éviter les conflits
git rebase origin/dev
```

#### 5. Pousser sa branche et ouvrir une Pull Request

```bash
# Pousser sa branche
git push origin feat/carousel-hero

# Puis ouvrir une Pull Request sur GitHub vers dev
# Gabriel fait la revue et merge
```

#### 6. Après le merge — nettoyer

```bash
# Revenir sur dev
git checkout dev

# Se mettre à jour
git pull origin dev

# Supprimer la branche locale (elle a été mergée)
git branch -d feat/carousel-hero
```

### Schéma visuel

```
main        ●─────────────────────────────────────● (prod — Gabriel uniquement)
             \                                   /
dev           ●────●────●────●────●────●────●────● (branche partagée)
               \        \        /
feat/carousel   ●────●────●      (votre branche → PR vers dev)
feat/fix-nav         ●────●────● (branche d'un autre collab)
```

---

## 📝 Conventions de commit

Nous utilisons la convention **Conventional Commits**. **Tous les commits sont en français.**

### Format

```
<type>(<portée>): <description courte en français>

[corps optionnel — explication détaillée]

[footer optionnel — ex: CHANGEMENT MAJEUR]
```

### Types

| Type | Usage | Exemple |
|------|-------|---------|
| `feat` | Nouvelle fonctionnalité | `feat(hero): ajouter le carousel animé` |
| `fix` | Correction de bug | `fix(navbar): corriger le dropdown accueil` |
| `refactor` | Réécriture sans changement de comportement | `refactor(hero): découper en composants modulaires` |
| `style` | CSS, mise en forme, pas de logique | `style(carousel): ajuster le dégradé crescendo` |
| `chore` | Config, dépendances, tooling | `chore: mettre à jour les dépendances npm` |
| `perf` | Amélioration de performance | `perf(images): passer en format WebP` |
| `docs` | Documentation | `docs(readme): ajouter le guide de workflow git` |
| `test` | Ajout ou modification de tests | `test(carousel): ajouter les tests unitaires` |

### Règles

- Description en **minuscules**, sans point final
- **Impératif présent** : "ajouter" pas "ajouté", "corriger" pas "corrigé"
- **50 caractères maximum** pour la première ligne
- La portée entre parenthèses = zone du code impactée (`hero`, `navbar`, `cms`, `api`...)

### Exemples complets

```bash
# Fonctionnalité simple
git commit -m "feat(hero): ajouter la carte bourse avec animation spotlight"

# Correction de bug
git commit -m "fix(widgets): corriger le z-index du bouton WhatsApp"

# Refactoring avec détails
git commit -m "refactor(hero): découper HeroCarousel en composants modulaires

- Créer HeroSlide, HeroControls, HeroDecorations, HeroScholarshipCard
- Brancher les textes sur cmsSwitcher (fr/en)
- Réduire le fichier principal de 400 à 80 lignes"

# Changement majeur (breaking change)
git commit -m "feat(hero): migrer vers l'architecture modulaire hero/

CHANGEMENT MAJEUR: le chemin d'import a changé
  Avant : @/sections/visitor/HeroCarousel
  Après : @/sections/visitor/hero/HeroCarousel"
```

---

## 👥 Règles d'équipe

| Règle | Détail |
|-------|--------|
| 🚫 **Ne jamais push sur `main`** | Réservé exclusivement à **Gabriel** (lead) |
| ✅ **Toujours travailler depuis `dev`** | Créer sa branche depuis `dev` uniquement |
| 🔍 **Build avant commit** | `npm run build` doit passer sans erreur |
| 📝 **Commits en français** | Suivre la convention Conventional Commits |
| 🔐 **Jamais de secrets dans Git** | `.env.local` est dans `.gitignore` |
| 🔄 **Pull Request obligatoire** | Pas de merge direct sur `dev` sans revue |
| 💬 **Conflits → contacter Gabriel** | Ne pas résoudre seul un conflit complexe |

---

## 📞 Contacts

| Rôle | Nom | Contact |
|------|-----|---------|
| Lead développeur | Gabriel | WhatsApp : +237 6 99 45 09 84 |
| Agence | AG Technologies | secretariatagtechnologies@gmail.com |
| Adresse | — | Montée Anne rouge, Immeuble Kadji, Yaoundé |

---

*README maintenu par l'équipe AG Technologies — Dernière mise à jour : mars 2026*