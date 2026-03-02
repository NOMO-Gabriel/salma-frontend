export interface PrivacySection {
  id: string;
  title: string;
  content: string;
}

export interface PrivacyContent {
  title: string;
  subtitle: string;
  lastUpdated: string;
  intro: string;
  sections: PrivacySection[];
  footer: {
    text: string;
    email: string;
  };
}

export interface PrivacyScope {
  privacyPage: PrivacyContent;
}