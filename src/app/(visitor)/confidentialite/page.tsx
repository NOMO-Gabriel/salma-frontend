// src/app/(visitor)/confidentialite/page.tsx
import SectionTitle from "@/components/ui/SectionTitle";

export default function PrivacyPage() {
  return (
    <div className="py-20 bg-salma-bg min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl bg-white dark:bg-salma-surface p-12 rounded-[2rem] border border-salma-border">
        <SectionTitle title="Politique de Confidentialité" subtitle="RGPD & Protection" />
        <div className="prose prose-salma dark:prose-invert">
          <h3>1. Collecte des données</h3>
          <p>Nous collectons les informations que vous nous fournissez via les formulaires de contact (Nom, Email, Téléphone) pour traiter vos demandes de bourses.</p>
          <h3>2. Utilisation des données</h3>
          <p>Vos données sont utilisées exclusivement par AG Technologies pour l'accompagnement de votre dossier et l'envoi de notre newsletter si vous l'avez accepté.</p>
          <h3>3. Vos droits</h3>
          <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données sur simple demande à : secretariatagtechnologies@gmail.com</p>
        </div>
      </div>
    </div>
  );
}