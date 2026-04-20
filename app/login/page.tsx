"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { ApiError } from "@/app/lib/api";
import { login } from "@/app/lib/auth";
import Button from "@/app/components/ui/button";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/mypage";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push(next);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError("メールアドレスまたはパスワードが違います");
      } else {
        setError("ログインに失敗しました。しばらくしてお試しください。");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[400px] flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-xs text-accent/60 tracking-[2.4px] uppercase">
            Sign in
          </span>
          <h1 className="font-display font-bold text-[32px] text-accent">
            ログイン
          </h1>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-xs text-text-secondary tracking-wider">
              メールアドレス
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface border border-border rounded-lg px-4 py-3 font-body text-base text-text-primary focus:border-accent focus:outline-none transition-colors"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-xs text-text-secondary tracking-wider">
              パスワード
            </span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-surface border border-border rounded-lg px-4 py-3 font-body text-base text-text-primary focus:border-accent focus:outline-none transition-colors"
            />
          </label>

          {error && (
            <p className="font-body text-sm text-[#8B2500]" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" disabled={submitting} className="mt-2">
            {submitting ? "ログイン中..." : "ログイン"}
          </Button>
        </form>

        <p className="font-body text-sm text-text-secondary text-center">
          アカウントをお持ちでない方は{" "}
          <Link
            href={`/signup${next !== "/mypage" ? `?next=${encodeURIComponent(next)}` : ""}`}
            className="text-accent font-medium hover:text-accent-hover"
          >
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
