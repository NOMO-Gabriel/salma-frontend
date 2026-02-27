// src/app/(visitor)/bourses/[id]/page.tsx
// ==============================================================================
//  Page Détail Bourse — SERVER COMPONENT
//  SSG : generateStaticParams génère les pages à build time
//  ISR : revalidate 60s — la page se régénère dès qu'une bourse change en admin
//  field_visibility : l'admin contrôle exactement ce qui s'affiche
// ==============================================================================

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { scholarshipDictionary } from "@/dictionaries/data/scholarship.data-dictionary";
import { getMediaUrl } from "@/lib/api-client";
import type { ScholarshipPublicDetail, FieldVisibilityMap } from "@/types/api/scholarship.types";
import { toFieldVisibilityMap } from "@/types/api/scholarship.types";
import DetailClient from "./DetailClient";

// ==============================================================================
//  SSG — génération statique à build time
// ==============================================================================
export async function generateStaticParams() {
  try {
    const data = await scholarshipDictionary.getCatalog({ page_size: 100 });
    return data.results.map((b) => ({ id: b.id }));
  } catch {
    return [];
  }
}

// ==============================================================================
//  SEO — métadonnées dynamiques par bourse
// ==============================================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const { scholarship } = await scholarshipDictionary.getDetail(id);
    return {
      title: `${scholarship.titre_fr} | SALMA`,
      description: scholarship.description_fr?.slice(0, 160),
      openGraph: {
        title: scholarship.titre_fr,
        description: scholarship.description_fr?.slice(0, 160),
        images: scholarship.image_principale?.url
          ? [getMediaUrl(scholarship.image_principale.url)]
          : [],
      },
    };
  } catch {
    return { title: "Bourse | SALMA" };
  }
}

// ==============================================================================
//  Helpers d'affichage
// ==============================================================================
const FLAG: Record<string, string> = {
  chine: "🇨🇳",
  allemagne: "🇩🇪",
  france: "🇫🇷",
  canada: "🇨🇦",
  autre: "🌍",
};

const LEVEL_LABEL: Record<string, string> = {
  licence: "Licence",
  master: "Master",
  doctorat: "Doctorat",
  postdoc: "Post-Doc",
  formation: "Formation",
  autre: "Autre",
};

const COVERAGE_LABEL: Record<string, string> = {
  complete: "Bourse complète",
  partielle: "Partielle",
  logement: "Logement inclus",
  transport: "Transport",
  autre: "Aide financière",
};

function isVisible(map: FieldVisibilityMap, field: string): boolean {
  // Si le champ n'est pas dans la map → visible par défaut
  return map[field] !== false;
}

// ==============================================================================
//  Page
// ==============================================================================
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BourseDetailPage({ params }: PageProps) {
  const { id } = await params;

  let scholarship: ScholarshipPublicDetail;
  let visibilityMap: FieldVisibilityMap;

  try {
    const result = await scholarshipDictionary.getDetail(id);
    scholarship = result.scholarship;
    visibilityMap = result.visibilityMap;
  } catch {
    notFound();
  }

  const flag = FLAG[scholarship.pays_destination] ?? "🌍";
  const imageUrl = getMediaUrl(scholarship.image_principale?.url);

  const deadline = scholarship.date_limite
    ? new Date(scholarship.date_limite).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const isUrgent =
    scholarship.date_limite &&
    new Date(scholarship.date_limite).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000;

  // Message WhatsApp pré-rempli contextuel (exigence client)
  const whatsappMessage = encodeURIComponent(
    `Bonjour SALMA, je suis intéressé(e) par la bourse "${scholarship.titre_fr}". Pouvez-vous m'accompagner dans mon dossier ?`
  );
  const whatsappUrl = `https://wa.me/237699450984?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-salma-bg">

      {/* ── Hero visuel ─────────────────────────────────────────── */}
      <div className="relative h-64 md:h-80 bg-salma-primary overflow-hidden">
        {imageUrl ? (
          <>
            <Image src={imageUrl} alt={scholarship.titre_fr} fill className="object-cover opacity-40" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-salma-primary/60 to-salma-primary/90" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-[200px]">{flag}</span>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="relative z-10 container mx-auto px-6 pt-6">
          <Link href="/bourses" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour au catalogue
          </Link>
        </div>

        {/* Titre dans le hero */}
        <div className="relative z-10 container mx-auto px-6 pb-8 absolute bottom-0 left-0 right-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-white/90 text-sm font-medium">{flag} {scholarship.pays_destination.charAt(0).toUpperCase() + scholarship.pays_destination.slice(1)}</span>
            <span className="text-white/40">·</span>
            <span className="text-white/90 text-sm font-medium">{LEVEL_LABEL[scholarship.niveau] ?? scholarship.niveau}</span>
            {isUrgent && (
              <span className="px-2.5 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                ⚡ Urgent
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight max-w-3xl">
            {scholarship.titre_fr}
          </h1>
        </div>
      </div>

      {/* ── Corps de la page ─────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">

            {/* Organisme */}
            {isVisible(visibilityMap, "organisme_fr") && (
              <div className="bg-white border border-salma-border rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-salma-text-muted mb-1">Organisme financeur</p>
                <p className="text-lg font-serif font-bold text-salma-primary">{scholarship.organisme_fr}</p>
              </div>
            )}

            {/* Description */}
            {isVisible(visibilityMap, "description_fr") && scholarship.description_fr && (
              <div className="bg-white border border-salma-border rounded-2xl p-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-salma-text-muted mb-3">Description</h2>
                <p className="text-salma-text leading-relaxed text-sm whitespace-pre-line">
                  {scholarship.description_fr}
                </p>
              </div>
            )}

            {/* Avantages (ce que couvre la bourse) */}
            {isVisible(visibilityMap, "avantages") && scholarship.avantages?.length > 0 && (
              <div className="bg-white border border-salma-border rounded-2xl p-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-salma-text-muted mb-4">
                  Ce que couvre cette bourse
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scholarship.avantages.map((a) => (
                    <div key={a.id} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm text-salma-text">{a.libelle_fr}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Critères d'éligibilité */}
            {isVisible(visibilityMap, "criteres") && scholarship.criteres?.length > 0 && (
              <div className="bg-white border border-salma-border rounded-2xl p-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-salma-text-muted mb-4">
                  Critères d&apos;éligibilité
                </h2>
                <div className="space-y-2.5">
                  {scholarship.criteres.map((c) => (
                    <div key={c.id} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-salma-primary/10 text-salma-primary flex items-center justify-center mt-0.5">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm text-salma-text">{c.libelle_fr}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Domaines d'études */}
            {isVisible(visibilityMap, "domaines") && scholarship.domaines?.length > 0 && (
              <div className="bg-white border border-salma-border rounded-2xl p-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-salma-text-muted mb-3">
                  Domaines d&apos;études
                </h2>
                <div className="flex flex-wrap gap-2">
                  {scholarship.domaines.map((d) => (
                    <span key={d.id} className="px-3 py-1.5 bg-salma-bg border border-salma-border rounded-full text-xs font-medium text-salma-text">
                      {d.nom_fr}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Galerie photos supplémentaires */}
            {scholarship.images?.filter((i) => !i.est_principale).length > 0 && (
              <div className="bg-white border border-salma-border rounded-2xl p-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-salma-text-muted mb-4">Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {scholarship.images.filter((i) => !i.est_principale).map((img) => (
                    <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden">
                      <Image
                        src={getMediaUrl(img.url)}
                        alt={scholarship.titre_fr}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar droite — CTA et infos clés ──────────────── */}
          <div className="space-y-4">

            {/* Carte infos clés */}
            <div className="bg-white border border-salma-border rounded-2xl p-6 space-y-4 sticky top-24">

              {/* Date limite */}
              {isVisible(visibilityMap, "date_limite") && deadline && (
                <div className={`flex items-start gap-3 p-3 rounded-xl ${isUrgent ? "bg-red-50 border border-red-100" : "bg-salma-bg"}`}>
                  <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isUrgent ? "text-red-500" : "text-salma-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-salma-text-muted">Date limite</p>
                    <p className={`text-sm font-bold mt-0.5 ${isUrgent ? "text-red-600" : "text-salma-text"}`}>
                      {isUrgent && "⚠ "}{deadline}
                    </p>
                  </div>
                </div>
              )}

              {/* Type de couverture */}
              {isVisible(visibilityMap, "type_couverture") && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-salma-text-muted">Couverture</p>
                    <p className="text-sm font-bold text-salma-text mt-0.5">
                      {COVERAGE_LABEL[scholarship.type_couverture] ?? scholarship.type_couverture}
                    </p>
                  </div>
                </div>
              )}

              {/* Détails montant — masquable par l'admin */}
              {isVisible(visibilityMap, "details_montant_fr") && scholarship.details_montant_fr && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-salma-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-salma-text-muted">Montant</p>
                    <p className="text-sm font-bold text-salma-text mt-0.5">{scholarship.details_montant_fr}</p>
                  </div>
                </div>
              )}

              {/* Limite d'âge — masquable */}
              {isVisible(visibilityMap, "limite_age") && scholarship.limite_age && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-salma-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-salma-text-muted">Âge maximum</p>
                    <p className="text-sm font-bold text-salma-text mt-0.5">{scholarship.limite_age} ans</p>
                  </div>
                </div>
              )}

              {/* Exigence langue — masquable */}
              {isVisible(visibilityMap, "exigence_langue_fr") && scholarship.exigence_langue_fr && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-salma-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-salma-text-muted">Langue requise</p>
                    <p className="text-sm font-bold text-salma-text mt-0.5">{scholarship.exigence_langue_fr}</p>
                  </div>
                </div>
              )}

              <div className="border-t border-salma-border pt-4 space-y-3">
                {/* CTA WhatsApp contextuel — message pré-rempli avec le nom de la bourse */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#22bf5b] text-white font-semibold text-sm transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Postuler via WhatsApp
                </a>

                {/* CTA Formulaire de contact */}
                <Link
                  href={`/contact?bourse=${encodeURIComponent(scholarship.titre_fr)}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-salma-primary hover:bg-salma-primary/90 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Demander un accompagnement
                </Link>

                {/* Lien officiel — masquable par l'admin */}
                {isVisible(visibilityMap, "lien_officiel") && scholarship.lien_officiel && (
                  <a
                    href={scholarship.lien_officiel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-salma-border text-salma-text-muted hover:text-salma-text hover:border-salma-primary text-sm font-medium transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Site officiel
                  </a>
                )}
              </div>

              {/* Badge garantie */}
              <div className="mt-2 p-3 bg-salma-gold/10 border border-salma-gold/20 rounded-xl text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-salma-gold">✓ Garantie SALMA</p>
                <p className="text-[11px] text-salma-text-muted mt-0.5">Satisfait ou Remboursé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking côté client + interactions */}
      <DetailClient scholarshipId={scholarship.id} scholarshipTitle={scholarship.titre_fr} />
    </div>
  );
}
