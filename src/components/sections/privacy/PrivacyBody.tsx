import { PrivacyContent } from "@/types";

export default function PrivacyBody({ content }: { content: PrivacyContent }) {
  return (
    <div className="flex-1 space-y-16">
      <header>
        <p className="text-xs font-bold text-salma-gold uppercase tracking-widest mb-4">{content.lastUpdated}</p>
        <p className="text-xl text-salma-primary dark:text-white font-medium leading-relaxed first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-salma-gold first-letter:mr-3 first-letter:float-left">
          {content.intro}
        </p>
      </header>

      <div className="space-y-12">
        {content.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-32 group">
            <h3 className="text-2xl font-serif font-bold text-salma-primary dark:text-salma-gold mb-4 group-hover:translate-x-2 transition-transform duration-300">
              {s.title}
            </h3>
            <p className="text-salma-text-muted leading-relaxed border-l border-salma-border pl-6">
              {s.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}