// src/middleware.ts
// ==============================================================================
//  Middleware Next.js — Protection des routes /admin/*
//  Redirige vers /admin/login si aucun token valide
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";

// Routes protégées par l'authentification JWT
const PROTECTED_PREFIXES = ["/admin"];

// Routes publiques même dans l'espace admin
const PUBLIC_ADMIN_ROUTES = ["/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si la route est protégée
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) return NextResponse.next();

  // Laisser passer les routes publiques admin (login)
  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicAdminRoute) return NextResponse.next();

  // Vérifier la présence du token dans les cookies (httpOnly) ou le header
  // Note : localStorage n'est pas accessible côté middleware (server-side)
  // On utilise un cookie "salma_auth" posé lors du login
  const authCookie = request.cookies.get("salma_auth");
  const authHeader = request.headers.get("authorization");

  const hasToken = !!authCookie?.value || !!authHeader;

  if (!hasToken) {
    const loginUrl = new URL("/admin/login", request.url);
    // Conserver l'URL de destination pour redirection post-login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Matcher : protéger toutes les routes /admin/* sauf les fichiers statiques
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};