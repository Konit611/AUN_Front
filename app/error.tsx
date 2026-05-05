"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-32 px-6">
      <div className="w-14 h-14 rounded-full bg-surface-raised flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-700/70">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="font-display font-bold text-xl text-accent">
        問題が発生しました
      </h2>
      <p className="font-body text-sm text-text-secondary max-w-sm">
        ページの読み込み中にエラーが発生しました。少し時間をおいて再度お試しください。
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 px-6 py-2 rounded-full bg-accent text-white font-body font-bold text-sm hover:bg-accent-hover transition-colors"
      >
        再試行する
      </button>
    </div>
  );
}
