"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { ApiError } from "@/app/lib/api";
import { signup } from "@/app/lib/auth";
import { isValidCode } from "@/app/lib/persona";
import Button from "@/app/components/ui/button";

const MIN_AGE = 20;

function yearsBetween(birth: string, today: Date = new Date()): number | null {
  const d = new Date(birth);
  if (Number.isNaN(d.getTime())) return null;
  let years = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) years -= 1;
  return years;
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/mypage";
  const personaParam = searchParams.get("persona")?.toUpperCase();
  const personaCode = personaParam && isValidCode(personaParam) ? personaParam : null;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const ageOk =
    birthdate === "" || (yearsBetween(birthdate) ?? -1) >= MIN_AGE;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }
    const age = yearsBetween(birthdate);
    if (age === null || age < MIN_AGE) {
      setError(`${MIN_AGE}歳未満の方はご利用いただけません`);
      return;
    }
    if (!termsAccepted || !privacyAccepted) {
      setError("利用規約とプライバシーポリシーへの同意が必要です");
      return;
    }

    setSubmitting(true);
    try {
      await signup({
        email,
        username,
        password,
        birthdate,
        terms_accepted: termsAccepted,
        privacy_accepted: privacyAccepted,
        ...(personaCode ? { persona_code: personaCode } : {}),
      });
      // Full reload so the layout's useMe picks up the new auth cookie.
      window.location.href = next;
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError("このメールアドレスまたはユーザー名は既に使用されています");
      } else if (err instanceof ApiError && err.status === 400) {
        setError(`${MIN_AGE}歳未満の方はご利用いただけません`);
      } else if (err instanceof ApiError && err.status === 422) {
        setError("入力内容をご確認ください（パスワードは8文字以上）");
      } else {
        setError("登録に失敗しました。しばらくしてお試しください。");
      }
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[440px] flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-xs text-accent/60 tracking-[2.4px] uppercase">
            Create account
          </span>
          <h1 className="font-display font-bold text-[32px] text-accent">
            新規登録
          </h1>
          {personaCode && (
            <p className="font-body text-sm text-text-secondary text-center mt-2">
              診断結果（{personaCode}）はプロフィールに保存されます
            </p>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Field label="メールアドレス">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="ユーザー名">
            <input
              type="text"
              required
              minLength={2}
              maxLength={32}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="パスワード（8文字以上）">
            <input
              type="password"
              required
              minLength={8}
              maxLength={128}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="パスワード（確認）">
            <input
              type="password"
              required
              minLength={8}
              maxLength={128}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${inputCls} ${
                confirmPassword !== "" && confirmPassword !== password
                  ? "border-red-400"
                  : ""
              }`}
            />
          </Field>
          <Field
            label="生年月日"
            hint={`本サービスは${MIN_AGE}歳以上の方のみご利用いただけます`}
          >
            <input
              type="date"
              required
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className={`${inputCls} ${
                !ageOk ? "border-red-400" : ""
              }`}
            />
          </Field>

          <div className="flex flex-col gap-2 pt-2">
            <Consent
              checked={termsAccepted}
              onChange={setTermsAccepted}
              label={
                <>
                  <Link
                    href="/terms"
                    target="_blank"
                    className="text-accent underline hover:text-accent-hover"
                  >
                    利用規約
                  </Link>
                  に同意します
                </>
              }
            />
            <Consent
              checked={privacyAccepted}
              onChange={setPrivacyAccepted}
              label={
                <>
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="text-accent underline hover:text-accent-hover"
                  >
                    プライバシーポリシー
                  </Link>
                  に同意します
                </>
              }
            />
          </div>

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

const inputCls =
  "bg-surface border border-border rounded-lg px-4 py-3 font-body text-base text-text-primary focus:border-accent focus:outline-none transition-colors";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs text-text-secondary tracking-wider">
        {label}
      </span>
      {children}
      {hint && (
        <span className="font-body text-xs text-text-muted">{hint}</span>
      )}
    </label>
  );
}

function Consent({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-accent cursor-pointer"
      />
      <span className="font-body text-sm text-text-secondary">{label}</span>
    </label>
  );
}
