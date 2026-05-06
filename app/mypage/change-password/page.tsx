"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ApiError } from "@/app/lib/api";
import { changePassword } from "@/app/lib/auth";
import Button from "@/app/components/ui/button";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("新しいパスワードが一致しません");
      return;
    }
    if (newPassword.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      return;
    }
    if (newPassword === currentPassword) {
      setError("新しいパスワードは現在のものと異なる必要があります");
      return;
    }

    setSubmitting(true);
    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      router.push("/mypage/edit");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError("現在のパスワードが正しくありません");
      } else if (err instanceof ApiError && err.status === 422) {
        setError("入力内容をご確認ください");
      } else {
        setError("パスワードの変更に失敗しました");
      }
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-bg min-h-screen">
      <div className="px-6 md:px-8 lg:px-12 pt-8 md:pt-16 pb-32 md:pb-24 max-w-[480px] mx-auto">
        <Link
          href="/mypage/edit"
          className="font-body text-sm text-text-muted hover:text-accent transition-colors"
        >
          ← プロフィールに戻る
        </Link>

        <div className="flex flex-col gap-2 mt-6 mb-8 md:mb-12">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Security
          </span>
          <h1 className="font-display font-bold text-[28px] md:text-[40px] md:leading-tight text-accent">
            パスワード変更
          </h1>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Field label="現在のパスワード">
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="新しいパスワード（8文字以上）">
            <input
              type="password"
              required
              minLength={8}
              maxLength={128}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="新しいパスワード（確認）">
            <input
              type="password"
              required
              minLength={8}
              maxLength={128}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputCls}
            />
          </Field>

          {error && (
            <p className="font-body text-sm text-[#8B2500]" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" disabled={submitting} className="mt-2">
            {submitting ? "変更中..." : "パスワードを変更"}
          </Button>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-base text-text-primary focus:border-accent focus:outline-none transition-colors";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs text-text-secondary tracking-wider">
        {label}
      </span>
      {children}
    </label>
  );
}
