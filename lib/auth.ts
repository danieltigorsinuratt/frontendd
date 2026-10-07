import { apiFetch } from "./api";

export interface AdminUser {
  id?: number | string;
  email: string;
  name: string;
  role: string;
}

const AUTH_KEY = "mathventure_admin_auth";

export function getAuthSession(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; message?: string; user?: AdminUser }> {
  if (!email.trim() || !password.trim()) {
    return { success: false, message: "Email dan password wajib diisi." };
  }

  try {
    const res = await apiFetch<{ success: boolean; user: AdminUser; message?: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      }
    );

    if (res.success && res.user) {
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_KEY, JSON.stringify(res.user));
      }
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message || "Gagal masuk." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal terhubung ke backend server.";
    return { success: false, message: msg };
  }
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function isUserAuthenticated(): boolean {
  return getAuthSession() !== null;
}
