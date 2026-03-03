"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import type { LoginPayload } from "@/types/api/auth.types";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isAuthenticated, error, clearError } = useAuth();
  const { dictionary } = useLanguage();
  const t = dictionary.admin.login;

  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-[#C9A84C]/10" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#A68635] flex items-center justify-center shadow-lg shadow-[#C9A84C]/30">
            <span className="text-white font-serif font-bold text-xl">{t.logoInitial}</span>
          </div>
          <div>
            <p className="font-serif text-2xl font-bold text-white leading-none">{t.brandName}</p>
            <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.3em] mt-0.5">{t.brandCompany}</p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="w-8 h-0.5 bg-[#C9A84C] rounded mb-6" />
          <blockquote className="font-serif text-3xl font-semibold text-white leading-snug max-w-xs">
            {t.quote}
          </blockquote>
          <p className="mt-5 text-sm text-white/40">{t.adminOnly}</p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3">
          {[
            { v: t.stats.studentsValue,     l: t.stats.students },
            { v: t.stats.universitiesValue, l: t.stats.universities },
            { v: t.stats.visasValue,        l: t.stats.visas },
            { v: t.stats.successValue,      l: t.stats.success },
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
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative z-10 w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F1F3D]/6 border border-[#0F1F3D]/8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]" />
              <span className="text-[11px] font-semibold text-[#0F1F3D] tracking-wide">{t.secureSystem}</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-[#0F1F3D] leading-tight mb-2">{t.title}</h1>
            <p className="text-sm text-slate-500 leading-relaxed">{t.subtitle}</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t.emailLabel}</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">{t.passwordLabel}</label>
                <span className="text-xs text-slate-400 cursor-pointer hover:text-[#1B365D] transition-colors">{t.forgotPassword}</span>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder={t.passwordPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-lg"
                  aria-label={showPassword ? dictionary.admin.common.hide : dictionary.admin.common.show}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !form.email || !form.password}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F1F3D] text-white text-sm font-semibold hover:bg-[#1B365D] transition-all disabled:opacity-50 shadow-md"
            >
              {isLoading ? t.submitting : t.submitBtn}
            </button>
          </form>

          <div className="flex items-center gap-2.5 mt-6 px-4 py-3 rounded-xl bg-[#0F1F3D]/4 border border-[#0F1F3D]/6">
            <span className="text-xs text-slate-400">{t.protectedAccess}</span>
          </div>

          <p className="mt-6 text-center text-[11px] text-slate-400">{t.copyright}</p>
        </div>
      </div>
    </div>
  );
}