"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const { dictionary } = useLanguage();

  return (
    <footer className="bg-salma-primary-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Colonne 1 : Branding */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col">
              <span className="text-3xl font-serif font-bold text-white leading-none">SALMA</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-salma-gold font-sans font-bold">Expertise AG Technologies</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {dictionary.footer.tagline}
            </p>
            <div className="p-4 border-l-2 border-salma-gold bg-white/5">
              <p className="text-xs italic text-salma-gold-light font-medium">
                &quot;{dictionary.footer.slogan}&quot;
              </p>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="text-salma-gold font-bold uppercase tracking-widest text-xs mb-8">
              {dictionary.footer.links.title}
            </h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">{dictionary.footer.links.home}</Link></li>
              <li><Link href="/bourses" className="text-sm text-gray-300 hover:text-white transition-colors">{dictionary.footer.links.bourses}</Link></li>
              <li><Link href="/a-propos" className="text-sm text-gray-300 hover:text-white transition-colors">{dictionary.footer.links.about}</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">{dictionary.footer.links.contact}</Link></li>
              <li><Link href="/confidentialite" className="text-sm text-gray-300 hover:text-white transition-colors">{dictionary.cookies.link}
  </Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Coordonnées */}
          <div>
            <h4 className="text-salma-gold font-bold uppercase tracking-widest text-xs mb-8">
              {dictionary.footer.contact.title}
            </h4>
            <ul className="space-y-6 text-sm text-gray-300">
              <li className="flex gap-4">
                <span className="text-salma-gold">📍</span>
                <span>{dictionary.footer.contact.address}</span>
              </li>
              <li className="flex gap-4">
                <span className="text-salma-gold">📞</span>
                <span>{dictionary.footer.contact.phones}</span>
              </li>
              <li className="flex gap-4">
                <span className="text-salma-gold">✉️</span>
                <span className="break-all">{dictionary.footer.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter / Badge AGT */}
          <div>
            <h4 className="text-salma-gold font-bold uppercase tracking-widest text-xs mb-8">
              AG Technologies
            </h4>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-xs text-gray-400 mb-4 italic">
                {dictionary.hero.badge}
              </p>
              <div className="flex gap-3">
                 {/* Ici on pourrait mettre des icônes de réseaux sociaux */}
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-salma-gold hover:text-salma-primary transition-all cursor-pointer">f</div>
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-salma-gold hover:text-salma-primary transition-all cursor-pointer">in</div>
              </div>
            </div>
          </div>

        </div>

        {/* Barre de copyright */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            {dictionary.footer.rights}
          </p>
          <div className="flex gap-8 text-[10px] text-gray-500 uppercase tracking-widest">
            <Link href="/mentions-legales" className="hover:text-salma-gold transition-colors">Mentions Légales</Link>
            <Link href="/confidentialite" className="hover:text-salma-gold transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}