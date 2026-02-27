// src/app/page.tsx
// ==============================================================================
//  Home Page — SERVER COMPONENT
//  Fetch en parallèle : bourses vedette + KPI publics + témoignages + config CMS
//  Les données sont passées en props aux sections (jamais de fetch côté client)
// ==============================================================================

import { Suspense } from "react";
import Hero from "@/sections/visitor/Hero";
import TrustBar from "@/sections/visitor/TrustBar";
import StatsCounter from "@/sections/visitor/StatsCounter";
import FeaturedScholarships from "@/sections/visitor/FeaturedScholarships";
import SuccessStories from "@/sections/visitor/SuccessStories";
import ContactForm from "@/sections/visitor/ContactForm";
import { scholarshipDictionary } from "@/dictionaries/data/scholarship.data-dictionary";
import { testimonialPublicRepository } from "@/repositories/testimonial.repository";
import { kpiRepository } from "@/repositories/kpi.repository";

// Squelettes de chargement légers
function SectionSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div className={`${height} bg-salma-surface/50 animate-pulse rounded-2xl mx-6 my-4`} />
  );
}

// Fetch en parallèle de toutes les données de la Home
async function getHomeData() {
  try {
    const [featured, testimonials, kpiRealtime] = await Promise.allSettled([
      scholarshipDictionary.getFeatured(),
      testimonialPublicRepository.getList(),
      kpiRepository.adminGetRealtime().catch(() => null), // KPI optionnel
    ]);

    return {
      featured: featured.status === "fulfilled" ? featured.value : [],
      testimonials: testimonials.status === "fulfilled" ? testimonials.value : [],
      kpi: kpiRealtime.status === "fulfilled" ? kpiRealtime.value : null,
    };
  } catch {
    // Fallback silencieux si le backend est inaccessible
    return { featured: [], testimonials: [], kpi: null };
  }
}

export default async function Home() {
  const { featured, testimonials, kpi } = await getHomeData();

  return (
    <main>
      <Hero />
      <TrustBar />

      {/* Stats dynamiques si KPI disponibles, sinon stats statiques */}
      <Suspense fallback={<SectionSkeleton height="h-40" />}>
        <StatsCounter kpi={kpi} />
      </Suspense>

      {/* Bourses vedette — données réelles du backend */}
      <Suspense fallback={<SectionSkeleton height="h-96" />}>
        <FeaturedScholarships scholarships={featured} />
      </Suspense>

      {/* Témoignages approuvés */}
      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <SuccessStories testimonials={testimonials} />
      </Suspense>

      <ContactForm />
    </main>
  );
}
