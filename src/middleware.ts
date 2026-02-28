import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("salma_auth")?.value;

  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin") && !isLoginPage;

  // 1. Si on tente d'accéder à l'admin sans cookie -> Login
  if (isAdminPage && !authCookie) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 2. Si on est sur Login mais qu'on a déjà un cookie -> Dashboard
  // C'est CA qui casse la boucle infinie
  if (isLoginPage && authCookie) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};