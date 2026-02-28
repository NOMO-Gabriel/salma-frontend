"use client";
// src/app/(admin)/admin/login/page.tsx

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { LoginPayload } from "@/types/api/auth.types";

export default function AdminLoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isAuthenticated, error, clearError } = useAuth();

  const [form, setForm]                 = useState<LoginPayload>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Si déjà connecté → rediriger
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get("redirect") || "/admin/dashboard";
      router.replace(redirect);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    const redirect = searchParams.get("redirect") || "/admin/dashboard";
    await login(form, redirect).catch(() => {});
  };

  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Panneau gauche — Brand ─────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-[#0F1F3D] relative overflow-hidden">

        {/* Grille géométrique décorative */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Cercle décoratif */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-[#C9A84C]/10" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full border border-[#C9A84C]/8" />
        {/* Halo doré */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#A68635] flex items-center justify-center shadow-lg shadow-[#C9A84C]/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
          </div>
          <div>
            <p className="font-serif text-2xl font-bold text-white leading-none">SALMA</p>
            <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.3em] mt-0.5">AG Technologies</p>
          </div>
        </div>

        {/* Citation centrale */}
        <div className="relative z-10">
          <div className="w-8 h-0.5 bg-[#C9A84C] rounded mb-6" />
          <blockquote className="font-serif text-3xl font-semibold text-white leading-snug max-w-xs">
            La passerelle entre l&apos;Afrique et les meilleures universités du monde.
          </blockquote>
          <p className="mt-5 text-sm text-white/40">
            Espace réservé aux administrateurs de la plateforme
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 gap-3">
          {[
            { v: "500+",    l: "Étudiants accompagnés" },
            { v: "25+",     l: "Universités partenaires" },
            { v: "03 sem.", l: "Délai moyen visas" },
            { v: "100%",    l: "Taux de réussite" },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8">
              <span className="font-serif text-xl font-bold text-[#C9A84C] leading-none">{s.v}</span>
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-wide leading-tight">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Panneau droit — Formulaire ─────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50 relative">

        {/* Points décoratifs fond */}
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 w-full max-w-sm">

          {/* Badge sécurité */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F1F3D]/6 border border-[#0F1F3D]/8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]" />
              <span className="text-[11px] font-semibold text-[#0F1F3D] tracking-wide">Système sécurisé</span>
            </div>
          </div>

          {/* Titre */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-[#0F1F3D] leading-tight mb-2">
              Connexion Admin
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Accédez au tableau de bord de gestion de la plateforme SALMA.
            </p>
          </div>

          {/* Erreur */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                Adresse e-mail
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@salma.cm"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-800 bg-white placeholder:text-slate-300 outline-none transition-all
                    ${error
                      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15"
                    }`}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Mot de passe
                </label>
                <span className="text-xs text-slate-400 cursor-pointer hover:text-[#1B365D] transition-colors">
                  Mot de passe oublié ?
                </span>
              </div>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••••"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm text-slate-800 bg-white placeholder:text-slate-300 outline-none transition-all
                    ${error
                      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={isLoading || !form.email || !form.password}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F1F3D] text-white text-sm font-semibold
                hover:bg-[#1B365D] transition-all duration-200 shadow-md shadow-[#0F1F3D]/20
                hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0F1F3D]/25
                active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connexion en cours…
                </>
              ) : (
                <>
                  Accéder au tableau de bord
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Mention sécurité */}
          <div className="flex items-center gap-2.5 mt-6 px-4 py-3 rounded-xl bg-[#0F1F3D]/4 border border-[#0F1F3D]/6">
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-xs text-slate-400">
              Accès protégé — Réservé aux administrateurs AG Technologies
            </span>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-[11px] text-slate-400">
            © 2026 SALMA · AG Technologies · Yaoundé, Cameroun
          </p>
        </div>
      </div>
    </div>
  );
}