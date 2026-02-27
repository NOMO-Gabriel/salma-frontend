// src/hooks/useAuth.ts
// ==============================================================================
//  Hook useAuth — État d'authentification JWT côté client
//  Usage dans tout Client Component du dashboard admin
//
//  const { user, isLoading, isAuthenticated, login, logout } = useAuth();
// ==============================================================================
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authRepository } from "@/repositories/auth.repository";
import { tokenStorage } from "@/lib/api-client";
import type { AdminUser, LoginPayload } from "@/types/api/auth.types";

interface AuthState {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // ---------------------------------------------------------------------------
  //  Au montage : vérifier si un token existe et récupérer le profil
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const init = async () => {
      const hasToken = authRepository.isAuthenticated();

      if (!hasToken) {
        setState({ user: null, isLoading: false, isAuthenticated: false, error: null });
        return;
      }

      try {
        const user = await authRepository.getMe();
        setState({ user, isLoading: false, isAuthenticated: true, error: null });
      } catch {
        // Token invalide ou expiré → tenter un refresh
        try {
          await authRepository.refreshToken();
          const user = await authRepository.getMe();
          setState({ user, isLoading: false, isAuthenticated: true, error: null });
        } catch {
          // Refresh échoué → déconnexion propre
          tokenStorage.clear();
          setState({ user: null, isLoading: false, isAuthenticated: false, error: null });
        }
      }
    };

    init();
  }, []);

  // ---------------------------------------------------------------------------
  //  Login
  // ---------------------------------------------------------------------------
  const login = useCallback(
    async (payload: LoginPayload, redirectTo = "/admin/dashboard") => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await authRepository.login(payload);
        setState({
          user: response.user,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
        router.push(redirectTo);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Identifiants incorrects.";
        setState((prev) => ({ ...prev, isLoading: false, error: message }));
        throw err; // Re-throw pour que le formulaire puisse réagir
      }
    },
    [router]
  );

  // ---------------------------------------------------------------------------
  //  Logout
  // ---------------------------------------------------------------------------
  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await authRepository.logout();
    setState({ user: null, isLoading: false, isAuthenticated: false, error: null });
    router.push("/admin/login");
  }, [router]);

  // ---------------------------------------------------------------------------
  //  Clear error
  // ---------------------------------------------------------------------------
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    login,
    logout,
    clearError,
  };
}