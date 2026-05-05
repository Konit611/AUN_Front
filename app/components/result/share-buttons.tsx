"use client";

import { useState } from "react";

interface ShareButtonsProps {
  typeCode: string;
  typeName: string;
  description: string;
  variant: "hero" | "compatibility";
}

function buildShareText(typeCode: string, typeName: string): string {
  return `私の日本酒パーソナリティは「${typeName}」(${typeCode}) でした。AUNで診断してみよう。`;
}

export default function ShareButtons({
  typeCode,
  typeName,
  description,
  variant,
}: ShareButtonsProps) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleGenericShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = buildShareText(typeCode, typeName);
    const payload = { title: typeName, text, url };

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(payload);
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        showToast("リンクをコピーしました");
        return;
      } catch {
        // fallthrough
      }
    }

    showToast("共有機能が利用できません");
  };

  const handleLineShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = buildShareText(typeCode, typeName);
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(`${text}\n${url}`)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  };

  if (variant === "hero") {
    return (
      <>
        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-4 w-full max-w-[280px] mt-12 animate-slide-up-delay">
          <button
            type="button"
            onClick={handleGenericShare}
            className="flex items-center justify-center px-8 py-[15px] rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-body font-medium text-sm tracking-[0.7px] hover:bg-white/20 transition-colors cursor-pointer"
          >
            結果をシェア
          </button>
          <button
            type="button"
            onClick={handleLineShare}
            className="flex items-center justify-center gap-2 px-8 py-[14px] rounded-full bg-[#06c755] text-white font-body font-medium text-sm tracking-[0.7px] hover:brightness-95 transition-all cursor-pointer"
          >
            <LineIcon />
            LINEでシェア
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-4 mt-12 animate-slide-up-delay">
          <button
            type="button"
            onClick={handleGenericShare}
            className="flex items-center gap-2 px-8 py-[13px] rounded-full border border-white text-white font-body font-medium text-base hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ShareIcon />
            Share Identity
          </button>
          <button
            type="button"
            onClick={handleLineShare}
            className="flex items-center px-8 py-[13px] rounded-full bg-[#06c755] text-white font-body font-medium text-base hover:brightness-95 transition-all cursor-pointer"
          >
            LINEで送る
          </button>
        </div>

        <Toast message={toast} />
      </>
    );
  }

  // compatibility variant: a single CTA used inline
  return (
    <>
      <button
        type="button"
        onClick={handleGenericShare}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-accent text-white font-body font-bold text-sm tracking-[1.4px] shadow-md hover:bg-accent-hover transition-colors cursor-pointer"
      >
        <ShareIcon />
        この相性をシェアする
      </button>
      <Toast message={toast} />
      <span className="sr-only">{description}</span>
    </>
  );
}

function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-full bg-text-primary text-white text-sm font-body font-medium shadow-lg pointer-events-none">
      {message}
    </div>
  );
}

function LineIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 5.81 2 10.5c0 4.08 3.42 7.5 8.05 8.36.31.07.74.21.85.48.1.25.06.63.03.88l-.14.81c-.04.24-.2.93.81.51s5.35-3.15 7.3-5.39C20.68 13.98 22 12.36 22 10.5 22 5.81 17.52 2 12 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}
