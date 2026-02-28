"use client";
// src/app/(admin)/admin/layout.tsx

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

// ---------------------------------------------------------------------------
//  Composants UI Internes
// ---------------------------------------------------------------------------

function SvgIcon({ d, className = "w-5 h-5" }: { d: string | string[]; className?: string }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const ICONS = {
  dashboard: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
  bourses: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342",
  contacts: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  cms: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z",
  media: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
  temoignages: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  newsletter: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
  chatbot: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  kpi: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm9.75-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V9.75z",
  logout: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75",
  site: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
  menu: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
  chevron: "M15 19l-7-7 7-7",
};

const NAV_SECTIONS = [
  {
    label: "Principal",
    items: [
      { href: "/admin/dashboard", label: "Tableau de bord", icon: "dashboard" },
      { href: "/admin/bourses",   label: "Bourses",         icon: "bourses" },
      { href: "/admin/contacts",  label: "Contacts & RDV",  icon: "contacts", badge: true },
    ],
  },
  {
    label: "Contenu",
    items: [
      { href: "/admin/cms",         label: "Pages & CMS",   icon: "cms" },
      { href: "/admin/medias",      label: "Médiathèque",   icon: "media" },
      { href: "/admin/temoignages", label: "Témoignages",   icon: "temoignages" },
      { href: "/admin/newsletter",  label: "Newsletter",    icon: "newsletter" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/admin/chatbot", label: "Chatbot / FAQ",  icon: "chatbot" },
      { href: "/admin/kpi",     label: "KPI & Analytics", icon: "kpi" },
    ],
  },
];

// ---------------------------------------------------------------------------
//  Composant Principal
// ---------------------------------------------------------------------------

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // 1. PROTECTION : Attendre la fin du chargement avant de rediriger
  useEffect(() => {
    if (isLoading) return; // CRITIQUE : Ne rien faire pendant le chargement

    if (!isAuthenticated && !isLoginPage) {
      router.replace(`/admin/login?redirect=${pathname}`);
    }
  }, [isLoading, isAuthenticated, isLoginPage, router, pathname]);

  // 2. Fermer le menu mobile au changement de route
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // 3. Écran de chargement (évite le flash de contenu)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0F2F7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#1B365D] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Vérification des accès…</p>
        </div>
      </div>
    );
  }

  // 4. SI PAGE LOGIN : Rendu nu
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 5. SI PAS AUTHENTIFIÉ : On ne rend rien (le useEffect redirige)
  if (!isAuthenticated) return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const initials = user?.nom_complet
    ? user.nom_complet.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  // Sidebar partagée
  const SidebarContent = () => (
    <>
      <div className={`flex items-center gap-3 px-5 py-[18px] border-b border-white/10 ${collapsed && "justify-center px-0"}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#A68635] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#C9A84C]/20">
          <span className="text-white font-serif font-bold text-sm">S</span>
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-serif font-bold text-lg leading-none">SALMA</p>
            <p className="text-[#C9A84C] text-[9px] font-bold uppercase tracking-[0.25em] mt-0.5">AG Technologies</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-5 px-3">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${collapsed && "justify-center px-0"} ${active ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                  >
                    {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#C9A84C] rounded-r-full" />}
                    <SvgIcon d={ICONS[item.icon as keyof typeof ICONS]} />
                    {!collapsed && <span className="flex-1">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className={`border-t border-white/10 p-3 space-y-1 ${collapsed && "flex flex-col items-center"}`}>
        <Link href="/" target="_blank" className={`flex items-center gap-3 px-3 py-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all ${collapsed && "justify-center px-0"}`}>
          <SvgIcon d={ICONS.site} />
          {!collapsed && <span className="text-xs font-medium">Voir le site</span>}
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A68635] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{initials}</div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user?.nom_complet || "Admin"}</p>
              <button onClick={logout} className="text-red-400 text-[10px] hover:underline">Déconnexion</button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F0F2F7] flex font-sans">
      {/* Overlay mobile */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar Desktop */}
      <aside className={`fixed top-0 left-0 h-full z-50 hidden md:flex flex-col bg-[#0F1F3D] text-white transition-all duration-300 ${collapsed ? "w-[72px]" : "w-64"}`}>
        <SidebarContent />
        <button onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-[72px] w-6 h-6 bg-[#0F1F3D] border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`w-3 h-3 transition-transform duration-300 ${collapsed && "rotate-180"}`}><path strokeLinecap="round" strokeLinejoin="round" d={ICONS.chevron} /></svg>
        </button>
      </aside>

      {/* Sidebar Mobile */}
      <aside className={`fixed top-0 left-0 h-full z-50 flex flex-col md:hidden bg-[#0F1F3D] text-white w-64 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </aside>

      {/* Zone principale */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? "md:ml-[72px]" : "md:ml-64"}`}>
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center gap-4 px-6 sticky top-0 z-30 shadow-sm">
          <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"><SvgIcon d={ICONS.menu} /></button>
          <div className="flex-1 text-sm font-semibold text-slate-700">Administration SALMA</div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A68635] flex items-center justify-center text-white font-bold text-xs">{initials}</div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}