// src/repositories/auth.repository.ts
// ==============================================================================
//  Repository — Authentification JWT
//  Couche d'accès aux 9 endpoints /api/auth/*
//  Ne connaît que api-client.ts et les types auth
// ==============================================================================

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
   * Stocke automatiquement les tokens
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(`${BASE}/login`, payload);
    tokenStorage.set(response.access, response.refresh);
    return response;
  },

  /**
   * POST /api/auth/logout
   * Déconnexion → blacklist le refresh token + efface le storage
   */
  logout: async (): Promise<void> => {
    const refresh = tokenStorage.getRefresh();
    if (refresh) {
      const payload: LogoutPayload = { refresh };
      await api.post<void>(`${BASE}/logout`, payload).catch(() => {
        // Même si le logout échoue côté serveur, on efface localement
      });
    }
    tokenStorage.clear();
  },

  /**
   * POST /api/auth/register
   * Créer un compte admin (super admin uniquement)
   */
  register: async (payload: RegisterPayload): Promise<AdminUser> => {
    return api.post<AdminUser>(`${BASE}/register`, payload);
  },

  /**
   * GET /api/auth/me
   * Récupérer le profil de l'admin connecté
   */
  getMe: async (): Promise<AdminUser> => {
    return api.get<AdminUser>(`${BASE}/me`);
  },

  /**
   * PATCH /api/auth/me
   * Modifier partiellement le profil
   */
  updateProfile: async (payload: UpdateProfilePayload): Promise<AdminUser> => {
    return api.patch<AdminUser>(`${BASE}/me`, payload);
  },

  /**
   * PUT /api/auth/change-password
   * Modifier le mot de passe
   */
  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    return api.put<void>(`${BASE}/change-password`, payload);
  },

  /**
   * POST /api/auth/reset-password
   * Demander réinitialisation par email (simulé)
   */
  requestPasswordReset: async (payload: ResetPasswordRequestPayload): Promise<void> => {
    return api.post<void>(`${BASE}/reset-password`, payload);
  },

  /**
   * POST /api/auth/reset-password/confirm
   * Confirmer le nouveau mot de passe avec le token reçu par email
   */
  confirmPasswordReset: async (payload: ResetPasswordConfirmPayload): Promise<void> => {
    return api.post<void>(`${BASE}/reset-password/confirm`, payload);
  },

  /**
   * POST /api/auth/token/refresh
   * Rafraîchir le token d'accès avec le refresh token
   * Stocke automatiquement le nouveau token
   */
  refreshToken: async (): Promise<TokenRefreshResponse | null> => {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) return null;

    const payload: TokenRefreshPayload = { refresh };
    const response = await api.post<TokenRefreshResponse>(`${BASE}/token/refresh`, payload);

    // Mettre à jour le storage avec le nouveau access token
    const newRefresh = response.refresh ?? refresh;
    tokenStorage.set(response.access, newRefresh);

    return response;
  },

  /**
   * Vérifie si un token est stocké côté client (ne valide pas avec le serveur)
   */
  isAuthenticated: (): boolean => {
    return !!tokenStorage.getAccess();
  },
};