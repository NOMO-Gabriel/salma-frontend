// src/app/(visitor)/bourses/[id]/not-found.tsx
import Link from "next/link";

export default function BourseNotFound() {
  return (
    <div className="min-h-screen bg-salma-bg flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-7xl mb-6 block">🎓</span>
        <h1 className="text-2xl font-serif font-bold text-salma-primary mb-3">
          Bourse introuvable
        </h1>
        <p className="text-salma-text-muted text-sm mb-8">
          Cette bourse n&apos;existe pas ou a été retirée du catalogue. Consultez nos autres opportunités disponibles.
        </p>
        <Link
          href="/bourses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-salma-primary text-white font-semibold text-sm hover:bg-salma-primary/90 transition-all"
        >
          ← Voir toutes les bourses
        </Link>
      </div>
    </div>
  );
}
