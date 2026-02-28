// src/repositories/auth.repository.ts
import { api, tokenStorage } from "@/lib/api-client";
import type {
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  RegisterPayload,
  AdminUser,
  ChangePasswordPayload,
  ResetPasswordRequestPayload,
  ResetPasswordConfirmPayload,
  UpdateProfilePayload,
  TokenRefreshPayload,
  TokenRefreshResponse,
} from "@/types/api/auth.types";

const BASE = "/auth";

export const authRepository = {
  /**
   * POST /api/auth/login
   * Connexion → retourne les tokens + profil
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(`${BASE}/login`, payload);
    
    // 1. Stockage Client (localStorage) pour les futurs appels API
    tokenStorage.set(response.access, response.refresh);

    // 2. Stockage Cookie pour le Middleware Next.js (Protection des routes serveur)
    if (typeof document !== "undefined") {
      // Expire dans 24h, accessible sur tout le domaine
      document.cookie = `salma_auth=${response.access}; path=/; max-age=86400; SameSite=Lax`;
    }
    
    return response;
  },

  /**
   * POST /api/auth/logout
   * Déconnexion → invalide le token et nettoie tout
   */
  logout: async (): Promise<void> => {
    const refresh = tokenStorage.getRefresh();
    if (refresh) {
      const payload: LogoutPayload = { refresh };
      await api.post<void>(`${BASE}/logout`, payload).catch(() => {});
    }
    
    // Nettoyage localStorage
    tokenStorage.clear();

    // Nettoyage Cookie
    if (typeof document !== "undefined") {
      document.cookie = "salma_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  },

  /**
   * GET /api/auth/me
   * Récupérer le profil de l'admin connecté
   */
  getMe: async (): Promise<AdminUser> => {
    return api.get<AdminUser>(`${BASE}/me`);
  },

  /**
   * POST /api/auth/register
   */
  register: async (payload: RegisterPayload): Promise<AdminUser> => {
    return api.post<AdminUser>(`${BASE}/register`, payload);
  },

  /**
   * PATCH /api/auth/me
   */
  updateProfile: async (payload: UpdateProfilePayload): Promise<AdminUser> => {
    return api.patch<AdminUser>(`${BASE}/me`, payload);
  },

  /**
   * PUT /api/auth/change-password
   */
  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    return api.put<void>(`${BASE}/change-password`, payload);
  },

  /**
   * POST /api/auth/reset-password
   */
  requestPasswordReset: async (payload: ResetPasswordRequestPayload): Promise<void> => {
    return api.post<void>(`${BASE}/reset-password`, payload);
  },

  /**
   * POST /api/auth/reset-password/confirm
   */
  confirmPasswordReset: async (payload: ResetPasswordConfirmPayload): Promise<void> => {
    return api.post<void>(`${BASE}/reset-password/confirm`, payload);
  },

  /**
   * POST /api/auth/token/refresh
   */
  refreshToken: async (): Promise<TokenRefreshResponse | null> => {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) return null;

    const payload: TokenRefreshPayload = { refresh };
    const response = await api.post<TokenRefreshResponse>(`${BASE}/token/refresh`, payload);

    const newRefresh = response.refresh ?? refresh;
    tokenStorage.set(response.access, newRefresh);

    return response;
  },

  /**
   * Vérifie la présence locale d'un token
   */
  isAuthenticated: (): boolean => {
    return !!tokenStorage.getAccess();
  },
};