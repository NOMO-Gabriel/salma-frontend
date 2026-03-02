// src/app/not-found.tsx
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import { defaultLocale } from "@/config/i18n";
import SalmaButton from "@/components/ui/SalmaButton";

export default function NotFound() {
  const dict = getDictionary(defaultLocale);
  const t = dict.errors.notFound;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="relative mb-8">
        <span className="text-[12rem] font-serif font-black text-salma-primary/5 leading-none">404</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">🌍</span>
        </div>  
      </div>
      
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-salma-primary mb-4">
        {t.title}
      </h1>
      <p className="text-salma-text-muted max-w-md mb-10">
        {t.desc}
      </p>

      <Link href="/">
        <SalmaButton variant="primary" size="lg">
          {t.btn}
        </SalmaButton>
      </Link>
    </div>
  );
}