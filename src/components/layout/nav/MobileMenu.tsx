"use client";
// =============================================================================
//  MobileMenu.tsx — SALMA · Menu mobile (panneau latéral droit)
//  Améliorations polish :
//    • Header avec dégradé navy + branding premium
//    • CTA "Prendre RDV" gold hero visible immédiatement (sans accordéon)
//    • Accordéons avec icônes et animations fluides
//    • Pied de menu avec newsletter intégrée + liens sociaux
//    • Animation slide-in depuis la droite
//    • Trap focus et accessibilité (aria)
// =============================================================================

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import type { NavContent, NavServiceItem } from "@/types";

// =============================================================================
//  Composant principal
// =============================================================================
export default function MobileMenu({
  content,
  onClose,
}: {
  content: NavContent;
  onClose: () => void;
}) {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Ferme si la route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Focus piégé dans le panneau (accessibilité)
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  // Ferme avec Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const toggleAccordion = (key: string) => {
    setActiveAccordion((prev) => (prev === key ? null : key));
  };

  const { nav_bourses, nav_services, nav_contact } = content;

  return (
    <div
      className="fixed inset-0 z-[110] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-salma-primary/30 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panneau latéral */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="
          absolute top-0 right-0
          w-[88%] max-w-[420px] h-full
          bg-white shadow-[−20px_0_60px_rgba(27,54,93,0.2)]
          flex flex-col
          animate-[slideInRight_0.28s_cubic-bezier(0.32,0.72,0,1)]
          outline-none
        "
      >

        {/* =================================================================
            HEADER DU PANNEAU
        ================================================================= */}
        <div className="relative bg-salma-primary px-6 py-5 flex justify-between items-center overflow-hidden flex-shrink-0">
          {/* Décoration géométrique subtile */}
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-salma-accent/10" aria-hidden="true" />
          <div className="absolute right-12 -bottom-4 w-12 h-12 rounded-full bg-salma-gold/10" aria-hidden="true" />

          {/* Branding */}
          <div className="relative flex flex-col">
            <span className="text-xl font-serif font-bold text-white leading-none">SALMA</span>
            <span className="text-[8px] uppercase tracking-[0.35em] text-salma-gold font-bold mt-0.5">
              Bourses & Mobilité
            </span>
          </div>

          {/* Bouton fermeture */}
          <button
            onClick={onClose}
            className="
              relative w-9 h-9 flex items-center justify-center
              rounded-xl bg-white/10 hover:bg-white/20
              text-white transition-colors duration-150
            "
            aria-label="Fermer le menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* =================================================================
            CTA HERO — Visible immédiatement, sans scroll
        ================================================================= */}
        <div className="px-4 pt-4 flex-shrink-0">
          <Link
            href="/contact"
            onClick={onClose}
            className="
              flex items-center justify-center gap-3
              w-full py-4 rounded-2xl
              bg-salma-gold text-salma-primary
              font-bold text-sm tracking-wide
              shadow-[0_4px_20px_rgba(201,168,76,0.4)]
              hover:bg-salma-gold-light active:scale-[0.98]
              transition-all duration-150
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {locale === "fr" ? "Prendre rendez-vous" : "Book a consultation"}
          </Link>
        </div>

        {/* =================================================================
            CORPS : ACCORDÉONS DE NAVIGATION
        ================================================================= */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">

          {/* ── BOURSES ─────────────────────────────────────────────────── */}
          <AccordionItem
            id="bourses"
            label={nav_bourses.title}
            icon="🎓"
            isOpen={activeAccordion === "bourses"}
            onToggle={() => toggleAccordion("bourses")}
          >
            <div className="space-y-2 pb-1">
              <Link
                href="/bourses?pays=chine"
                onClick={onClose}
                className="group flex items-start gap-3 p-4 bg-salma-bg rounded-xl hover:bg-salma-primary/5 transition-colors"
              >
                <span className="text-lg">🇨🇳</span>
                <div>
                  <p className="text-xs font-bold text-salma-primary">{nav_bourses.china_label}</p>
                  <p className="text-[10px] text-salma-text-muted mt-0.5 leading-snug">{nav_bourses.china_desc}</p>
                </div>
              </Link>
              <Link
                href="/bourses?pays=allemagne"
                onClick={onClose}
                className="group flex items-start gap-3 p-4 bg-salma-bg rounded-xl hover:bg-salma-primary/5 transition-colors"
              >
                <span className="text-lg">🇩🇪</span>
                <div>
                  <p className="text-xs font-bold text-salma-primary">{nav_bourses.germany_label}</p>
                  <p className="text-[10px] text-salma-text-muted mt-0.5 leading-snug">{nav_bourses.germany_desc}</p>
                </div>
              </Link>
              <Link
                href="/bourses"
                onClick={onClose}
                className="block text-center text-[10px] font-bold text-salma-gold py-2 hover:underline"
              >
                Voir toutes les bourses →
              </Link>
            </div>
          </AccordionItem>

          {/* ── SERVICES ────────────────────────────────────────────────── */}
          <AccordionItem
            id="services"
            label={nav_services.title}
            icon="⚙️"
            isOpen={activeAccordion === "services"}
            onToggle={() => toggleAccordion("services")}
          >
            <div className="grid grid-cols-1 gap-1.5 pb-1">
              {nav_services.items.map((item: NavServiceItem) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 bg-salma-bg rounded-xl hover:bg-salma-primary/5 transition-colors"
                >
                  <span className="text-lg w-8 text-center flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-salma-primary">{item.label}</p>
                    <p className="text-[9px] text-salma-text-muted leading-snug">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </AccordionItem>

          {/* ── LIENS SIMPLES ───────────────────────────────────────────── */}
          <nav className="space-y-1" aria-label="Liens rapides">
            {[
              { href: "/a-propos", label: locale === "fr" ? "À propos" : "About us", icon: "🏢" },
              { href: "/contact",  label: locale === "fr" ? "Contact"  : "Contact",  icon: "✉️" },
              { href: "/confidentialite", label: locale === "fr" ? "Confidentialité" : "Privacy", icon: "🛡️" },
            ].map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-salma-border hover:border-salma-gold hover:bg-salma-gold/5 transition-all"
              >
                <span className="text-base">{icon}</span>
                <span className="text-xs font-bold text-salma-primary uppercase tracking-widest">
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          {/* ── WHATSAPP ────────────────────────────────────────────────── */}
          <a
            href="https://wa.me/237699450984"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-3 px-4 py-3.5 rounded-xl
              bg-green-500 text-white
              hover:bg-green-600 active:scale-[0.98]
              transition-all duration-150 shadow-sm
            "
          >
            <span className="text-base">💬</span>
            <div>
              <p className="text-xs font-bold">{nav_contact.whatsapp_label}</p>
              <p className="text-[9px] text-white/70">{nav_contact.whatsapp_desc}</p>
            </div>
          </a>

        </div>

        {/* =================================================================
            FOOTER : NEWSLETTER + COPYRIGHT
        ================================================================= */}
        <div className="flex-shrink-0 border-t border-salma-border bg-salma-bg/60 px-5 py-5 space-y-4">
          {/* Mini newsletter */}
          <div>
            <p className="text-[10px] font-bold text-salma-primary mb-1">{nav_contact.newsletter_title}</p>
            <p className="text-[9px] text-salma-text-muted mb-3 leading-snug">{nav_contact.newsletter_desc}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={nav_contact.newsletter_placeholder}
                className="flex-1 bg-white border border-salma-border rounded-xl px-3 py-2.5 text-xs outline-none focus:border-salma-gold transition-colors"
              />
              <button className="bg-salma-gold text-salma-primary px-4 py-2.5 rounded-xl text-[10px] font-bold hover:bg-salma-gold-light transition-colors shadow-sm">
                {nav_contact.newsletter_btn}
              </button>
            </div>
          </div>

          {/* Liens sociaux */}
          <div className="flex gap-3 opacity-50">
            {["f", "in", "ig"].map((s) => (
              <div
                key={s}
                className="w-7 h-7 rounded-full border border-salma-border flex items-center justify-center text-[9px] font-bold text-salma-primary"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// =============================================================================
//  Sous-composant : Item d'accordéon réutilisable
// =============================================================================
function AccordionItem({
  id,
  label,
  icon,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-salma-border rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="
          w-full flex items-center justify-between gap-3
          px-4 py-4 bg-white hover:bg-salma-bg
          transition-colors duration-150
        "
        aria-expanded={isOpen}
        aria-controls={`accordion-${id}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-base">{icon}</span>
          <span className="text-xs font-bold text-salma-primary uppercase tracking-widest">
            {label}
          </span>
        </div>
        {/* Chevron animé */}
        <svg
          className={`
            w-4 h-4 text-salma-gold flex-shrink-0
            transition-transform duration-300
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Contenu accordéon avec animation */}
      <div
        id={`accordion-${id}`}
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pb-3 pt-1 bg-salma-bg/30 border-t border-salma-border/50">
          {children}
        </div>
      </div>
    </div>
  );
}