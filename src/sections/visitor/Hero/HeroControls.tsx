"use client";
// src/sections/visitor/hero/HeroControls.tsx

interface Props {
  total: number;
  current: number;
  paused: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}

export default function HeroControls({ total, current, paused, onPrev, onNext, onGoTo }: Props) {
  return (
    <>
      {/* Flèche gauche */}
      <button
        onClick={onPrev}
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 rounded-full backdrop-blur-sm
          bg-salma-primary/8 border border-salma-primary/15 text-salma-primary
          items-center justify-center
          hover:bg-salma-primary/15 transition-all duration-150"
        aria-label="Slide précédent"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Flèche droite */}
      <button
        onClick={onNext}
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 rounded-full backdrop-blur-sm
          bg-salma-primary/8 border border-salma-primary/15 text-salma-primary
          items-center justify-center
          hover:bg-salma-primary/15 transition-all duration-150"
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
          <div className="w-40 h-px bg-salma-border rounded-full overflow-hidden">
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
                  : "w-2 h-2 bg-salma-primary/20 hover:bg-salma-primary/40"
                }`}
            />
          ))}
        </div>

        {/* X/Y mobile */}
        <p className="lg:hidden text-[10px] font-bold uppercase tracking-widest text-salma-text-muted">
          {current + 1} / {total}
        </p>
      </div>
    </>
  );
}