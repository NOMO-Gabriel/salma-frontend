"use client";
import { useLanguage } from "@/hooks/useLanguage";

export default function BoursesPage() {
  const { dictionary } = useLanguage();
  return (
    <div className="py-20 max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-serif font-bold text-salma-primary mb-8">
        {dictionary.services["bourse-etude"].name}
      </h1>
      <p className="text-salma-text-muted">
        Contenu en attente de la liste des bourses...
      </p>
    </div>
  );
}