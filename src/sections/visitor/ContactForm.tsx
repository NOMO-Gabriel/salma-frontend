"use client";
import { useLanguage } from "@/hooks/useLanguage";
import SalmaButton from "@/components/ui/SalmaButton";

export default function ContactForm() {
  const { dictionary } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-salma-surface border border-salma-border rounded-[2rem] overflow-hidden shadow-salma-lg grid grid-cols-1 md:grid-cols-2">
          
          {/* Infos de contact */}
          <div className="p-12 bg-salma-primary text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">{dictionary.contact.title}</h2>
              <p className="text-salma-gold-light text-sm mb-12">{dictionary.contact.subtitle}</p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="text-salma-gold">📍</span>
                  <p className="text-sm">{dictionary.contact.info.address}</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-salma-gold">✉️</span>
                  <p className="text-sm">{dictionary.contact.info.email}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-widest opacity-50">AG Technologies Group</p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="p-12">
            <form className="space-y-4">
              <input type="text" placeholder={dictionary.contact.form.name} className="w-full p-4 rounded-xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold transition-all" />
              <input type="email" placeholder={dictionary.contact.form.email} className="w-full p-4 rounded-xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold transition-all" />
              <input type="tel" placeholder={dictionary.contact.form.phone} className="w-full p-4 rounded-xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold transition-all" />
              <textarea placeholder={dictionary.contact.form.message} rows={4} className="w-full p-4 rounded-xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold transition-all"></textarea>
              <SalmaButton variant="primary" className="w-full py-4 shadow-xl">
                {dictionary.contact.form.send}
              </SalmaButton>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}