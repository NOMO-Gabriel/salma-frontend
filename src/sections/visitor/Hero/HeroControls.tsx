"use client";
// src/sections/visitor/hero/HeroControls.tsx

interface Props {
  total: number;
  current: number;
  paused: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
  /** Si true, les contrôles sont sur fond image sombre → style clair */
  hasBgImage?: boolean;
}

export default function HeroControls({ total, current, paused, onPrev, onNext, onGoTo, hasBgImage = false }: Props) {
  const arrowCls = hasBgImage
    ? "bg-white/15 border-white/25 text-white hover:bg-white/25"
    : "bg-salma-primary/8 border-salma-primary/15 text-salma-primary hover:bg-salma-primary/15";

  const bulletInactive = hasBgImage
    ? "bg-white/30 hover:bg-white/50"
    : "bg-salma-primary/20 hover:bg-salma-primary/40";

  const progressBg = hasBgImage ? "bg-white/20" : "bg-salma-border";
  const counterText = hasBgImage ? "text-white/60" : "text-salma-text-muted";

  return (
    <>
      {/* Flèche gauche */}
      <button
        onClick={onPrev}
        className={`hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 rounded-full backdrop-blur-sm
          ${arrowCls} border
          items-center justify-center
          transition-all duration-150`}
        aria-label="Slide précédent"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Flèche droite */}
      <button
        onClick={onNext}
        className={`hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 rounded-full backdrop-blur-sm
          ${arrowCls} border
          items-center justify-center
          transition-all duration-150`}
        aria-label="Slide suivant"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bullets + progress */}
      <div className="relative z-20 flex flex-col items-center gap-3 pb-8 pt-2">
        {/* Barre de progression */}
        {!paused && (
          <div className={`w-40 h-px ${progressBg} rounded-full overflow-hidden`}>
            <div
              key={current}
              className="h-full bg-salma-gold rounded-full"
              style={{ animation: "progressBar 10s linear forwards" }}
            />
          </div>
        )}

        {/* Bullets */}
        <div className="flex gap-2.5" role="tablist">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full
                ${i === current
                  ? "w-7 h-2 bg-salma-gold"
                  : `w-2 h-2 ${bulletInactive}`
                }`}
            />
          ))}
        </div>

        {/* X/Y mobile */}
        <p className={`lg:hidden text-[10px] font-bold uppercase tracking-widest ${counterText}`}>
          {current + 1} / {total}
        </p>
      </div>
    </>
  );
}