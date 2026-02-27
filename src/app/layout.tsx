import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatbotWidget from "@/components/ui/ChatbotWidget";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
// Polices configurées comme dans ton portfolio
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SALMA — Agence de Voyage & Bourses d'études",
  description: "Spécialiste des bourses d'études en Chine et en Allemagne.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-salma-bg text-salma-text transition-colors duration-300">
        <ThemeProvider
        attribute="class" 
        defaultTheme="light" 
        forcedTheme="light" // Force le mode clair
        enableSystem={false}
        >
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Footer /> 
            <WhatsAppButton />
            <ChatbotWidget />
            <CookieBanner />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}