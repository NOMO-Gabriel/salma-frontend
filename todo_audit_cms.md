### 🛠 PHASE 0 : Composants Globaux (Layout)
*Ces éléments apparaissent sur toutes les pages. Ils utilisent généralement le scope `layout` ou `common`.*

- [ ] **Topbar** (Infos de contact, réseaux)
- [ ] **Navbar** (Libellés des menus, dropdowns)
- [ ] **Footer** (Slogan, liens, coordonnées, copyright)
- [ ] **NewsletterForm** (Placeholders, textes de succès/erreur)
- [ ] **WhatsAppButton** (Message pré-rempli, aide)
- [ ] **ChatbotWidget** (Message de bienvenue, suggestions, CTAs)
- [ ] **CookieBanner** (Texte légal, boutons)

---

### 📄 PHASE 1 : Pages Accessoires
*Pages à contenu principalement textuel et informatif.*

- [ ] **Page Confidentialité**
    - [ ] Présence des sections dans `seed.py`
    - [ ] Appel `cmsSwitcher` dans `privacy/page.tsx`
- [ ] **Page À Propos**
    - [ ] Hero (Texte + Image `about-startup.jpg`)
    - [ ] Section Valeurs (Titres + Descriptions)
    - [ ] Section Localisation (Adresse, Horaires, Map)
    - [ ] Appel `cmsSwitcher` dans `a-propos/page.tsx`
- [ ] **Page Services**
    - [ ] Hero (Titre, Sous-titre)
    - [ ] Liste des Services (Étude, Touriste, Travail, Assurance)
    - [ ] Appel `cmsSwitcher` dans `services/page.tsx`

---

### 🎓 PHASE 2 : Coeur Métier (Bourses)
*Vérification de la parité entre les 9 bourses statiques et les 9 bourses du seeder.*

- [ ] **Catalogue (Liste)**
    - [ ] Filtres (Pays, Niveaux, Domaines)
    - [ ] Titres marketing (Génération dynamique)
- [ ] **Fiche Détail**
    - [ ] Mapping des champs (Description, Avantages, Critères)
    - [ ] **Field Visibility** (Vérifier que les clés masquées en DB le sont sur l'UI)
    - [ ] Appel `scholarshipDictionary` (Mode hybride static/api)

---

### 🏠 PHASE 3 : Page d'Accueil (Le Final)
*La page la plus complexe car elle agrège plusieurs scopes.*

- [ ] **Hero Carousel**
    - [ ] Textes des 3 slides
    - [ ] Images de fond (Liaison médiathèque)
    - [ ] CTAs (Liens et libellés)
- [ ] **TrustBar**
    - [ ] Les 3 piliers (Expertise, Rapidité, Garantie)
- [ ] **StatsCounter**
    - [ ] Les 4 compteurs (Visas, Partenaires, Expérience, Succès)
- [ ] **FeaturedScholarships**
    - [ ] Titre de section
    - [ ] Liaison avec les bourses marquées `est_mise_en_avant`
- [ ] **SuccessStories (Témoignages)**
    - [ ] Titre et description
    - [ ] Liaison avec le modèle `Testimonial` (Approbation admin)
- [ ] **VideoTestimonial**
    - [ ] Titre, nom de l'étudiant
    - [ ] URL de la vidéo (Liaison `PitchVideo`)
- [ ] **ContactForm (Home)**
    - [ ] Libellés des champs et messages de retour

