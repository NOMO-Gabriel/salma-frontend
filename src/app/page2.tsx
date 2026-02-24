"use client";

import { MOCK_SCHOLARSHIPS } from "@/data/mock-scholarships";
import ScholarshipCard from "@/components/ui/ScholarshipCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { useLanguage } from "@/hooks/useLanguage";

export default function Home() {
  const { dictionary } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <SectionTitle 
        title={dictionary.scholarships.sectionTitle} 
        subtitle="Nos opportunités" 
        align="center" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MOCK_SCHOLARSHIPS.map((s) => (
          <ScholarshipCard key={s.id} scholarship={s} />
        ))}
      </div>
    </div>
  );
}