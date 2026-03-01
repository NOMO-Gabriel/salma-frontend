# 🚀 ROADMAP DE STABILISATION — PROJET SALMA

## 🟠 SPRINT 1 : Polish Frontend & Mécanisme CMS (Vitrine)
*Objectif : Figer l'UI, assurer la cohérence de chaque page et préparer la transition vers le contenu dynamique.*

- [x] **Généralisation du `cmsSwitcher` :**
  - [x] Créer les fichiers statiques finaux (`home`, `about`, `services`, `contact`, `footer`) dans `src/dictionaries/data/static/`. pour le moment avec le memes clés que ceux des dictionnaires actuels
- [-] **Polissage systématique page par page  en incluant les appels directs à `dictionary.xxx` par `cmsSwitcher.getScopeContent(...)` dans tous les composants:**
  - [ ] **Composants UI :** Audit des boutons, badges et cartes dans `src/components/ui/`.
  - [-] **Page Accueil :** Nettoyage des sections Hero, Stats, TrustBar et Témoignages.
  - [ ] **Page Catalogue :** Vérification des filtres et du squelette de chargement.
  - [ ] **Page Services :** Harmonisation des cartes de services.
  - [ ] **Page À Propos & Contact :** Vérification des textes et des champs de formulaire.
- [ ] **Validation des remarques Client (UI/UX) :**
  - [x] Changer la photo Hero de la page d'accueil (plus claire, haute qualité).
  - [ ] Retirer définitivement "Travel Agency" de la Navbar et du Footer.
  - [ ] Ajout des micro-animations (apparition au scroll, effets hover).
- [ ] **Page Détail & Conversion :**
  - [ ] Créer la page `/bourses/[id]/page.tsx` (Détail de la bourse).
  - [ ] Appliquer le respect strict du `field_visibility`.
  - [ ] Lier le bouton WhatsApp avec message pré-rempli dynamique.
- [ ] **Fiabilisation :**
  - [ ] Créer `not-found.tsx` et `error.tsx` (Error Boundaries).
  - [ ] Audit Responsive complet (iPhone SE ➔ Desktop).

## 🔵 SPRINT 2 : Alignement Backend & Seeders
*Objectif : Mettre à jour la base de données Django pour qu'elle corresponde exactement aux clés CMS définies au Sprint 1.*

- [ ] **Mise à jour des Seeders Django (`seed.py`) :**
  - [ ] Mettre à jour les `SitePage` et `ContentBlock` avec les clés exactes du frontend.
  - [ ] Mettre à jour les `SiteConfig` (réseaux sociaux, téléphones, emails).
  - [ ] Insérer les textes finaux validés en FR et EN.
- [ ] **Test du Switcher :**
  - [ ] Passer `NEXT_PUBLIC_STATIC_CONTENT=false` dans le `.env`.
  - [ ] Vérifier que le frontend affiche correctement les données venant de l'API sans casser l'UI.

## 🟡 SPRINT 3 : Dashboard Admin & Intégrations Externes
*Objectif : Rendre l'admin 100% fonctionnel pour le client et brancher les services tiers.*

- [ ] **Module CMS & Médias :**
  - [ ] Créer la page Admin CMS : formulaires pour éditer les blocs de texte et changer les images.
  - [ ] Créer la page Admin Médias : upload d'images, suppression, copie d'URL.
- [ ] **Module Contacts & Newsletter :**
  - [ ] Créer la page Admin Contacts : tableau des leads, marquer comme lu, ajouter des notes.
  - [ ] Créer la page Admin Newsletter : liste des abonnés.
- [ ] **Module Témoignages :**
  - [ ] Créer la page Admin Témoignages : approuver/rejeter pour affichage public.
- [ ] **Module KPI & Analytics :**
  - [ ] Créer la page Admin KPI : graphiques de visites, taux de conversion, bourses les plus vues.
- [ ] **Intégrations Externes (Backend) :**
  - [ ] **Gemini API :** Brancher l'API Google Gemini sur l'endpoint Chatbot de Django (en utilisant les FAQ de la BD comme contexte).
  - [ ] **Emails :** Configurer SMTP (SendGrid ou Mailjet) dans Django pour notifier l'agence lors d'une prise de RDV.
- [ ] **Anti-Spam (Sécurité) :** Intégrer Cloudflare Turnstile ou Google reCAPTCHA v3 (invisible) sur les formulaires de Contact et Newsletter.
  - [ ] **Rate Limiting :** Configurer un throttle sur Django (ex: max 5 requêtes/min sur `/api/contact`) pour éviter les attaques DDoS.

## 🟢 SPRINT 4 : Tests End-to-End (Dynamisme & Temps Réel)
*Objectif : Se mettre dans la peau du client (Admin) et du prospect (Visiteur) pour traquer les bugs.*

- [ ] **Test CMS :** Modifier un texte/image dans l'admin ➔ Vérifier la mise à jour sur la vitrine (tester la revalidation ISR).
- [ ] **Test Bourses :**
  - [ ] Créer une bourse ➔ Vérifier son apparition dans le catalogue.
  - [ ] Masquer un champ (ex: `exigence_langue`) ➔ Vérifier sa disparition sur la page détail.
- [ ] **Test Entonnoir de conversion :**
  - [ ] Visiter une bourse ➔ Poser une question au Chatbot ➔ Remplir le formulaire de contact.
  - [ ] Vérifier que le KPI a bien tracké la visite et la conversion.
  - [ ] Vérifier la réception de l'email côté agence et la notification dans l'admin.

## 🟣 SPRINT 5 : Optimisation, SEO & Code Review (Production)
*Objectif : Atteindre un score Lighthouse de 95+, un code propre et un référencement optimal.*

- [ ] **Performance & Lighthouse :**
  - [ ] Optimiser toutes les images (formats WebP, tailles adaptées via `next/image`).
  - [ ] Vérifier le Lazy Loading des composants lourds (vidéos, chatbot).
- [ ] **SEO & Accessibilité :**
  - [ ] Ajouter les balises `metadata` dynamiques (Title, Description, OpenGraph) sur toutes les pages (surtout `/bourses/[id]`).
  - [ ] Générer un `sitemap.xml` et un `robots.txt` dynamiques.
  - [ ] Vérifier les contrastes de couleurs et les balises `aria-label` pour l'accessibilité.
- [ ] **SEO Multilingue :** S'assurer que les balises `<link rel="alternate" hreflang="x">` sont générées dynamiquement pour que Google indexe le FR et le EN.
- [ ] **Monitoring & Logs (Optionnel mais recommandé) :**
  - [ ] Brancher un outil comme Sentry ou GlitchTip pour remonter les erreurs JS (front) et Python (back) en temps réel sur un canal Slack/Discord.
- [ ] **Code Review & Nettoyage :**
  - [ ] Supprimer tous les `console.log`, codes commentés inutiles et fichiers morts.
  - [ ] Ajouter des commentaires JSDoc sur les fonctions complexes.
  - [ ] Vérifier qu'il n'y a aucune erreur TypeScript (`npm run build` doit passer sans aucun warning).
- [ ] **Sécurité :**
  - [ ] Vérifier la configuration CORS sur Django (n'autoriser que le domaine Vercel en prod).
  - [ ] S'assurer que le tracking KPI respecte le choix de la bannière de cookies.

---
## 🎓 SPRINT 6 : Capitalisation, Documentation & Standardisation
*Objectif : Livrer un produit documenté au client, extraire des bases réutilisables (boilerplates) et figer les standards techniques pour faire monter l'équipe en compétence sur les futurs projets.*

- [ ] **Documentation Client (Livrables finaux) :**
  - [ ] Mettre à jour le **Cahier des charges** (Version Finale) pour refléter exactement ce qui a été produit.
  - [ ] Rédiger le **Rapport de fin de projet** (Bilan, fonctionnalités livrées, performances atteintes).
  - [ ] Créer le **Guide d'utilisation Admin** (Manuel illustré pour le client : comment ajouter une bourse, gérer le CMS, lire les KPI).
- [ ] **Documentation DevOps & Déploiement :**
  - [ ] Rédiger le **Guide de déploiement complet** (Setup Vercel, configuration VPS Hostinger, variables d'environnement, commandes de mise à jour et maintenance).
  - [ ] **CI/CD (Intégration Continue) :** Mettre en place un workflow GitHub Actions pour automatiser le linting (`npm run lint`) et le déploiement.
  - [ ] **Stratégie de Backup :** Configurer un Cron Job sur le VPS Hostinger pour dumper la base de données PostgreSQL chaque nuit et l'envoyer sur un stockage externe (ex: AWS S3 ou un autre serveur).
- [ ] **Création de Templates (Boilerplates internes AGT) :**
  - [ ] **Template Frontend :** Extraire un socle Next.js 15 propre (Tailwind v4, i18n, architecture `dictionaries/repositories`, `api-client.ts` avec intercepteurs JWT).
  - [ ] **Template Backend :** Extraire un socle Django DRF (Custom User Model, SimpleJWT, architecture modulaire par `apps/`, configuration CORS/Sécurité de prod).
- [ ] **Livre Blanc de l'Équipe (Design Patterns & Standards) :**
  - [ ] **Frontend Patterns :** Documenter l'approche *Server Components vs Client Components*, la séparation des responsabilités (UI -> Dictionnaire -> Repository), et la gestion du state.
  - [ ] **Backend Patterns :** Documenter l'architecture modulaire, les bonnes pratiques DRF (Fat Models / Thin Views), et la gestion des permissions.
  - [ ] **VPS & Sécurité :** Standardiser le setup serveur (Nginx, Gunicorn, SSL, pare-feu, gestion des secrets).
  - [ ] **Catalogue de Features :** Lister les modules "prêts à vendre" pour les futures spécifications (CMS Headless, Chatbot IA Gemini, Tracking KPI, Système de Visibilité dynamique).