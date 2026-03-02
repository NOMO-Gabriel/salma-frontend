// src/dictionaries/data/static/bourses/all-scholarships.ts
// =============================================================================
//  SOURCE DE VÉRITÉ STATIQUE — Bourses du client SALMA
//  Domaines : extraits du PDF client (AI Studio)
//  Le seeder Django s'alignera sur ce fichier plus tard.
//
//  📁 Images à placer dans /public/images/bourses/ :
//  ┌──────────────────────────┬─────────────────────────────────────────────┐
//  │ bourse-csc.jpg           │ Campus universitaire chinois, lumière dorée │
//  │ bourse-shanghai.jpg      │ Skyline Shanghai / Bund la nuit             │
//  │ bourse-silk-road.jpg     │ Campagne verte Anhui / pagode               │
//  │ bourse-hust.jpg          │ Labo informatique / étudiant high-tech      │
//  │ bourse-confucius.jpg     │ Lanterne rouge / calligraphie chinoise      │
//  │ bourse-daad.jpg          │ Bibliothèque universitaire allemande        │
//  │ bourse-tum.jpg           │ Campus TU Munich, architecture classique    │
//  │ bourse-boll.jpg          │ Forêt / développement durable, Allemagne   │
//  │ bourse-kas.jpg           │ Reichstag Berlin / leadership politique     │
//  └──────────────────────────┴─────────────────────────────────────────────┘
// =============================================================================

import type { ScholarshipPublicListItem } from "@/types/api/scholarship.types";


// Mise à jour du helper pour inclure les textes alternatifs requis par MediaAssetMinimal
function img(id: string, filename: string, altFr = "Image bourse", altEn = "Scholarship image") {
  return {
    id,
    url_fichier: `/images/bourses/${filename}`,
    nom_fichier: filename,
    type_mime: "image/jpeg" as const,
    texte_alt_fr: altFr, // Ajouté pour conformité
    texte_alt_en: altEn, // Ajouté pour conformité
  };
}

function d(id: string, fr: string, en: string, icone = "") {
  return { id, nom_fr: fr, nom_en: en, icone };
}

// =============================================================================
//  LES 9 BOURSES DU CLIENT
//  Ordre : identique au seeder Python (ordre_affichage 1→9)
// =============================================================================
export const ALL_STATIC_SCHOLARSHIPS: ScholarshipPublicListItem[] = [

  // ── 1. CSC — Gouvernement Chinois ─────────────────────────────────────────
  // ordre=1 · est_mise_en_avant=true · OUVERT · TOTALE
  {
    id: "static-csc",
    titre_fr: "Bourse CSC — Gouvernement Chinois",
    titre_en: "Chinese Government Scholarship (CSC)",
    organisme_fr: "Conseil des Bourses de Chine (CSC)",
    organisme_en: "China Scholarship Council (CSC)",
    pays_destination: "chine",
    niveau: "master",
    statut: "ouvert",
    type_couverture: "complete",
    date_limite: "2026-03-31",
    exigence_langue_fr: "Anglais ou HSK 4",
    exigence_langue_en: "English or HSK 4",
    details_montant_fr: "Scolarité + Logement + Allocation 3 000 ¥/mois",
    details_montant_en: "Tuition + Housing + 3,000 ¥/month allowance",
    est_mise_en_avant: true,
    domaines: [
      d("csc-1", "Ingénierie Civile",         "Civil Engineering",            "🏗️"),
      d("csc-2", "Génie Mécanique",           "Mechanical Engineering",       "⚙️"),
      d("csc-3", "Informatique",              "Computer Science & Technology","💻"),
      d("csc-4", "Médecine Clinique (MBBS)",  "Clinical Medicine (MBBS)",     "🏥"),
      d("csc-5", "Santé Publique",            "Public Health",                "🌍"),
    ],
    image_principale: img("img-csc", "bourse-csc.jpg"),
     ordre_affichage: 9,
  },

  // ── 2. Bourse du Maire de Shanghai ────────────────────────────────────────
  // ordre=2 · est_mise_en_avant=true · OUVERT · TOTALE
  {
    id: "static-shanghai",
    titre_fr: "Bourse du Maire de Shanghai",
    titre_en: "Shanghai Mayor Scholarship",
    organisme_fr: "Gouvernement Municipal de Shanghai",
    organisme_en: "Shanghai Municipal Government",
    pays_destination: "chine",
    niveau: "licence",
    statut: "ouvert",
    type_couverture: "complete",
    date_limite: "2026-05-20",
    exigence_langue_fr: "Anglais ou Chinois",
    exigence_langue_en: "English or Chinese",
    details_montant_fr: "Couverture complète",
    details_montant_en: "Full coverage",
    est_mise_en_avant: true,
    domaines: [
      d("sha-1", "Commerce International",   "International Business", "🌐"),
      d("sha-2", "Finance",                  "Finance",                "💹"),
      d("sha-3", "Économie",                 "Economics",              "📈"),
      d("sha-4", "MBA",                      "MBA",                    "🎓"),
    ],
    image_principale: img("img-shanghai", "bourse-shanghai.jpg"),
     ordre_affichage: 8,
  },

  // ── 3. DAAD — Service Allemand d'Échanges ─────────────────────────────────
  // ordre=3 · est_mise_en_avant=true · OUVERT · PARTIELLE
  {
    id: "static-daad",
    titre_fr: "Bourse DAAD — Service Allemand d'Échanges Universitaires",
    titre_en: "DAAD — German Academic Exchange Service",
    organisme_fr: "DAAD Allemagne",
    organisme_en: "DAAD Germany",
    pays_destination: "allemagne",
    niveau: "master",
    statut: "ouvert",
    type_couverture: "partielle",
    date_limite: "2026-07-15",
    exigence_langue_fr: "B2 Allemand ou IELTS 6.0",
    exigence_langue_en: "B2 German or IELTS 6.0",
    details_montant_fr: "934 € / mois + frais de voyage",
    details_montant_en: "934 € / month + travel allowance",
    est_mise_en_avant: true,
    domaines: [
      d("daad-1", "Génie Électrique & Électronique", "Electrical & Electronic Engineering", "⚡"),
      d("daad-2", "Sciences des Matériaux",          "Materials Science & Engineering",     "🔬"),
      d("daad-3", "Droit International",             "International Law",                   "⚖️"),
      d("daad-4", "Relations Internationales",       "International Relations",             "🏛️"),
      d("daad-5", "Journalisme & Communication",     "Journalism & Communication",          "📰"),
    ],
    image_principale: img("img-daad", "bourse-daad.jpg"),
     ordre_affichage: 7,
  },

  // ── 4. TU Munich ──────────────────────────────────────────────────────────
  // ordre=4 · est_mise_en_avant=false · EN_ATTENTE · SCOLARITE (partielle)
  {
    id: "static-tum",
    titre_fr: "Bourse de l'Université Technique de Munich",
    titre_en: "TU Munich Merit Scholarship",
    organisme_fr: "TUM Allemagne",
    organisme_en: "TU Munich Germany",
    pays_destination: "allemagne",
    niveau: "licence",
    statut: "en_attente",
    type_couverture: "partielle",
    date_limite: "2026-06-01",
    exigence_langue_fr: "C1 Allemand requis",
    exigence_langue_en: "C1 German required",
    details_montant_fr: "Exonération des frais de scolarité",
    details_montant_en: "Tuition waiver",
    est_mise_en_avant: false,
    domaines: [
      d("tum-1", "Automatisation & Robotique", "Automation and Robotics",   "🤖"),
      d("tum-2", "Génie Mécanique",            "Mechanical Engineering",    "⚙️"),
      d("tum-3", "Ingénierie Chimique",        "Chemical Engineering",      "🧪"),
    ],
    image_principale: img("img-tum", "bourse-tum.jpg"),
     ordre_affichage: 6,
  },

  // ── 5. Bourse Route de la Soie — Anhui ────────────────────────────────────
  // ordre=5 · est_mise_en_avant=false · OUVERT · TOTALE
  {
    id: "static-silk-road",
    titre_fr: "Bourse Route de la Soie (Province d'Anhui)",
    titre_en: "Silk Road Scholarship (Anhui Province)",
    organisme_fr: "Gouvernement Provincial d'Anhui",
    organisme_en: "Anhui Provincial Government",
    pays_destination: "chine",
    niveau: "master",
    statut: "ouvert",
    type_couverture: "complete",
    date_limite: "2026-04-30",
    exigence_langue_fr: "Anglais parlé — aucun HSK requis",
    exigence_langue_en: "Spoken English — no HSK required",
    details_montant_fr: "Bourse complète + Billet aller-retour offert",
    details_montant_en: "Full scholarship + Round-trip flight included",
    est_mise_en_avant: false,
    domaines: [
      d("sr-1", "Génie Environnemental",    "Environmental Engineering",  "🌱"),
      d("sr-2", "Logistique & Supply Chain","Logistics & Supply Chain",   "🚚"),
      d("sr-3", "Génie Civil",             "Civil Engineering",           "🏗️"),
    ],
    image_principale: img("img-silk", "bourse-silk-road.jpg"),
     ordre_affichage: 5,
  },

  // ── 6. Fondation Heinrich Böll ────────────────────────────────────────────
  // ordre=6 · est_mise_en_avant=false · FERME · ALLOCATION (partielle)
  {
    id: "static-boll",
    titre_fr: "Bourse Fondation Heinrich Böll",
    titre_en: "Heinrich Böll Foundation Scholarship",
    organisme_fr: "Fondation Heinrich Böll",
    organisme_en: "Heinrich Böll Foundation",
    pays_destination: "allemagne",
    niveau: "doctorat",
    statut: "ferme",
    type_couverture: "partielle",
    date_limite: "2026-02-01",
    exigence_langue_fr: "DSH 2 requis",
    exigence_langue_en: "DSH 2 required",
    details_montant_fr: "1 350 € / mois",
    details_montant_en: "1,350 € / month",
    est_mise_en_avant: false,
    domaines: [
      d("boll-1", "Génie Environnemental",  "Environmental Engineering",  "🌿"),
      d("boll-2", "Science Politique",      "Political Science",          "🏛️"),
      d("boll-3", "Sociologie",             "Sociology",                  "👥"),
    ],
    image_principale: img("img-boll", "bourse-boll.jpg"),
     ordre_affichage: 4,
  },

  // ── 7. HUST Wuhan ─────────────────────────────────────────────────────────
  // ordre=7 · est_mise_en_avant=false · OUVERT · TOTALE
  {
    id: "static-hust",
    titre_fr: "Bourse d'Excellence HUST Wuhan",
    titre_en: "HUST Wuhan Excellence Scholarship",
    organisme_fr: "Université de Science & Technologie HUST, Wuhan",
    organisme_en: "Huazhong University of Science & Technology (HUST)",
    pays_destination: "chine",
    niveau: "master",
    statut: "ouvert",
    type_couverture: "complete",
    date_limite: "2026-04-15",
    exigence_langue_fr: "HSK 5 requis",
    exigence_langue_en: "HSK 5 required",
    details_montant_fr: "Scolarité + Allocation mensuelle",
    details_montant_en: "Tuition + Monthly allowance",
    est_mise_en_avant: false,
    domaines: [
      d("hust-1", "Génie Logiciel",         "Software Engineering",       "💻"),
      d("hust-2", "Technologies IT",        "Information Technology",     "🖥️"),
      d("hust-3", "Génie Biomédical",       "Biomedical Engineering",     "🏥"),
    ],
     ordre_affichage: 3,
    image_principale: img("img-hust", "bourse-hust.jpg"),
  },

  // ── 8. Fondation Konrad-Adenauer ──────────────────────────────────────────
  // ordre=8 · est_mise_en_avant=false · OUVERT · ALLOCATION (partielle)
  {
    id: "static-kas",
    titre_fr: "Bourse Fondation Konrad-Adenauer",
    titre_en: "Konrad-Adenauer-Stiftung Scholarship",
    organisme_fr: "Fondation Konrad-Adenauer (KAS)",
    organisme_en: "Konrad-Adenauer-Stiftung (KAS)",
    pays_destination: "allemagne",
    niveau: "master",
    statut: "ouvert",
    type_couverture: "partielle",
    date_limite: "2026-07-15",
    exigence_langue_fr: "B2 Allemand requis",
    exigence_langue_en: "B2 German required",
    details_montant_fr: "850 € / mois",
    details_montant_en: "850 € / month",
    est_mise_en_avant: false,
    domaines: [
      d("kas-1", "Droit",                 "Law",                        "⚖️"),
      d("kas-2", "Relations Intern.",     "International Relations",    "🌐"),
      d("kas-3", "Gestion d'Entreprise", "Business Administration",    "📊"),
    ],
     ordre_affichage: 2,
    image_principale: img("img-kas", "bourse-kas.jpg"),
  },

  // ── 9. Institut Confucius ─────────────────────────────────────────────────
  // ordre=9 · est_mise_en_avant=false · OUVERT · PARTIELLE
  {
    id: "static-confucius",
    titre_fr: "Bourse Institut Confucius",
    titre_en: "Confucius Institute Scholarship",
    organisme_fr: "Hanban / Institut Confucius (Chine)",
    organisme_en: "Hanban / Confucius Institute (China)",
    pays_destination: "chine",
    niveau: "licence",
    statut: "ouvert",
    type_couverture: "partielle",
    date_limite: "2026-04-30",
    exigence_langue_fr: "HSK 3 minimum",
    exigence_langue_en: "HSK 3 minimum",
    details_montant_fr: "Allocation 2 500 ¥/mois + Logement sur campus",
    details_montant_en: "2,500 ¥/month allowance + On-campus housing",
    est_mise_en_avant: false,
    domaines: [
      d("conf-1", "Langue & Culture Chinoises", "Chinese Language & Culture", "🀄"),
      d("conf-2", "Éducation",                 "Education",                  "📚"),
      d("conf-3", "Tourisme & Hôtellerie",     "Tourism & Hospitality",      "🏨"),
    ],
     ordre_affichage: 1,
    image_principale: img("img-confucius", "bourse-confucius.jpg"),
  },
];

// ── Les 3 bourses "mise en avant" pour la Home ────────────────────────────────
// CSC (ordre 1) · Shanghai Mayor (ordre 2) · DAAD (ordre 3)
export const STATIC_FEATURED_SCHOLARSHIPS = ALL_STATIC_SCHOLARSHIPS.filter(
  (b) => b.est_mise_en_avant
);