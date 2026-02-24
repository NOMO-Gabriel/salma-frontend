"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { dictionary } = useLanguage();

  const links = [
    { name: dictionary.nav.home, href: "/" },
    { name: dictionary.nav.services, href: "/services" },
    { name: dictionary.nav.about, href: "/a-propos" },
    { name: dictionary.nav.contact, href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-salma-bg/80 backdrop-blur-md border-b border-salma-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-serif font-bold text-salma-primary leading-none">SALMA</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-salma-gold font-sans font-bold">Travel Agency</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-sm font-medium text-salma-text hover:text-salma-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/admin/dashboard" 
            className="text-xs font-bold px-3 py-1.5 rounded border border-salma-primary text-salma-primary hover:bg-salma-primary hover:text-white transition-all"
          >
            {dictionary.nav.admin}
          </Link>
          <div className="flex items-center gap-3 border-l border-salma-border pl-6">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-salma-primary" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-salma-surface border-b border-salma-border p-6 flex flex-col gap-4 animate-fade-in">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium">
              {link.name}
            </Link>
          ))}
          <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-bold text-salma-primary">
             {dictionary.nav.admin}
          </Link>
          <div className="flex justify-between items-center pt-4 border-t border-salma-border">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}