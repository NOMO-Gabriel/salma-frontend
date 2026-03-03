// src/lib/api-client.ts
// ==============================================================================
//  Client HTTP central du projet SALMA
//  - Gestion automatique du token JWT (Authorization header)
//  - Nettoyage critique des guillemets de cookies (SSR Fix)
//  - Gestion des erreurs unifiée
// ==============================================================================

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api").replace(/\/+$/, "");
export const BACKEND_URL = new URL(API_URL).origin;

// ==============================================================================
//  Types
// ==============================================================================

export interface ApiError {
  status: number;
  message: string;
  detail?: Record<string, unknown>;
}

export class ApiException extends Error {
  status: number;
  detail?: Record<string, unknown>;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "ApiException";
    this.status = error.status;
    this.detail = error.detail;
  }
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  revalidate?: number | false;
  isMultipart?: boolean;
}

// ==============================================================================
//  Helpers JWT
// ==============================================================================

const TOKEN_KEY = "salma_access_token";
const REFRESH_KEY = "salma_refresh_token";

export const tokenStorage = {
  getAccess: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  getRefresh: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_KEY);
  },
  set: (access: string, refresh: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

export function getMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http") && !path.includes("/api/media/")) return path;
  let cleanPath = path.replace("/api/media/", "/media/").replace("api/media/", "/media/");
  if (cleanPath.startsWith("http")) return cleanPath;
  const finalPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  return `${BACKEND_URL}${finalPath}`;
}

// ==============================================================================
//  Fonction de fetch centrale
// ==============================================================================

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, revalidate, isMultipart, ...customConfig } = options;

  const url = new URL(`${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers: Record<string, string> = {};

  // 1. Récupération du token
  let token = tokenStorage.getAccess();

  // Si on est sur le serveur (Server Component), on cherche dans les cookies
  if (!token && typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const cookieValue = cookieStore.get("salma_auth")?.value;
      if (cookieValue) {
        token = cookieValue;
      }
    } catch {
      // Contexte hors requête (ex: build)
    }
  }

  // 2. NETTOYAGE CRITIQUE DU TOKEN
  // Supprime les guillemets doubles au début/fin et les espaces
  if (token) {
    const cleanToken = token.replace(/^"|"$/g, '').trim();
    
    // On ne l'ajoute que s'il est valide (pas "null" ou "undefined" en string)
    if (cleanToken && cleanToken !== "null" && cleanToken !== "undefined" && cleanToken.length > 20) {
      headers["Authorization"] = `Bearer ${cleanToken}`;
    }
  }

  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  if (customConfig.headers) {
    Object.assign(headers, customConfig.headers);
  }

  const isAdminRequest = endpoint.startsWith("/admin");
  const config: RequestInit = {
    ...customConfig,
    headers,
    cache: isAdminRequest ? "no-store" : "default",
    next: revalidate !== undefined ? { revalidate } : customConfig.next,
  };

  try {
    const response = await fetch(url.toString(), config);
    if (response.status === 204) return {} as T;

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiException({
        status: response.status,
        message: extractErrorMessage(data, response.status),
        detail: data,
      });
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiException) throw error;
    throw new ApiException({
      status: 0,
      message: "Impossible de contacter le serveur.",
      detail: { originalError: String(error) },
    });
  }
}

function extractErrorMessage(data: Record<string, unknown>, status: number): string {
  if (typeof data?.detail === "string") return data.detail;
  if (typeof data?.message === "string") return data.message;
  if (status === 401) return "Non authentifié. Veuillez vous connecter.";
  if (status === 403) return "Accès refusé. Vous n'avez pas les permissions nécessaires.";
  if (status === 404) return "Ressource introuvable.";
  if (status === 422 || status === 400) return "Données invalides. Vérifiez le formulaire.";
  if (status >= 500) return "Erreur serveur. Contactez l'administrateur.";
  return `Erreur inattendue (${status})`;
}

export const api = {
  get: <T>(url: string, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body: unknown, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "POST", body: JSON.stringify(body) }),

  put: <T>(url: string, body: unknown, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "PUT", body: JSON.stringify(body) }),

  patch: <T>(url: string, body: unknown, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(url: string, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "DELETE" }),

  upload: <T>(url: string, formData: FormData, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "POST", body: formData, isMultipart: true }),

  uploadPatch: <T>(url: string, formData: FormData, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "PATCH", body: formData, isMultipart: true }),
};