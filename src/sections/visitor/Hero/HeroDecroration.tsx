"use client";
// src/sections/visitor/hero/HeroDecorations.tsx

export default function HeroDecorations({ type }: { type: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {type === "circle-top-right" && (
        <>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-salma-accent/8 blur-3xl" />
          <div className="absolute top-1/2 -right-16 w-[250px] h-[250px] rounded-full bg-salma-gold/6 blur-2xl" />
        </>
      )}
      {type === "circle-bottom-left" && (
        <>
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-salma-primary/6 blur-3xl" />
          <div className="absolute top-16 right-16 w-[180px] h-[180px] rounded-full bg-salma-gold/5 blur-2xl" />
        </>
      )}
      {type === "circle-center" && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-salma-accent/5 blur-3xl" />
          <div className="absolute -top-16 left-1/4 w-[180px] h-[180px] rounded-full bg-salma-gold/6 blur-2xl" />
        </>
      )}
      {/* Grille subtile */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#1B365D 1px, transparent 1px), linear-gradient(90deg, #1B365D 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}