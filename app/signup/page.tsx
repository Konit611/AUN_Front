"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { ApiError } from "@/app/lib/api";
import { signup } from "@/app/lib/auth";
import Button from "@/app/components/ui/button";

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/mypage";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signup(email, username, password);
      router.push(next);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError("このメールアドレスまたはユーザー名は既に使用されています");
      } else if (err instanceof ApiError && err.status === 422) {
        setError("入力内容をご確認ください（パスワードは8文字以上）");
      } else {
        setError("登録に失敗しました。しばらくしてお試しください。");
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
            Create account
          </span>
          <h1 className="font-display font-bold text-[32px] text-accent">
            新規登録
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
              ユーザー名
            </span>
            <input
              type="text"
              required
              minLength={2}
              maxLength={32}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-surface border border-border rounded-lg px-4 py-3 font-body text-base text-text-primary focus:border-accent focus:outline-none transition-colors"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-xs text-text-secondary tracking-wider">
              パスワード（8文字以上）
            </span>
            <input
              type="password"
              required
              minLength={8}
              maxLength={128}
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
            {submitting ? "登録中..." : "登録"}
          </Button>
        </form>

        <p className="font-body text-sm text-text-secondary text-center">
          既にアカウントをお持ちの方は{" "}
          <Link
            href={`/login${next !== "/mypage" ? `?next=${encodeURIComponent(next)}` : ""}`}
            className="text-accent font-medium hover:text-accent-hover"
          >
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
