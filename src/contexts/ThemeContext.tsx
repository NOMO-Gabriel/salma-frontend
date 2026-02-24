// src/contexts/ThemeContext.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

// ============================================================
//  THEME PROVIDER
//  Wrapper autour de next-themes.
//  Branché dans src/app/layout.tsx autour de tout l'arbre.
//
//  Usage dans un composant :
//  import { useTheme } from "@/hooks/useTheme";
//  const { theme, toggleTheme } = useTheme();
// ============================================================
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"       // Ajoute/retire la classe .dark sur <html>
      defaultTheme="system"   // Suit le thème système par défaut
      enableSystem            // Active la détection système
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}