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
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import { defaultLocale } from "@/config/i18n";
import type { ContactScope } from "@/types";

function SectionSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div className={`${height} bg-salma-surface/50 animate-pulse rounded-2xl mx-6 my-4`} />
  );
}
// ... tes imports inchangés

async function getHomeData() {
  try {
     const [featured, testimonials, kpiRealtime, contactData] = await Promise.allSettled([
      scholarshipDictionary.getFeatured(),
      testimonialPublicRepository.getList(),
      kpiRepository.adminGetRealtime().catch(() => null),
      cmsSwitcher.getScopeContent<ContactScope>("contact", defaultLocale),
    ]);

    return {
      featured:     featured.status     === "fulfilled" ? featured.value     : [],
      testimonials: testimonials.status === "fulfilled" ? testimonials.value : [],
      kpi:          kpiRealtime.status  === "fulfilled" ? kpiRealtime.value  : null,
      contactLabels: contactData.status === "fulfilled" ? contactData.value.contactPage.form_section : null,
    };
  } catch {
    // FIX 1 : Ajouter contactLabels ici aussi
    return { featured: [], testimonials: [], kpi: null, contactLabels: null };
  }
}

export default async function Home() {
  // FIX 2 : Ajouter contactLabels ici pour pouvoir l'utiliser plus bas
  const { featured, testimonials, kpi, contactLabels } = await getHomeData();
  
  return (
    <main>
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

       {/* Maintenant contactLabels est bien défini dans cette fonction */}
       {contactLabels && <ContactForm labels={contactLabels} />}
    </main>
  );
}