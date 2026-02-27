// src/app/(visitor)/bourses/[id]/DetailClient.tsx
// ==============================================================================
//  DetailClient — Client Component minimal
//  Rôle unique : déclencher le tracking KPI au chargement de la page
//  Toute la logique d'affichage reste dans le Server Component page.tsx
// ==============================================================================
"use client";

import { useEffect } from "react";
import { eventsRepository } from "@/repositories/events.repository";

interface Props {
  scholarshipId: string;
  scholarshipTitle: string;
}

export default function DetailClient({ scholarshipId }: Props) {
  useEffect(() => {
    // Tracking vue bourse — silencieux, ne bloque jamais le rendu
    eventsRepository.trackScholarshipView(scholarshipId);
  }, [scholarshipId]);

  // Ne rend rien — purement comportemental
  return null;
}
