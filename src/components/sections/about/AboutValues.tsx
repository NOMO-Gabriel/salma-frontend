import { AboutValuesTexts } from "@/types";

interface AboutValuesProps {
  content: AboutValuesTexts;
}

export default function AboutValues({ content }: AboutValuesProps) {
  return (
    <section className="py-24 bg-salma-primary relative overflow-hidden">
      {/* Décor de fond */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-salma-gold rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          {/* Titre Principal en DORÉ */}
          <h2 className="text-3xl md:text-5xl font-serif font-bold !text-salma-gold mb-4">
            {content.title}
          </h2>
          <div className="w-24 h-1.5 bg-salma-gold/30 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((item, i) => (
            <div 
              key={i} 
              className="group bg-white/[0.05] backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:border-salma-gold/50 transition-all duration-500"
            >
              {/* Icône flottante sur Halo */}
              <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-salma-gold/20 rounded-full blur-xl group-hover:bg-salma-gold/40 transition-colors" />
                <span className="relative text-4xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
              </div>

              {/* Titre du bloc en DORÉ */}
              <h3 className="text-2xl font-serif font-bold !text-salma-gold mb-4">
                {item.title}
              </h3>
              
              {/* Description en Blanc cassé pour le confort de lecture */}
              <p className="text-white/90 leading-relaxed text-sm font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}