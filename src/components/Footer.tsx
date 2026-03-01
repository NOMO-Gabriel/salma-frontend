"use client";
// src/components/Footer.tsx
// ==============================================================================
//  Footer Global — Version Polie & Stabilisée
//  ✅ Piloté par cmsSwitcher (Scope: "layout")
//  ✅ Correction Build (Guillemets escaper)
// ==============================================================================

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import NewsletterForm from "@/components/ui/NewsletterForm";

interface FooterTexts {
  tagline: string;
  slogan: string;
  links: {
    title: string;
    home: string;
    bourses: string;
    services: string;
    about: string;
    contact: string;
  };
  contact: {
    title: string;
    address: string;
    phones: string;
    email: string;
  };
  rights: string;
}

export default function Footer() {
  const { locale } = useLanguage();
  const [content, setContent] = useState<FooterTexts | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent("layout", locale).then((data) => {
      if (data && data.footer) {
        setContent(data.footer as FooterTexts);
      }
    });
  }, [locale]);

  if (!content) return <div className="h-64 bg-[#0B172A] animate-pulse" />;

  return (
    <footer className="bg-[#0B172A] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          <div className="space-y-8">
            <Link href="/" className="flex flex-col group">
              <span className="text-3xl font-serif font-bold text-white leading-none group-hover:text-salma-gold transition-colors">
                SALMA
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-salma-gold font-bold mt-1">
                Bourses & Mobilité
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

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-salma-gold" /> {content.links.title}
            </h4>
            <ul className="space-y-4">
              <FooterLink href="/" label={content.links.home} />
              <FooterLink href="/bourses" label={content.links.bourses} />
              <FooterLink href="/services" label={content.links.services} />
              <FooterLink href="/a-propos" label={content.links.about} />
              <FooterLink href="/contact" label={content.links.contact} />
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-salma-gold" /> {content.contact.title}
            </h4>
            <ul className="space-y-6">
              <ContactItem icon="📍" text={content.contact.address} />
              <ContactItem icon="📞" text={content.contact.phones} isLink href={`tel:${content.contact.phones.split('/')[0].trim()}`} />
              <ContactItem icon="✉️" text={content.contact.email} isLink href={`mailto:${content.contact.email}`} />
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-salma-gold" /> Newsletter
            </h4>
            <p className="text-xs text-slate-400 mb-6">Recevez les alertes bourses en priorité.</p>
            <NewsletterForm />
          </div>

        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
            {content.rights}
          </p>
          <div className="flex gap-8 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <Link href="/confidentialite" className="hover:text-salma-gold transition-colors">Confidentialité</Link>
            <Link href="/contact" className="hover:text-salma-gold transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string, label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-slate-400 hover:text-salma-gold transition-all flex items-center gap-2 group">
        <span className="w-0 group-hover:w-2 h-px bg-salma-gold transition-all" />
        {label}
      </Link>
    </li>
  );
}

function ContactItem({ icon, text, isLink, href }: { icon: string, text: string, isLink?: boolean, href?: string }) {
  const content = <span className="text-sm text-slate-400 leading-relaxed">{text}</span>;
  return (
    <li className="flex gap-4 items-start">
      <span className="text-lg leading-none">{icon}</span>
      {isLink && href ? <a href={href} className="hover:text-salma-gold transition-colors">{content}</a> : content}
    </li>
  );
}