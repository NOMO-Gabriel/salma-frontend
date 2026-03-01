"use client";
// src/sections/visitor/VideoTestimonial.tsx
// =============================================================================
//  Section Preuve Vidéo — témoignage étudiant en Chine
//
//  Comportements :
//    • Idle   : simulation "preview" façon YouTube (progress bar qui avance,
//               frame qui pulse, titre qui apparaît)
//    • Click  : la vraie vidéo démarre (fichier /public/videos/temoignage.mp4
//               ou chemin configurable via prop `src`)
//    • Fin    : overlay CTA apparaît (Prendre RDV + Voir les bourses)
//
//  Vidéo : jeune étudiant rendant témoignage sur SALMA, actuellement en Chine
//  Placer la vidéo dans : /public/videos/temoignage-salma.mp4
// =============================================================================

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  /** Chemin vers la vidéo (défaut : /videos/temoignage-salma.mp4) */
  src?: string;
  /** Poster image (défaut : /images/video-poster.jpg) */
  poster?: string;
}

// ── Icône Play ────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ── Indicateur "En direct depuis la Chine" ────────────────────────────────────
function LiveBadge({ locale }: { locale: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <span className="text-white text-[11px] font-bold uppercase tracking-widest">
        {locale === "fr" ? "Témoignage réel · Chine 🇨🇳" : "Real testimony · China 🇨🇳"}
      </span>
    </div>
  );
}

export default function VideoTestimonial({
  src = "/videos/temoignage-salma.mp4",
  poster = "/images/video-poster.jpg",
}: Props) {
  const { locale } = useLanguage();
  const videoRef   = useRef<HTMLVideoElement>(null);

  // États principaux
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [hasEnded,   setHasEnded]   = useState(false);
  const [isLoading,  setIsLoading]  = useState(false);

  // Simulation idle
  const [idleProgress, setIdleProgress] = useState(0); // 0–100
  const [idlePulse,    setIdlePulse]    = useState(false);
  const idleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Simulation "preview" quand la vidéo ne joue pas ──────────────────────
  const startIdleSimulation = useCallback(() => {
    setIdleProgress(0);
    idleRef.current = setInterval(() => {
      setIdleProgress((p) => {
        if (p >= 30) {
          // Bloque à 30% — donne l'impression que c'est pausé au début
          if (idleRef.current) clearInterval(idleRef.current);
          return 30;
        }
        return p + 0.4;
      });
    }, 80);

    // Pulse toutes les 3s pour attirer l'œil
    const pulseInterval = setInterval(() => setIdlePulse((v) => !v), 3000);
    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    if (!isPlaying && !hasEnded) {
      const cleanup = startIdleSimulation();
      return () => {
        cleanup?.();
        if (idleRef.current) clearInterval(idleRef.current);
      };
    }
  }, [isPlaying, hasEnded, startIdleSimulation]);

  // ── Lancer la vraie vidéo ─────────────────────────────────────────────────
  const handlePlay = useCallback(async () => {
    if (isPlaying) return;
    setIsLoading(true);
    if (idleRef.current) clearInterval(idleRef.current);

    try {
      if (videoRef.current) {
        await videoRef.current.play();
        setIsPlaying(true);
        setHasEnded(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setHasEnded(true);
  }, []);

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  }, []);

  // Textes i18n
  const t = {
    sectionBadge:  locale === "fr" ? "Preuve Vidéo"                     : "Video Proof",
    title:         locale === "fr" ? "Un étudiant témoigne depuis la Chine" : "A student testifies from China",
    subtitle:      locale === "fr"
      ? "Découvrez comment SALMA a transformé son projet d'études en réalité, de Yaoundé à une université chinoise."
      : "See how SALMA transformed his study project into reality, from Yaoundé to a Chinese university.",
    clickToWatch:  locale === "fr" ? "Cliquez pour regarder"             : "Click to watch",
    loading:       locale === "fr" ? "Chargement..."                     : "Loading...",
    replay:        locale === "fr" ? "Revoir"                            : "Watch again",
    ctaRdv:        locale === "fr" ? "Prendre un rendez-vous"            : "Book a consultation",
    ctaBourses:    locale === "fr" ? "Voir les bourses"                  : "Browse scholarships",
    ctaTitle:      locale === "fr" ? "Prêt à écrire votre histoire ?"   : "Ready to write your story?",
    ctaDesc:       locale === "fr"
      ? "Rejoignez les centaines d'étudiants que SALMA a accompagnés vers leurs rêves."
      : "Join the hundreds of students SALMA has guided toward their dreams.",
    duration:      "2:47",
    name:          "Kevin Ngoumou",
    location:      locale === "fr" ? "Étudiant · Université de Wuhan, Chine" : "Student · Wuhan University, China",
  };

  return (
    <section className="py-24 bg-salma-primary dark:bg-salma-primary overflow-hidden relative">

      {/* Décors de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-salma-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-salma-gold/10 rounded-full blur-3xl" />
        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-salma-gold/20 text-salma-gold text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-salma-gold/30">
              {t.sectionBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {t.title}
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* ── Lecteur vidéo ──────────────────────────────────────────────── */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-black aspect-video group">

            {/* Vidéo HTML native */}
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              onEnded={handleEnded}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
              playsInline
              preload="metadata"
            />

            {/* ── OVERLAY IDLE (avant play) ─────────────────────────────── */}
            {!isPlaying && !hasEnded && (
              <div className="absolute inset-0 flex flex-col">

                {/* Poster flouté */}
                <div className="absolute inset-0 bg-salma-primary/80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={poster}
                    alt="Aperçu vidéo"
                    className="w-full h-full object-cover opacity-40 blur-sm scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                {/* Contenu overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 px-6">

                  {/* Badge live */}
                  <LiveBadge locale={locale} />

                  {/* Info étudiant */}
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{t.name}</p>
                    <p className="text-white/60 text-sm">{t.location}</p>
                  </div>

                  {/* Bouton play avec animation pulse idle */}
                  <button
                    onClick={handlePlay}
                    disabled={isLoading}
                    className="relative group/btn"
                    aria-label={t.clickToWatch}
                  >
                    {/* Halo pulsant */}
                    <div className={`absolute inset-0 rounded-full bg-salma-gold/30 transition-transform duration-1000 ${idlePulse ? "scale-150 opacity-0" : "scale-100 opacity-100"}`} />
                    <div className={`absolute inset-0 rounded-full bg-salma-gold/20 transition-transform duration-700 delay-150 ${idlePulse ? "scale-125 opacity-0" : "scale-100 opacity-100"}`} />

                    {/* Cercle principal */}
                    <div className="relative w-20 h-20 rounded-full bg-salma-gold flex items-center justify-center shadow-lg group-hover/btn:scale-110 group-hover/btn:bg-salma-gold-light transition-all duration-300">
                      {isLoading ? (
                        <svg className="w-8 h-8 text-salma-primary animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <div className="w-8 h-8 text-salma-primary ml-1">
                          <PlayIcon />
                        </div>
                      )}
                    </div>
                  </button>

                  <p className="text-white/50 text-xs">{t.clickToWatch}</p>

                  {/* Barre de progression simulée */}
                  <div className="w-full max-w-md px-4">
                    <div className="flex justify-between text-[10px] text-white/30 mb-1.5">
                      <span>0:00</span>
                      <span>{t.duration}</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-salma-gold/60 rounded-full transition-all duration-300"
                        style={{ width: `${idleProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Vignette bords */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
              </div>
            )}

            {/* ── OVERLAY CTA (après fin vidéo) ────────────────────────── */}
            {hasEnded && (
              <div className="absolute inset-0 bg-salma-primary/95 flex flex-col items-center justify-center gap-6 px-6 text-center animate-[fadeIn_0.5s_ease-out]">

                {/* Icône succès */}
                <div className="w-16 h-16 rounded-full bg-salma-gold/20 border border-salma-gold/40 flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-salma-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-white text-xl md:text-2xl font-serif font-bold mb-2">
                    {t.ctaTitle}
                  </h3>
                  <p className="text-white/60 text-sm max-w-sm">
                    {t.ctaDesc}
                  </p>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <Link
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-salma-gold text-salma-primary text-sm font-bold rounded-2xl hover:bg-salma-gold-light transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t.ctaRdv}
                  </Link>
                  <Link
                    href="/bourses"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 text-white text-sm font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {t.ctaBourses}
                  </Link>
                </div>

                {/* Replay */}
                <button
                  onClick={handleReplay}
                  className="flex items-center gap-1.5 text-white/40 text-xs hover:text-white/70 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t.replay}
                </button>
              </div>
            )}

            {/* Badge durée (quand idle) */}
            {!isPlaying && !hasEnded && (
              <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 text-white text-[11px] font-bold rounded-md">
                {t.duration}
              </div>
            )}
          </div>

          {/* ── Info sous la vidéo ─────────────────────────────────────── */}
          {!hasEnded && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg">
                  🎓
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/40 text-xs">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {locale === "fr" ? "500+ vues" : "500+ views"}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className="text-salma-gold" />
                  </svg>
                  5.0
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}