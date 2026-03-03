"use client";
// src/sections/visitor/VideoTestimonial.tsx
// =============================================================================
//  Section Preuve Video - temoignage etudiant en Chine
//
//  Corrections :
//    - Icones Rewind/Forward 10s redesignees (sans <text> SVG casse)
//    - Controles responsive mobile (taille reduite, espacement adapte)
//    - Barre de progression tactile (touch events)
//    - Overlay idle sans image poster (gradient + cercles decoratifs)
//    - Tous les handlers fonctionnels
// =============================================================================

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  src?: string;
  poster?: string;
}

// -- Helpers -------------------------------------------------------------------
function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// -- Icones SVG (toutes testees et fonctionnelles) ----------------------------
function PlayIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );
}

// Fleche reculer + "10" en paths purs (pas de <text>)
function Rewind10Icon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.5 8C9.85 8 7.45 9.11 5.86 10.86L2 7v10h10l-3.89-3.89C9.45 11.78 10.88 11 12.5 11c2.96 0 5.43 2.04 6.12 4.78l2.3-.67C19.95 11.37 16.55 8 12.5 8z" />
      {/* "1" */}
      <path d="M10.9 20v-6h-.85l-1.25.87v.87l1.15-.78h.05V20h.9z" />
      {/* "0" */}
      <path d="M14.35 14c-.85 0-1.5.67-1.5 1.85v2.3c0 1.18.65 1.85 1.5 1.85s1.5-.67 1.5-1.85v-2.3c0-1.18-.65-1.85-1.5-1.85zm.6 4.15c0 .7-.25 1.05-.6 1.05s-.6-.35-.6-1.05v-2.3c0-.7.25-1.05.6-1.05s.6.35.6 1.05v2.3z" />
    </svg>
  );
}

// Fleche avancer + "10" en paths purs
function Forward10Icon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 8c2.65 0 5.05 1.11 6.64 2.86L22 7v10H12l3.89-3.89C14.55 11.78 13.12 11 11.5 11c-2.96 0-5.43 2.04-6.12 4.78l-2.3-.67C4.05 11.37 7.45 8 11.5 8z" />
      {/* "1" */}
      <path d="M10.9 20v-6h-.85l-1.25.87v.87l1.15-.78h.05V20h.9z" />
      {/* "0" */}
      <path d="M14.35 14c-.85 0-1.5.67-1.5 1.85v2.3c0 1.18.65 1.85 1.5 1.85s1.5-.67 1.5-1.85v-2.3c0-1.18-.65-1.85-1.5-1.85zm.6 4.15c0 .7-.25 1.05-.6 1.05s-.6-.35-.6-1.05v-2.3c0-.7.25-1.05.6-1.05s.6.35.6 1.05v2.3z" />
    </svg>
  );
}

function FullscreenIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
    </svg>
  );
}

function VolumeIcon({ muted, className = "w-5 h-5" }: { muted: boolean; className?: string }) {
  if (muted) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  );
}

// -- Badge Live ---------------------------------------------------------------
function LiveBadge({ locale }: { locale: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <span className="text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
        {locale === "fr" ? "Temoignage reel - Chine" : "Real testimony - China"} 🇨🇳
      </span>
    </div>
  );
}

// =============================================================================
//  Composant principal
// =============================================================================
export default function VideoTestimonial({
  src = "/videos/temoignage-salma.mp4",
  poster = "/images/video-poster.jpg",
}: Props) {
  const { locale } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Etats
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  // Progression
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // -- Auto-hide controles apres 3s ------------------------------------------
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3000);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    }
  }, [isPlaying]);

  // -- Sync temps video -------------------------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener("volumechange", onVolumeChange);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  // -- Actions ----------------------------------------------------------------
  const handlePlayPause = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setIsLoading(true);
      try {
        await video.play();
        setHasStarted(true);
        setHasEnded(false);
      } catch (err) {
        console.warn("Play failed:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      video.pause();
    }
    resetHideTimer();
  }, [resetHideTimer]);

  const seekToPosition = useCallback((clientX: number) => {
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    video.currentTime = pct * duration;
    resetHideTimer();
  }, [duration, resetHideTimer]);

  const handleSeekClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    seekToPosition(e.clientX);
  }, [seekToPosition]);

  const handleSeekTouch = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      seekToPosition(e.touches[0].clientX);
    }
  }, [seekToPosition]);

  const handleSkip = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
    resetHideTimer();
  }, [resetHideTimer]);

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    // Toggle muted
    const newMuted = !video.muted;
    video.muted = newMuted;
    // Force le state (en plus de l'event listener)
    setIsMuted(newMuted);
    resetHideTimer();
  }, [resetHideTimer]);

  const handleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    } catch {
      // Fullscreen non supporte sur certains navigateurs mobile
    }
    resetHideTimer();
  }, [resetHideTimer]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setHasEnded(true);
  }, []);

  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
    setHasEnded(false);
    setHasStarted(true);
    resetHideTimer();
  }, [resetHideTimer]);

  // -- Keyboard shortcuts -----------------------------------------------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!hasStarted) return;
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowLeft":
        case "j":
          handleSkip(-10);
          break;
        case "ArrowRight":
        case "l":
          handleSkip(10);
          break;
        case "m":
          handleMuteToggle();
          break;
        case "f":
          handleFullscreen();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasStarted, handlePlayPause, handleSkip, handleMuteToggle, handleFullscreen]);

  // -- Textes i18n ------------------------------------------------------------
  const t = {
    sectionBadge: locale === "fr" ? "Preuve Video" : "Video Proof",
    title: locale === "fr" ? "Un etudiant temoigne depuis la Chine" : "A student testifies from China",
    subtitle: locale === "fr"
      ? "Decouvrez comment SALMA a transforme son projet d'etudes en realite, de Yaounde a une universite chinoise."
      : "See how SALMA transformed his study project into reality, from Yaounde to a Chinese university.",
    clickToWatch: locale === "fr" ? "Cliquez pour regarder" : "Click to watch",
    replay: locale === "fr" ? "Revoir" : "Watch again",
    ctaRdv: locale === "fr" ? "Prendre un rendez-vous" : "Book a consultation",
    ctaBourses: locale === "fr" ? "Voir les bourses" : "Browse scholarships",
    ctaTitle: locale === "fr" ? "Pret a ecrire votre histoire ?" : "Ready to write your story?",
    ctaDesc: locale === "fr"
      ? "Rejoignez les centaines d'etudiants que SALMA a accompagnes vers leurs reves."
      : "Join the hundreds of students SALMA has guided toward their dreams.",
    name: "Kevin Ngoumou",
    location: locale === "fr" ? "Etudiant - Universite de Wuhan, Chine" : "Student - Wuhan University, China",
  };

  // Taille des boutons de controle (responsive)
  const ctrlBtn = "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-white hover:bg-white/15 active:bg-white/25 transition-colors";

  return (
    <section className="py-12 sm:py-24 bg-salma-primary dark:bg-salma-primary overflow-hidden relative">

      {/* Decors de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-salma-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-salma-gold/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-4 py-1.5 bg-salma-gold/20 text-salma-gold text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-salma-gold/30">
              {t.sectionBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold !text-white mb-3 sm:mb-4">
              {t.title}
            </h2>
            <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* ── Lecteur video ──────────────────────────────────────── */}
          <div
            ref={containerRef}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-black aspect-video group"
            onMouseMove={resetHideTimer}
            onTouchStart={resetHideTimer}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >

            {/* Video HTML native */}
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              onEnded={handleEnded}
              onClick={hasStarted && !hasEnded ? handlePlayPause : undefined}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                hasStarted ? "opacity-100" : "opacity-0"
              }`}
              playsInline
              preload="metadata"
            />

            {/* ── OVERLAY IDLE (avant le premier play) ─────────────── */}
            {!hasStarted && !hasEnded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-salma-primary/90 via-salma-primary/70 to-salma-primary/90">

                {/* Cercles decoratifs */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] border border-white/5 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] border border-white/5 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] sm:w-[200px] h-[120px] sm:h-[200px] border border-salma-gold/10 rounded-full" />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-6">
                  <LiveBadge locale={locale} />

                  <div className="text-center">
                    <p className="text-white font-bold text-base sm:text-lg">{t.name}</p>
                    <p className="text-white/60 text-xs sm:text-sm">{t.location}</p>
                  </div>

                  {/* Bouton play principal */}
                  <button
                    onClick={handlePlayPause}
                    disabled={isLoading}
                    className="relative group/btn"
                    aria-label={t.clickToWatch}
                  >
                    <div className="absolute inset-0 rounded-full bg-salma-gold/20 animate-ping" style={{ animationDuration: "2s" }} />
                    <div className="absolute -inset-3 rounded-full bg-salma-gold/10 animate-pulse" style={{ animationDuration: "3s" }} />

                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-salma-gold to-salma-gold/80 flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.4)] sm:shadow-[0_0_40px_rgba(201,168,76,0.4)] group-hover/btn:scale-110 group-hover/btn:shadow-[0_0_60px_rgba(201,168,76,0.6)] transition-all duration-300">
                      {isLoading ? (
                        <svg className="w-7 h-7 sm:w-10 sm:h-10 text-salma-primary animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <PlayIcon className="w-7 h-7 sm:w-10 sm:h-10 text-salma-primary ml-0.5 sm:ml-1" />
                      )}
                    </div>
                  </button>

                  <p className="text-white/40 text-[10px] sm:text-xs tracking-wide">{t.clickToWatch}</p>
                </div>

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }} />
              </div>
            )}

            {/* ── CONTROLES VIDEO (pendant lecture) ────────────────── */}
            {hasStarted && !hasEnded && (
              <div
                className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${
                  showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Gradient lisibilite */}
                <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                {/* Spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                )}

                {/* Play/pause central au hover */}
                {!isLoading && !isPlaying && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 hover:scale-110 transition-all duration-200"
                  >
                    <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5" />
                  </button>
                )}

                {/* Barre de controles */}
                <div className="relative z-10 px-3 sm:px-4 pb-3 sm:pb-4 pt-6 sm:pt-8">

                  {/* Barre de progression (cliquable + tactile) */}
                  <div
                    ref={progressRef}
                    className="w-full h-6 flex items-center cursor-pointer mb-1 sm:mb-2 group/progress touch-none"
                    onClick={handleSeekClick}
                    onTouchMove={handleSeekTouch}
                  >
                    <div className="w-full h-1 sm:h-1.5 bg-white/20 rounded-full relative overflow-visible">
                      {/* Buffer */}
                      <div
                        className="absolute top-0 left-0 h-full bg-white/10 rounded-full"
                        style={{ width: `${Math.min(100, progress + 15)}%` }}
                      />
                      {/* Progression */}
                      <div
                        className="absolute top-0 left-0 h-full bg-salma-gold rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                      {/* Thumb - toujours visible sur mobile, hover sur desktop */}
                      <div
                        className="absolute top-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-salma-gold rounded-full shadow-lg sm:opacity-0 sm:group-hover/progress:opacity-100 transition-opacity"
                        style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
                      />
                    </div>
                  </div>

                  {/* Controles */}
                  <div className="flex items-center justify-between gap-1">

                    {/* Gauche : play/pause + skip + temps */}
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <button onClick={handlePlayPause} className={ctrlBtn} aria-label={isPlaying ? "Pause" : "Play"}>
                        {isPlaying ? <PauseIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />}
                      </button>

                      <button onClick={() => handleSkip(-10)} className={ctrlBtn} aria-label="Rewind 10s">
                        <Rewind10Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <button onClick={() => handleSkip(10)} className={ctrlBtn} aria-label="Forward 10s">
                        <Forward10Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <span className="text-white/70 text-[10px] sm:text-xs font-mono ml-1 sm:ml-2 whitespace-nowrap">
                        {formatTime(currentTime)}<span className="text-white/40"> / {formatTime(duration)}</span>
                      </span>
                    </div>

                    {/* Droite : volume + fullscreen */}
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <button onClick={handleMuteToggle} className={ctrlBtn} aria-label={isMuted ? "Unmute" : "Mute"}>
                        <VolumeIcon muted={isMuted} className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <button onClick={handleFullscreen} className={ctrlBtn} aria-label="Fullscreen">
                        <FullscreenIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── OVERLAY CTA (fin video) ──────────────────────────── */}
            {hasEnded && (
              <div className="absolute inset-0 bg-salma-primary/95 flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 text-center animate-[fadeIn_0.5s_ease-out]">

                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-salma-gold/20 border border-salma-gold/40 flex items-center justify-center mb-1 sm:mb-2">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-salma-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-serif font-bold mb-2">
                    {t.ctaTitle}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm max-w-sm">
                    {t.ctaDesc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <Link
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 bg-salma-gold text-salma-primary text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl hover:bg-salma-gold-light transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t.ctaRdv}
                  </Link>
                  <Link
                    href="/bourses"
                    className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 bg-white/10 text-white text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {t.ctaBourses}
                  </Link>
                </div>

                <button onClick={handleReplay} className="flex items-center gap-1.5 text-white/40 text-xs hover:text-white/70 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t.replay}
                </button>
              </div>
            )}
          </div>

          {/* ── Info sous la video ─────────────────────────────────── */}
          {!hasEnded && (
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-1 sm:px-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-base sm:text-lg">
                  🎓
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-bold">{t.name}</p>
                  <p className="text-white/50 text-[10px] sm:text-xs">{t.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/40 text-[10px] sm:text-xs">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {locale === "fr" ? "500+ vues" : "500+ views"}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
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