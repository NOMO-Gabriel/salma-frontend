import { Scholarship } from "@/types/scholarship";

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "1",
    title: { fr: "Bourse du Gouvernement Chinois (CSC)", en: "Chinese Government Scholarship (CSC)" },
    organization: { fr: "Conseil des Bourses de Chine", en: "China Scholarship Council" },
    description: { 
      fr: "Bourse complète pour les programmes de Master et Doctorat dans les meilleures universités chinoises.", 
      en: "Full scholarship for Master's and Doctoral programs in top Chinese universities." 
    },
    destinationCountry: "CHINE",
    imageUrl: "https://images.unsplash.com/photo-1540608801476-6e9367d53386?q=80&w=800",
    level: "MASTER",
    studyFields: [{ fr: "Ingénierie", en: "Engineering" }, { fr: "Sciences", en: "Sciences" }],
    languageRequirement: { fr: "HSK 4 ou IELTS 6.5", en: "HSK 4 or IELTS 6.5" },
    status: "OUVERT",
    deadline: "2026-03-30",
    coverageType: "TOTALE",
    amountDetails: { fr: "Scolarité + Logement + 3000 RMB/mois", en: "Tuition + Housing + 3000 RMB/month" },
    createdAt: "2026-01-15",
    updatedAt: "2026-02-20"
  },
  {
    id: "2",
    title: { fr: "Bourse d'Études DAAD Allemagne", en: "DAAD Germany Scholarship" },
    organization: { fr: "DAAD (Service Allemand d'Échanges)", en: "DAAD Academic Exchange Service" },
    description: { 
      fr: "Soutien aux étudiants internationaux pour des études de Master en Allemagne.", 
      en: "Support for international students for Master's studies in Germany." 
    },
    destinationCountry: "ALLEMAGNE",
    imageUrl: "https://images.unsplash.com/photo-1599946347341-6cd39444452f?q=80&w=800",
    level: "MASTER",
    studyFields: [{ fr: "Économie", en: "Economics" }, { fr: "Développement", en: "Development" }],
    languageRequirement: { fr: "B2 Allemand ou IELTS 6.0", en: "B2 German or IELTS 6.0" },
    status: "URGENT",
    deadline: "2026-03-15",
    coverageType: "PARTIELLE",
    amountDetails: { fr: "934 € / mois", en: "934 € / month" },
    createdAt: "2026-01-20",
    updatedAt: "2026-02-18"
  },
  {
    id: "3",
    title: { fr: "Bourse du Maire de Shanghai", en: "Shanghai Government Scholarship" },
    organization: { fr: "Gouvernement de Shanghai", en: "Shanghai Municipal Government" },
    description: { 
      fr: "Financement pour les étudiants internationaux souhaitant étudier à Shanghai.", 
      en: "Funding for international students wishing to study in Shanghai." 
    },
    destinationCountry: "CHINE",
    imageUrl: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=800",
    level: "LICENCE",
    studyFields: [{ fr: "Commerce International", en: "International Business" }],
    languageRequirement: { fr: "Anglais ou Chinois", en: "English or Chinese" },
    status: "OUVERT",
    deadline: "2026-05-20",
    coverageType: "TOTALE",
    amountDetails: { fr: "Couverture complète", en: "Full coverage" },
    createdAt: "2026-02-01",
    updatedAt: "2026-02-01"
  },
  {
    id: "4",
    title: { fr: "Bourse de l'Université Technique de Munich", en: "TU Munich Merit Scholarship" },
    organization: { fr: "TUM Allemagne", en: "TU Munich Germany" },
    description: { 
      fr: "Bourse au mérite pour les étudiants en ingénierie et technologies.", 
      en: "Merit scholarship for students in engineering and technology." 
    },
    destinationCountry: "ALLEMAGNE",
    imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800",
    level: "LICENCE",
    studyFields: [{ fr: "Mécatronique", en: "Mechatronics" }, { fr: "IA", en: "AI" }],
    languageRequirement: { fr: "C1 Allemand requis", en: "C1 German required" },
    status: "EN_ATTENTE",
    deadline: "2026-06-01",
    coverageType: "SCOLARITÉ",
    amountDetails: { fr: "Exonération des frais", en: "Tuition waiver" },
    createdAt: "2026-02-10",
    updatedAt: "2026-02-10"
  },
  {
    id: "5",
    title: { fr: "Bourse Route de la Soie (Anhui)", en: "Silk Road Scholarship (Anhui)" },
    organization: { fr: "Province d'Anhui", en: "Anhui Province" },
    description: { 
      fr: "Bourse spéciale pour les pays de la ceinture et de la route.", 
      en: "Special scholarship for Belt and Road initiative countries." 
    },
    destinationCountry: "CHINE",
    imageUrl: "https://images.unsplash.com/photo-1525910303722-dc909867040f?q=80&w=800",
    level: "MASTER",
    studyFields: [{ fr: "Agriculture", en: "Agriculture" }, { fr: "Logistique", en: "Logistics" }],
    languageRequirement: { fr: "Anglais parlé", en: "Spoken English" },
    status: "OUVERT",
    deadline: "2026-04-30",
    coverageType: "TOTALE",
    amountDetails: { fr: "Bourse complète + Vol", en: "Full scholarship + Flight" },
    createdAt: "2026-02-12",
    updatedAt: "2026-02-12"
  },
  {
    id: "6",
    title: { fr: "Bourse Fondation Heinrich Böll", en: "Heinrich Böll Foundation Scholarship" },
    organization: { fr: "Fondation Böll", en: "Böll Foundation" },
    description: { 
      fr: "Bourse pour les étudiants engagés dans le développement durable.", 
      en: "Scholarship for students committed to sustainable development." 
    },
    destinationCountry: "ALLEMAGNE",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800",
    level: "DOCTORAT",
    studyFields: [{ fr: "Environnement", en: "Environment" }, { fr: "Politique", en: "Politics" }],
    languageRequirement: { fr: "DSH 2 requis", en: "DSH 2 required" },
    status: "FERMÉ",
    deadline: "2026-02-01",
    coverageType: "ALLOCATION",
    amountDetails: { fr: "1350 € / mois", en: "1350 € / month" },
    createdAt: "2025-12-01",
    updatedAt: "2026-01-05"
  },
  {
    id: "7",
    title: { fr: "Bourse d'Excellence HUST Wuhan", en: "HUST Wuhan Excellence Scholarship" },
    organization: { fr: "Université HUST", en: "HUST University" },
    description: { 
      fr: "Bourse pour les étudiants brillants en informatique.", 
      en: "Scholarship for brilliant students in computer science." 
    },
    destinationCountry: "CHINE",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
    level: "MASTER",
    studyFields: [{ fr: "Logiciel", en: "Software Engineering" }],
    languageRequirement: { fr: "HSK 5", en: "HSK 5" },
    status: "OUVERT",
    deadline: "2026-04-15",
    coverageType: "TOTALE",
    amountDetails: { fr: "Scolarité + Allocation", en: "Tuition + Allowance" },
    createdAt: "2026-02-14",
    updatedAt: "2026-02-14"
  },
  {
    id: "8",
    title: { fr: "Bourse Fondation Konrad-Adenauer", en: "Konrad-Adenauer-Stiftung Scholarship" },
    organization: { fr: "Fondation KAS", en: "KAS Foundation" },
    description: { 
      fr: "Bourse d'excellence pour les futurs cadres.", 
      en: "Excellence scholarship for future leaders." 
    },
    destinationCountry: "ALLEMAGNE",
    imageUrl: "https://images.unsplash.com/photo-1527672829624-f3a142faafbc?q=80&w=800",
    level: "MASTER",
    studyFields: [{ fr: "Droit", en: "Law" }, { fr: "Management", en: "Management" }],
    languageRequirement: { fr: "B2 Allemand", en: "B2 German" },
    status: "OUVERT",
    deadline: "2026-07-15",
    coverageType: "ALLOCATION",
    amountDetails: { fr: "850 € / mois", en: "850 € / month" },
    createdAt: "2026-02-18",
    updatedAt: "2026-02-18"
  }
];