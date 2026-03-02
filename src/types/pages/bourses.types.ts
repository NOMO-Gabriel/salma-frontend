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
  // AJOUT DES CLÉS MANQUANTES :
  presentationTitle: string;
  noCriteriaMsg: string;
}

export interface BoursesTexts {
  catalog: {
    title: string;
    subtitle: string;
    description: string;
    searchPlaceholder: string;
    noResults: string;
    found: string;
    filterDomain: string;
    allDomains: string;
    reservedInfo: string;
  };
  scholarships: {
    deadline: string;
    language: string;
    viewDetails: string;
  };
  scholarshipDetail: ScholarshipDetailLabels; 
}