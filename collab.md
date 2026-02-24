# 🤝 Guide de Collaboration - Équipe SALMA

Bienvenue dans l'équipe ! Pour garantir un code de haute qualité (niveau ingénieur), nous suivons ces règles strictes.

## 1. 🌍 Internationalisation (i18n)
- **RÈGLE D'OR :** Interdiction d'écrire du texte en dur dans les fichiers `.tsx`.
- Toute chaîne de caractère doit être ajoutée dans `src/dictionaries/fr.ts` et traduite dans `en.ts`.
- Utilisation : `const { dictionary } = useLanguage();`.

## 2. 🎨 Développement UI (Tailwind v4)
- Avant de créer un nouveau composant, vérifiez s'il existe dans `src/components/ui/`.
- Respectez la charte graphique : 
  - Primaire : `#6B1E2E` (Bordeaux)
  - Accent : `#C9A84C` (Or)

## 3. 📝 Conventions de Nommage
- **Fichiers Composants :** PascalCase (ex: `ScholarshipCard.tsx`).
- **Dossiers Pages :** kebab-case (ex: `a-propos/`).
- **Variables/Fonctions :** Anglais uniquement (ex: `const getScholarshipList = ...`).
- **Commentaires :** Français (pour expliquer la logique métier).

## 4. 🌳 Gestion Git (Workflow)
- Ne jamais travailler directement sur `main`.
- **Branches :** 
  - `develop` : Intégration des fonctionnalités terminées.
  - `feat/nom-feature` : Votre branche de travail.
- **Commits :** Utilisez les prefixes :
  - `feat:` (nouvelle fonctionnalité)
  - `fix:` (correction de bug)
  - `docs:` (documentation)

## 🔄 Cycle de Validation
Chaque tâche doit suivre ce cycle :
1. **Conception** : Validation de l'approche avec le lead.
2. **Implémentation** : Code propre et modulaire.
3. **Test** : Vérification en mode sombre et en changement de langue.