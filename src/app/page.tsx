import Hero from "@/sections/visitor/Hero";
import TrustBar from "@/sections/visitor/TrustBar";
import StatsCounter from "@/sections/visitor/StatsCounter";
import FeaturedScholarships from "@/sections/visitor/FeaturedScholarships";
import SuccessStories from "@/sections/visitor/SuccessStories"; // Nouvel import
import ContactForm from "@/sections/visitor/ContactForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <StatsCounter />
      <FeaturedScholarships />
      <SuccessStories /> {/* Section des témoignages */}
      <ContactForm />
      {/* Prochain Sprint : Footer & Newsletter */}
    </main>
  );
}