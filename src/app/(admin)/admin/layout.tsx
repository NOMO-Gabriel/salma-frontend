// src/app/(admin)/admin/layout.tsx
// ==============================================================================
//  Layout Admin — protégé par JWT
//  Sidebar avec toutes les sections + badge notifications contacts
// ==============================================================================
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// Icônes SVG inline légères
const Icons = {
  dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  scholarship: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  cms: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  media: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  contact: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  newsletter: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  testimonial: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  chatbot: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  kpi: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  logout: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  site: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
};

const NAV_SECTIONS = [
  {
    label: "Principal",
    items: [
      { href: "/admin/dashboard", label: "Tableau de bord", icon: Icons.dashboard },
      { href: "/admin/bourses", label: "Bourses", icon: Icons.scholarship },
      { href: "/admin/contacts", label: "Contacts & RDV", icon: Icons.contact, badge: true },
    ],
  },
  {
    label: "Contenu",
    items: [
      { href: "/admin/cms", label: "Pages & CMS", icon: Icons.cms },
      { href: "/admin/medias", label: "Médiathèque", icon: Icons.media },
      { href: "/admin/temoignages", label: "Témoignages", icon: Icons.testimonial },
      { href: "/admin/newsletter", label: "Newsletter", icon: Icons.newsletter },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/admin/chatbot", label: "Chatbot / FAQ", icon: Icons.chatbot },
      { href: "/admin/kpi", label: "KPI & Analytics", icon: Icons.kpi },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  // Guard : rediriger vers login si non authentifié
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/admin/login?redirect=${pathname}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  // Affichage pendant le chargement de l'auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-salma-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-salma-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-salma-text-muted">Vérification des accès...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-salma-bg flex">

      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside className="w-64 bg-salma-surface border-r border-salma-border flex flex-col fixed inset-y-0 left-0 z-30 hidden md:flex">

        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-salma-border flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-salma-primary flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            </svg>
          </div>
          <div>
            <span className="text-base font-serif font-bold text-salma-primary leading-none block">SALMA</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-salma-gold font-sans font-bold">Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-salma-text-muted/50">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${isActive(item.href)
                        ? "bg-salma-primary text-white shadow-sm"
                        : "text-salma-text-muted hover:bg-salma-bg hover:text-salma-text"
                      }
                    `}
                  >
                    <span className={isActive(item.href) ? "text-white" : "text-salma-text-muted"}>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {/* Badge notifications (contacts non lus) */}
                    {item.badge && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-salma-gold flex-shrink-0" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer sidebar */}
        <div className="border-t border-salma-border p-3 space-y-1 flex-shrink-0">
          {/* Lien vers le site vitrine */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-salma-text-muted hover:bg-salma-bg hover:text-salma-text transition-all"
          >
            {Icons.site}
            <span>Voir le site</span>
          </Link>

          {/* Profil + Logout */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-salma-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-salma-primary">
                {user?.nom_complet?.charAt(0).toUpperCase() ?? "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-salma-text truncate">{user?.nom_complet}</p>
              <p className="text-[10px] text-salma-text-muted truncate">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="text-salma-text-muted hover:text-red-500 transition-colors flex-shrink-0"
              title="Déconnexion"
            >
              {Icons.logout}
            </button>
          </div>
        </div>
      </aside>

      {/* ── Contenu principal ────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
