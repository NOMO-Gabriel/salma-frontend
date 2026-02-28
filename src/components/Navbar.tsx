"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import NavDropdown from "@/components/layout/nav/NavDropdown";
import MobileMenu from "@/components/layout/nav/MobileMenu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { NavContent } from "@/types";


export default function Navbar() {
  const { locale } = useLanguage();
  const [content, setContent] = useState<NavContent | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Chargement du contenu via le switcher
  useEffect(() => {
  cmsSwitcher.getScopeContent("layout", locale).then(
    (data) => setContent(data as NavContent)
  );
}, [locale]);

  if (!content) return null; // Ou un squelette de chargement

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-salma-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO - Sans mention admin */}
        <Link href="/" className="flex flex-col group">
          <span className="text-2xl font-serif font-bold text-salma-primary leading-none">SALMA</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-salma-gold font-sans font-bold">Bourses & Mobilité</span>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-2">
          <NavDropdown title={content.nav_bourses.title} type="bourses" data={content.nav_bourses} />
          <NavDropdown title={content.nav_services.title} type="services" data={content.nav_services} />
          <NavDropdown title={content.nav_about.title} type="about" data={content.nav_about} />
          <NavDropdown title={content.nav_contact.title} type="contact" data={content.nav_contact} isAction />
          
          <div className="h-6 w-px bg-salma-border mx-4" />
          <LanguageSwitcher />
        </div>

        {/* BOUTON MOBILE */}
        <button 
          className="lg:hidden p-2 text-salma-primary" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* MENU MOBILE (Accordions) */}
      {isMobileMenuOpen && (
        <MobileMenu content={content} onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </nav>
  );
}