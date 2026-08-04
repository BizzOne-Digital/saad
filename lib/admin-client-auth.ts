/** Client-side admin session helpers (browser only). */

export const ADMIN_TOKEN_KEY = "adminSessionToken";
export const ADMIN_AUTH_KEY = "adminAuth";
export const ADMIN_EMAIL_KEY = "adminEmail";

export function saveAdminClientSession(email: string, token: string) {
  localStorage.setItem(ADMIN_AUTH_KEY, "true");
  localStorage.setItem(ADMIN_EMAIL_KEY, email);
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminClientSession() {
  localStorage.removeItem(ADMIN_AUTH_KEY);
  localStorage.removeItem(ADMIN_EMAIL_KEY);
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function getAdminAuthHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(ADMIN_TOKEN_KEY)
      : null;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export function adminFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(init.headers);
  const auth = getAdminAuthHeaders();
  Object.entries(auth).forEach(([k, v]) => headers.set(k, v));
  return fetch(input, {
    ...init,
    headers,
    credentials: "include",
  });
}

/**
 * Ensures a bearer token exists (from cookie refresh or existing localStorage).
 * Returns false if user must log in again.
 */
export async function ensureAdminSessionToken(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  if (localStorage.getItem(ADMIN_TOKEN_KEY)) return true;

  try {
    const res = await fetch("/api/admin/session", {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (!data?.token) return false;
    saveAdminClientSession(data.email || "", data.token);
    return true;
  } catch {
    return false;
  }
}
