"use client";
// =============================================================================
//  NavDropdown.tsx — SALMA · Menu déroulant desktop
//  Améliorations polish :
//    • Chevron animé (rotate 180° à l'ouverture)
//    • Bouton trigger avec underline gold au hover
//    • Dropdowns avec entrée animée (fade + translateY)
//    • Cards hover avec background subtil et border gold
//    • Dropdown Contact avec gradient header navy
// =============================================================================

import { useState } from "react";
import Link from "next/link";
import type { NavBourses, NavServices, NavContact, NavAbout, NavHome } from "@/types";

type NavDropdownData = NavHome | NavBourses | NavServices | NavContact | NavAbout;

// =============================================================================
//  Composant principal
// =============================================================================
export default function NavDropdown({
  title,
  data,
  type,
  isAction = false,
}: {
  title: string;
  data: NavDropdownData;
  type: string;
  isAction?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative h-20 flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* ===================================================================
          BOUTON TRIGGER
      =================================================================== */}
      <button
        className={`
          relative px-4 py-2 flex items-center gap-1.5
          text-[11px] font-bold uppercase tracking-widest
          transition-all duration-200
          outline-none focus-visible:ring-2 focus-visible:ring-salma-gold focus-visible:ring-offset-2 rounded-lg
          ${isAction
            ? `
                border border-salma-border rounded-xl
                text-salma-primary hover:border-salma-gold hover:text-salma-gold
                bg-transparent hover:bg-salma-gold/5
              `
            : `
                text-salma-text-muted hover:text-salma-primary
                after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px]
                after:bg-salma-gold after:rounded-full after:scale-x-0
                hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-center
              `
          }
        `}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {title}
        {/* Chevron animé */}
        <svg
          className={`
            w-3 h-3 flex-shrink-0 transition-transform duration-200
            ${isOpen ? "rotate-180" : "rotate-0"}
            ${isAction ? "text-salma-gold" : "text-salma-border"}
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ===================================================================
          PANNEAUX DÉROULANTS
      =================================================================== */}
     {isOpen && type === "home" && (() => {
  const d = data as NavHome;
  return (
    <DropdownPanel align="left">
      <div className="p-2 space-y-1">
        {d.sections.map((item) => (
          <Link key={item.id} href={item.href}
            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-salma-bg border border-transparent hover:border-salma-border transition-all duration-150"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-bold text-salma-primary group-hover:text-salma-accent transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </DropdownPanel>
  );
})()}
      {/* ── CAS BOURSES ───────────────────────────────────────────────── */}
      {isOpen && type === "bourses" && (() => {
        const d = data as NavBourses;
        return (
          <DropdownPanel align="left" wide>
            <div className="p-2 space-y-2">
              {/* Chine */}
              <Link
                href="/bourses?pays=chine"
                className="group flex items-start gap-4 p-4 rounded-xl hover:bg-salma-bg border border-transparent hover:border-salma-border transition-all duration-150"
              >
                <span className="text-2xl mt-0.5">🇨🇳</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-salma-primary group-hover:text-salma-accent transition-colors">
                    {d.china_label}
                  </p>
                  <p className="text-[10px] text-salma-text-muted leading-snug mt-1">{d.china_desc}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-salma-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.china_cta} →
                  </span>
                </div>
              </Link>

              {/* Allemagne */}
              <Link
                href="/bourses?pays=allemagne"
                className="group flex items-start gap-4 p-4 rounded-xl hover:bg-salma-bg border border-transparent hover:border-salma-border transition-all duration-150"
              >
                <span className="text-2xl mt-0.5">🇩🇪</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-salma-primary group-hover:text-salma-accent transition-colors">
                    {d.germany_label}
                  </p>
                  <p className="text-[10px] text-salma-text-muted leading-snug mt-1">{d.germany_desc}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-salma-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.germany_cta} →
                  </span>
                </div>
              </Link>
            </div>

            {/* Footer du dropdown */}
            <div className="px-4 pb-3 pt-1 border-t border-salma-border/50">
              <Link
                href="/bourses"
                className="text-[10px] font-bold text-salma-gold hover:text-salma-gold-light transition-colors flex items-center gap-1"
              >
                Voir toutes les bourses →
              </Link>
            </div>
          </DropdownPanel>
        );
      })()}

      {/* ── CAS SERVICES ──────────────────────────────────────────────── */}
      {isOpen && type === "services" && (() => {
        const d = data as NavServices;
        return (
          <DropdownPanel align="left" wide>
            <div className="p-2 grid grid-cols-2 gap-1">
              {d.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group p-3 rounded-xl hover:bg-salma-bg border border-transparent hover:border-salma-border transition-all duration-150"
                >
                  <span className="text-xl mb-2 block">{item.icon}</span>
                  <p className="text-xs font-bold text-salma-primary group-hover:text-salma-accent transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-salma-text-muted leading-tight mt-1">{item.desc}</p>
                </Link>
              ))}
            </div>
          </DropdownPanel>
        );
      })()}

      {/* ── CAS À PROPOS ──────────────────────────────────────────────── */}
      {isOpen && type === "about" && (() => {
        const d = data as NavAbout;
        return (
          <DropdownPanel align="left">
            <div className="p-2 space-y-1">
              <Link
                href="/a-propos"
                className="group flex items-start gap-3 p-4 rounded-xl hover:bg-salma-bg border border-transparent hover:border-salma-border transition-all"
              >
                <span className="text-xl">🏢</span>
                <div>
                  <p className="text-xs font-bold text-salma-primary group-hover:text-salma-accent transition-colors">
                    {d.agency_label}
                  </p>
                  <p className="text-[10px] text-salma-text-muted mt-1">{d.agency_desc}</p>
                </div>
              </Link>
              <Link
                href="/a-propos#mission"
                className="group flex items-start gap-3 p-4 rounded-xl hover:bg-salma-bg border border-transparent hover:border-salma-border transition-all"
              >
                <span className="text-xl">🎯</span>
                <div>
                  <p className="text-xs font-bold text-salma-primary group-hover:text-salma-accent transition-colors">
                    {d.mission_label}
                  </p>
                  <p className="text-[10px] text-salma-text-muted mt-1">{d.mission_desc}</p>
                </div>
              </Link>
            </div>
            <div className="px-4 pb-3 pt-1 border-t border-salma-border/50">
              <Link
                href="/a-propos"
                className="text-[10px] font-bold text-salma-gold hover:text-salma-gold-light transition-colors flex items-center gap-1"
              >
                {d.cta} →
              </Link>
            </div>
          </DropdownPanel>
        );
      })()}

      {/* ── CAS CONTACT (isAction) ────────────────────────────────────── */}
      {isOpen && isAction && (() => {
        const d = data as NavContact;
        return (
          <DropdownPanel align="right">
            {/* Header gradient navy */}
            <div className="bg-salma-primary px-5 py-4 rounded-t-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-salma-gold">
                {d.title}
              </p>
              <p className="text-xs text-white/60 mt-0.5">
                Réponse en moins de 24h
              </p>
            </div>

            <div className="p-2 space-y-1">
              {/* RDV */}
              <Link
                href="/contact"
                className="group flex items-center gap-4 p-4 hover:bg-salma-primary hover:text-white rounded-xl transition-all duration-150"
              >
                <span className="text-xl">📅</span>
                <div>
                  <p className="text-xs font-bold">{d.rdv_label}</p>
                  <p className="text-[10px] opacity-60 group-hover:opacity-80">{d.rdv_desc}</p>
                </div>
              </Link>

              {/* WhatsApp */}
              <a
                href="https://wa.me/237699450984"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 hover:bg-green-500 hover:text-white rounded-xl transition-all duration-150 group"
              >
                <span className="text-xl">💬</span>
                <div>
                  <p className="text-xs font-bold text-salma-primary group-hover:text-white">{d.whatsapp_label}</p>
                  <p className="text-[10px] text-salma-text-muted group-hover:text-white/80">{d.whatsapp_desc}</p>
                </div>
              </a>
            </div>

            {/* Mini newsletter */}
            <div className="bg-salma-bg px-4 py-4 border-t border-salma-border rounded-b-2xl">
              <p className="text-[10px] font-bold text-salma-primary mb-1">{d.newsletter_title}</p>
              <p className="text-[9px] text-salma-text-muted mb-3 leading-snug">{d.newsletter_desc}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={d.newsletter_placeholder}
                  className="flex-1 bg-white border border-salma-border rounded-lg px-3 py-2 text-[10px] outline-none focus:border-salma-gold transition-colors"
                />
                <button className="bg-salma-gold text-salma-primary px-3 py-2 rounded-lg text-[10px] font-bold hover:bg-salma-gold-light transition-colors">
                  {d.newsletter_btn}
                </button>
              </div>
            </div>
          </DropdownPanel>
        );
      })()}
    </div>
  );
}

// =============================================================================
//  Sous-composant : Panel générique avec animation d'entrée
// =============================================================================
function DropdownPanel({
  children,
  align = "left",
  wide = false,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  wide?: boolean;
}) {
  return (
    <div
      className={`
        absolute top-[80px]
        ${align === "right" ? "right-0" : "left-0"}
        ${wide ? "w-[380px]" : "w-[300px]"}
        bg-white border border-salma-border rounded-2xl
        shadow-[0_20px_50px_rgba(27,54,93,0.15)]
        overflow-hidden
        animate-[dropdownReveal_0.2s_ease-out_forwards]
        origin-top
      `}
    >
      {children}
    </div>
  );
}