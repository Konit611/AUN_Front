"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost, apiPut, apiDelete, ApiError } from "@/app/lib/api";
import type { AdminArticleCategory } from "@/app/lib/types";

interface Props {
  initial?: AdminArticleCategory;
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-border bg-surface font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors";

export default function ArticleCategoryForm({ initial }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [label, setLabel] = useState(initial?.label ?? "");
  const [position, setPosition] = useState<string>(
    initial?.position?.toString() ?? "0"
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      slug: slug.trim(),
      label: label.trim(),
      position: parseInt(position, 10) || 0,
    };

    try {
      if (isEdit && initial) {
        await apiPut<AdminArticleCategory>(
          `/admin/article-categories/${initial.id}`,
          payload
        );
      } else {
        await apiPost<AdminArticleCategory>("/admin/article-categories", payload);
      }
      router.push("/admin/articles/categories");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? `保存に失敗しました (${err.status})`
          : "保存に失敗しました"
      );
      setSubmitting(false);
    }
  }

  async function onDelete() {
    if (!initial) return;
    if (!confirm(`カテゴリ「${initial.label}」を削除しますか？`)) return;
    setSubmitting(true);
    try {
      await apiDelete(`/admin/article-categories/${initial.id}`);
      router.push("/admin/articles/categories");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? `削除に失敗しました (${err.status}): ${err.message}`
          : "削除に失敗しました"
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-xl">
      <Field label="slug (URL用)" required>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          maxLength={40}
          pattern="^[a-z0-9-]+$"
          placeholder="brewery"
          disabled={isEdit}
          className={`${inputCls} ${isEdit ? "opacity-60" : ""}`}
        />
      </Field>

      <Field label="ラベル (表示名)" required>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
          maxLength={60}
          placeholder="蔵元の物語"
          className={inputCls}
        />
      </Field>

      <Field label="表示順">
        <input
          type="number"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className={inputCls}
        />
      </Field>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 font-body text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
        {isEdit ? (
          <button
            type="button"
            onClick={onDelete}
            disabled={submitting}
            className="px-4 py-2.5 rounded-full font-body font-medium text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
          >
            削除
          </button>
        ) : (
          <span />
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/articles/categories")}
            disabled={submitting}
            className="px-5 py-2.5 rounded-full border border-border font-body font-medium text-sm text-text-secondary hover:border-accent hover:text-accent disabled:opacity-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover disabled:opacity-50 transition-colors"
          >
            {submitting ? "保存中..." : isEdit ? "更新" : "作成"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body font-medium text-xs text-text-secondary tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
