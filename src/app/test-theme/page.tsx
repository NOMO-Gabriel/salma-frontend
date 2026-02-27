// src/app/test-theme/page.tsx
"use client";

export default function ThemeTestPage() {
  return (
    <div className="min-h-screen p-12 flex flex-col items-center justify-center gap-8">
      <div className="max-w-md w-full p-8 rounded-3xl bg-surface border border-border shadow-xl">
        <span className="text-gold font-bold tracking-widest text-xs uppercase">Test de Design</span>
        <h1 className="text-3xl font-serif font-bold text-salma-primary mt-2 mb-4">
          Bourse d'Excellence SALMA
        </h1>
        <p className="text-text-muted text-sm leading-relaxed mb-6">
          Ceci est un test pour valider la nouvelle charte graphique Bordeaux & Or. 
          Le fond de cette carte change selon le mode Clair ou Sombre.
        </p>
        <div className="flex gap-4">
          <button className="flex-1 bg-salma-primary text-white py-3 rounded-xl font-bold text-sm transition-transform active:scale-95">
            Postuler
          </button>
          <button className="flex-1 border-2 border-gold text-gold py-3 rounded-xl font-bold text-sm">
            Détails
          </button>
        </div>
      </div>
      
      <p className="text-xs text-text-muted italic">
        Utilise ton bouton de changement de thème dans la Navbar pour tester.
      </p>
    </div>
  );
}