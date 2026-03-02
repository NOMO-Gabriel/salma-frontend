export interface ServiceItem {
  title: string;
  desc: string;
  icon: string;
  delay: string; // ex: "3 semaines"
}

export interface ServicesPageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  items: {
    study: ServiceItem;
    tourist: ServiceItem;
    work: ServiceItem;
    insurance: ServiceItem;
  };
}

export interface ServicesScope {
  servicesPage: ServicesPageContent;
}