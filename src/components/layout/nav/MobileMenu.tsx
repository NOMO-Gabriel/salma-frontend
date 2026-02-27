"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Menu Mobile Informatif - Responsive Extrême
 * Utilise les mêmes clés de contenu que le Desktop
 */
export default function MobileMenu({ content, onClose }: { content: any, onClose: () => void }) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  const bourses = content.nav_bourses;
  const services = content.nav_services;
  const contact = content.nav_contact;

  return (
    <div className="fixed inset-0 z-[110] lg:hidden animate-fade-in">
      {/* Backdrop flou pour focus sur le menu */}
      <div className="absolute inset-0 bg-salma-primary/20 backdrop-blur-sm" onClick={onClose} />

      {/* Panneau latéral droit */}
      <div className="absolute top-0 right-0 w-[85%] max-w-[400px] h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* HEADER MOBILE */}
        <div className="p-6 border-b border-salma-border flex justify-between items-center bg-salma-bg/30">
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold text-salma-primary leading-none">SALMA</span>
            <span className="text-[8px] uppercase tracking-widest text-salma-gold font-bold">Bourses & Mobilité</span>
          </div>
          <button onClick={onClose} className="p-2 text-salma-primary hover:bg-salma-primary/10 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* CORPS DU MENU (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          
          {/* ACCORDION : BOURSES */}
          <div className="border border-salma-border rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggleAccordion('bourses')}
              className="w-full p-5 flex justify-between items-center bg-white hover:bg-salma-bg transition-colors"
            >
              <span className="text-sm font-bold text-salma-primary uppercase tracking-widest">{bourses.title}</span>
              <span className={`text-salma-gold transition-transform duration-300 ${activeAccordion === 'bourses' ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            {activeAccordion === 'bourses' && (
              <div className="px-5 pb-5 space-y-4 animate-fade-in">
                <Link href="/bourses?pays=chine" onClick={onClose} className="block p-4 bg-salma-bg rounded-xl">
                  <p className="font-bold text-salma-primary text-xs">🇨🇳 {bourses.china_label}</p>
                  <p className="text-[10px] text-salma-text-muted mt-1">{bourses.china_desc}</p>
                </Link>
                <Link href="/bourses?pays=allemagne" onClick={onClose} className="block p-4 bg-salma-bg rounded-xl">
                  <p className="font-bold text-salma-primary text-xs">🇩🇪 {bourses.germany_label}</p>
                  <p className="text-[10px] text-salma-text-muted mt-1">{bourses.germany_desc}</p>
                </Link>
              </div>
            )}
          </div>

          {/* ACCORDION : SERVICES */}
          <div className="border border-salma-border rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggleAccordion('services')}
              className="w-full p-5 flex justify-between items-center bg-white hover:bg-salma-bg transition-colors"
            >
              <span className="text-sm font-bold text-salma-primary uppercase tracking-widest">{services.title}</span>
              <span className={`text-salma-gold transition-transform duration-300 ${activeAccordion === 'services' ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {activeAccordion === 'services' && (
              <div className="px-5 pb-5 grid grid-cols-1 gap-2 animate-fade-in">
                {services.items.map((item: any) => (
                  <Link key={item.id} href={item.href} onClick={onClose} className="flex items-center gap-4 p-3 bg-salma-bg rounded-xl">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-salma-primary">{item.label}</p>
                      <p className="text-[9px] text-salma-text-muted">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* SECTION FIXE : CONTACT & ACTIONS RAPIDES */}
          <div className="mt-4 p-2 space-y-2">
            <p className="px-4 text-[10px] font-black text-salma-gold uppercase tracking-[0.2em] mb-4">Actions Prioritaires</p>
            
            <Link href="/contact" onClick={onClose} className="flex items-center gap-4 p-4 bg-salma-primary text-white rounded-2xl shadow-lg">
              <span className="text-xl">📅</span>
              <div>
                <p className="text-xs font-bold">{contact.rdv_label}</p>
                <p className="text-[9px] opacity-70">{contact.rdv_desc}</p>
              </div>
            </Link>

            <a href="https://wa.me/237699450984" target="_blank" className="flex items-center gap-4 p-4 bg-green-500 text-white rounded-2xl shadow-lg">
              <span className="text-xl">💬</span>
              <div>
                <p className="text-xs font-bold">{contact.whatsapp_label}</p>
                <p className="text-[9px] opacity-70">{contact.whatsapp_desc}</p>
              </div>
            </a>
          </div>
        </div>

        {/* FOOTER : NEWSLETTER MOBILE INTEGRÉE */}
        <div className="p-6 bg-salma-bg border-t border-salma-border">
          <p className="text-xs font-bold text-salma-primary mb-1">{contact.newsletter_title}</p>
          <p className="text-[10px] text-salma-text-muted mb-4 leading-tight">{contact.newsletter_desc}</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder={contact.newsletter_placeholder} 
              className="flex-1 bg-white border border-salma-border rounded-xl px-4 py-3 text-xs outline-none focus:border-salma-gold" 
            />
            <button className="bg-salma-gold text-salma-primary px-5 py-3 rounded-xl text-xs font-bold shadow-md">
              {contact.newsletter_btn}
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-salma-border flex justify-center gap-6 opacity-40">
             <span className="text-[10px] font-bold">Facebook</span>
             <span className="text-[10px] font-bold">LinkedIn</span>
             <span className="text-[10px] font-bold">Instagram</span>
          </div>
        </div>
      </div>
    </div>
  );
}