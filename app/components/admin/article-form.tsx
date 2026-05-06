"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PartialBlock } from "@blocknote/core";
import { apiFetch, apiPost, apiPut, apiDelete, ApiError } from "@/app/lib/api";
import type {
  AdminArticle,
  AdminArticleBlock,
  AdminArticleCategory,
  AdminArticleInput,
} from "@/app/lib/types";
import RichEditor, { type RichEditorHandle } from "./rich-editor";

// Convert legacy paragraph/heading/image/quote blocks into BlockNote PartialBlock[]
// so editing an article authored before BlockNote doesn't drop its body.
function legacyToBlockNote(blocks: AdminArticleBlock[]): PartialBlock[] {
  return blocks.flatMap<PartialBlock>((b) => {
    if (b.type === "paragraph") {
      return [{ type: "paragraph", content: b.text }];
    }
    if (b.type === "heading") {
      return [{ type: "heading", props: { level: 2 }, content: b.text }];
    }
    if (b.type === "image") {
      const blocks: PartialBlock[] = [];
      if (b.image_url) {
        blocks.push({
          type: "image",
          props: { url: b.image_url, caption: b.caption },
        });
      } else {
        blocks.push({
          type: "paragraph",
          content: `${b.emoji} ${b.caption}`,
        });
      }
      return blocks;
    }
    if (b.type === "quote") {
      return [
        { type: "paragraph", content: `「${b.text}」` },
        { type: "paragraph", content: `— ${b.author}` },
      ];
    }
    return [];
  });
}

interface Props {
  initial?: AdminArticle;
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-border bg-surface font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors";

export default function ArticleForm({ initial }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const editorRef = useRef<RichEditorHandle | null>(null);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [categoryId, setCategoryId] = useState<number | "">(
    initial?.categoryId ?? "",
  );
  const [date, setDate] = useState(
    initial?.date ?? new Date().toISOString().slice(0, 10),
  );
  const [readTime, setReadTime] = useState(initial?.readTime ?? "5 min");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "");
  const [heroImageUrl, setHeroImageUrl] = useState(initial?.heroImageUrl ?? "");

  const [categories, setCategories] = useState<AdminArticleCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiFetch<AdminArticleCategory[]>("/admin/article-categories").then(
      setCategories,
    );
  }, []);

  const initialBody: PartialBlock[] | null =
    (initial?.bodyJson as PartialBlock[] | null | undefined) ??
    (initial?.body && initial.body.length > 0
      ? legacyToBlockNote(initial.body)
      : null);

  async function buildPayload(asDraft: boolean): Promise<AdminArticleInput | null> {
    if (categoryId === "") {
      setError("カテゴリを選択してください");
      return null;
    }
    const editor = editorRef.current;
    const bodyJson = editor?.getJSON() ?? null;
    const bodyHtml = editor ? editor.getHTML() : "";

    return {
      slug: slug.trim(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      excerpt: excerpt.trim(),
      category_id: Number(categoryId),
      date,
      read_time: readTime.trim(),
      emoji: emoji.trim(),
      hero_image_url: heroImageUrl.trim() || null,
      body: [],
      body_json: bodyJson,
      body_html: bodyHtml,
      is_draft: asDraft,
    };
  }

  async function save(asDraft: boolean) {
    setError(null);
    setSubmitting(true);
    try {
      const payload = await buildPayload(asDraft);
      if (!payload) {
        setSubmitting(false);
        return;
      }
      if (isEdit && initial) {
        await apiPut<AdminArticle>(`/admin/articles/${initial.slug}`, payload);
      } else {
        await apiPost<AdminArticle>("/admin/articles", payload);
      }
      router.push("/admin/articles");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? `保存に失敗しました (${err.status}${err.message ? ": " + err.message : ""})`
          : "保存に失敗しました",
      );
      setSubmitting(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await save(false);
  }

  async function onSaveDraft() {
    await save(true);
  }

  async function onDelete() {
    if (!initial) return;
    if (!confirm(`「${initial.title}」を削除しますか？`)) return;
    setSubmitting(true);
    try {
      await apiDelete(`/admin/articles/${initial.slug}`);
      router.push("/admin/articles");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? `削除に失敗しました (${err.status})`
          : "削除に失敗しました",
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <Section title="基本情報">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="slug (URL用)" required>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              maxLength={80}
              pattern="^[a-z0-9-]+$"
              placeholder="kubota-brewery-story"
              disabled={isEdit}
              className={`${inputCls} ${isEdit ? "opacity-60" : ""}`}
            />
          </Field>
          <Field label="絵文字">
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              maxLength={10}
              placeholder="🏯"
              className={`${inputCls} text-2xl w-24`}
            />
          </Field>
          <Field label="タイトル" required>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={120}
              className={inputCls}
            />
          </Field>
          <Field label="サブタイトル">
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="カテゴリ" required>
            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
              className={inputCls}
            >
              <option value="">— 選択 —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} ({c.slug})
                </option>
              ))}
            </select>
          </Field>
          <Field label="日付" required>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={inputCls}
            />
          </Field>
          <Field label="読了時間 (例: 8 min)">
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              maxLength={20}
              className={inputCls}
            />
          </Field>
          <Field label="ヒーロー画像URL">
            <input
              type="url"
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              placeholder="https://..."
              className={inputCls}
            />
          </Field>
        </div>
        <Field label="抜粋 (一覧表示用 1〜2 文)">
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className={`${inputCls} resize-y`}
          />
        </Field>
      </Section>

      <Section title="本文">
        <RichEditor
          ref={editorRef}
          initialContent={initialBody}
          uploadPrefix="articles"
        />
      </Section>

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
            onClick={() => router.push("/admin/articles")}
            disabled={submitting}
            className="px-5 py-2.5 rounded-full border border-border font-body font-medium text-sm text-text-secondary hover:border-accent hover:text-accent disabled:opacity-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={submitting}
            className="px-5 py-2.5 rounded-full border border-accent font-body font-medium text-sm text-accent hover:bg-accent/5 disabled:opacity-50 transition-colors"
          >
            下書き保存
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover disabled:opacity-50 transition-colors"
          >
            {submitting ? "保存中..." : isEdit ? "公開更新" : "公開"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display font-bold text-lg text-accent">{title}</h2>
      {children}
    </section>
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
