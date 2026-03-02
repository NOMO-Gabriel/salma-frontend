import SectionTitle from "@/components/ui/SectionTitle";
import { ContactHeroTexts } from "@/types";

export default function ContactHero({ content }: { content: ContactHeroTexts }) {
  return (
    <section className="pt-24 pb-12 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title={content.title} 
          subtitle={content.subtitle} 
          description={content.description}
          size="lg"
          align="center"
        />
      </div>
    </section>
  );
}