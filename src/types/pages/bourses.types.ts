// src/types/pages/bourses.types.ts
export interface BoursesTexts {
  catalog: {
    title: string;
    subtitle: string;
    description: string;
    searchPlaceholder: string;
    noResults: string;
    found: string;
  };
  scholarships: {
    deadline: string;
    language: string;
    viewDetails: string;
  };
}
// src/types/pages/bourses.types.ts

export interface ScholarshipDetailLabels {
  backToList: string;
  organization: string;
  eligibility: string;
  benefits: string;
  studyFields: string;
  applyTitle: string;
  applyDesc: string;
  btnApply: string;
  btnForm: string;
}

export interface BoursesTexts {
  catalog: {
    title: string;
    subtitle: string;
    description: string;
    searchPlaceholder: string;
    noResults: string;
    found: string;
  };
  scholarships: {
    deadline: string;
    language: string;
    viewDetails: string;
  };
  // Ajout de la clé pour le détail
  scholarshipDetail: ScholarshipDetailLabels; 
}