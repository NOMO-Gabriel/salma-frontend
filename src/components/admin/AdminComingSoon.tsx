// src/components/admin/AdminComingSoon.tsx
// ==============================================================================
//  Composant placeholder pour les sections en cours de développement
// ==============================================================================

"use client";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function AdminComingSoon({ title, description, icon }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-[#0F1F3D]/5 flex items-center justify-center text-[#0F1F3D]/40 mb-6">
        {icon}
      </div>
      <h1 className="text-2xl font-serif font-bold text-[#0F1F3D] mb-3">{title}</h1>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">{description}</p>
      <div className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 rounded-full border border-[#C9A84C]/30">
        <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
        <span className="text-xs font-semibold text-[#A68635]">En cours de développement</span>
      </div>
    </div>
  );
}
