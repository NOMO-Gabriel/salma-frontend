// src/app/(visitor)/home-v2/page.tsx
// ==============================================================================
//  Home V2 — Page démo pour présentation client
//  Identique à page.tsx SAUF le Hero remplacé par HeroCarousel
//  À supprimer après validation client
// ==============================================================================

import { Suspense } from "react";
import HeroCarousel from "@/sections/visitor/Hero/HeroCarousel";
import TrustBar from "@/sections/visitor/TrustBar";
import StatsCounter from "@/sections/visitor/StatsCounter";
import FeaturedScholarships from "@/sections/visitor/FeaturedScholarships";
import SuccessStories from "@/sections/visitor/SuccessStories";
import ContactForm from "@/sections/visitor/ContactForm";
import { scholarshipDictionary } from "@/dictionaries/data/scholarship.data-dictionary";
import { testimonialPublicRepository } from "@/repositories/testimonial.repository";
import { kpiRepository } from "@/repositories/kpi.repository";
import VideoTestimonial from "@/sections/visitor/VideoTestimonial"

function SectionSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div className={`${height} bg-salma-surface/50 animate-pulse rounded-2xl mx-6 my-4`} />
  );
}

async function getHomeData() {
  try {
    const [featured, testimonials, kpiRealtime] = await Promise.allSettled([
      scholarshipDictionary.getFeatured(),
      testimonialPublicRepository.getList(),
      kpiRepository.adminGetRealtime().catch(() => null),
    ]);

    return {
      featured:     featured.status     === "fulfilled" ? featured.value     : [],
      testimonials: testimonials.status === "fulfilled" ? testimonials.value : [],
      kpi:          kpiRealtime.status  === "fulfilled" ? kpiRealtime.value  : null,
    };
  } catch {
    return { featured: [], testimonials: [], kpi: null };
  }
}

export default async function HomeV2() {
  const { featured, testimonials, kpi } = await getHomeData();

  return (
    <main>
      {/* ── Hero carousel full-screen ── */}
      <HeroCarousel />

      <TrustBar />

      <Suspense fallback={<SectionSkeleton height="h-40" />}>
        <StatsCounter kpi={kpi} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-96" />}>
        <FeaturedScholarships scholarships={featured} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <SuccessStories testimonials={testimonials} />
        <VideoTestimonial />
      </Suspense>

      <ContactForm />
    </main>
  );
}