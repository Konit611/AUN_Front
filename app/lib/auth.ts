"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, apiFetch, apiPost, apiPatch } from "@/app/lib/api";

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  birthdate: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  persona_code: string | null;
  has_password: boolean;
  created_at: string;
}

export interface SignupPayload {
  email: string;
  username: string;
  password: string;
  birthdate: string; // YYYY-MM-DD
  terms_accepted: boolean;
  privacy_accepted: boolean;
  persona_code?: string;
}

export interface ProfileUpdatePayload {
  display_name?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  persona_code?: string | null;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}

export function login(email: string, password: string): Promise<AuthUser> {
  return apiPost<AuthUser>("/auth/login", { email, password });
}

export function signup(payload: SignupPayload): Promise<AuthUser> {
  return apiPost<AuthUser>("/auth/signup", payload);
}

export function logout(): Promise<void> {
  return apiPost<void>("/auth/logout", {});
}

export function updateProfile(
  payload: ProfileUpdatePayload,
): Promise<AuthUser> {
  return apiPatch<AuthUser>("/auth/me", payload);
}

export function changePassword(payload: ChangePasswordPayload): Promise<void> {
  return apiPost<void>("/auth/change-password", payload);
}

export function useMe() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const me = await apiFetch<AuthUser>("/auth/me");
      setUser(me);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setUser(null);
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { user, loading, refetch };
}
