import type { LoginCredentials, AuthToken, User } from "@/types/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || response.statusText);
  }

  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return undefined as T;
  }

  return response.json();
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthToken> => {
    return apiRequest<AuthToken>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  getMe: async (token: string): Promise<User> => {
    return apiRequest<User>("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  logout: async (token: string): Promise<void> => {
    return apiRequest<void>("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
