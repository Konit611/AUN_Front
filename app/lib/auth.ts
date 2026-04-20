"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, apiFetch, apiPost } from "@/app/lib/api";

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  created_at: string;
}

export function login(email: string, password: string): Promise<AuthUser> {
  return apiPost<AuthUser>("/auth/login", { email, password });
}

export function signup(
  email: string,
  username: string,
  password: string,
): Promise<AuthUser> {
  return apiPost<AuthUser>("/auth/signup", { email, username, password });
}

export function logout(): Promise<void> {
  return apiPost<void>("/auth/logout", {});
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
