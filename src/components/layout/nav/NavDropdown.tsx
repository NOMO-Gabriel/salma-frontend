"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavBourses, NavServices, NavContact,NavAbout } from "@/types";

type NavDropdownData = NavBourses | NavServices | NavContact | NavAbout;
/**
 * Menu déroulant informatif style Ecobank
 */
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
      <button className={`
        px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2
        ${isAction ? "bg-salma-primary text-white rounded-lg ml-4 shadow-md" : "text-salma-primary hover:text-salma-gold"}
      `}>
        {title}
        {!isAction && <span className={`text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>}
      </button>

      {/* LE PANNEAU INFORMATIF */}
      {isOpen && !isAction && (
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[400px] bg-white border border-salma-border rounded-2xl shadow-salma-lg p-6 animate-fade-in">
          {/* Petit triangle */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-salma-border rotate-45" />

          {/* CAS BOURSES */}
          {type === "bourses" && (() => {
            const d = data as NavBourses;
            return (
              <div className="grid grid-cols-1 gap-6">
                <Link href="/bourses?pays=chine" className="group block p-4 hover:bg-salma-bg rounded-xl transition-all">
                  <p className="font-bold text-salma-primary flex items-center gap-2">🇨🇳 {d.china_label}</p>
                  <p className="text-xs text-salma-text-muted mt-1">{d.china_desc}</p>
                  <span className="text-[10px] font-bold text-salma-gold uppercase mt-2 block opacity-0 group-hover:opacity-100 transition-all">→ {d.china_cta}</span>
                </Link>
                <div className="h-px bg-salma-border" />
                <Link href="/bourses?pays=allemagne" className="group block p-4 hover:bg-salma-bg rounded-xl transition-all">
                  <p className="font-bold text-salma-primary flex items-center gap-2">🇩🇪 {d.germany_label}</p>
                  <p className="text-xs text-salma-text-muted mt-1">{d.germany_desc}</p>
                  <span className="text-[10px] font-bold text-salma-gold uppercase mt-2 block opacity-0 group-hover:opacity-100 transition-all">→ {d.germany_cta}</span>
                </Link>
              </div>
            );
          })()}

          {/* CAS SERVICES */}
          {type === "services" && (() => {
            const d = data as NavServices;
            return (
              <div className="grid grid-cols-2 gap-4">
                {d.items.map((item) => (
                  <Link key={item.id} href={item.href} className="p-3 hover:bg-salma-bg rounded-xl transition-all border border-transparent hover:border-salma-border">
                    <span className="text-xl mb-2 block">{item.icon}</span>
                    <p className="text-xs font-bold text-salma-primary">{item.label}</p>
                    <p className="text-[10px] text-salma-text-muted leading-tight mt-1">{item.desc}</p>
                  </Link>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* CAS NOUS CONTACTER (Action Menu) */}
      {isOpen && isAction && (() => {
        const d = data as NavContact;
        return (
          <div className="absolute top-[80px] right-0 w-[320px] bg-white border border-salma-border rounded-2xl shadow-salma-lg overflow-hidden animate-fade-in">
            <div className="p-2 space-y-1">
              <Link href="/contact" className="flex items-center gap-4 p-4 hover:bg-salma-primary hover:text-white rounded-xl transition-all group">
                <span className="text-xl">📅</span>
                <div>
                  <p className="text-xs font-bold">{d.rdv_label}</p>
                  <p className="text-[10px] opacity-70">{d.rdv_desc}</p>
                </div>
              </Link>
              <a href="https://wa.me/237699450984" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 hover:bg-green-500 hover:text-white rounded-xl transition-all group">
                <span className="text-xl">💬</span>
                <div>
                  <p className="text-xs font-bold">{d.whatsapp_label}</p>
                  <p className="text-[10px] opacity-70">{d.whatsapp_desc}</p>
                </div>
              </a>
            </div>

            {/* MINI NEWSLETTER */}
            <div className="bg-salma-bg p-6 border-t border-salma-border">
              <p className="text-xs font-bold text-salma-primary mb-1">{d.newsletter_title}</p>
              <p className="text-[10px] text-salma-text-muted mb-4">{d.newsletter_desc}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={d.newsletter_placeholder}
                  className="flex-1 bg-white border border-salma-border rounded-lg px-3 py-2 text-[10px] outline-none focus:border-salma-gold"
                />
                <button className="bg-salma-gold text-salma-primary px-3 py-2 rounded-lg text-[10px] font-bold">
                  {d.newsletter_btn}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}