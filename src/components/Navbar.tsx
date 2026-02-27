"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";
import SalmaButton from "./ui/SalmaButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { dictionary } = useLanguage();

  const links = [
    { name: dictionary.nav.home, href: "/" },
    { name: dictionary.nav.bourses, href: "/bourses" },
    { name: dictionary.nav.services, href: "/services" },
    { name: dictionary.nav.about, href: "/a-propos" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-salma-bg/90 backdrop-blur-md border-b border-salma-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex flex-col group">
          <span className="text-2xl font-serif font-bold text-salma-primary dark:text-white leading-none group-hover:text-salma-accent transition-colors">
            SALMA
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-salma-gold font-sans font-bold">
            Bourses de Voyage
          </span>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-salma-primary dark:text-gray-300 hover:text-salma-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-6 w-px bg-salma-border mx-2" />

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {/* CONTACT EN BOUTON POUR LA CONVERSION */}
            <Link href="/contact">
              <SalmaButton variant="primary" size="sm">
                {dictionary.nav.contact}
              </SalmaButton>
            </Link>

            {/* LIEN ADMIN DISCRET */}
            <Link 
              href="/admin/dashboard" 
              className="p-2 text-salma-text-muted hover:text-salma-primary transition-colors"
              title={dictionary.nav.admin}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="lg:hidden p-2 text-salma-primary" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden absolute w-full bg-white dark:bg-salma-surface border-b border-salma-border p-6 flex flex-col gap-6 animate-fade-in shadow-xl">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest">
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-sm font-bold text-salma-accent uppercase tracking-widest">
             {dictionary.nav.contact}
          </Link>
          <div className="flex justify-between items-center pt-6 border-t border-salma-border">
            <div className="flex gap-4">
              <LanguageSwitcher />
            </div>
            <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="text-xs font-bold text-salma-primary">
              {dictionary.nav.admin}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}