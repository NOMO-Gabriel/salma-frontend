// src/app/(admin)/admin/layout.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { dictionary } = useLanguage();

  return (
    <div className="min-h-screen bg-salma-bg flex">
      {/* Sidebar Latérale */}
      <aside className="w-64 bg-salma-surface border-r border-salma-border flex flex-col hidden md:flex">
        <div className="h-20 flex items-center justify-center border-b border-salma-border">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-2xl font-serif font-bold text-salma-primary leading-none">SALMA</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-salma-gold font-sans font-bold">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin/dashboard" className="px-4 py-3 rounded-lg bg-salma-primary/10 text-salma-primary font-medium transition-colors">
            {dictionary.admin.sidebar.scholarships}
          </Link>
          <button className="px-4 py-3 rounded-lg text-left text-salma-text-muted hover:bg-salma-surface hover:text-salma-text transition-colors">
            {dictionary.admin.sidebar.applications} (Bientôt)
          </button>
        </nav>

        <div className="p-4 border-t border-salma-border">
          <button className="w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left font-medium">
            {dictionary.admin.sidebar.logout}
          </button>
        </div>
      </aside>

      {/* Contenu Principal */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-20 bg-salma-surface/80 backdrop-blur-md border-b border-salma-border px-8 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-xl font-serif font-bold text-salma-text">
            {dictionary.admin.sidebar.dashboard}
          </h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}