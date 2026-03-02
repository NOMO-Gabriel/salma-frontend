import { ServiceItem } from "@/types";

export default function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <div className="group bg-white dark:bg-salma-surface p-8 rounded-[2.5rem] border border-salma-border hover:border-salma-gold/50 transition-all duration-500 shadow-salma-sm hover:shadow-xl flex flex-col h-full">
      <div className="w-16 h-16 bg-salma-bg dark:bg-salma-primary/30 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {item.icon}
      </div>
      
      <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white mb-3 group-hover:text-salma-gold transition-colors">
        {item.title}
      </h3>
      
      <p className="text-sm text-salma-text-muted leading-relaxed mb-6 flex-1">
        {item.desc}
      </p>

      <div className="pt-4 border-t border-salma-border flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-salma-text-muted">Délai moyen</span>
        <span className="px-3 py-1 bg-salma-gold/10 text-salma-gold-dark dark:text-salma-gold text-[10px] font-bold rounded-full border border-salma-gold/20">
          {item.delay}
        </span>
      </div>
    </div>
  );
}