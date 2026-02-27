// src/app/(visitor)/bourses/page.tsx
// ==============================================================================
//  Catalogue Bourses — SERVER COMPONENT
//  Les filtres vivent dans l'URL (?pays=chine&niveau=master&page=2)
//  → SEO parfait, partage d'URL, navigation navigateur fonctionnelle
//  → fetch côté serveur avec ISR 60s
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import { scholarshipDictionary } from "@/dictionaries/data/scholarship.data-dictionary";
import type { ScholarshipFilters } from "@/types/api/scholarship.types";
import CatalogClient from "./CatalogClient";

// Métadonnées SEO dynamiques
export const metadata: Metadata = {
  title: "Bourses d'études — Chine & Allemagne | SALMA",
  description:
    "Trouvez votre bourse d'études idéale en Chine ou en Allemagne. Filtrez par pays, niveau et type de couverture. Accompagnement complet par SALMA.",
  keywords: "bourses études Chine Cameroun, bourses Allemagne, CSC scholarship, DAAD bourse",
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getString(val: string | string[] | undefined): string | undefined {
  if (!val) return undefined;
  return Array.isArray(val) ? val[0] : val;
}

function getPage(val: string | string[] | undefined): number {
  const n = parseInt(getString(val) ?? "1", 10);
  return isNaN(n) || n < 1 ? 1 : n;
}

export default async function BoursesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Lecture des filtres depuis l'URL
  const filters: ScholarshipFilters = {
    pays_destination: getString(params.pays) as ScholarshipFilters["pays_destination"],
    niveau: getString(params.niveau) as ScholarshipFilters["niveau"],
    type_couverture: getString(params.couverture) as ScholarshipFilters["type_couverture"],
    search: getString(params.q),
    page: getPage(params.page),
    page_size: 12,
    ordering: getString(params.tri) ?? "-est_mise_en_avant,-date_creation",
  };

  // Fetch côté serveur — Django filtre, pagine et trie
  let data;
  try {
    data = await scholarshipDictionary.getCatalog(filters);
  } catch {
    data = { count: 0, results: [], next: null, previous: null };
  }

  return (
    <Suspense fallback={null}>
      <CatalogClient
        initialData={data}
        initialFilters={filters}
      />
    </Suspense>
  );
}
