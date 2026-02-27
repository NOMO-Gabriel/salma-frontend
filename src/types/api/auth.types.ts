// src/types/api/auth.types.ts
// ==============================================================================
//  Types TypeScript — Module Authentification
//  Calque sur AdminUser Django + endpoints JWT
// ==============================================================================

export type AdminRole = "super_admin" | "admin" | "editor";

export interface AdminUser {
  id: string;
  email: string;
  nom_complet: string;
  role: AdminRole;
  is_active: boolean;
  derniere_connexion: string | null;
  date_creation: string;
}

// --- Réponse login -----------------------------------------------------------

export interface LoginResponse {
  access: string;
  refresh: string;
  user: AdminUser;
}

// --- Payloads ----------------------------------------------------------------

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LogoutPayload {
  refresh: string;
}

export interface RegisterPayload {
  email: string;
  nom_complet: string;
  role: AdminRole;
  password: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ResetPasswordRequestPayload {
  email: string;
}

export interface ResetPasswordConfirmPayload {
  token: string;
  new_password: string;
}

export interface UpdateProfilePayload {
  nom_complet?: string;
  email?: string;
}

// --- Token refresh -----------------------------------------------------------

export interface TokenRefreshPayload {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
  refresh?: string; // ROTATE_REFRESH_TOKENS = True → nouveau refresh renvoyé
}