"use client";

import Link from "next/link";
import { NavContact } from "@/types";
import SectionTitle from "./SectionTitle";

interface Props {
  labels: NavContact;
}

export default function ConversionCTA({ labels }: Props) {
  return (
    <section className="py-24 bg-salma-bg border-t border-salma-border/20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle 
            title={labels.title} 
            subtitle={labels.subtitle} 
            align="center" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/237699450984" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white dark:bg-salma-surface p-10 rounded-[2.5rem] border border-salma-border hover:border-green-500/50 transition-all duration-500 shadow-salma-sm hover:shadow-2xl"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  💬
                </div>
                <h3 className="text-2xl font-serif font-bold text-salma-primary dark:text-white mb-3">
                  {labels.whatsapp_label}
                </h3>
                <p className="text-sm text-salma-text-muted font-medium">
                  {labels.whatsapp_desc}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Rendez-vous */}
            <Link 
              href="/contact"
              className="group relative overflow-hidden bg-salma-primary p-10 rounded-[2.5rem] border border-white/5 hover:border-salma-gold/50 transition-all duration-500 shadow-salma-sm hover:shadow-2xl"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-salma-gold/20 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  📅
                </div>
                <h3 className="text-2xl font-serif font-bold !text-salma-gold mb-3">
                  {labels.rdv_label}
                </h3>
                <p className="text-sm text-white/70 font-medium">
                  {labels.rdv_desc}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-salma-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}