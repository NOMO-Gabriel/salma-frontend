// src/components/Footer.tsx
// ==============================================================================
// Footer Global — Design System SALMA
//
// Reçoit tout par props depuis ConditionalLayout (distributeur central).
// Zéro useEffect, zéro cmsSwitcher, zéro texte en dur.
//
// Contenu :
//   - Branding SALMA + tagline + slogan
//   - Liens de navigation
//   - Coordonnées de contact
//   - Formulaire newsletter (NewsletterForm)
//   - Liens légaux (Confidentialité, Support)
// ==============================================================================

"use client";

import React from "react";
import Link from "next/link";
import NewsletterForm from "@/components/ui/NewsletterForm";
import type { FooterProps } from "@/types/pages/footer.types";

// — Sous-composant : Lien de navigation ----------------------------------------

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-slate-400 hover:text-salma-gold transition-all flex items-center gap-2 group"
      >
        <span
          className="w-0 group-hover:w-2 h-px bg-salma-gold transition-all"
          aria-hidden="true"
        />
        {label}
      </Link>
    </li>
  );
}

// — Sous-composant : Item de contact -------------------------------------------

function ContactItem({
  icon,
  text,
  isLink,
  href,
}: {
  icon: string;
  text: string;
  isLink?: boolean;
  href?: string;
}) {
  const content = (
    <span className="text-sm text-slate-400 leading-relaxed">{text}</span>
  );

  return (
    <li className="flex gap-4 items-start">
      <span className="text-lg leading-none" aria-hidden="true">
        {icon}
      </span>
      {isLink && href ? (
        <a href={href} className="hover:text-salma-gold transition-colors">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

// — Sous-composant : Titre de section ------------------------------------------

function SectionHeading({ text }: { text: string }) {
  return (
    <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-8 flex items-center gap-2">
      <span className="w-4 h-px bg-salma-gold" aria-hidden="true" />
      {text}
    </h4>
  );
}

// — Composant principal ---------------------------------------------------------

/**
 * **Footer** — Footer global du Design System SALMA.
 *
 * Reçoit tout par props depuis le ConditionalLayout. Ne fait aucun
 * fetch de données interne. Zéro texte en dur.
 *
 * @example
 * <Footer
 *   content={layoutData.footer}
 *   footerLabels={common.footer}
 *   newsletterLabels={common.newsletter}
 * />
 */
export default function Footer({
  content,
  footerLabels,
  newsletterLabels,
}: FooterProps) {
  const firstPhone = content.contact.phones.split("/")[0].trim();

  return (
    <footer className="bg-[#0B172A] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* ── Colonne 1 : Branding ─────────────────────────────────── */}
          <div className="space-y-8">
            <Link href="/" className="flex flex-col group">
              <span className="text-3xl font-serif font-bold text-white leading-none group-hover:text-salma-gold transition-colors">
                SALMA
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-salma-gold font-bold mt-1">
                {footerLabels.brandSubtitle}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {content.tagline}
            </p>
            <div className="inline-block p-4 border-l-2 border-salma-gold bg-white/5 rounded-r-xl">
              <p className="text-xs italic text-salma-gold-light font-medium">
                &quot;{content.slogan}&quot;
              </p>
            </div>
          </div>

          {/* ── Colonne 2 : Navigation ───────────────────────────────── */}
          <nav aria-label="Footer navigation" >
            <SectionHeading text={content.links.title} />
            <ul className="space-y-4">
              <FooterLink href="/" label={content.links.home} />
              <FooterLink href="/bourses" label={content.links.bourses} />
              <FooterLink href="/services" label={content.links.services} />
              <FooterLink href="/a-propos" label={content.links.about} />
              <FooterLink href="/contact" label={content.links.contact} />
            </ul>
          </nav>

          {/* ── Colonne 3 : Contact ──────────────────────────────────── */}
          <div>
            <SectionHeading text={content.contact.title} />
            <ul className="space-y-6">
              <ContactItem icon="📍" text={content.contact.address} />
              <ContactItem
                icon="📞"
                text={content.contact.phones}
                isLink
                href={`tel:${firstPhone}`}
              />
              <ContactItem
                icon="✉️"
                text={content.contact.email}
                isLink
                href={`mailto:${content.contact.email}`}
              />
            </ul>
          </div>

          {/* ── Colonne 4 : Newsletter ───────────────────────────────── */}
          <div>
            <SectionHeading text={footerLabels.newsletterTitle} />
            <p className="text-xs text-slate-400 mb-6">
              {footerLabels.newsletterDesc}
            </p>
            <NewsletterForm labels={newsletterLabels} source="footer" />
          </div>

        </div>

        {/* ── Barre de copyright ─────────────────────────────────────── */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
            {content.rights}
          </p>
          <div className="flex gap-8 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <Link
              href="/confidentialite"
              className="hover:text-salma-gold transition-colors"
            >
              {footerLabels.privacyLink}
            </Link>
            <Link
              href="/contact"
              className="hover:text-salma-gold transition-colors"
            >
              {footerLabels.supportLink}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}