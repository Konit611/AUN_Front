"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { ApiError } from "@/app/lib/api";
import { updateProfile, useMe } from "@/app/lib/auth";
import { getPersona, isValidCode } from "@/app/lib/persona";
import Button from "@/app/components/ui/button";

export default function ProfileEditPage() {
  const { user, loading, refetch } = useMe();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name ?? "");
      setBio(user.bio ?? "");
      setAvatarUrl(user.avatar_url ?? "");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="bg-bg min-h-screen flex items-center justify-center">
        <p className="font-body text-sm text-text-muted">読み込み中...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-bg min-h-screen flex items-center justify-center px-6">
        <p className="font-body text-sm text-text-muted text-center">
          ログインしてください。{" "}
          <Link
            href="/login?next=/mypage/edit"
            className="text-accent hover:text-accent-hover"
          >
            ログイン
          </Link>
        </p>
      </div>
    );
  }

  const persona =
    user.persona_code && isValidCode(user.persona_code)
      ? getPersona(user.persona_code)
      : null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await updateProfile({
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        avatar_url: avatarUrl.trim() || null,
      });
      await refetch();
      setSavedAt(Date.now());
    } catch (err) {
      setError(
        err instanceof ApiError
          ? `保存に失敗しました (${err.status})`
          : "保存に失敗しました",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-bg min-h-screen">
      <div className="px-6 md:px-8 lg:px-12 pt-8 md:pt-16 pb-32 md:pb-24 max-w-[640px] mx-auto">
        <Link
          href="/mypage"
          className="font-body text-sm text-text-muted hover:text-accent transition-colors"
        >
          ← マイページに戻る
        </Link>

        <div className="flex flex-col gap-2 mt-6 mb-8 md:mb-12">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Profile
          </span>
          <h1 className="font-display font-bold text-[28px] md:text-[48px] md:leading-tight text-accent">
            プロフィール編集
          </h1>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <Field
            label="表示名"
            hint="他のユーザーに表示される名前。空欄の場合はユーザー名が使われます。"
          >
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={64}
              className={inputCls}
              placeholder={user.username}
            />
          </Field>

          <Field label="自己紹介" hint="500文字以内">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={500}
              rows={4}
              className={`${inputCls} resize-y`}
            />
          </Field>

          <Field label="アバター画像URL">
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className={inputCls}
            />
          </Field>

          {error && (
            <p className="font-body text-sm text-[#8B2500]" role="alert">
              {error}
            </p>
          )}
          {savedAt && !error && (
            <p
              className="font-body text-sm text-accent"
              role="status"
              key={savedAt}
            >
              保存しました
            </p>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={submitting}>
              {submitting ? "保存中..." : "保存"}
            </Button>
          </div>
        </form>

        <hr className="my-12 border-border" />

        <section className="flex flex-col gap-4">
          <h2 className="font-display font-bold text-lg text-accent">
            診断結果
          </h2>
          {persona ? (
            <div className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-display font-bold text-base text-accent">
                  {persona.code} ・ {persona.name}
                </span>
                <span className="font-body text-xs text-text-muted line-clamp-2">
                  {persona.description}
                </span>
              </div>
              <Link
                href={`/result/${persona.code}`}
                className="font-body text-sm text-accent hover:text-accent-hover shrink-0"
              >
                詳細
              </Link>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between gap-4">
              <span className="font-body text-sm text-text-secondary">
                まだ診断を受けていません
              </span>
              <Link
                href="/diagnosis"
                className="font-body text-sm text-accent hover:text-accent-hover shrink-0"
              >
                タイプ診断 →
              </Link>
            </div>
          )}
        </section>

        <hr className="my-12 border-border" />

        <section className="flex flex-col gap-4">
          <h2 className="font-display font-bold text-lg text-accent">
            セキュリティ
          </h2>
          <Link
            href="/mypage/change-password"
            className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-accent transition-colors"
          >
            <span className="font-body text-sm text-text-primary">
              パスワードを変更
            </span>
            <span className="font-body text-sm text-accent">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-base text-text-primary focus:border-accent focus:outline-none transition-colors";

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
