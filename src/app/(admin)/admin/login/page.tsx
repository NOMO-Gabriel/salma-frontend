"use client";
// src/app/(admin)/admin/login/page.tsx
// ==============================================================================
//  Page Login Admin — /admin/login
//  ✅ Logique identique : useAuth, LoginPayload, redirect, show/hide password
//  ✅ Design : split-screen asymétrique, navy + or, animations CSS
// ==============================================================================

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { LoginPayload } from "@/types/api/auth.types";

export default function AdminLoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isAuthenticated, error, clearError } = useAuth();

  const [form, setForm]               = useState<LoginPayload>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted]         = useState(false);

  useEffect(() => { setMounted(true); }, []);

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
    <>
      {/* ── Styles globaux ─────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .login-root {
          font-family: 'DM Sans', sans-serif;
        }
        .login-root * { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: .4; }
          70%  { transform: scale(1.3); opacity: 0;  }
          100% { transform: scale(1);   opacity: 0;  }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-6px); }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }

        .anim-fade-up-1 { animation: fadeUp 0.6s ease both 0.1s; }
        .anim-fade-up-2 { animation: fadeUp 0.6s ease both 0.2s; }
        .anim-fade-up-3 { animation: fadeUp 0.6s ease both 0.3s; }
        .anim-fade-up-4 { animation: fadeUp 0.6s ease both 0.4s; }
        .anim-fade-up-5 { animation: fadeUp 0.6s ease both 0.5s; }
        .anim-fade-in   { animation: fadeIn 0.8s ease both 0.1s; }
        .anim-float     { animation: float 4s ease-in-out infinite; }
        .anim-spin-slow { animation: spin-slow 20s linear infinite; }

        .input-field {
          width: 100%;
          padding: 14px 16px;
          background: #F8F9FC;
          border: 1.5px solid #E8ECF4;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1A2744;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-field::placeholder { color: #B0BBCC; }
        .input-field:focus {
          background: #fff;
          border-color: #C9A84C;
          box-shadow: 0 0 0 4px rgba(201,168,76,.12);
        }
        .input-field.has-error {
          border-color: #EF4444;
          box-shadow: 0 0 0 4px rgba(239,68,68,.08);
        }

        .btn-login {
          width: 100%;
          padding: 14px;
          background: #0F1F3D;
          color: white;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-login:hover:not(:disabled) {
          background: #1B365D;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(15,31,61,.25);
        }
        .btn-login:active:not(:disabled) {
          transform: translateY(0);
        }
        .btn-login:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }
        .btn-login::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent);
          background-size: 200% 100%;
        }
        .btn-login:hover::after {
          animation: shimmer 1.2s ease infinite;
        }

        /* Grille géométrique panneau gauche */
        .geo-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .geo-circle-1 {
          position: absolute;
          width: 320px; height: 320px;
          border: 1px solid rgba(201,168,76,.12);
          border-radius: 50%;
          top: -80px; right: -80px;
        }
        .geo-circle-2 {
          position: absolute;
          width: 200px; height: 200px;
          border: 1px solid rgba(201,168,76,.08);
          border-radius: 50%;
          bottom: 60px; left: -60px;
        }
        .geo-diamond {
          position: absolute;
          width: 60px; height: 60px;
          border: 1px solid rgba(201,168,76,.2);
          transform: rotate(45deg);
          bottom: 120px; right: 40px;
        }

        /* Stats panel */
        .stat-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 12px;
          backdrop-filter: blur(8px);
        }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #C9A84C;
          line-height: 1;
        }
        .stat-label {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255,255,255,.5);
          text-transform: uppercase;
          letter-spacing: .12em;
          line-height: 1.3;
        }
      `}</style>

      <div className="login-root" style={{ minHeight: "100vh", display: "flex" }}>

        {/* ══════════════════════════════════════════════════════════
            PANNEAU GAUCHE — Brand / Visual
        ══════════════════════════════════════════════════════════ */}
        <div
          className="anim-fade-in"
          style={{
            flex: "0 0 45%",
            background: "linear-gradient(145deg, #0A1628 0%, #0F1F3D 50%, #162844 100%)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 40px",
          }}
        >
          {/* Éléments décoratifs */}
          <div className="geo-grid" />
          <div className="geo-circle-1 anim-spin-slow" />
          <div className="geo-circle-2" />
          <div className="geo-diamond" />

          {/* Halo doré */}
          <div style={{
            position: "absolute",
            width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(201,168,76,.08) 0%, transparent 70%)",
            top: "-100px", right: "-100px",
            pointerEvents: "none",
          }} />

          {/* Logo + Branding */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "44px", height: "44px",
                background: "linear-gradient(135deg, #C9A84C, #A68635)",
                borderRadius: "12px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 20px rgba(201,168,76,.3)",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, color: "#fff", lineHeight: 1 }}>SALMA</p>
                <p style={{ fontSize: "9px", fontWeight: 600, color: "#C9A84C", letterSpacing: ".3em", textTransform: "uppercase", marginTop: "2px" }}>AG Technologies</p>
              </div>
            </div>
          </div>

          {/* Citation centrale */}
          <div className="anim-float" style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ width: "32px", height: "2px", background: "#C9A84C", borderRadius: "2px", marginBottom: "24px" }} />
            <blockquote style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "32px",
              fontWeight: 600,
              color: "white",
              lineHeight: 1.25,
              maxWidth: "340px",
              letterSpacing: "-.01em",
            }}>
              La passerelle entre l&apos;Afrique et les meilleures universités du monde.
            </blockquote>
            <p style={{ marginTop: "20px", fontSize: "13px", color: "rgba(255,255,255,.45)", fontWeight: 400 }}>
              Espace réservé aux administrateurs de la plateforme
            </p>
          </div>

          {/* Stats en bas */}
          <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { v: "500+", l: "Étudiants\naccompagnés" },
              { v: "25+", l: "Universités\npartenaires" },
              { v: "03 sem.", l: "Délai moyen\nvisas" },
              { v: "100%", l: "Taux de\nréussite" },
            ].map((s) => (
              <div key={s.l} className="stat-chip">
                <div className="stat-value">{s.v}</div>
                <div className="stat-label" style={{ whiteSpace: "pre-line" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            PANNEAU DROIT — Formulaire
        ══════════════════════════════════════════════════════════ */}
        <div style={{
          flex: 1,
          background: "#FAFBFE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
          position: "relative",
        }}>
          {/* Fond subtil */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(#E8ECF4 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: .5,
          }} />

          {/* Card formulaire */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "400px",
              opacity: mounted ? 1 : 0,
            }}
          >
            {/* En-tête */}
            <div className="anim-fade-up-1" style={{ marginBottom: "36px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                background: "rgba(15,31,61,.06)",
                borderRadius: "100px",
                marginBottom: "16px",
              }}>
                <span style={{
                  width: "6px", height: "6px",
                  background: "#22C55E",
                  borderRadius: "50%",
                  display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(34,197,94,.2)",
                }} />
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#0F1F3D", letterSpacing: ".08em" }}>
                  Système sécurisé
                </span>
              </div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "34px",
                fontWeight: 700,
                color: "#0F1F3D",
                lineHeight: 1.1,
                marginBottom: "8px",
              }}>
                Connexion Admin
              </h1>
              <p style={{ fontSize: "14px", color: "#7A8BA6", fontWeight: 400, lineHeight: 1.5 }}>
                Accédez au tableau de bord de gestion de la plateforme SALMA.
              </p>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div
                className="anim-fade-up-1"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "13px 16px",
                  background: "#FEF2F2",
                  border: "1.5px solid #FECACA",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ color: "#EF4444", flexShrink: 0, marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p style={{ fontSize: "13px", color: "#B91C1C", fontWeight: 500 }}>{error}</p>
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmit}>
              {/* Champ Email */}
              <div className="anim-fade-up-2" style={{ marginBottom: "18px" }}>
                <label style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#4A5568",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}>
                  Adresse e-mail
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#B0BBCC",
                    pointerEvents: "none",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@salma.cm"
                    className={`input-field ${error ? "has-error" : ""}`}
                    style={{ paddingLeft: "42px" }}
                  />
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div className="anim-fade-up-3" style={{ marginBottom: "26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#4A5568",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}>
                    Mot de passe
                  </label>
                  <span style={{ fontSize: "12px", color: "#7A8BA6", cursor: "pointer", fontWeight: 500 }}>
                    Mot de passe oublié ?
                  </span>
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#B0BBCC",
                    pointerEvents: "none",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••••"
                    className={`input-field ${error ? "has-error" : ""}`}
                    style={{ paddingLeft: "42px", paddingRight: "46px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#B0BBCC",
                      padding: "2px",
                      display: "flex",
                      alignItems: "center",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#7A8BA6")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#B0BBCC")}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Bouton submit */}
              <div className="anim-fade-up-4">
                <button
                  type="submit"
                  disabled={isLoading || !form.email || !form.password}
                  className="btn-login"
                >
                  {isLoading ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <svg style={{ animation: "spin-slow 0.8s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.25)" strokeWidth="3" />
                        <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Connexion en cours…
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      Accéder au tableau de bord
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Séparateur sécurité */}
            <div className="anim-fade-up-5" style={{ marginTop: "28px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                background: "rgba(15,31,61,.04)",
                borderRadius: "12px",
                border: "1px solid rgba(15,31,61,.06)",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A8BA6" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span style={{ fontSize: "12px", color: "#7A8BA6", fontWeight: 400 }}>
                  Accès protégé — Réservé aux administrateurs AG Technologies
                </span>
              </div>
            </div>

            {/* Footer */}
            <p style={{
              marginTop: "24px",
              textAlign: "center",
              fontSize: "11px",
              color: "#B0BBCC",
              fontWeight: 400,
            }}>
              © 2026 SALMA · AG Technologies · Yaoundé, Cameroun
            </p>
          </div>
        </div>

        {/* ── Responsive mobile (cache le panneau gauche) ───────────── */}
        <style>{`
          @media (max-width: 768px) {
            .login-root > div:first-child { display: none !important; }
            .login-root > div:last-child {
              padding: 32px 24px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
