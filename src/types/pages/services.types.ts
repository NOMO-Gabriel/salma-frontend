// src/types/pages/services.types.ts
export interface ServiceItemTexts {
  title: string;
  desc: string;
}

export interface ServicesTexts {
  servicesPage: {
    title: string;
    subtitle: string;
    description: string;
    items: {
      study: ServiceItemTexts;
      tourist: ServiceItemTexts;
      work: ServiceItemTexts;
      insurance: ServiceItemTexts;
    };
  };
}