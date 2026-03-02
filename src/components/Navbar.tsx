"use client";
// =============================================================================
//  Navbar.tsx — SALMA · Navigation principale + Topbar pré-header
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
import type { 
  NavContent, 
  NavHome, 
  NavBourses, 
  NavServices, 
  NavContact, 
  NavAbout 
} from "@/types";


// Interface pour extraire les labels du switcher
interface CommonLabels {
  languageSwitcher: {
    switchToEn: string;
    switchToFr: string;
  };
}

// =============================================================================
//  Hook : détecte si la page a été scrollée
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
//  Skeleton : affiché pendant le chargement
// =============================================================================
function NavbarSkeleton() {
  return (
    <>
      <div className="w-full h-9 bg-salma-surface border-t-2 border-t-salma-gold/40 border-b border-b-salma-border/15" />
      <nav className="sticky top-0 z-[100] w-full h-20 bg-white/95 border-b border-salma-border/10">
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
  const [common, setCommon] = useState<CommonLabels | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Charge le contenu i18n (Layout + Common)
  useEffect(() => {
    Promise.all([
      cmsSwitcher.getScopeContent<NavContent>("layout", locale),
      cmsSwitcher.getScopeContent<CommonLabels>("common", locale),
    ]).then(([layoutData, commonData]) => {
      setContent(layoutData);
      setCommon(commonData);
    });
  }, [locale]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );

  // Attente du contenu critique
  if (!content || !common) {
    return <NavbarSkeleton />;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <Topbar />

      <nav
        className={`
          sticky top-0 z-[100] w-full
          transition-all duration-300 ease-in-out
          ${
            scrolled
              ? "bg-white/98 backdrop-blur-md shadow-[0_2px_16px_rgba(27,54,93,0.06)] border-b border-salma-border/20"
              : "bg-white/95 backdrop-blur-sm border-b border-salma-border/10"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between gap-8">

            {/* LOGO */}
            <Link href="/" className="flex flex-col flex-shrink-0 group">
              <span className={`text-2xl font-serif font-bold leading-none transition-colors duration-200 ${isActive("/") ? "text-salma-primary" : "text-salma-primary group-hover:text-salma-primary-light"}`}>
                SALMA
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-salma-gold font-sans font-bold mt-0.5">
                Bourses & Mobilité
              </span>
            </Link>

            {/* MENU DESKTOP */}
            <div className="hidden lg:flex items-center gap-0 flex-1 justify-center">
              <NavLinkSimple
                href="/"
                active={isActive("/")}
                label={locale === "fr" ? "Accueil" : "Home"}
              />
              <NavDropdownWithIndicator
                active={isActive("/bourses")}
                title={content.nav_bourses.title}
                type="bourses"
                data={content.nav_bourses}
              />
              <NavDropdownWithIndicator
                active={isActive("/services")}
                title={content.nav_services.title}
                type="services"
                data={content.nav_services}
              />
              <NavDropdownWithIndicator
                active={isActive("/a-propos")}
                title={content.nav_about.title}
                type="about"
                data={content.nav_about}
              />
            </div>

            {/* ACTIONS DESKTOP */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <div className="h-6 w-px bg-salma-border" />
              
              <LanguageSwitcher labels={common.languageSwitcher} />

              <NavDropdown
                title={content.nav_contact.title}
                type="contact"
                data={content.nav_contact}
                isAction
              />

              <Link
                href="/contact"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-salma-gold text-salma-primary shadow-[0_4px_14px_rgba(201,168,76,0.35)] hover:bg-salma-gold-light transition-all duration-200 overflow-hidden group"
              >
                <span className="relative">
                  {locale === "fr" ? "Prendre RDV" : "Book a Call"}
                </span>
              </Link>
            </div>

            {/* HAMBURGER */}
            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 ${isMobileMenuOpen ? "bg-salma-primary border-salma-primary text-white" : "bg-white border-salma-border text-salma-primary"}`}
            >
              <span className="flex flex-col gap-[5px] w-5">
                <span className={`block h-[2px] rounded-full bg-current transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block h-[2px] rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-[2px] rounded-full bg-current transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </span>
            </button>

          </div>
        </div>

        {pathname !== "/" && <ActivePageBar pathname={pathname} />}
      </nav>

      {isMobileMenuOpen && (
        <MobileMenu content={content} onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
}

// --- Sous-composants ---

function NavLinkSimple({ href, label, active }: { href: string; label: string; active: boolean; }) {
  return (
    <div className="relative h-20 flex items-center">
      <Link href={href} className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${active ? "text-salma-primary" : "text-salma-text-muted hover:text-salma-primary"}`}>
        {label}
      </Link>
      {active && <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-salma-gold rounded-full animate-[expandWidth_0.3s_ease-out_forwards]" />}
    </div>
  );
}

/**
 * Correction ESLint : On définit le type exact des données acceptées par le dropdown
 */
interface NavDropdownWithIndicatorProps {
  active: boolean;
  title: string;
  type: string;
  data: NavHome | NavBourses | NavServices | NavContact | NavAbout;
}

function NavDropdownWithIndicator({ active, title, type, data }: NavDropdownWithIndicatorProps) {
  return (
    <div className="relative">
      <NavDropdown title={title} type={type} data={data} />
      {active && <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-salma-gold rounded-full animate-[expandWidth_0.3s_ease-out_forwards]" />}
    </div>
  );
}

function ActivePageBar({ pathname }: { pathname: string }) {
  const { locale } = useLanguage();
  const ROUTE_LABELS: Record<string, { fr: string; en: string }> = {
    "/bourses":  { fr: "Bourses d'études", en: "Scholarships" },
    "/services": { fr: "Nos services",     en: "Our services" },
    "/a-propos": { fr: "À propos",         en: "About us"     },
    "/contact":  { fr: "Contact",          en: "Contact"      },
  };
  const matchedKey = Object.keys(ROUTE_LABELS).find((key) => pathname.startsWith(key));
  if (!matchedKey) return null;
  const label = ROUTE_LABELS[matchedKey][locale as "fr" | "en"] ?? ROUTE_LABELS[matchedKey].fr;

  return (
    <div className="border-t border-salma-border/40 bg-salma-surface/50">
      <div className="max-w-7xl mx-auto px-6 h-7 flex items-center gap-2">
        <Link href="/" className="text-[10px] text-salma-text-muted hover:text-salma-gold transition-colors font-medium">
          {locale === "fr" ? "Accueil" : "Home"}
        </Link>
        <span className="text-[10px] text-salma-border">›</span>
        <span className="text-[10px] text-salma-gold font-semibold">{label}</span>
      </div>
    </div>
  );
}