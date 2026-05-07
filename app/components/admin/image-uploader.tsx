"use client";

import { useRef, useState } from "react";
import { uploadAdminImage } from "@/app/lib/admin-upload";

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  prefix: string;
  aspect?: "square" | "video" | "photo";
}

const ASPECT_CLS: Record<NonNullable<ImageUploaderProps["aspect"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  photo: "aspect-[4/3]",
};

export default function ImageUploader({
  value,
  onChange,
  prefix,
  aspect = "photo",
}: ImageUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadAdminImage(file, prefix);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "アップロードに失敗しました");
    } finally {
      setUploading(false);
    }
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
      {value ? (
        <div className="flex flex-col gap-2">
          <div
            className={`w-full ${ASPECT_CLS[aspect]} rounded-2xl overflow-hidden bg-surface-raised border border-border`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 rounded-full border border-border font-body text-sm text-text-secondary hover:border-accent hover:text-accent disabled:opacity-50 transition-colors"
            >
              {uploading ? "アップロード中..." : "変更"}
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              disabled={uploading}
              className="px-4 py-2 rounded-full font-body text-sm text-text-muted hover:text-red-600 disabled:opacity-50 transition-colors"
            >
              削除
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className={`w-full ${ASPECT_CLS[aspect]} rounded-2xl border-2 border-dashed border-border bg-surface/40 flex flex-col items-center justify-center gap-2 hover:border-accent hover:bg-surface transition-colors disabled:opacity-50`}
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
            {uploading ? "アップロード中..." : "写真を選択"}
          </span>
        </button>
      )}
      {error && (
        <p className="font-body text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
