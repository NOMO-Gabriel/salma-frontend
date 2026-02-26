# Contrats d'API — Projet SALMA
## AG Technologies — Document de référence

---

## 1. AUTH — `/api/auth`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/auth/login` | Connexion → retourne le token | Non |
| POST | `/api/auth/logout` | Déconnexion → invalide le token | Oui |
| POST | `/api/auth/register` | Créer un compte admin | Oui (super admin) |
| GET | `/api/auth/me` | Récupérer son profil | Oui |
| PUT | `/api/auth/me` | Modifier son profil complet | Oui |
| PATCH | `/api/auth/me` | Modifier partiellement son profil | Oui |
| PUT | `/api/auth/change-password` | Modifier son mot de passe | Oui |
| POST | `/api/auth/reset-password` | Demander réinitialisation par email | Non |
| POST | `/api/auth/reset-password/confirm` | Confirmer nouveau mot de passe | Non |

---

## 2. BOURSES

### 2.1 Publique — `/api/bourses`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/bourses` | Liste avec filtres (pays, niveau, couverture, statut, recherche) | Non |
| GET | `/api/bourses/mise-en-avant` | Bourses à la une | Non |
| GET | `/api/bourses/{id}` | Fiche détaillée (visibilité appliquée) | Non |

### 2.2 Admin — `/api/admin/bourses`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/bourses` | Liste complète (tous champs) | Oui |
| GET | `/api/admin/bourses/{id}` | Détail complet | Oui |
| POST | `/api/admin/bourses` | Créer une bourse | Oui |
| PUT | `/api/admin/bourses/{id}` | Modifier complètement | Oui |
| PATCH | `/api/admin/bourses/{id}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/bourses/{id}` | Supprimer | Oui |
| PUT | `/api/admin/bourses/{id}/visibilite` | Modifier la visibilité complète | Oui |
| PATCH | `/api/admin/bourses/{id}/visibilite` | Modifier partiellement la visibilité | Oui |
| PUT | `/api/admin/bourses/{id}/mise-en-avant` | Activer/désactiver mise en avant | Oui |

#### Domaines d'études

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/admin/bourses/{id}/domaines` | Ajouter un domaine | Oui |
| PUT | `/api/admin/bourses/{id}/domaines/{domId}` | Modifier complètement | Oui |
| PATCH | `/api/admin/bourses/{id}/domaines/{domId}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/bourses/{id}/domaines/{domId}` | Supprimer | Oui |

#### Avantages

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/admin/bourses/{id}/avantages` | Ajouter un avantage | Oui |
| PUT | `/api/admin/bourses/{id}/avantages/{avId}` | Modifier complètement | Oui |
| PATCH | `/api/admin/bourses/{id}/avantages/{avId}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/bourses/{id}/avantages/{avId}` | Supprimer | Oui |

#### Critères d'éligibilité

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/admin/bourses/{id}/criteres` | Ajouter un critère | Oui |
| PUT | `/api/admin/bourses/{id}/criteres/{crId}` | Modifier complètement | Oui |
| PATCH | `/api/admin/bourses/{id}/criteres/{crId}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/bourses/{id}/criteres/{crId}` | Supprimer | Oui |

#### Images

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/admin/bourses/{id}/images` | Ajouter une image | Oui |
| DELETE | `/api/admin/bourses/{id}/images/{imgId}` | Supprimer une image | Oui |
| PUT | `/api/admin/bourses/{id}/images/{imgId}/principale` | Définir comme image principale | Oui |

---

## 3. DEMANDES DE CONTACT

### 3.1 Publique — `/api/contact`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/contact` | Soumettre une demande (+ bourses optionnelles + accepte newsletter) | Non |

### 3.2 Admin — `/api/admin/contacts`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/contacts` | Liste des demandes (filtres : lu/non lu, date) | Oui |
| GET | `/api/admin/contacts/{id}` | Détail avec bourses associées | Oui |
| PATCH | `/api/admin/contacts/{id}` | Marquer lu, ajouter notes | Oui |
| DELETE | `/api/admin/contacts/{id}` | Supprimer | Oui |

---

## 4. NEWSLETTER & ANNONCES

### 4.1 Publique — `/api/newsletter`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/newsletter/inscription` | S'inscrire (email obligatoire, reste optionnel) | Non |
| POST | `/api/newsletter/desinscription` | Se désinscrire | Non |

### 4.2 Admin Abonnés — `/api/admin/newsletter`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/newsletter/abonnes` | Liste des abonnés (filtres : actif, pays, niveau) | Oui |
| GET | `/api/admin/newsletter/abonnes/{id}` | Détail d'un abonné | Oui |
| DELETE | `/api/admin/newsletter/abonnes/{id}` | Supprimer un abonné | Oui |

### 4.3 Admin Annonces — `/api/admin/annonces`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/annonces` | Liste des annonces | Oui |
| GET | `/api/admin/annonces/{id}` | Détail avec bourses liées | Oui |
| POST | `/api/admin/annonces` | Créer une annonce (brouillon) | Oui |
| PUT | `/api/admin/annonces/{id}` | Modifier complètement | Oui |
| PATCH | `/api/admin/annonces/{id}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/annonces/{id}` | Supprimer | Oui |
| POST | `/api/admin/annonces/{id}/envoyer` | Envoyer à tous les abonnés actifs | Oui |

---

## 5. TÉMOIGNAGES

### 5.1 Publique — `/api/temoignages`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/temoignages` | Liste des témoignages approuvés et affichés | Non |
| POST | `/api/temoignages` | Soumettre un témoignage (formulaire site ou lien email) | Non |

### 5.2 Admin — `/api/admin/temoignages`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/temoignages` | Liste complète (approuvés + en attente) | Oui |
| GET | `/api/admin/temoignages/{id}` | Détail | Oui |
| POST | `/api/admin/temoignages` | Créer manuellement (depuis WhatsApp/mail) | Oui |
| PUT | `/api/admin/temoignages/{id}` | Modifier complètement | Oui |
| PATCH | `/api/admin/temoignages/{id}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/temoignages/{id}` | Supprimer | Oui |

---

## 6. CHATBOT IA

### 6.1 Publique — `/api/chatbot`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/chatbot/message` | Envoyer une question → Gemini répond via FAQ | Non |

### 6.2 Admin FAQ — `/api/admin/faq`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/faq` | Liste des FAQ | Oui |
| GET | `/api/admin/faq/{id}` | Détail | Oui |
| POST | `/api/admin/faq` | Créer une question/réponse | Oui |
| PUT | `/api/admin/faq/{id}` | Modifier complètement | Oui |
| PATCH | `/api/admin/faq/{id}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/faq/{id}` | Supprimer | Oui |

---

## 7. CMS — CONTENU DU SITE

### 7.1 Publique — `/api`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/pages` | Liste des pages publiées | Non |
| GET | `/api/pages/{slug}` | Contenu complet d'une page (blocs visibles) | Non |
| GET | `/api/config` | Configurations globales | Non |
| GET | `/api/videos` | Vidéos de pitch actives | Non |

### 7.2 Admin Pages — `/api/admin/pages`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/pages` | Liste de toutes les pages | Oui |
| GET | `/api/admin/pages/{id}` | Détail avec tous les blocs | Oui |
| POST | `/api/admin/pages` | Créer une page | Oui |
| PUT | `/api/admin/pages/{id}` | Modifier complètement | Oui |
| PATCH | `/api/admin/pages/{id}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/pages/{id}` | Supprimer | Oui |

#### Blocs de contenu

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/admin/pages/{id}/blocs` | Ajouter un bloc | Oui |
| PUT | `/api/admin/pages/{id}/blocs/{blocId}` | Modifier complètement | Oui |
| PATCH | `/api/admin/pages/{id}/blocs/{blocId}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/pages/{id}/blocs/{blocId}` | Supprimer | Oui |

### 7.3 Admin Config — `/api/admin/config`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/config` | Liste de toutes les configs | Oui |
| POST | `/api/admin/config` | Créer une config | Oui |
| PUT | `/api/admin/config/{cle}` | Modifier complètement | Oui |
| PATCH | `/api/admin/config/{cle}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/config/{cle}` | Supprimer | Oui |

### 7.4 Admin Vidéos — `/api/admin/videos`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/videos` | Liste des vidéos | Oui |
| GET | `/api/admin/videos/{id}` | Détail | Oui |
| POST | `/api/admin/videos` | Ajouter une vidéo | Oui |
| PUT | `/api/admin/videos/{id}` | Modifier complètement | Oui |
| PATCH | `/api/admin/videos/{id}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/videos/{id}` | Supprimer | Oui |

---

## 8. SERVICES

### 8.1 Publique — `/api/services`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/services` | Liste des services actifs | Non |
| GET | `/api/services/{slug}` | Détail d'un service | Non |

### 8.2 Admin — `/api/admin/services`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/services` | Liste complète | Oui |
| GET | `/api/admin/services/{id}` | Détail | Oui |
| POST | `/api/admin/services` | Créer | Oui |
| PUT | `/api/admin/services/{id}` | Modifier complètement | Oui |
| PATCH | `/api/admin/services/{id}` | Modifier partiellement | Oui |
| DELETE | `/api/admin/services/{id}` | Supprimer | Oui |

#### Images

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/admin/services/{id}/images` | Ajouter une image | Oui |
| DELETE | `/api/admin/services/{id}/images/{imgId}` | Supprimer une image | Oui |
| PUT | `/api/admin/services/{id}/images/{imgId}/principale` | Définir comme image principale | Oui |

---

## 9. MÉDIAS

### Admin uniquement — `/api/admin/medias`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/medias` | Bibliothèque de fichiers | Oui |
| GET | `/api/admin/medias/{id}` | Détail d'un fichier | Oui |
| POST | `/api/admin/medias` | Uploader un fichier | Oui |
| PATCH | `/api/admin/medias/{id}` | Modifier les métadonnées | Oui |
| DELETE | `/api/admin/medias/{id}` | Supprimer | Oui |

---

## 10. KPI & ANALYTICS

### 10.1 Publique — `/api/evenements`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/evenements` | Enregistrer un événement visiteur | Non |

### 10.2 Admin — `/api/admin/kpi`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/admin/kpi/snapshots` | Liste des snapshots (filtres : période) | Oui |
| GET | `/api/admin/kpi/snapshots/{date}` | Snapshot d'une date | Oui |
| GET | `/api/admin/kpi/temps-reel` | Stats en temps réel | Oui |
| GET | `/api/admin/kpi/conversion` | Taux de conversion (global + par bourse) | Oui |
| GET | `/api/admin/kpi/evenements` | Événements bruts (filtres : type, page, bourse, période) | Oui |

---

## Récapitulatif

| Module | Endpoints publics | Endpoints admin | Total |
|--------|:-:|:-:|:-:|
| Auth | 2 | 7 | 9 |
| Bourses | 3 | 22 | 25 |
| Contact | 1 | 4 | 5 |
| Newsletter & Annonces | 2 | 10 | 12 |
| Témoignages | 2 | 6 | 8 |
| Chatbot | 1 | 5 | 6 |
| CMS | 3 | 17 | 20 |
| Services | 2 | 9 | 11 |
| Médias | 0 | 5 | 5 |
| KPI | 1 | 5 | 6 |
| **TOTAL** | **17** | **90** | **107** |