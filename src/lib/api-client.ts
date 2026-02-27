// src/lib/api-client.ts
// ==============================================================================
//  Client HTTP central du projet SALMA
//  - Toutes les requêtes passent par ici
//  - Gestion automatique du token JWT (Authorization header)
//  - Gestion des erreurs unifiée
//  - Support des query params, revalidation ISR et multipart/form-data
// ==============================================================================

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

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
  /** Query params ajoutés à l'URL : { page: "2", country: "cn" } */
  params?: Record<string, string | number | boolean | undefined>;
  /** Secondes de revalidation ISR Next.js (Server Components uniquement) */
  revalidate?: number | false;
  /** Si true, ne pas ajouter Content-Type (pour FormData/multipart) */
  isMultipart?: boolean;
}

// ==============================================================================
//  Helpers JWT
//  Côté client uniquement — les Server Components utilisent les cookies httpOnly
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

// ==============================================================================
//  Helper — construire l'URL complète d'un média Django
//  Usage : getMediaUrl("/media/bourses/image.jpg") → "http://....:8000/media/..."
// ==============================================================================
export function getMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path; // déjà absolu
  return `${BACKEND_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// ==============================================================================
//  Fonction de fetch centrale
// ==============================================================================

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, revalidate, isMultipart, ...customConfig } = options;

  // --- Construction de l'URL ---
  const url = new URL(`${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // --- Headers ---
  const headers: Record<string, string> = {};

  // Content-Type automatique (sauf pour FormData)
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  // Injection du token JWT si disponible (côté client)
  const token = tokenStorage.getAccess();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Merge avec les headers personnalisés
  if (customConfig.headers) {
    Object.assign(headers, customConfig.headers);
  }

  // --- Config fetch ---
  const config: RequestInit = {
    ...customConfig,
    headers,
    // Support ISR Next.js pour les Server Components
    next: revalidate !== undefined ? { revalidate } : customConfig.next,
  };

  // --- Exécution ---
  try {
    const response = await fetch(url.toString(), config);

    // Réponse vide (DELETE, etc.)
    if (response.status === 204) return {} as T;

    // Tentative de parsing JSON
    const data = await response.json().catch(() => ({}));

    // Erreur HTTP
    if (!response.ok) {
      throw new ApiException({
        status: response.status,
        message: extractErrorMessage(data, response.status),
        detail: data,
      });
    }

    return data as T;
  } catch (error) {
    // Re-throw si c'est déjà notre type d'erreur
    if (error instanceof ApiException) throw error;

    // Erreur réseau (backend inaccessible, CORS, etc.)
    throw new ApiException({
      status: 0,
      message: "Impossible de contacter le serveur. Vérifie ta connexion ou l'adresse API.",
      detail: { originalError: String(error) },
    });
  }
}

// ==============================================================================
//  Helper — Extraction du message d'erreur Django DRF
// ==============================================================================

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

// ==============================================================================
//  API publique du client — utilisée par tous les repositories
// ==============================================================================

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

  /** Pour les uploads fichiers (FormData — pas de Content-Type automatique) */
  upload: <T>(url: string, formData: FormData, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "POST", body: formData, isMultipart: true }),

  /** Upload avec méthode PATCH (ex: mise à jour partielle avec fichier) */
  uploadPatch: <T>(url: string, formData: FormData, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "PATCH", body: formData, isMultipart: true }),
};