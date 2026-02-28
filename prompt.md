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

observer todo.md pour voir la liste des taches

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

> **Rappel** : Le backend V1 est **déjà déployé** sur `https://api-x75k2m8-v1.agtgroupholding.com/api/docs/`. La phase actuelle est la **liaison frontend ↔ backend + polisage** et la complétion du dashboard admin. L'objectif est d'arriver au produit complet déployable.