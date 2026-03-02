// src/app/error.tsx
"use client";

import { useEffect } from "react";
import SalmaButton from "@/components/ui/SalmaButton";
import { frLayout } from "@/dictionaries/data/static/layout/fr";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Utilisation directe du dictionnaire statique pour éviter tout texte en dur
  const t = frLayout.errors.global;

  useEffect(() => {
    console.error("Crash SALMA:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-3xl mb-8">
        ⚠️
      </div>
      
      <h1 className="text-3xl font-serif font-bold text-salma-primary mb-4">
        {t.title}
      </h1>
      <p className="text-salma-text-muted max-w-md mb-10">
        {t.desc}
      </p>

      <div className="flex gap-4">
        <SalmaButton variant="primary" onClick={() => reset()}>
          {t.btnReset}
        </SalmaButton>
        <SalmaButton variant="outline" onClick={() => window.location.href = "/"}>
          {t.btnHome}
        </SalmaButton>
      </div>
    </div>
  );
}