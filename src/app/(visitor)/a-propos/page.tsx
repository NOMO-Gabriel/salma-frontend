"use client";
import { useLanguage } from "@/hooks/useLanguage";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";

export default function AboutPage() {
  const { dictionary } = useLanguage();
  const a = dictionary.aboutPage;

  return (
    <div className="py-20 bg-white dark:bg-salma-bg min-h-screen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-salma-lg border-8 border-salma-surface">
            <Image src="/image.jpg" alt="AG Technologies" fill className="object-cover" />
          </div>
          <div className="space-y-8">
            <SectionTitle title={a.title} subtitle={a.subtitle} />
            <div className="space-y-6 text-salma-text-muted leading-relaxed">
              <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white">{a.missionTitle}</h3>
              <p>{a.missionDesc}</p>
              <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white">{a.visionTitle}</h3>
              <p>{a.visionDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}