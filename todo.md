# 🚀 ROADMAP FINALE — PROJET SALMA
> Dernière mise à jour : 04 mars 2026

---

## PHASE 1 — Finitions Frontend & Liaisons Backend (PRIORITÉ IMMÉDIATE)

### 1.1 Widget Chatbot → Liaison Backend
- [x] Améliorer l'UI du `ChatbotWidget` (UX conversationnelle, loader, gestion erreurs)
- [x] Brancher le widget sur `POST /api/chatbot/message` via le repository
- [x] Tester le flux complet : question → Gemini → réponse affichée

### 1.2 Formulaire de Contact → Liaison Backend
- [x] Brancher le formulaire Contact sur `POST /api/contacts/` via repository
- [x] Gérer les retours (succès, erreurs, validation)
- [x] Tester l'envoi et la réception côté admin

### 1.3 Newsletter → Liaison Backend
- [x] Brancher le `NewsletterForm` sur `POST /api/newsletter/subscribe/` via repository
- [x] Gérer le feedback utilisateur (toast succès/erreur, doublon email)
- [x] Tester l'inscription et l'apparition dans le dashboard admin

### 1.4 Seeder Réel (Données de production)
- [x] Créer/mettre à jour la commande `seed_data` avec les vraies données du frontend (bourses, CMS, FAQ, témoignages, services)
- [x] Synchroniser les clés CMS backend avec les dictionnaires frontend
- [x] Exécuter et valider sur le serveur

### 1.5 Test du CMS Switcher
- [x] Tester `NEXT_PUBLIC_STATIC_CONTENT=false` → vérifier que le contenu vient de l'API
- [x] Tester le basculement statique/dynamique sur chaque page
- [ ] Corriger les éventuels écarts de clés entre dictionnaires et API

### 1.6 Dashboard Admin — Liaisons API (par priorité)
- [ ] **Newsletter & Annonces** : CRUD abonnés, envoi annonces, marquage statut
- [ ] **Bourses** : CRUD complet, duplication, gestion `field_visibility`
- [ ] **Contacts & RDV** : lecture, marquage lu, notes admin
- [ ] **CMS** : édition pages, blocs, config site, vidéos
- [ ] **Témoignages** : approbation, modération, affichage site
- [ ] **Chatbot/FAQ** : gestion base de connaissances
- [ ] **KPI & Analytics** : récupération snapshots, affichage temps réel
- [ ] **Médiathèque** : upload, suppression, copie lien

### 1.7 Polish UI Backend
- [ ] Harmoniser le design du dashboard avec la charte (Navy/Azur/Gold)
- [ ] Responsive tablette & desktop
- [ ] États vides, loaders, messages d'erreur cohérents

---

## PHASE 2 — Optimisation, Qualité & Performance

### 2.1 Audit & Nettoyage du Code
- [ ] Supprimer tous les `console.log`, codes commentés, fichiers morts
- [ ] Ajouter JSDoc sur les fonctions complexes (front & back)
- [ ] Vérifier `npm run build` sans warning ni erreur TS

### 2.2 Extraction de Templates
- [ ] **Template Frontend** : socle Next.js 15 réutilisable (Tailwind v4, i18n, archi dictionaries/repositories)
- [ ] **Template Backend** : socle Django DRF réutilisable (Custom User, SimpleJWT, apps modulaires)

### 2.3 Performance & Lighthouse
- [ ] Optimiser images (WebP, `next/image`, lazy loading)
- [ ] Lazy loading composants lourds (vidéos, chatbot)
- [ ] Viser score Lighthouse 95+

### 2.4 SEO & Accessibilité
- [ ] Balises `metadata` dynamiques sur toutes les pages
- [ ] `sitemap.xml` et `robots.txt` dynamiques
- [ ] Balises `hreflang` pour le SEO multilingue FR/EN
- [ ] Contrastes couleurs et `aria-label`

### 2.5 Sécurité
- [ ] CORS Django : n'autoriser que le domaine Vercel en prod
- [ ] Tracking KPI respecte le choix cookies
- [ ] Anti-spam (Turnstile/reCAPTCHA) sur endpoints publics
- [ ] Rate limiting par IP

### 2.6 Documentation
- [ ] Cahier des charges (version finale)
- [ ] Rapport de fin de projet
- [ ] Guide d'utilisation Admin (illustré)
- [ ] Guide de déploiement (Vercel + VPS Hostinger)

---

## PHASE 3 — Infrastructure & Services Externes

### 3.1 Email Professionnel Support
- [ ] Créer un email pro pour le support (ex: support@salma-studies.com)
- [ ] Configurer SMTP sur le backend Django pour les notifications

### 3.2 API Gemini
- [ ] Acheter un abonnement / token API Gemini
- [ ] Configurer la clé API sur le serveur VPS (variable d'environnement)
- [ ] Tester le chatbot en production

### 3.3 Débogage Backend
- [ ] Gestion des images (upload, redimensionnement, nettoyage orphelins)
- [ ] Vérifier tous les endpoints critiques en prod
- [ ] Corriger les bugs remontés lors des tests E2E

### 3.4 CI/CD & Backup
- [ ] GitHub Actions (lint + déploiement auto)
- [ ] Cron job backup PostgreSQL quotidien sur le VPS

---

## PHASE 4 — Capitalisation (Post-livraison)

- [ ] Livre Blanc équipe (Frontend Patterns, Backend Patterns, VPS & Sécurité)
- [ ] Catalogue de features "prêts à vendre"
- [ ] Monitoring (Sentry/GlitchTip — optionnel)