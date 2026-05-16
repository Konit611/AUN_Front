"use client";

import { useEffect, useRef, useState } from "react";

interface ImageUploaderProps {
  url: string | null;
  pendingFile: File | null;
  onPick: (file: File) => void;
  onRemove: () => void;
  aspect?: "square" | "video" | "photo";
}

const ASPECT_CLS: Record<NonNullable<ImageUploaderProps["aspect"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  photo: "aspect-[4/3]",
};

export default function ImageUploader({
  url,
  pendingFile,
  onPick,
  onRemove,
  aspect = "photo",
}: ImageUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingFile) {
      setBlobUrl(null);
      return;
    }
    const u = URL.createObjectURL(pendingFile);
    setBlobUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [pendingFile]);

  const displayUrl = blobUrl ?? url;

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) onPick(file);
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-xl mx-auto">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {displayUrl ? (
        <div className="flex flex-col gap-2">
          <div
            className={`w-full ${ASPECT_CLS[aspect]} rounded-2xl overflow-hidden bg-surface-raised border border-border`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayUrl}
              alt="プレビュー"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded-full border border-border font-body text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
            >
              変更
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="px-4 py-2 rounded-full font-body text-sm text-text-muted hover:text-red-600 transition-colors"
            >
              削除
            </button>
            {pendingFile && (
              <span className="font-body text-xs text-text-muted">
                保存時にアップロードされます
              </span>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={`w-full ${ASPECT_CLS[aspect]} rounded-2xl border-2 border-dashed border-border bg-surface/40 flex flex-col items-center justify-center gap-2 hover:border-accent hover:bg-surface transition-colors`}
        >
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-secondary"
            aria-hidden="true"
          >
            <rect x="1" y="3" width="22" height="18" rx="3" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17" cy="7" r="1" fill="currentColor" />
          </svg>
          <span className="font-body text-sm text-text-secondary">
            写真を選択
          </span>
        </button>
      )}
    </div>
  );
}
