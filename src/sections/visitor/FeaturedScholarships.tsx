"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { MOCK_SCHOLARSHIPS } from "@/data/mock-scholarships";
import ScholarshipCard from "@/components/ui/ScholarshipCard";
import SectionTitle from "@/components/ui/SectionTitle";
import SalmaButton from "@/components/ui/SalmaButton";

export default function FeaturedScholarships() {
  const { dictionary } = useLanguage();

  // On récupère uniquement les 3 premières bourses pour la Home Page
  const featured = MOCK_SCHOLARSHIPS.slice(0, 3);

  return (
    <section className="py-24 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-6">
        
        {/* Entête de section réutilisant notre atome SectionTitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle 
            title={dictionary.featuredScholarships.title}
            subtitle={dictionary.featuredScholarships.subtitle}
            align="left"
          />
          <Link href="/bourses">
            <SalmaButton variant="outline" className="hidden md:flex">
              {dictionary.featuredScholarships.viewAll}
            </SalmaButton>
          </Link>
        </div>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>

        {/* Bouton mobile uniquement (pour l'UX) */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/bourses" className="w-full">
            <SalmaButton variant="outline" className="w-full">
              {dictionary.featuredScholarships.viewAll}
            </SalmaButton>
          </Link>
        </div>
      </div>
    </section>
  );
}