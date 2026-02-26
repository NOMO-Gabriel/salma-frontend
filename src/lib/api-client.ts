// src/lib/api-client.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
  revalidate?: number;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, revalidate, ...customConfig } = options;

  // Construction de l'URL avec les paramètres de requête (query params)
  const url = new URL(`${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);
  if (params) {
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  }

  const headers = {
    "Content-Type": "application/json",
    ...customConfig.headers,
  };

  const config: RequestInit = {
    ...customConfig,
    headers,
    next: revalidate !== undefined ? { revalidate } : customConfig.next,
  };

  try {
    const response = await fetch(url.toString(), config);

    // Gestion des erreurs HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Erreur API: ${response.status}`);
    }

    // Pour les DELETE ou les réponses vides
    if (response.status === 204) return {} as T;

    return await response.json();
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  get: <T>(url: string, options?: FetchOptions) => apiFetch<T>(url, { ...options, method: "GET" }),
  post: <T>(url: string, body: any, options?: FetchOptions) => 
    apiFetch<T>(url, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: <T>(url: string, body: any, options?: FetchOptions) => 
    apiFetch<T>(url, { ...options, method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(url: string, body: any, options?: FetchOptions) => 
    apiFetch<T>(url, { ...options, method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(url: string, options?: FetchOptions) => apiFetch<T>(url, { ...options, method: "DELETE" }),
};