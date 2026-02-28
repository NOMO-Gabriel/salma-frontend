"use client";
// src/components/layout/ConditionalLayout.tsx
// Affiche Navbar + Footer + widgets UNIQUEMENT sur les pages visiteur.
// Les routes /admin/* ont leur propre layout et n'en ont pas besoin.

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatbotWidget from "@/components/ui/ChatbotWidget";
import CookieBanner from "@/components/ui/CookieBanner";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Pages admin : rendu nu, sans Navbar/Footer
    return <>{children}</>;
  }

  // Pages visiteur : layout complet
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <ChatbotWidget />
      <CookieBanner />
    </>
  );
}