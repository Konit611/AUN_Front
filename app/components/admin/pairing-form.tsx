"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, apiPost, apiPut, apiDelete, ApiError } from "@/app/lib/api";
import type {
  AdminPairingCategory,
  AdminPairingItem,
  AdminPairingItemInput,
  AdminSakeListItem,
  AdminRecipe,
} from "@/app/lib/types";

interface Props {
  initial?: AdminPairingItem;
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-border bg-surface font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors";

export default function PairingForm({ initial }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [categoryId, setCategoryId] = useState<number | "">(
    initial?.categoryId ?? ""
  );
  const [sakeId, setSakeId] = useState(initial?.sakeId ?? "");
  const [recipeId, setRecipeId] = useState(initial?.recipeId ?? "");
  const [temperature, setTemperature] = useState(initial?.temperature ?? "");
  const [season, setSeason] = useState(initial?.season ?? "通年");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [whyItWorks, setWhyItWorks] = useState(initial?.whyItWorks ?? "");
  const [howToEnjoy, setHowToEnjoy] = useState(initial?.howToEnjoy ?? "");
  const [heroImage, setHeroImage] = useState(initial?.heroImage ?? "");
  const [personaCode, setPersonaCode] = useState(initial?.personaCode ?? "");
  const [position, setPosition] = useState<string>(
    initial?.position?.toString() ?? "0"
  );

  const [categories, setCategories] = useState<AdminPairingCategory[]>([]);
  const [sakes, setSakes] = useState<AdminSakeListItem[]>([]);
  const [recipes, setRecipes] = useState<AdminRecipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiFetch<AdminPairingCategory[]>("/admin/pairing-categories").then(
      setCategories
    );
    apiFetch<AdminSakeListItem[]>("/admin/sakes").then(setSakes);
    apiFetch<AdminRecipe[]>("/admin/recipes").then(setRecipes);
  }, []);

  const selectedSake = useMemo(
    () => sakes.find((s) => s.id === sakeId),
    [sakes, sakeId]
  );
  const selectedRecipe = useMemo(
    () => recipes.find((r) => r.id === recipeId),
    [recipes, recipeId]
  );

  // Auto-fill temperature from sake when selected (if not already set)
  useEffect(() => {
    if (!isEdit && selectedSake && !temperature) {
      // Sake list endpoint doesn't include serving_temperature; user can fill.
    }
  }, [selectedSake, isEdit, temperature]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (categoryId === "" || !sakeId || !recipeId) {
      setError("カテゴリ、日本酒、料理を全て選択してください");
      setSubmitting(false);
      return;
    }

    const payload: AdminPairingItemInput = {
      category_id: Number(categoryId),
      sake_id: sakeId,
      recipe_id: recipeId,
      temperature: temperature.trim(),
      season: season.trim(),
      description: description.trim(),
      body: body.trim(),
      why_it_works: whyItWorks.trim(),
      how_to_enjoy: howToEnjoy.trim(),
      hero_image: heroImage.trim() || null,
      persona_code: personaCode.trim() || null,
      position: parseInt(position, 10) || 0,
    };

    try {
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
          ? `保存に失敗しました (${err.status})`
          : "保存に失敗しました"
      );
      setSubmitting(false);
    }
  }

  async function onDelete() {
    if (!initial) return;
    if (
      !confirm(
        `「${initial.recipeName} × ${initial.sakeName}」のペアリング記事を削除しますか？`
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
          : "削除に失敗しました"
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <Section title="参照する日本酒・料理">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Field label="日本酒" required>
            <select
              value={sakeId}
              onChange={(e) => setSakeId(e.target.value)}
              required
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
          <Field label="料理" required>
            <select
              value={recipeId}
              onChange={(e) => setRecipeId(e.target.value)}
              required
              className={inputCls}
            >
              <option value="">— 選択 —</option>
              {recipes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.emoji} {r.name}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {(selectedSake || selectedRecipe) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {selectedSake && <SakePreview sake={selectedSake} />}
            {selectedRecipe && <RecipePreview recipe={selectedRecipe} />}
          </div>
        )}
      </Section>

      <Section title="このペアリング限定">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="温度 (このペアリング推奨)" required>
            <input
              type="text"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              required
              placeholder="冷酒 5-10°C"
              className={inputCls}
            />
          </Field>
          <Field label="季節" required>
            <input
              type="text"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              required
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
      </Section>

      <Section title="ナラティブ (ブログ本文)">
        <Field label="サマリー (リスト用 1〜2 文)" required>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={2}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="導入文" required>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={5}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="なぜ合うのか" required>
          <textarea
            value={whyItWorks}
            onChange={(e) => setWhyItWorks(e.target.value)}
            required
            rows={5}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="楽しみ方" required>
          <textarea
            value={howToEnjoy}
            onChange={(e) => setHowToEnjoy(e.target.value)}
            required
            rows={5}
            className={`${inputCls} resize-y`}
          />
        </Field>
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
            onClick={() => router.push("/admin/pairing")}
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

function RecipePreview({ recipe }: { recipe: AdminRecipe }) {
  const axes = [
    ["甘", recipe.sweetness],
    ["旨", recipe.umami],
    ["酸", recipe.acidity],
    ["脂", recipe.fat],
    ["香", recipe.aroma],
    ["塩", recipe.saltiness],
  ] as const;
  return (
    <div className="bg-surface-raised/40 border border-border rounded-xl p-4 flex gap-3">
      <div className="w-14 h-14 shrink-0 rounded-lg bg-surface flex items-center justify-center text-2xl">
        {recipe.emoji}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
          料理
        </span>
        <span className="font-display font-bold text-base text-accent truncate">
          {recipe.name}
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
