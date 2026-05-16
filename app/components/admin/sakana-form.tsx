"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost, apiPut, apiDelete, ApiError } from "@/app/lib/api";
import { uploadAdminImage } from "@/app/lib/admin-upload";
import type { AdminSakana, AdminSakanaInput } from "@/app/lib/types";
import Stepper from "./stepper";
import ImageUploader from "./image-uploader";

interface Props {
  initial?: AdminSakana;
}

const AXES = [
  { key: "sweetness", label: "甘味" },
  { key: "umami", label: "旨味" },
  { key: "acidity", label: "酸味" },
  { key: "fat", label: "脂" },
  { key: "aroma", label: "香り" },
  { key: "saltiness", label: "塩味" },
] as const;

type AxisKey = (typeof AXES)[number]["key"];

const DIFFICULTY_OPTIONS = [
  { value: "", label: "（未設定）" },
  { value: "easy", label: "易しい" },
  { value: "medium", label: "ふつう" },
  { value: "hard", label: "難しい" },
];

const STEPS = [
  { num: 1, label: "基本情報" },
  { num: 2, label: "味わい" },
  { num: 3, label: "作り方" },
] as const;

export default function SakanaForm({ initial }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [name, setName] = useState(initial?.name ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imagePlaceholder, setImagePlaceholder] = useState(
    initial?.imagePlaceholder ?? "",
  );
  const [foodImageUrl, setFoodImageUrl] = useState(initial?.foodImageUrl ?? "");
  const [pendingFoodImage, setPendingFoodImage] = useState<File | null>(null);
  const [axes, setAxes] = useState<Record<AxisKey, number>>(() => ({
    sweetness: initial?.sweetness ?? 0.5,
    umami: initial?.umami ?? 0.5,
    acidity: initial?.acidity ?? 0.3,
    fat: initial?.fat ?? 0.3,
    aroma: initial?.aroma ?? 0.4,
    saltiness: initial?.saltiness ?? 0.3,
  }));
  const [ingredients, setIngredients] = useState(
    initial?.ingredients?.length
      ? initial.ingredients
      : [{ name: "", amount: "" }],
  );
  const [steps, setSteps] = useState<string[]>(
    initial?.steps?.length ? initial.steps : [""],
  );
  const [prepTimeMin, setPrepTimeMin] = useState<string>(
    initial?.prepTimeMin?.toString() ?? "",
  );
  const [cookTimeMin, setCookTimeMin] = useState<string>(
    initial?.cookTimeMin?.toString() ?? "",
  );
  const [servings, setServings] = useState<string>(
    initial?.servings?.toString() ?? "",
  );
  const [difficulty, setDifficulty] = useState(initial?.difficulty ?? "");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function intOrNull(s: string): number | null {
    if (!s.trim()) return null;
    const n = parseInt(s, 10);
    return Number.isFinite(n) ? n : null;
  }

  function step1Valid() {
    return Boolean(name.trim());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!step1Valid()) {
      setStep(1);
      setError("料理名は必須です");
      return;
    }

    setSubmitting(true);

    const cleanIngredients = ingredients
      .map((i) => ({ name: i.name.trim(), amount: i.amount.trim() }))
      .filter((i) => i.name && i.amount);
    const cleanSteps = steps.map((s) => s.trim()).filter(Boolean);

    let finalFoodImageUrl: string | null = foodImageUrl.trim() || null;
    try {
      if (pendingFoodImage) {
        finalFoodImageUrl = await uploadAdminImage(pendingFoodImage, "sakana");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? `画像アップロードに失敗しました: ${err.message}`
          : "画像アップロードに失敗しました",
      );
      setSubmitting(false);
      return;
    }

    const body: AdminSakanaInput = {
      name: name.trim(),
      emoji: emoji.trim(),
      description: description.trim() || null,
      image_placeholder: imagePlaceholder.trim() || null,
      food_image_url: finalFoodImageUrl,
      ...axes,
      ingredients: cleanIngredients.length > 0 ? cleanIngredients : null,
      steps: cleanSteps.length > 0 ? cleanSteps : null,
      prep_time_min: intOrNull(prepTimeMin),
      cook_time_min: intOrNull(cookTimeMin),
      servings: intOrNull(servings),
      difficulty: difficulty || null,
    };

    try {
      if (isEdit && initial) {
        await apiPut<AdminSakana>(`/admin/sakana/${initial.id}`, body);
      } else {
        await apiPost<AdminSakana>("/admin/sakana", body);
      }
      router.push("/admin/sakana");
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

  async function onDelete() {
    if (!initial) return;
    if (!confirm(`「${initial.name}」を削除しますか？`)) return;
    setSubmitting(true);
    try {
      await apiDelete(`/admin/sakana/${initial.id}`);
      router.push("/admin/sakana");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? `削除に失敗しました (${err.status}): ${err.message}`
          : "削除に失敗しました",
      );
      setSubmitting(false);
    }
  }

  function goNext() {
    if (step === 1 && !step1Valid()) {
      setError("料理名を入力してください");
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
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <Stepper
        steps={STEPS}
        current={step}
        onJump={(n) => setStep(n as 1 | 2 | 3)}
      />

      {step === 1 && (
        <Section title="基本情報">
          <Field label="料理名" required>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="絵文字 (画像がない時のフォールバック)">
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={10}
                placeholder="🍢"
                className={`${inputCls} text-2xl`}
              />
            </Field>
            <Field label="画像プレースホルダー (内部キー)">
              <input
                type="text"
                value={imagePlaceholder}
                onChange={(e) => setImagePlaceholder(e.target.value)}
                placeholder="yakitori"
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="写真">
            <ImageUploader
              url={foodImageUrl || null}
              pendingFile={pendingFoodImage}
              onPick={setPendingFoodImage}
              onRemove={() => {
                setFoodImageUrl("");
                setPendingFoodImage(null);
              }}
              aspect="photo"
            />
          </Field>
          <Field label="説明 (料理紹介 + 日本酒との相性)">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
              placeholder="例: 薄切りの白身魚を柑橘とオリーブオイルで仕上げる、爽やかな前菜。&#10;&#10;淡麗辛口の純米酒や、香りの華やかな吟醸酒と好相性..."
              className={`${inputCls} resize-y min-h-[240px] leading-relaxed`}
            />
          </Field>
        </Section>
      )}

      {step === 2 && (
        <Section title="味わいプロファイル (0.0–1.0)">
          <p className="font-body text-xs text-text-muted -mt-2">
            6 軸でこの肴の味わいを表します。日本酒のマッチングに使われます。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {AXES.map(({ key, label }) => (
              <AxisSlider
                key={key}
                label={label}
                value={axes[key]}
                onChange={(v) => setAxes((s) => ({ ...s, [key]: v }))}
              />
            ))}
          </div>
        </Section>
      )}

      {step === 3 && (
        <>
          <Section title="材料">
            <div className="flex flex-col gap-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={ing.name}
                    onChange={(e) => {
                      const next = [...ingredients];
                      next[idx] = { ...next[idx], name: e.target.value };
                      setIngredients(next);
                    }}
                    placeholder="鶏もも肉"
                    className={`${inputCls} flex-1`}
                  />
                  <input
                    type="text"
                    value={ing.amount}
                    onChange={(e) => {
                      const next = [...ingredients];
                      next[idx] = { ...next[idx], amount: e.target.value };
                      setIngredients(next);
                    }}
                    placeholder="200g"
                    className={`${inputCls} w-32`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIngredients(ingredients.filter((_, i) => i !== idx))
                    }
                    className="px-2 py-2 text-text-muted hover:text-red-600 transition-colors"
                    aria-label="削除"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setIngredients([...ingredients, { name: "", amount: "" }])
                }
                className="self-start mt-2 px-4 py-2 rounded-full border border-border font-body text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
              >
                + 材料を追加
              </button>
            </div>
          </Section>

          <Section title="作り方">
            <div className="flex flex-col gap-2">
              {steps.map((stepText, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="font-body font-bold text-sm text-accent w-6 mt-3">
                    {idx + 1}
                  </span>
                  <textarea
                    value={stepText}
                    onChange={(e) => {
                      const next = [...steps];
                      next[idx] = e.target.value;
                      setSteps(next);
                    }}
                    rows={2}
                    placeholder="鶏肉を一口大に切る..."
                    className={`${inputCls} flex-1 resize-y`}
                  />
                  <button
                    type="button"
                    onClick={() => setSteps(steps.filter((_, i) => i !== idx))}
                    className="px-2 py-2 mt-1 text-text-muted hover:text-red-600 transition-colors"
                    aria-label="削除"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setSteps([...steps, ""])}
                className="self-start mt-2 px-4 py-2 rounded-full border border-border font-body text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
              >
                + 手順を追加
              </button>
            </div>
          </Section>

          <Section title="メタ情報">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field label="準備 (分)">
                <input
                  type="number"
                  min={0}
                  value={prepTimeMin}
                  onChange={(e) => setPrepTimeMin(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="調理 (分)">
                <input
                  type="number"
                  min={0}
                  value={cookTimeMin}
                  onChange={(e) => setCookTimeMin(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="人数">
                <input
                  type="number"
                  min={1}
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="難易度">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className={inputCls}
                >
                  {DIFFICULTY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>
        </>
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
            onClick={() => router.push("/admin/sakana")}
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
              {submitting ? "保存中..." : isEdit ? "更新" : "作成"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-border bg-surface font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors";

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

function AxisSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-body font-medium text-xs text-text-secondary">
          {label}
        </span>
        <span className="font-body text-xs text-accent tabular-nums">
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-accent"
      />
    </div>
  );
}
