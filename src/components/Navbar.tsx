"use client";
// =============================================================================
//  Navbar.tsx — SALMA · Navigation principale + Topbar pré-header
//  Fonctionnalités :
//    • Topbar sombre (contacts, horaires, réseaux) — se masque au scroll bas
//    • Lien Accueil dans le menu desktop
//    • Effet scroll : ombre légère au scroll
//    • CTA "Prendre RDV" gold visible directement en desktop
//    • Indicateur de page active (underline gold animé)
//    • Hamburger animé ☰ → ✕ avec transition CSS
//    • Skeleton de chargement (évite le layout shift)
//    • Contenu 100% via cmsSwitcher (i18n FR/EN)
// =============================================================================

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import NavDropdown from "@/components/layout/nav/NavDropdown";
import MobileMenu from "@/components/layout/nav/MobileMenu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Topbar from "@/components/layout/Topbar";
import type { NavContent } from "@/types";

// =============================================================================
//  Hook : détecte si la page a été scrollée (pour l'ombre de la navbar)
// =============================================================================
function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}

// =============================================================================
//  Skeleton : affiché pendant le chargement du contenu CMS
// =============================================================================
function NavbarSkeleton() {
  return (
    <>
      <div className="w-full h-9 bg-[#0A0F1A]" />
      <nav className="sticky top-0 z-[100] w-full h-20 bg-white/95 border-b border-salma-border">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-6 w-24 bg-salma-surface rounded animate-pulse" />
            <div className="h-2 w-32 bg-salma-surface rounded animate-pulse" />
          </div>
          <div className="hidden lg:flex items-center gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-20 bg-salma-surface rounded animate-pulse" />
            ))}
            <div className="h-9 w-32 bg-salma-surface rounded-full animate-pulse" />
          </div>
        </div>
      </nav>
    </>
  );
}

// =============================================================================
//  Composant principal
// =============================================================================
export default function Navbar() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const scrolled = useScrolled(20);

  const [content, setContent] = useState<NavContent | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Charge le contenu i18n via le switcher CMS
  useEffect(() => {
    cmsSwitcher
      .getScopeContent("layout", locale)
      .then((data) => setContent(data as NavContent));
  }, [locale]);

  // Ferme le menu mobile si la route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Empêche le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );

  // Guard défensif : skeleton tant que les clés critiques ne sont pas présentes.
  // Protège contre un fichier layout incomplet ou un cast NavContent incorrect.
  if (
    !content?.nav_home ||
    !content?.nav_bourses ||
    !content?.nav_services ||
    !content?.nav_about ||
    !content?.nav_contact
  ) {
    return <NavbarSkeleton />;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* =================================================================
          TOPBAR — Informations entreprise, contacts, réseaux
      ================================================================= */}
      <Topbar />

      {/* =================================================================
          NAVBAR PRINCIPALE (sticky)
      ================================================================= */}
      <nav
        className={`
          sticky top-0 z-[100] w-full
          transition-all duration-300 ease-in-out
          ${
            scrolled
              ? "bg-white/98 backdrop-blur-md shadow-[0_2px_20px_rgba(27,54,93,0.08)] border-b border-salma-border"
              : "bg-white/95 backdrop-blur-sm border-b border-salma-border/60"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between gap-8">

            {/* =============================================================
                LOGO
            ============================================================= */}
            <Link
              href="/"
              className="flex flex-col flex-shrink-0 group"
              aria-label="SALMA — Retour à l'accueil"
            >
              <span
                className={`
                  text-2xl font-serif font-bold leading-none transition-colors duration-200
                  ${isActive("/") ? "text-salma-primary" : "text-salma-primary group-hover:text-salma-primary-light"}
                `}
              >
                SALMA
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-salma-gold font-sans font-bold mt-0.5">
                Bourses & Mobilité
              </span>
            </Link>

            {/* =============================================================
                MENU DESKTOP (≥1024px)
            ============================================================= */}
            <div className="hidden lg:flex items-center gap-0 flex-1 justify-center">

              {/* Accueil */}
              <NavDropdownWithIndicator
              active={isActive("/")}
              title={content.nav_home.title}
              type="home"
              data={content.nav_home}
            />

              {/* Bourses */}
              <NavDropdownWithIndicator
                active={isActive("/bourses")}
                title={content.nav_bourses.title}
                type="bourses"
                data={content.nav_bourses}
              />

              {/* Services */}
              <NavDropdownWithIndicator
                active={isActive("/services")}
                title={content.nav_services.title}
                type="services"
                data={content.nav_services}
              />

              {/* À propos */}
              <NavDropdownWithIndicator
                active={isActive("/a-propos")}
                title={content.nav_about.title}
                type="about"
                data={content.nav_about}
              />

            </div>

            {/* =============================================================
                ACTIONS DESKTOP : Lang + Contact dropdown + CTA
            ============================================================= */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

              <div className="h-6 w-px bg-salma-border" />
              <LanguageSwitcher />

              <NavDropdown
                title={content.nav_contact.title}
                type="contact"
                data={content.nav_contact}
                isAction
              />

              {/* CTA "Prendre RDV" */}
              <Link
                href="/contact"
                className="
                  relative inline-flex items-center gap-2
                  px-5 py-2.5 rounded-full
                  text-[11px] font-bold uppercase tracking-widest
                  bg-salma-gold text-salma-primary
                  shadow-[0_4px_14px_rgba(201,168,76,0.35)]
                  hover:bg-salma-gold-light
                  hover:shadow-[0_6px_20px_rgba(201,168,76,0.45)]
                  active:scale-[0.97]
                  transition-all duration-200
                  overflow-hidden group
                "
                aria-label="Prendre rendez-vous"
              >
                <span
                  className="
                    absolute inset-0 -translate-x-full
                    bg-gradient-to-r from-transparent via-white/30 to-transparent
                    group-hover:translate-x-full transition-transform duration-500
                  "
                  aria-hidden="true"
                />
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0 relative"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="relative">
                  {locale === "fr" ? "Prendre RDV" : "Book a Call"}
                </span>
              </Link>
            </div>

            {/* =============================================================
                HAMBURGER ANIMÉ (< 1024px)
            ============================================================= */}
            <button
              onClick={toggleMobileMenu}
              className={`
                lg:hidden relative w-10 h-10 flex items-center justify-center
                rounded-xl border transition-all duration-200
                ${
                  isMobileMenuOpen
                    ? "bg-salma-primary border-salma-primary text-white"
                    : "bg-white border-salma-border text-salma-primary hover:border-salma-gold hover:text-salma-gold"
                }
              `}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="flex flex-col gap-[5px] w-5">
                <span
                  className={`block h-[2px] rounded-full bg-current transition-all duration-300 origin-center
                    ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                />
                <span
                  className={`block h-[2px] rounded-full bg-current transition-all duration-300
                    ${isMobileMenuOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`block h-[2px] rounded-full bg-current transition-all duration-300 origin-center
                    ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                />
              </span>
            </button>

          </div>
        </div>

        {/* Breadcrumb discret — pages internes uniquement */}
        {pathname !== "/" && <ActivePageBar pathname={pathname} />}
      </nav>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <MobileMenu
          content={content}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

// =============================================================================
//  Lien simple avec underline gold actif (pour Accueil)
// =============================================================================
// function NavLinkSimple({
//   href,
//   label,
//   active,
// }: {
//   href: string;
//   label: string;
//   active: boolean;
// }) {
//   return (
//     <div className="relative h-20 flex items-center">
//       <Link
//         href={href}
//         className={`
//           relative px-4 py-2
//           text-[11px] font-bold uppercase tracking-widest
//           transition-colors duration-200
//           outline-none focus-visible:ring-2 focus-visible:ring-salma-gold focus-visible:ring-offset-2 rounded-lg
//           ${active ? "text-salma-primary" : "text-salma-text-muted hover:text-salma-primary"}
//         `}
//       >
//         {label}
//       </Link>
//       {active && (
//         <span
//           className="
//             absolute bottom-0 left-4 right-4 h-[2px]
//             bg-salma-gold rounded-full
//             animate-[expandWidth_0.3s_ease-out_forwards]
//           "
//           aria-hidden="true"
//         />
//       )}
//     </div>
//   );
// }

// =============================================================================
//  NavDropdown avec wrapper pour l'indicateur de page active
// =============================================================================
function NavDropdownWithIndicator({
  active,
  title,
  type,
  data,
}: {
  active: boolean;
  title: string;
  type: string;
  data: Parameters<typeof NavDropdown>[0]["data"];
}) {
  return (
    <div className="relative">
      <NavDropdown title={title} type={type} data={data} />
      {active && (
        <span
          className="
            absolute bottom-0 left-4 right-4 h-[2px]
            bg-salma-gold rounded-full
            animate-[expandWidth_0.3s_ease-out_forwards]
          "
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// =============================================================================
//  Breadcrumb discret sous la navbar (pages internes)
// =============================================================================
function ActivePageBar({ pathname }: { pathname: string }) {
  const { locale } = useLanguage();

  const ROUTE_LABELS: Record<string, { fr: string; en: string }> = {
    "/bourses":  { fr: "Bourses d'études", en: "Scholarships" },
    "/services": { fr: "Nos services",     en: "Our services" },
    "/a-propos": { fr: "À propos",         en: "About us"     },
    "/contact":  { fr: "Contact",          en: "Contact"      },
  };

  const matchedKey = Object.keys(ROUTE_LABELS).find((key) =>
    pathname.startsWith(key)
  );
  if (!matchedKey) return null;

  const label =
    ROUTE_LABELS[matchedKey][locale as "fr" | "en"] ??
    ROUTE_LABELS[matchedKey].fr;

  return (
    <div className="border-t border-salma-border/40 bg-salma-surface/50">
      <div className="max-w-7xl mx-auto px-6 h-7 flex items-center gap-2">
        <Link
          href="/"
          className="text-[10px] text-salma-text-muted hover:text-salma-gold transition-colors font-medium"
        >
          {locale === "fr" ? "Accueil" : "Home"}
        </Link>
        <span className="text-[10px] text-salma-border" aria-hidden="true">›</span>
        <span className="text-[10px] text-salma-gold font-semibold">{label}</span>
      </div>
    </div>
  );
}