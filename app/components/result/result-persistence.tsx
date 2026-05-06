"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { updateProfile, useMe } from "@/app/lib/auth";

interface Props {
  code: string;
}

export default function ResultPersistence({ code }: Props) {
  const { user, loading, refetch } = useMe();
  const saveAttempted = useRef(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    if (user.persona_code === code) {
      setSaved(true);
      return;
    }
    if (saveAttempted.current) return;
    saveAttempted.current = true;
    void (async () => {
      try {
        await updateProfile({ persona_code: code });
        await refetch();
        setSaved(true);
      } catch {
        // Silent fail — the persona is still visible on the page.
      }
    })();
  }, [user, loading, code, refetch]);

  if (loading) return null;

  if (!user) {
    return (
      <div className="px-6 md:px-12 py-8 md:py-10">
        <div className="max-w-[640px] mx-auto bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3 items-center text-center">
          <h3 className="font-display font-bold text-lg text-accent">
            結果をプロフィールに保存
          </h3>
          <p className="font-body text-sm text-text-secondary">
            アカウントを作成すれば、診断結果（{code}）が保存され、おすすめがあなた向けに表示されます。
          </p>
          <Link
            href={`/signup?persona=${code}`}
            className="mt-2 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover transition-colors"
          >
            新規登録する
          </Link>
        </div>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="px-6 md:px-12 py-4 md:py-6">
        <p className="max-w-[640px] mx-auto font-body text-sm text-text-muted text-center">
          ✓ 結果（{code}）はプロフィールに保存されました
        </p>
      </div>
    );
  }

  return null;
}
