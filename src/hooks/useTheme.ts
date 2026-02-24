// src/hooks/useTheme.ts
"use client";

import { useTheme as useNextTheme } from "next-themes";

// ============================================================
//  HOOK useTheme
//  Wrapper autour de next-themes pour une API plus simple.
//
//  Usage dans n'importe quel composant :
//
//  const { theme, isDark, toggleTheme, setTheme } = useTheme();
//
//  <button onClick={toggleTheme}>
//    {isDark ? "Mode clair" : "Mode sombre"}
//  </button>
// ============================================================
export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return {
    theme,           // "light" | "dark" | "system"
    resolvedTheme,   // "light" | "dark" (jamais "system")
    isDark,          // boolean — pratique pour les conditions
    toggleTheme,     // bascule light ↔ dark
    setTheme,        // contrôle direct si besoin
  };
}