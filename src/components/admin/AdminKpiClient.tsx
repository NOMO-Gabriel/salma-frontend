"use client";

import { useState } from "react";
import type { KpiRealtime, ConversionRate } from "@/types/api/kpi.types";

interface Props {
  realtime: KpiRealtime;
  conversion: ConversionRate;
}

export default function AdminKpiClient({ realtime, conversion }: Props) {
  return (
    <div className="space-y-8 max-w-[1200px]">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">Analyses & Performances</h1>
        <p className="text-slate-500 text-sm mt-0.5">Suivez l'efficacité de votre tunnel de conversion en temps réel.</p>
      </div>

      {/* COMPTEURS TEMPS RÉEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Visiteurs (Aujourd'hui)" value={realtime.visiteurs_uniques} color="blue" />
        <StatCard label="Pages Vues" value={realtime.pages_vues} color="navy" />
        <StatCard label="Contacts Reçus" value={realtime.soumissions_formulaire} color="emerald" />
        <StatCard label="Taux Conversion" value={`${conversion.taux_global}%`} color="gold" />
      </div>

      {/* PERFORMANCE PAR BOURSE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h2 className="font-bold text-salma-primary">Performance par Bourse (Top 10)</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">Bourse</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-center">Vues</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-center">Conversions</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-right">Efficacité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {conversion.par_bourse.map((b: any) => {
              const rate = b.vues > 0 ? ((b.conversions / b.vues) * 100).toFixed(1) : 0;
              return (
                <tr key={b.bourse__id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{b.bourse__titre_fr}</td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600">{b.vues}</td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600">{b.conversions}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      {rate}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: string | number, color: string }) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50",
    navy: "text-[#1B365D] bg-slate-100",
    emerald: "text-emerald-600 bg-emerald-50",
    gold: "text-[#C9A84C] bg-amber-50"
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{label}</p>
      <p className={`text-3xl font-serif font-bold ${colors[color].split(' ')[0]}`}>{value}</p>
      <div className={`h-1 w-8 rounded-full mt-4 ${colors[color].split(' ')[1]}`} />
    </div>
  );
}