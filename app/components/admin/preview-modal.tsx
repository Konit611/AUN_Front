"use client";

import { useEffect, type ReactNode } from "react";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function PreviewModal({
  open,
  onClose,
  title = "プレビュー",
  children,
}: PreviewModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-bg w-full max-w-[860px] my-8 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between px-6 py-3 bg-surface/95 backdrop-blur-sm border-b border-border z-10">
          <span className="font-display font-bold text-base text-accent">
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-full font-body text-xs text-text-secondary hover:text-accent hover:bg-accent/5 transition-colors"
          >
            閉じる (Esc)
          </button>
        </div>
        <div className="p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
