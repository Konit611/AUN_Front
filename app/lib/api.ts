export interface ApiOptions {
  cookie?: string;
}

const BASE_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL ?? "http://localhost:8000"
    : process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function withCookie(options?: ApiOptions): HeadersInit {
  return options?.cookie ? { cookie: options.cookie } : {};
}

async function send<T>(url: string, init: RequestInit): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    credentials: "include",
    signal: AbortSignal.timeout(10000),
    ...init,
  });
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.clone().json();
      const raw = (body as { detail?: unknown }).detail;
      if (typeof raw === "string") {
        detail = raw;
      } else if (Array.isArray(raw)) {
        // FastAPI's RequestValidationError serialises issues as an array of objects.
        detail = raw
          .map((e) => {
            const loc = Array.isArray((e as { loc?: unknown[] }).loc)
              ? (e as { loc: unknown[] }).loc.slice(1).join(".")
              : "";
            const msg = (e as { msg?: string }).msg ?? "";
            return loc ? `${loc}: ${msg}` : msg;
          })
          .filter(Boolean)
          .join("; ");
      }
    } catch {
      // Body wasn't JSON; ignore.
    }
    const fallback = `API request failed with status ${res.status}`;
    throw new ApiError(res.status, detail || fallback);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function apiFetch<T>(path: string, options?: ApiOptions): Promise<T> {
  return send<T>(`${BASE_URL}/api/v1${path}`, { headers: withCookie(options) });
}

export function apiPost<T>(
  path: string,
  body: unknown,
  options?: ApiOptions,
): Promise<T> {
  return send<T>(`${BASE_URL}/api/v1${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...withCookie(options) },
    body: JSON.stringify(body),
  });
}

export function apiPut<T>(
  path: string,
  body: unknown,
  options?: ApiOptions,
): Promise<T> {
  return send<T>(`${BASE_URL}/api/v1${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...withCookie(options) },
    body: JSON.stringify(body),
  });
}

export function apiPatch<T>(
  path: string,
  body: unknown,
  options?: ApiOptions,
): Promise<T> {
  return send<T>(`${BASE_URL}/api/v1${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...withCookie(options) },
    body: JSON.stringify(body),
  });
}

export function apiDelete(path: string, options?: ApiOptions): Promise<void> {
  return send<void>(`${BASE_URL}/api/v1${path}`, {
    method: "DELETE",
    headers: withCookie(options),
  });
}
