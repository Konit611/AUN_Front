"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiDelete } from "@/app/lib/api";

interface JournalActionsProps {
  entryId: string;
}

export default function JournalActions({ entryId }: JournalActionsProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      await apiDelete(`/journal/${entryId}`);
      router.push("/mypage");
      router.refresh();
    } catch {
      setError("削除に失敗しました。もう一度お試しください。");
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-8">
      <div className="flex gap-3">
        <Link
          href={`/mypage/${entryId}/edit`}
          className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-full bg-surface-raised text-accent font-body font-bold text-sm hover:bg-accent/10 transition-colors"
        >
          編集する
        </Link>
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-full bg-surface text-text-secondary border border-border font-body font-bold text-sm hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
        >
          削除する
        </button>
      </div>
      {error && (
        <p className="text-xs font-body text-red-700 text-center">{error}</p>
      )}

      {confirming && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/30 backdrop-blur-sm px-4"
          onClick={() => !deleting && setConfirming(false)}
        >
          <div
            className="w-full max-w-md bg-surface rounded-t-3xl md:rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display font-bold text-xl text-accent">
              この記録を削除しますか？
            </h2>
            <p className="font-body text-sm text-text-secondary">
              削除した記録は元に戻せません。
            </p>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setConfirming(false)}
                className="flex-1 px-4 py-3 rounded-full bg-surface-raised text-text-primary font-body font-bold text-sm disabled:opacity-50"
              >
                キャンセル
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="flex-1 px-4 py-3 rounded-full bg-red-600 text-white font-body font-bold text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? "削除中..." : "削除する"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
