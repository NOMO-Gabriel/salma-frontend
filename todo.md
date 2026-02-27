# 📋 TODO SALMA — Version Mise à Jour
> AG Technologies · Dernière mise à jour : 27/02/2026  
> Stack : Next.js 15 · Tailwind v4 · TypeScript strict · Django DRF · JWT

---

## ✅ DÉJÀ FAIT
- [x] Configuration client API (`api-client.ts` avec `fetch`, Base URL, gestion d'erreurs)
- [x] Thème clair forcé, architecture sémantique CSS variables prête
- [x] Système i18n (dictionnaires fr/en, hook `useLanguage`, `useTheme`)
- [x] Layout admin avec sidebar
- [x] Dashboard admin : tableau des bourses (statique + modal d'ajout/édition)
- [x] Architecture App Router Next.js 15 (routes admin/vitrine séparées)

---

## 🔴 PHASE 1 — SOCLE TECHNIQUE (Bloquant)
> Doit être fait AVANT toute liaison backend

### 1.1 Types TypeScript exhaustifs
- [x] `src/types/api/scholarship.types.ts` — modèle complet (tous les champs Django + `field_visibility: Record<string, boolean>`)
- [] `src/types/api/service.types.ts`
- [] `src/types/api/cms.types.ts` (pages, sections, champs CMS)
- [] `src/types/api/contact.types.ts` (demandes + rendez-vous)
- [] `src/types/api/newsletter.types.ts` (abonnés + annonces)
- [] `src/types/api/testimonial.types.ts`
- [] `src/types/api/chatbot.types.ts` (questions/réponses FAQ)
- [] `src/types/api/media.types.ts`
- [x] `src/types/api/kpi.types.ts` (snapshots, temps-réel, conversion)
- [x] `src/types/api/auth.types.ts` (JWT tokens, user, profil admin)
- [x] `src/types/index.ts` — barrel export de tous les types

### 1.2 Repositories (couche d'accès données)
> Un repository = 1 module d'API. Ne connaît que `api-client.ts`.

- [x] `src/repositories/scholarship.repository.ts` (25 endpoints : public + admin CRUD + images)
- [x] `src/repositories/service.repository.ts` (11 endpoints)
- [x] `src/repositories/cms.repository.ts` (20 endpoints : pages, sections, champs)
- [] `src/repositories/contact.repository.ts` (5 endpoints)
- [x] `src/repositories/newsletter.repository.ts` (12 endpoints)
- [] `src/repositories/testimonial.repository.ts` (8 endpoints)
- [x] `src/repositories/chatbot.repository.ts` (6 endpoints)
- [] `src/repositories/media.repository.ts` (5 endpoints)
- [x] `src/repositories/kpi.repository.ts` (6 endpoints)
- [x] `src/repositories/auth.repository.ts` (9 endpoints : login, refresh, profil, reset pwd)
- [x] `src/repositories/events.repository.ts` (tracking visiteurs — POST `/api/evenements`)

### 1.3 Dictionnaires (couche d'abstraction)
> Un dictionnaire orchestre les repositories. Les Server Components ne connaissent que les dictionnaires.

- [x] `src/dictionaries/data/scholarship.data-dictionary.ts`
- [x] `src/dictionaries/data/cms.data-dictionary.ts`
- [] `src/dictionaries/data/contact.data-dictionary.ts`
- [] `src/dictionaries/data/newsletter.data-dictionary.ts`
- [] `src/dictionaries/data/kpi.data-dictionary.ts`
- [x] Pattern : toutes les fonctions `async`, retournent des données typées, centralisent le `revalidate` ISR

### 1.4 Authentification JWT (admin)
- [x] `src/lib/auth.ts` — helpers pour stocker/lire/rafraîchir tokens (cookies httpOnly côté server)
- [x] `src/middleware.ts` — protection routes `/admin/*`, redirection vers `/admin/login`
- [x] Page `/admin/login` — formulaire typé, appel `auth.repository.ts`, stockage token
- [x] `src/hooks/useAuth.ts` — état auth côté client (token valide, user info)
- [x] Gestion refresh token automatique (intercepteur dans `api-client.ts`)
- [x] Logout (purge cookies + redirect)

---

## 🟠 PHASE 2 — VITRINE DYNAMIQUE (Liaison Backend)

### 2.1 Home Page
- [x] Fetch stats réelles (KPI temps-réel) en SSR → KPIBar
- [x] Bourses à la une — Server Component avec `scholarship.data-dictionary.getFeatured()`
- [x] `ScholarshipCard` : affichage conditionnel selon `field_visibility` (ne montrer que ce que l'admin autorise)
- [x] Bouton WhatsApp flottant contextuel (message pré-rempli selon la page courante)
- [x] Section vidéo de pitch (intégration YouTube/Vimeo ou fichier uploadé)
- [x] Tracking événement `PAGE_VIEW` + `BOURSE_VUE` via `events.repository.ts`

### 2.2 Catalogue complet `/bourses`
- [x] Server Component : fetch liste avec filtres (pays, niveau, domaine, statut)
- [x] Filtres dynamiques côté client (URL params) sans rechargement page
- [x] Pagination serveur (cursor ou offset)
- [x] "Scholarship Matcher" — outil 3 clics (Niveau → Budget → Pays → résultats filtrés)
- [x] Skeleton loaders pendant fetch

### 2.3 Page de détail `/bourses/[slug]`
- [x] Route dynamique SSG + ISR (revalidate 60s)
- [x] Affichage conditionnel de CHAQUE champ selon `field_visibility`
- [x] **Jamais afficher le prix** côté vitrine (contrôle via `field_visibility`)
- [x] CTA fort : "En savoir plus → contacter l'agence" + bouton WhatsApp contextuel
- [x] Métadonnées dynamiques (OpenGraph, SEO)

### 2.4 Formulaire de contact
- [ ] Envoi réel vers `POST /api/contact`
- [ ] Validation côté client (Zod ou validation native TypeScript)
- [ ] Confirmation mail simulé (état success UI)
- [ ] Tracking événement `CONTACT_SOUMIS`

### 2.5 Prise de rendez-vous
- [ ] Formulaire dédié (nom, email, tel, date souhaitée, objet)
- [ ] Envoi vers API contact avec type `rendez-vous`
- [ ] Notification agence : email (simulé via backend) + toast dans dashboard admin

### 2.6 Témoignages
- [ ] Section témoignages sur la Home (fetch `GET /api/temoignages`)
- [ ] Seuls les témoignages `approuvés` s'affichent

---

## 🟡 PHASE 3 — DASHBOARD ADMIN COMPLET

### 3.1 Layout & Navigation admin
- [ ] Sidebar responsive (collapse sur mobile)
- [ ] Navigation vers toutes les sections : Bourses, CMS, Médias, Contacts, Newsletter, Témoignages, Chatbot, KPI
- [ ] Badge notifications (nouvelles demandes de contact non lues)

### 3.2 Gestion des bourses (CRUD complet)
- [ ] Tableau avec pagination, recherche, filtres (statut, pays)
- [ ] Formulaire création/édition COMPLET avec tous les champs du modèle Django
- [ ] **Toggle de visibilité par champ** — l'admin coche/décoche ce qui s'affiche sur le site
- [ ] Upload image principale (via `media.repository.ts`)
- [ ] Galerie d'images additionnelles (add/remove/set-principale)
- [ ] Duplication d'une bourse
- [ ] Publication / Dépublication rapide (toggle statut)

### 3.3 Gestionnaire CMS (contrôle total du contenu vitrine)
- [ ] Interface par page (Home, À propos, Contact, etc.)
- [ ] Chaque section éditable inline : titre, sous-titre, texte, image, CTA
- [ ] Preview en temps réel ou lien vers la page vitrine
- [ ] Sauvegarde via `cms.repository.ts` → ISR invalide le cache automatiquement

### 3.4 Bibliothèque de médias
- [ ] Upload drag-and-drop (images, documents)
- [ ] Grille avec preview, nom, poids, date
- [ ] Copier l'URL, supprimer, renommer (métadonnées)
- [ ] Filtres par type (image / document)

### 3.5 Gestion des contacts & candidatures
- [ ] Liste des demandes (contact + rendez-vous)
- [ ] Statuts : `nouveau`, `en cours`, `traité`
- [ ] Marquer comme traité, noter, archiver
- [ ] Filtres par type et période

### 3.6 Newsletter & abonnés
- [ ] Liste des abonnés (email, date, source)
- [ ] Créer & envoyer une annonce (simulé côté backend → TODO Mailjet/SendGrid)
- [ ] Segmentation de base (actif / inactif)

### 3.7 Témoignages
- [ ] Liste avec statut `en attente` / `approuvé` / `rejeté`
- [ ] Approuver/rejeter en un clic
- [ ] Ordre d'affichage drag-and-drop

### 3.8 KPI & Analytics
- [ ] Vue d'ensemble : visiteurs, vues bourses, contacts, taux de conversion
- [ ] Graphiques temporels (snapshots par période)
- [ ] Détail par bourse (quelle bourse génère le plus de contacts ?)
- [ ] Événements bruts filtrables
- [ ] Commande backend : déclencher `generate_kpi` depuis l'interface (bouton admin)

---

## 🟢 PHASE 4 — FEATURES AVANCÉES & POLISH

### 4.1 Chatbot IA (Gemini)
- [ ] Widget chatbot flottant sur la vitrine (ouverture/fermeture)
- [ ] Fetch FAQ depuis `GET /api/chatbot/questions` (base de connaissances en BD)
- [ ] Intégration Gemini API : recherche dans les FAQs + génération de réponse naturelle
- [ ] Si aucune réponse → incitation à contacter l'agence ou prendre RDV
- [ ] Interface admin : gestion des Q&A (CRUD questions, catégories, statut actif/inactif)

### 4.2 Mode sombre
- [ ] Compléter les CSS variables pour le thème sombre
- [ ] Tester chaque page/composant en dark mode
- [ ] Toggle fonctionnel dans la navbar (ThemeSwitcher)

### 4.3 Responsive & UX
- [ ] Audit responsive complet (mobile-first, priorité smartphones Cameroun)
- [ ] Navbar : retirer "Travel Agency"
- [ ] Changer photo hero page d'accueil
- [ ] Animations page load (staggered reveals CSS)
- [ ] Hover effects sur les cards (scale, shadow, description au survol)
- [ ] Skeleton loaders génériques réutilisables

### 4.4 Cookies & Confidentialité
- [ ] Bannière de consentement cookies (RGPD-friendly)
- [ ] Page `/confidentialite` — politique de confidentialité
- [ ] Stockage consentement (localStorage) → activer/bloquer le tracking KPI

### 4.5 Collecte de prospects (Newsletter vitrine)
- [ ] Formulaire newsletter dans le footer + popup exit-intent
- [ ] Champs : email, prénom, niveau d'études, pays cible → base de prospects qualifiée
- [ ] Double opt-in simulé côté backend

### 4.6 Notifications & alertes agence
- [ ] Après soumission rendez-vous → email à l'agence (backend simulé)
- [ ] Toast notification dans le dashboard admin (polling ou WebSocket basique)
- [ ] Futur : notif WhatsApp Business API

### 4.7 SEO & Performance
- [ ] Métadonnées dynamiques sur toutes les pages (title, description, OG)
- [ ] `robots.txt` et `sitemap.xml` dynamiques
- [ ] Optimisation images (next/image, WebP, lazy loading)
- [ ] Audit Lighthouse > 90 (Performance, A11y, SEO, Best Practices)
- [ ] Ajout du domaine backend à `next.config.ts` (remotePatterns)

---

## 🔵 PHASE 5 — DÉPLOIEMENT & INFRASTRUCTURE

- [ ] Variables d'environnement production (`.env.production`)
- [ ] Config `next.config.ts` pour domaine backend prod
- [ ] Deploy Vercel (frontend) + Hostinger (backend Django)
- [ ] Config CORS backend pour domaine Vercel
- [ ] DNS : `salma-studies.com` → Vercel (front) + `api.salma-studies.com` → Hostinger (back)
- [ ] Commande management Django : `generate_kpi` planifiée (cron Hostinger)
- [ ] Migration SQLite → PostgreSQL/MySQL (prod)
- [ ] Test end-to-end post-déploiement

---

## 🗂️ ARCHITECTURE CIBLE (Séparation des responsabilités)

```
Composant (UI) 
    ↓ connaît uniquement
Dictionnaire de données (`/dictionaries/data/`)
    ↓ appelle
Repository (`/repositories/`)
    ↓ appelle
api-client.ts
    ↓ appelle
Backend Django (REST API)
```

**Règles d'or :**
- Les Server Components fetchent via les dictionnaires de données uniquement
- Les Client Components utilisent des hooks ou reçoivent les données en props
- Zéro appel fetch direct dans un composant UI
- Tout texte visible → dictionnaire i18n (fr/en)
- Tout champ de bourse → soumis au `field_visibility` de l'admin

---

## 📌 ORDRE D'EXÉCUTION RECOMMANDÉ

1. **Types TypeScript** (1.1) — base de tout
2. **Repositories** (1.2) — briques d'accès API
3. **Auth JWT** (1.4) — protège le dashboard
4. **Dictionnaires de données** (1.3) — orchestration
5. **Dashboard bourses CRUD** (3.2) — valeur immédiate pour le client
6. **Dashboard CMS** (3.3) — autonomie totale du boss
7. **Vitrine dynamique** (2.x) — liaison backend
8. **KPI Dashboard** (3.8) — analytics
9. **Chatbot Gemini** (4.1)
10. **Polish UX** (4.2, 4.3) + Déploiement (Phase 5)