### 📋 To-Do List : Projet SALMA (Version Client-First)

**Phase 1 : Socle Technique & Design (L'urgence)**
- [x] Configuration du client API avec `fetch` (Gestion des erreurs et Base URL).
- [x] Stabilisation du thème : Forcé en Clair, Architecture sémantique prête.
- [ ] Définition des Types TypeScript (basés sur les modèles Django réels : Scholarship, Service, KPI).
- [ ] Création des Repositories (scholarship.repository.ts, cms.repository.ts, etc.) avec toutes le sméthodes
- [] Configuration de la liaison repositories et dictionnaire afin que les composants connaisent uniquement les dictionnaire qui eux coinnqisent les repositories qui eux connqissent le serveur ainsi les appels serveurs sont optimisées via des server components et donc la performance aussi 

**Phase 2 : Dynamisation de la Vitrine (Liaison Backend)**
- [ ] Liaison de la **Home Page** (Stats réelles, Bourses à la une).
- [ ] Liaison du **Catalogue complet** (Fetch des bourses + Filtres dynamiques).
- [ ] Création de la **Page de Détail** dynamique (Route `[id]` + Affichage conditionnel des champs).
- [ ] Envoi réel du **Formulaire de Contact** vers l'API Django.

**Phase 3 : Dashboard Admin (Le Pilotage)**
- [ ] Système d'authentification JWT (Login + Protection des routes).
- [ ] Interface de gestion des bourses (CRUD complet).
- [ ] Gestionnaire de médias (Upload et bibliothèque).
- [ ] Suivi des candidatures et des abonnés newsletter.

**Phase 4 : Retours Clients & Excellence (Le Polissage)**
- [ ] Intégration du Chatbot IA (Gemini).
- [ ] Ajout des animations raffinées (Framer Motion ou CSS transitions avancées).
- [ ] Mise en place des KPI Analytics dans le dashboard.
