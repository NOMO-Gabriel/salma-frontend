"use client";
// src/components/admin/AdminDashboardClient.tsx
// ==============================================================================
//  Dashboard Admin — Contenu interactif côté client
//  KPI Cards + Graphique d'activité + Dernières bourses + Derniers contacts
// ==============================================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import type { KpiRealtime } from "@/types/api/kpi.types";
import type { ScholarshipAdminListResponse } from "@/types/api/scholarship.types";
import type { PaginatedContactResponse } from "@/types/api/contact.types";
// --- Types locaux ---

interface DashboardProps {
  kpi: KpiRealtime | null;
  scholarships: ScholarshipAdminListResponse | null;
  contacts: PaginatedContactResponse | null;
}

// --- Composant KPI Card -------------------------------------------------------

function KpiCard({
  label,
  value,
  delta,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: React.ReactNode;
  color: "navy" | "gold" | "green" | "blue";
}) {
  const colorMap = {
    navy: {
      bg: "bg-[#0F1F3D]",
      iconBg: "bg-white/10",
      iconColor: "text-white",
      text: "text-white",
      muted: "text-white/60",
      delta: "bg-white/10 text-white/80",
    },
    gold: {
      bg: "bg-white",
      iconBg: "bg-[#C9A84C]/10",
      iconColor: "text-[#C9A84C]",
      text: "text-slate-900",
      muted: "text-slate-500",
      delta: "bg-emerald-50 text-emerald-700",
    },
    green: {
      bg: "bg-white",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      text: "text-slate-900",
      muted: "text-slate-500",
      delta: "bg-emerald-50 text-emerald-700",
    },
    blue: {
      bg: "bg-white",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      text: "text-slate-900",
      muted: "text-slate-500",
      delta: "bg-blue-50 text-blue-700",
    },
  };

  const c = colorMap[color];

  return (
    <div className={`${c.bg} rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.iconBg} ${c.iconColor} flex items-center justify-center`}>
          {icon}
        </div>
        {delta && (
          <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${c.delta}`}>
            {delta}
          </span>
        )}
      </div>
      <p className={`text-3xl font-serif font-bold ${c.text} leading-none mb-1`}>{value}</p>
      <p className={`text-xs font-medium uppercase tracking-wider ${c.muted}`}>{label}</p>
    </div>
  );
}

// --- Graphique d'activité (barres CSS) ----------------------------------------

function ActivityChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  return (
    <div className="flex items-end gap-2 h-32 mt-4">
      {data.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md bg-[#1B365D] transition-all duration-500 hover:bg-[#C9A84C]"
            style={{ height: `${(val / max) * 100}%`, minHeight: val > 0 ? "4px" : "0" }}
          />
          <span className="text-[10px] text-slate-400 font-medium">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

// --- Badge statut -------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; class: string }> = {
    publie: { label: "Publié", class: "bg-emerald-100 text-emerald-700" },
    brouillon: { label: "Brouillon", class: "bg-slate-100 text-slate-600" },
    archive: { label: "Archivé", class: "bg-orange-100 text-orange-700" },
    ouvert: { label: "Ouvert", class: "bg-emerald-100 text-emerald-700" },
    ferme: { label: "Fermé", class: "bg-slate-100 text-slate-600" },
    urgent: { label: "Urgent", class: "bg-red-100 text-red-700" },
    nouveau: { label: "Nouveau", class: "bg-blue-100 text-blue-700" },
    en_cours: { label: "En cours", class: "bg-amber-100 text-amber-700" },
    traite: { label: "Traité", class: "bg-emerald-100 text-emerald-700" },
  };

  const s = map[status] || { label: status, class: "bg-slate-100 text-slate-600" };

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.class}`}>
      {s.label}
    </span>
  );
}

// --- Composant principal ------------------------------------------------------

export default function AdminDashboardClient({ kpi, scholarships, contacts }: DashboardProps) {
  const [greeting, setGreeting] = useState("Bonjour");
  const [activityData] = useState([12, 19, 8, 24, 16, 5, 11]);

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Bonjour");
    else if (h < 18) setGreeting("Bon après-midi");
    else setGreeting("Bonsoir");
  }, []);

  const totalVisitors = kpi?.total_visiteurs ?? 0;
  const totalScholarships = scholarships?.count ?? 0;
  const totalContacts = contacts?.count ?? 0;
  const conversionRate = kpi?.taux_conversion_global
    ? `${(kpi.taux_conversion_global * 100).toFixed(1)}%`
    : "—";

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* ── En-tête ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">
            {greeting}, Admin 👋
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Voici un aperçu de votre plateforme SALMA aujourd&apos;hui.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/bourses/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#0F1F3D] text-white text-sm font-semibold rounded-xl hover:bg-[#1B365D] transition-colors shadow-md shadow-[#0F1F3D]/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nouvelle bourse
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <KpiCard
          label="Visiteurs totaux"
          value={totalVisitors.toLocaleString("fr-FR")}
          delta="+12% ce mois"
          color="navy"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
        />
        <KpiCard
          label="Bourses actives"
          value={totalScholarships}
          delta={`${totalScholarships} au total`}
          color="gold"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          }
        />
        <KpiCard
          label="Demandes reçues"
          value={totalContacts}
          delta="dont non lues"
          color="green"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          }
        />
        <KpiCard
          label="Taux de conversion"
          value={conversionRate}
          delta="visiteurs → contacts"
          color="blue"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          }
        />
      </div>

      {/* ── Ligne principale ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Graphique d'activité */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-bold text-slate-800">Activité cette semaine</h2>
            <span className="text-xs text-slate-400 font-medium">Vues bourses</span>
          </div>
          <p className="text-xs text-slate-400 mb-2">Nombre de pages bourses vues par jour</p>
          <ActivityChart data={activityData} />
        </div>

        {/* Répartition bourses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-base font-bold text-slate-800 mb-4">Répartition</h2>
          <div className="space-y-4">
            {[
              { label: "Bourses Chine", value: 68, color: "bg-[#0F1F3D]", flag: "🇨🇳" },
              { label: "Bourses Allemagne", value: 32, color: "bg-[#C9A84C]", flag: "🇩🇪" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-600 flex items-center gap-1.5">
                    <span>{item.flag}</span>
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-slate-800">{item.value}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="h-px bg-slate-100 my-2" />

            {/* Quick links */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Actions rapides</p>
              {[
                { href: "/admin/bourses/new", label: "+ Ajouter une bourse" },
                { href: "/admin/contacts", label: "→ Voir les contacts" },
                { href: "/admin/kpi", label: "📊 Voir les analytics" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-xs text-[#1B365D] hover:text-[#C9A84C] font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Ligne inférieure : Dernières bourses + Derniers contacts ─ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Dernières bourses */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">Dernières bourses</h2>
            <Link href="/admin/bourses" className="text-xs text-[#1B365D] hover:text-[#C9A84C] font-semibold transition-colors">
              Voir tout →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {scholarships?.results.length ? (
              scholarships.results.map((s) => (
                <div key={s.id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#0F1F3D]/5 flex items-center justify-center text-sm flex-shrink-0">
                    {s.pays_destination === "chine" ? "🇨🇳" : "🇩🇪"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{s.titre_fr}</p>
                    <p className="text-[10px] text-slate-400">
                      {new Date(s.date_creation).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <StatusBadge status={s.statut} />
                  <Link href={`/admin/bourses/${s.id}/edit`} className="text-slate-300 hover:text-[#1B365D] transition-colors ml-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                  </Link>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-sm text-slate-400">
                Aucune bourse pour le moment.
              </div>
            )}
          </div>
        </div>

        {/* Derniers contacts */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">Dernières demandes</h2>
            <Link href="/admin/contacts" className="text-xs text-[#1B365D] hover:text-[#C9A84C] font-semibold transition-colors">
              Voir tout →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {contacts?.results.length ? (
              contacts.results.map((c) => {
                const initials = c.nom_complet
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();
                return (
                  <div key={c.id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-slate-50/60 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B365D] to-[#2D5284] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{c.nom_complet}</p>
                      <p className="text-[10px] text-slate-400 truncate">{c.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StatusBadge status={c.statut} />
                      <span className="text-[9px] text-slate-400">
                        {new Date(c.date_creation).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-8 text-center text-sm text-slate-400">
                Aucune demande pour le moment.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer info ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 pb-4">
        <span>SALMA Admin v1.0 — AG Technologies</span>
        <span>Backend : <a href="https://api-x75k2m8-v1.agtgroupholding.com/api/docs/" target="_blank" rel="noopener noreferrer" className="text-[#1B365D] hover:underline">API Docs</a></span>
      </div>
    </div>
  );
}
