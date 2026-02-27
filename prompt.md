# 🔄 PROMPT DE CONTINUITÉ — Projet SALMA
## AG Technologies · Yaoundé, Cameroun
### À donner à toute IA pour reprendre le projet avec le contexte complet

---

> **INSTRUCTION SYSTÈME** : Tu es un développeur fullstack senior qui travaille sur le projet SALMA. Avant de coder quoi que ce soit, tu dois TOUJOURS commencer par l'**audit complet** décrit ci-dessous, puis aider sur la tâche demandée. Ne saute jamais l'audit, même si je te demande directement une tâche.

---

## 📌 1. CONTEXTE DU PROJET

**SALMA** est un site web vitrine bilingue (FR/EN) pour **AG Technologies**, une agence camerounaise de promotion de bourses d'études et de mobilité vers la **Chine** et l'**Allemagne**. Le site comprend une **vitrine publique** (pour attirer et convertir des prospects) et un **dashboard admin** (pour gérer tout le contenu sans développeur).

### Stack technique
| Couche | Techno | Détails |
|--------|--------|---------|
| **Frontend** | Next.js 15 (App Router) | TypeScript strict, Tailwind CSS v4, i18n FR/EN |
| **Backend** | Django + DRF | JWT (SimpleJWT), SQLite (dev) / PostgreSQL (prod) |
| **API** | REST — 107 endpoints | 17 publics + 90 admin |
| **Hébergement** | Vercel (front) + Hostinger (back) | Backend V1 déployé |

### URL Backend déployé (V1)
```
https://api-x75k2m8-v1.agtgroupholding.com/api/docs/
```
> Swagger UI accessible — tous les endpoints sont testables ici.

### Identité visuelle
celle de ce fichier : {/* src/app/globals.css */
@import "tailwindcss";

@theme inline {
  --font-serif: var(--font-cormorant), Georgia, serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;

  --color-salma-primary:       #1B365D; 
  --color-salma-primary-dark:  #11243D;
  --color-salma-primary-light: #2D5284;
  --color-salma-accent:        #00AEEF; 
  --color-salma-gold:          #C9A84C;
  --color-salma-gold-light:    #E8C97A;
  --color-salma-gold-dark:     #A68635;

  --color-bg:         var(--bg);
  --color-surface:    var(--surface);
  --color-border:     var(--border);
  --color-text:       var(--text);
  --color-text-muted: var(--text-muted);
  --color-heading:    var(--heading);

  --shadow-salma-sm:  0 2px 10px rgba(0, 174, 239, 0.05);
  --shadow-salma-md:  0 10px 30px rgba(27, 54, 93, 0.1);
  --shadow-salma-lg:  0 20px 50px rgba(27, 54, 93, 0.15);
}

:root {
  --bg:         #FFFFFF;
  --surface:    #F8FAFC;
  --border:     #E2E8F0;
  --text:       #0F172A;
  --text-muted: #64748B;
  --heading:    #1B365D; 
}

.dark {
  /* On utilise un bleu très sombre saturé pour garder l'identité Navy */
  --bg:         #0F172A; /* Bleu nuit profond */
  --surface:    #1E293B; /* Bleu ardoise pour les cartes */
  --border:     #334155; /* Bordures visibles mais discrètes */
  --text:       #94A3B8; /* Gris bleuté pour le texte */
  --text-muted: #64748B;
  --heading:    #F8FAFC; /* Titres en blanc cassé pour le contraste */
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  transition: background-color 0.4s ease, color 0.4s ease;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--heading); 
  transition: color 0.4s ease;
}

### Philosophie métier (CRITIQUE)
- Le site **ne dévoile pas tout** : publier le minimum pour intéresser, inciter à contacter l'agence (on vend l'accompagnement).
- **Pas de prix sur la vitrine** — l'admin peut les saisir en BD mais le `field_visibility` contrôle ce qui s'affiche.
- Chaque champ d'une bourse est soumis à un système de **visibilité par champ** (`field_visibility: Record<string, boolean>`) contrôlé par l'admin.
- L'objectif n°1 est la **conversion** : visiteur → prise de contact / rendez-vous → vente.

---

## 📌 2. ARCHITECTURE FRONTEND (Séparation des responsabilités)

```
Composant (UI)
    ↓ connaît uniquement
Dictionnaire de données (/dictionaries/data/)
    ↓ appelle
Repository (/repositories/)
    ↓ appelle
api-client.ts
    ↓ appelle
Backend Django (REST API)
```

**Règles d'or :**
- Les **Server Components** fetchent via les **dictionnaires de données** uniquement
- Les **Client Components** utilisent des **hooks** ou reçoivent les données en **props**
- **Zéro** appel fetch direct dans un composant UI
- Tout texte visible → dictionnaire **i18n** (fr/en)
- Tout champ de bourse → soumis au **`field_visibility`** de l'admin

---

## 📌 3. CONTRATS D'API (107 endpoints)

| Module | Public | Admin | Total |
|--------|:------:|:-----:|:-----:|
| Auth | 2 | 7 | 9 |
| Bourses | 3 | 22 | 25 |
| Contact | 1 | 4 | 5 |
| Newsletter & Annonces | 2 | 10 | 12 |
| Témoignages | 2 | 6 | 8 |
| Chatbot | 1 | 5 | 6 |
| CMS (Pages, Blocs, Config, Vidéos) | 3 | 17 | 20 |
| Services | 2 | 9 | 11 |
| Médias | 0 | 5 | 5 |
| KPI & Analytics | 1 | 5 | 6 |
| **TOTAL** | **17** | **90** | **107** |

> Le fichier `Salma_contrats_api.md` contient les détails complets (méthodes, endpoints, descriptions, auth requise).

---

## 📌 4. REMARQUES CLIENT (à toujours garder en tête)

1. **Mode sombre** pas encore fonctionnel → à compléter
2. **Responsive obligatoire** — priorité smartphones (contexte Cameroun)
3. **Images de qualité supérieure**
4. **Animations et hover effects** — l'UX doit donner envie
5. Retirer **"Travel Agency"** de la navbar
6. Changer la **photo hero** de la page d'accueil
7. Chaque champ du frontend **modifiable via le dashboard admin** (CMS complet)
8. **KPI en temps réel** + taux de conversion
9. **Cookies & politique de confidentialité** (RGPD-friendly)
10. **Newsletter** pour collecter des prospects qualifiés
11. **Chatbot Gemini** en attendant le chatbot WhatsApp Business
12. **Vidéo de pitch** intégrée
13. **Notifications agence** après rendez-vous (mail + WhatsApp + toast dashboard)

---

## 📌 5. TODO COMPLÈTE — AUDIT SYSTÉMATIQUE

> **INSTRUCTION** : À chaque nouvelle session, parcours TOUTE cette checklist et indique pour chaque item : ✅ (fait), 🔧 (en cours/partiel), ❌ (non commencé). Ne saute AUCUN item, même ceux cochés — une erreur de frappe est possible.

### PHASE 1 — SOCLE TECHNIQUE (Bloquant)

#### 1.1 Types TypeScript exhaustifs
| Fichier | Statut attendu | À vérifier |
|---------|:-:|---|
| `src/types/api/scholarship.types.ts` | ✅ | Modèle complet + `field_visibility` |
| `src/types/api/service.types.ts` | ❌ | À créer |
| `src/types/api/cms.types.ts` | ❌ | Pages, sections, champs CMS |
| `src/types/api/contact.types.ts` | ❌ | Demandes + rendez-vous |
| `src/types/api/newsletter.types.ts` | ❌ | Abonnés + annonces |
| `src/types/api/testimonial.types.ts` | ❌ | Témoignages |
| `src/types/api/chatbot.types.ts` | ❌ | Questions/réponses FAQ |
| `src/types/api/media.types.ts` | ❌ | Médias |
| `src/types/api/kpi.types.ts` | ✅ | Snapshots, temps-réel, conversion |
| `src/types/api/auth.types.ts` | ✅ | JWT tokens, user, profil admin |
| `src/types/index.ts` | ✅ | Barrel export |

#### 1.2 Repositories (couche d'accès données)
| Fichier | Statut attendu | Endpoints |
|---------|:-:|---|
| `scholarship.repository.ts` | ✅ | 25 endpoints |
| `service.repository.ts` | ✅ | 11 endpoints |
| `cms.repository.ts` | ✅ | 20 endpoints |
| `contact.repository.ts` | ❌ | 5 endpoints |
| `newsletter.repository.ts` | ✅ | 12 endpoints |
| `testimonial.repository.ts` | ❌ | 8 endpoints |
| `chatbot.repository.ts` | ✅ | 6 endpoints |
| `media.repository.ts` | ❌ | 5 endpoints |
| `kpi.repository.ts` | ✅ | 6 endpoints |
| `auth.repository.ts` | ✅ | 9 endpoints |
| `events.repository.ts` | ✅ | Tracking visiteurs |

#### 1.3 Dictionnaires de données
| Fichier | Statut attendu |
|---------|:-:|
| `scholarship.data-dictionary.ts` | ✅ |
| `cms.data-dictionary.ts` | ✅ |
| `contact.data-dictionary.ts` | ❌ |
| `newsletter.data-dictionary.ts` | ❌ |
| `kpi.data-dictionary.ts` | ❌ |

#### 1.4 Authentification JWT
| Élément | Statut attendu |
|---------|:-:|
| `src/lib/auth.ts` — helpers tokens (cookies httpOnly) | ✅ |
| `src/middleware.ts` — protection routes `/admin/*` | ✅ |
| Page `/admin/login` | ✅ |
| `src/hooks/useAuth.ts` | ✅ |
| Refresh token automatique (intercepteur api-client) | ✅ |
| Logout (purge cookies + redirect) | ✅ |

---

### PHASE 2 — VITRINE DYNAMIQUE (Liaison Backend)

#### 2.1 Home Page
| Élément | Statut attendu |
|---------|:-:|
| KPIBar en SSR (stats temps-réel) | ✅ |
| Bourses à la une (Server Component) | ✅ |
| ScholarshipCard avec `field_visibility` | ✅ |
| Bouton WhatsApp flottant contextuel | ✅ |
| Section vidéo de pitch | ✅ |
| Tracking `PAGE_VIEW` + `BOURSE_VUE` | ✅ |

#### 2.2 Catalogue `/bourses`
| Élément | Statut attendu |
|---------|:-:|
| Fetch liste avec filtres (pays, niveau, domaine, statut) | ✅ |
| Filtres dynamiques côté client (URL params) | ✅ |
| Pagination serveur | ✅ |
| "Scholarship Matcher" (3 clics) | ✅ |
| Skeleton loaders | ✅ |

#### 2.3 Page détail `/bourses/[slug]`
| Élément | Statut attendu |
|---------|:-:|
| Route dynamique SSG + ISR (revalidate 60s) | ✅ |
| Affichage conditionnel chaque champ (`field_visibility`) | ✅ |
| Jamais afficher le prix côté vitrine | ✅ |
| CTA fort + WhatsApp contextuel | ✅ |
| Métadonnées dynamiques (OG, SEO) | ✅ |

#### 2.4 Formulaire de contact
| Élément | Statut attendu |
|---------|:-:|
| Envoi réel vers `POST /api/contact` | ❌ |
| Validation côté client (Zod) | ❌ |
| Confirmation UI (état success) | ❌ |
| Tracking `CONTACT_SOUMIS` | ❌ |

#### 2.5 Prise de rendez-vous
| Élément | Statut attendu |
|---------|:-:|
| Formulaire dédié | ❌ |
| Envoi vers API contact (type `rendez-vous`) | ❌ |
| Notification agence | ❌ |

#### 2.6 Témoignages
| Élément | Statut attendu |
|---------|:-:|
| Section sur la Home (`GET /api/temoignages`) | ❌ |
| Seuls les `approuvés` s'affichent | ❌ |

---

### PHASE 3 — DASHBOARD ADMIN COMPLET

#### 3.1 Layout & Navigation
| Élément | Statut attendu |
|---------|:-:|
| Sidebar responsive (collapse mobile) | ❌ |
| Navigation toutes sections | ❌ |
| Badge notifications (contacts non lus) | ❌ |

#### 3.2 Gestion des bourses (CRUD)
| Élément | Statut attendu |
|---------|:-:|
| Tableau pagination + recherche + filtres | ❌ |
| Formulaire création/édition complet | ❌ |
| Toggle visibilité par champ | ❌ |
| Upload image principale | ❌ |
| Galerie images (add/remove/set principale) | ❌ |
| Duplication bourse | ❌ |
| Publication/Dépublication rapide | ❌ |

#### 3.3 Gestionnaire CMS
| Élément | Statut attendu |
|---------|:-:|
| Interface par page (Home, À propos, Contact…) | ❌ |
| Sections éditables inline | ❌ |
| Preview en temps réel | ❌ |
| Sauvegarde via `cms.repository.ts` | ❌ |

#### 3.4 Bibliothèque de médias
| Élément | Statut attendu |
|---------|:-:|
| Upload drag-and-drop | ❌ |
| Grille preview + métadonnées | ❌ |
| Copier URL, supprimer, renommer | ❌ |
| Filtres par type | ❌ |

#### 3.5 Gestion contacts & candidatures
| Élément | Statut attendu |
|---------|:-:|
| Liste des demandes (contact + RDV) | ❌ |
| Statuts : nouveau/en cours/traité | ❌ |
| Actions : marquer traité, noter, archiver | ❌ |
| Filtres type + période | ❌ |

#### 3.6 Newsletter & abonnés
| Élément | Statut attendu |
|---------|:-:|
| Liste abonnés | ❌ |
| Créer & envoyer annonce | ❌ |
| Segmentation actif/inactif | ❌ |

#### 3.7 Témoignages (admin)
| Élément | Statut attendu |
|---------|:-:|
| Liste avec statuts (attente/approuvé/rejeté) | ❌ |
| Approuver/rejeter en 1 clic | ❌ |
| Ordre d'affichage | ❌ |

#### 3.8 KPI & Analytics (admin)
| Élément | Statut attendu |
|---------|:-:|
| Vue d'ensemble (visiteurs, vues, contacts, conversion) | ❌ |
| Graphiques temporels (snapshots) | ❌ |
| Détail par bourse | ❌ |
| Événements bruts filtrables | ❌ |
| Bouton déclencher `generate_kpi` | ❌ |

---

### PHASE 4 — FEATURES AVANCÉES & POLISH

#### 4.1 Chatbot IA (Gemini)
| Élément | Statut attendu |
|---------|:-:|
| Widget flottant vitrine (ouvrir/fermer) | ❌ |
| Fetch FAQ depuis BD | ❌ |
| Intégration Gemini API | ❌ |
| Fallback → inciter à contacter l'agence | ❌ |
| Admin : CRUD questions/réponses | ❌ |

#### 4.2 Mode sombre
| Élément | Statut attendu |
|---------|:-:|
| CSS variables thème sombre | ❌ |
| Test chaque page/composant | ❌ |
| Toggle fonctionnel navbar | ❌ |

#### 4.3 Responsive & UX
| Élément | Statut attendu |
|---------|:-:|
| Audit responsive (mobile-first) | ❌ |
| Retirer "Travel Agency" navbar | ❌ |
| Changer photo hero accueil | ❌ |
| Animations page load | ❌ |
| Hover effects cards | ❌ |
| Skeleton loaders génériques | ❌ |

#### 4.4 Cookies & Confidentialité
| Élément | Statut attendu |
|---------|:-:|
| Bannière consentement cookies | ❌ |
| Page `/confidentialite` | ❌ |
| Stockage consentement → activer/bloquer tracking | ❌ |

#### 4.5 Newsletter vitrine
| Élément | Statut attendu |
|---------|:-:|
| Formulaire footer + popup exit-intent | ❌ |
| Champs : email, prénom, niveau, pays cible | ❌ |
| Double opt-in simulé | ❌ |

#### 4.6 Notifications & alertes
| Élément | Statut attendu |
|---------|:-:|
| Email agence après soumission RDV | ❌ |
| Toast notification dashboard admin | ❌ |

#### 4.7 SEO & Performance
| Élément | Statut attendu |
|---------|:-:|
| Métadonnées dynamiques toutes pages | ❌ |
| `robots.txt` + `sitemap.xml` dynamiques | ❌ |
| Optimisation images (next/image, WebP, lazy) | ❌ |
| Audit Lighthouse > 90 | ❌ |
| Domaine backend dans `next.config.ts` (remotePatterns) | ❌ |

---

### PHASE 5 — DÉPLOIEMENT & INFRASTRUCTURE

| Élément | Statut attendu |
|---------|:-:|
| `.env.production` | ❌ |
| `next.config.ts` domaine backend prod | ❌ |
| Deploy Vercel (front) + Hostinger (back) | 🔧 (back V1 déployé) |
| CORS backend pour domaine Vercel | ❌ |
| DNS : `salma-studies.com` → Vercel + API | ❌ |
| Cron `generate_kpi` (Hostinger) | ❌ |
| Migration SQLite → PostgreSQL/MySQL | ❌ |
| Test end-to-end post-déploiement | ❌ |

---

### BACKEND — Todo

| Phase | Élément | Statut attendu |
|-------|---------|:-:|
| 1 | Config environnement + deps | ✅ |
| 1 | Création projet Django + app core | ✅ |
| 1 | Config BD + CORS | ✅ |
| 1 | Structure modulaire | ✅ |
| 1 | Documentation API (Swagger/OpenAPI) | ❌ (partiel) |
| 2 | Modèle `MediaAsset` | ✅ |
| 2 | Stockage fichiers (Media root/url) | ✅ |
| 3 | Modèles Scholarship + FieldVisibility | ✅ |
| 3 | Serializers + Viewsets | ✅ |
| 4 | CMS : SitePage, ContentBlock, SiteConfig, PitchVideo | ✅ |
| 4 | Service + Endpoints | ✅ |
| 5 | ContactRequest + Newsletter + Testimonials + FAQ | ✅ |
| 6 | Custom User + JWT + Permissions | ✅ |
| 7 | VisitorEvent + KpiSnapshot | ✅ |
| Seed | Commande `seed_data` + données réalistes | ✅ |

---

## 📌 6. DOCUMENTS DE RÉFÉRENCE

Quand tu travailles sur ce projet, demande-moi toujours les fichiers suivants si tu ne les as pas déjà :

| Document | Contenu | Quand le consulter |
|----------|---------|-------------------|
| `Salma_contrats_api.md` | Tous les 107 endpoints détaillés | Avant toute liaison API |
| `remarques_clients_sur_le_prototype.md` | Retours client exhaustifs | Avant toute décision UX |
| `maquette_dashboard_avec_stitch.txt` | Maquette HTML du dashboard | Avant tout travail sur l'admin |
| `cahier_de_charge_salma.pdf` | Cahier des charges complet | Pour le cadrage général |
| `backend_actuel` | Code source Django complet | Pour comprendre les modèles/serializers |
| `frontend_actuel` | Code source Next.js complet | Pour comprendre l'architecture existante |

---

## 📌 7. PROCÉDURE À SUIVRE À CHAQUE SESSION

```
1. LIRE ce prompt entièrement
2. Demander les fichiers de contexte à jour (code frontend + backend actuels)
3. AUDITER : parcourir la section 5 (TODO complète) et indiquer le statut RÉEL de chaque item
   → Format : ✅ fait | 🔧 partiel | ❌ non fait
   → Ne sauter AUCUN item, y compris ceux marqués ✅
4. IDENTIFIER les écarts entre le statut attendu et le statut réel
5. RÉSUMER l'avancement global (% par phase)
6. DEMANDER : "Sur quelle tâche veux-tu qu'on travaille ?"
7. EXÉCUTER la tâche demandée en respectant :
   - L'architecture (composant → dictionnaire → repository → api-client)
   - Le TypeScript strict
   - L'i18n (tout texte visible en FR/EN)
   - Le field_visibility sur les bourses
   - Le responsive mobile-first
```

---

## 📌 8. ORDRE D'EXÉCUTION RECOMMANDÉ

1. Types TypeScript manquants (1.1) — base de tout
2. Repositories manquants (1.2) — briques d'accès API
3. Dictionnaires manquants (1.3) — orchestration
4. Dashboard bourses CRUD (3.2) — valeur immédiate pour le client
5. Dashboard CMS (3.3) — autonomie totale du boss
6. Formulaire contact + RDV (2.4, 2.5) — conversion !
7. Témoignages vitrine + admin (2.6, 3.7)
8. Newsletter vitrine + admin (4.5, 3.6)
9. Contacts & candidatures admin (3.5)
10. KPI Dashboard (3.8) — analytics
11. Chatbot Gemini (4.1)
12. Médias admin (3.4)
13. Polish UX (4.2, 4.3) + Cookies (4.4)
14. SEO (4.7) + Notifications (4.6)
15. Déploiement final (Phase 5)

---

> **Rappel** : Le backend V1 est **déjà déployé** sur `https://api-x75k2m8-v1.agtgroupholding.com/api/docs/`. La phase actuelle est la **liaison frontend ↔ backend** et la complétion du dashboard admin. L'objectif est d'arriver au produit complet déployable.