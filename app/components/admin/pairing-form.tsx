"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PartialBlock } from "@blocknote/core";
import { apiFetch, apiPost, apiPut, apiDelete, ApiError } from "@/app/lib/api";
import type {
  AdminPairingCategory,
  AdminPairingItem,
  AdminPairingItemInput,
  AdminSakeListItem,
  AdminSakana,
} from "@/app/lib/types";
import RichEditor, { type RichEditorHandle } from "./rich-editor";
import PreviewModal from "./preview-modal";

// Stitch old (body / why_it_works / how_to_enjoy) into a BlockNote document so
// pairings authored before the wizard keep their narrative when re-edited.
function legacyToBlockNote(item: AdminPairingItem): PartialBlock[] | null {
  const parts: PartialBlock[] = [];
  if (item.body) parts.push({ type: "paragraph", content: item.body });
  if (item.whyItWorks) {
    parts.push({ type: "heading", props: { level: 2 }, content: "なぜ合うのか" });
    parts.push({ type: "paragraph", content: item.whyItWorks });
  }
  if (item.howToEnjoy) {
    parts.push({ type: "heading", props: { level: 2 }, content: "楽しみ方" });
    parts.push({ type: "paragraph", content: item.howToEnjoy });
  }
  return parts.length > 0 ? parts : null;
}

interface Props {
  initial?: AdminPairingItem;
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-border bg-surface font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors";

const STEPS = [
  { num: 1, label: "参照" },
  { num: 2, label: "メタ" },
  { num: 3, label: "本文" },
] as const;

export default function PairingForm({ initial }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const editorRef = useRef<RichEditorHandle | null>(null);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [categoryId, setCategoryId] = useState<number | "">(
    initial?.categoryId ?? "",
  );
  const [sakeId, setSakeId] = useState(initial?.sakeId ?? "");
  const [sakanaId, setSakanaId] = useState(initial?.sakanaId ?? "");
  const [temperature, setTemperature] = useState(initial?.temperature ?? "");
  const [season, setSeason] = useState(initial?.season ?? "通年");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [heroImage, setHeroImage] = useState(initial?.heroImage ?? "");
  const [personaCode, setPersonaCode] = useState(initial?.personaCode ?? "");
  const [position, setPosition] = useState<string>(
    initial?.position?.toString() ?? "0",
  );

  const [categories, setCategories] = useState<AdminPairingCategory[]>([]);
  const [sakes, setSakes] = useState<AdminSakeListItem[]>([]);
  const [sakanas, setSakanas] = useState<AdminSakana[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");

  useEffect(() => {
    apiFetch<AdminPairingCategory[]>("/admin/pairing-categories").then(
      setCategories,
    );
    apiFetch<AdminSakeListItem[]>("/admin/sakes").then(setSakes);
    apiFetch<AdminSakana[]>("/admin/sakana").then(setSakanas);
  }, []);

  const selectedSake = useMemo(
    () => sakes.find((s) => s.id === sakeId),
    [sakes, sakeId],
  );
  const selectedSakana = useMemo(
    () => sakanas.find((s) => s.id === sakanaId),
    [sakanas, sakanaId],
  );

  const initialBody: PartialBlock[] | null =
    (initial?.bodyJson as PartialBlock[] | null | undefined) ??
    (initial ? legacyToBlockNote(initial) : null);

  function step1Valid() {
    return categoryId !== "" && sakeId && sakanaId;
  }

  async function buildPayload(asDraft: boolean): Promise<AdminPairingItemInput | null> {
    if (categoryId === "") {
      setError("カテゴリは必須です（下書きでもカテゴリは必要）");
      return null;
    }
    if (!asDraft && !step1Valid()) {
      setError("公開には日本酒・肴の選択が必須です");
      return null;
    }
    const editor = editorRef.current;
    const bodyJson = editor?.getJSON() ?? null;
    const bodyHtml = editor ? editor.getHTML() : "";

    return {
      category_id: Number(categoryId),
      sake_id: sakeId,
      sakana_id: sakanaId,
      temperature: temperature.trim(),
      season: season.trim(),
      description: description.trim(),
      body: null,
      why_it_works: null,
      how_to_enjoy: null,
      body_json: bodyJson,
      body_html: bodyHtml,
      is_draft: asDraft,
      hero_image: heroImage.trim() || null,
      persona_code: personaCode.trim() || null,
      position: parseInt(position, 10) || 0,
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
        await apiPut<AdminPairingItem>(`/admin/pairings/${initial.id}`, payload);
      } else {
        await apiPost<AdminPairingItem>("/admin/pairings", payload);
      }
      router.push("/admin/pairing");
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

  async function onPublish(e: React.FormEvent) {
    e.preventDefault();
    await save(false);
  }

  async function onSaveDraft() {
    await save(true);
  }

  function onPreview() {
    setPreviewHtml(editorRef.current?.getHTML() ?? "");
    setPreviewOpen(true);
  }

  async function onDelete() {
    if (!initial) return;
    if (
      !confirm(
        `「${initial.sakanaName} × ${initial.sakeName}」のペアリング記事を削除しますか？`,
      )
    )
      return;
    setSubmitting(true);
    try {
      await apiDelete(`/admin/pairings/${initial.id}`);
      router.push("/admin/pairing");
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

  function goNext() {
    if (step === 1 && !step1Valid()) {
      setError("カテゴリ・日本酒・肴をすべて選択してください");
      return;
    }
    setError(null);
    setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
  }

  function goPrev() {
    setError(null);
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));
  }

  return (
    <form onSubmit={onPublish} className="flex flex-col gap-8">
      <Stepper current={step} onJump={(n) => setStep(n)} />

      {step === 1 && (
        <Section title="参照する日本酒・肴">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="カテゴリ" required>
              <select
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
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
            <Field label="日本酒" required>
              <select
                value={sakeId}
                onChange={(e) => setSakeId(e.target.value)}
                className={inputCls}
              >
                <option value="">— 選択 —</option>
                {sakes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.brewery}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="肴" required>
              <select
                value={sakanaId}
                onChange={(e) => setSakanaId(e.target.value)}
                className={inputCls}
              >
                <option value="">— 選択 —</option>
                {sakanas.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.emoji} {s.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {(selectedSake || selectedSakana) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {selectedSake && <SakePreview sake={selectedSake} />}
              {selectedSakana && <SakanaPreview sakana={selectedSakana} />}
            </div>
          )}
        </Section>
      )}

      {step === 2 && (
        <Section title="このペアリング限定">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="温度">
              <input
                type="text"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="冷酒 5-10°C"
                className={inputCls}
              />
            </Field>
            <Field label="季節">
              <input
                type="text"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                placeholder="通年"
                className={inputCls}
              />
            </Field>
            <Field label="メイン画像URL">
              <input
                type="url"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="https://..."
                className={inputCls}
              />
            </Field>
            <Field label="ペルソナコード (任意)">
              <input
                type="text"
                value={personaCode}
                onChange={(e) => setPersonaCode(e.target.value)}
                placeholder="SHRB"
                maxLength={4}
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
          </div>
          <Field label="サマリー (リスト用 1〜2 文)">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className={`${inputCls} resize-y`}
            />
          </Field>
        </Section>
      )}

      {step === 3 && (
        <Section title="本文">
          <RichEditor
            ref={editorRef}
            initialContent={initialBody}
            uploadPrefix="pairings"
          />
        </Section>
      )}

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
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={() => router.push("/admin/pairing")}
            disabled={submitting}
            className="px-5 py-2.5 rounded-full border border-border font-body font-medium text-sm text-text-secondary hover:border-accent hover:text-accent disabled:opacity-50 transition-colors"
          >
            キャンセル
          </button>
          {step > 1 && (
            <button
              type="button"
              onClick={goPrev}
              disabled={submitting}
              className="px-5 py-2.5 rounded-full border border-border font-body font-medium text-sm text-text-secondary hover:border-accent hover:text-accent disabled:opacity-50 transition-colors"
            >
              前へ
            </button>
          )}
          <button
            type="button"
            onClick={onPreview}
            disabled={submitting}
            className="px-5 py-2.5 rounded-full border border-border font-body font-medium text-sm text-text-secondary hover:border-accent hover:text-accent disabled:opacity-50 transition-colors"
          >
            プレビュー
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={submitting}
            className="px-5 py-2.5 rounded-full border border-accent font-body font-medium text-sm text-accent hover:bg-accent/5 disabled:opacity-50 transition-colors"
          >
            下書き保存
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={submitting}
              className="px-6 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              次へ
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              {submitting ? "保存中..." : isEdit ? "公開更新" : "公開"}
            </button>
          )}
        </div>
      </div>

      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="ペアリングプレビュー"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {season && (
              <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
                {season}
              </span>
            )}
            {temperature && (
              <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
                {temperature}
              </span>
            )}
          </div>
          <h1 className="font-display font-bold text-2xl md:text-4xl text-accent leading-tight">
            {selectedSakana
              ? `${selectedSakana.emoji} ${selectedSakana.name}`
              : "(肴未選択)"}
          </h1>
          <p className="font-body font-medium text-base md:text-lg text-text-secondary">
            × {selectedSake?.name ?? "(日本酒未選択)"}
            {selectedSake && (
              <span className="text-text-muted font-normal">
                {" "}
                / {selectedSake.brewery} · {selectedSake.type}
              </span>
            )}
          </p>
          {description && (
            <p className="font-body text-sm text-text-muted italic border-l-2 border-border pl-4">
              {description}
            </p>
          )}
          {previewHtml ? (
            <div
              className="prose-body"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : (
            <p className="font-body text-sm text-text-muted">
              本文がまだ書かれていません。
            </p>
          )}
        </div>
      </PreviewModal>
    </form>
  );
}

function Stepper({
  current,
  onJump,
}: {
  current: 1 | 2 | 3;
  onJump: (n: 1 | 2 | 3) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((s, i) => {
        const active = s.num === current;
        const done = s.num < current;
        return (
          <div key={s.num} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onJump(s.num as 1 | 2 | 3)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-body text-xs font-bold tracking-wider transition-colors ${
                active
                  ? "bg-accent text-white"
                  : done
                    ? "bg-accent/15 text-accent hover:bg-accent/25"
                    : "bg-surface-raised text-text-muted hover:bg-surface-raised/80"
              }`}
            >
              <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-white/20 text-[10px]">
                {s.num}
              </span>
              {s.label}
            </button>
            {i < STEPS.length - 1 && (
              <span className="w-6 h-px bg-border" aria-hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SakePreview({ sake }: { sake: AdminSakeListItem }) {
  return (
    <div className="bg-surface-raised/40 border border-border rounded-xl p-4 flex gap-3">
      <div className="w-14 h-14 shrink-0 rounded-lg bg-surface flex items-center justify-center text-2xl">
        🍶
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
          日本酒
        </span>
        <span className="font-display font-bold text-base text-accent truncate">
          {sake.name}
        </span>
        <span className="font-body text-xs text-text-secondary truncate">
          {sake.brewery} / {sake.type}
        </span>
      </div>
    </div>
  );
}

function SakanaPreview({ sakana }: { sakana: AdminSakana }) {
  const axes = [
    ["甘", sakana.sweetness],
    ["旨", sakana.umami],
    ["酸", sakana.acidity],
    ["脂", sakana.fat],
    ["香", sakana.aroma],
    ["塩", sakana.saltiness],
  ] as const;
  return (
    <div className="bg-surface-raised/40 border border-border rounded-xl p-4 flex gap-3">
      <div className="w-14 h-14 shrink-0 rounded-lg bg-surface flex items-center justify-center text-2xl">
        {sakana.emoji}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
          肴
        </span>
        <span className="font-display font-bold text-base text-accent truncate">
          {sakana.name}
        </span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {axes.map(([k, v]) => (
            <span
              key={k}
              className="font-body text-[10px] text-text-muted tabular-nums"
            >
              {k} {v.toFixed(1)}
            </span>
          ))}
        </div>
      </div>
    </div>
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
