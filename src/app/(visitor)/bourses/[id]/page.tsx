// src/app/(visitor)/bourses/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { scholarshipDictionary } from "@/dictionaries/data";
import ScholarshipDetailClient from "./ScholarshipDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

// Génération dynamique des métadonnées pour le SEO (Google, WhatsApp, Facebook)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { scholarship } = await scholarshipDictionary.getDetail(id);
    return {
      title: `${scholarship.titre_fr} | SALMA`,
      description: scholarship.description_fr.substring(0, 160),
    };
  } catch {
    return { title: "Bourse introuvable | SALMA" };
  }
}

export default async function ScholarshipDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    // On récupère la bourse ET la map de visibilité pré-calculée
    const { scholarship, visibilityMap } = await scholarshipDictionary.getDetail(id);

    return (
      <ScholarshipDetailClient 
        scholarship={scholarship} 
        visibilityMap={visibilityMap} 
      />
    );
  } catch (error) {
    console.error("Erreur chargement bourse:", error);
    notFound(); // Redirige vers la page 404 si l'ID n'existe pas
  }
}