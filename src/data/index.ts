// src/data/index.ts
// Point d'entrée central des données statiques de SALMA
// Toutes les données sont ici — les composants importent depuis @/data

import { Service, VisaType } from "@/types";

// ============================================================
//  SERVICES
// ============================================================
export const services: Service[] = [
  { id: "visa-etude",    category: "visa",   icon: "graduation-cap", isActive: true },
  { id: "visa-touriste", category: "visa",   icon: "plane",          isActive: true },
  { id: "visa-travail",  category: "visa",   icon: "briefcase",      isActive: true },
  { id: "bourse-etude",  category: "bourse", icon: "star",           isActive: true },
];

// ============================================================
//  TYPES DE VISA
// ============================================================
export const visaTypes: VisaType[] = [
  { id: "visa-etude",    processingTime: "3 semaines", isActive: true },
  { id: "visa-touriste", processingTime: "3 semaines", isActive: true },
  { id: "visa-travail",  processingTime: "3 semaines", isActive: true },
];