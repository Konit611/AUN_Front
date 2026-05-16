"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, apiPost, apiPut, apiDelete, ApiError } from "@/app/lib/api";
import type {
  AdminSake,
  AdminSakeInput,
  AdminFlavorMeta,
  AdminSakanaMeta,
} from "@/app/lib/types";
import ImageUploader from "./image-uploader";
import Stepper from "./stepper";

interface Props {
  initial?: AdminSake;
}

const AXES = [
  { key: "sweetness", label: "甘味" },
  { key: "umami", label: "旨味" },
  { key: "acidity", label: "酸味" },
  { key: "bitterness", label: "苦味" },
  { key: "aroma", label: "香り" },
] as const;

type AxisKey = (typeof AXES)[number]["key"];

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-border bg-surface font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors";

const STEPS = [
  { num: 1, label: "基本情報" },
  { num: 2, label: "説明" },
  { num: 3, label: "味わい" },
  { num: 4, label: "ペアリング" },
] as const;

type StepNum = 1 | 2 | 3 | 4;

interface FlavorRow {
  flavor_id: string;
  is_primary: boolean;
}
interface PairingRow {
  sakana_id: string;
  description: string;
}

export default function SakeForm({ initial }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [step, setStep] = useState<StepNum>(1);

  const [id, setId] = useState(initial?.id ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [brewery, setBrewery] = useState(initial?.brewery ?? "");
  const [region, setRegion] = useState(initial?.region ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [type, setType] = useState(initial?.type ?? "");
  const [rice, setRice] = useState(initial?.rice ?? "");
  const [polishing, setPolishing] = useState(initial?.polishing ?? "");
  const [servingTemperature, setServingTemperature] = useState(
    initial?.servingTemperature ?? "",
  );
  const [servingSeason, setServingSeason] = useState(initial?.servingSeason ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [amazonUrl, setAmazonUrl] = useState(initial?.amazonUrl ?? "");
  const [rakutenUrl, setRakutenUrl] = useState(initial?.rakutenUrl ?? "");

  const [axes, setAxes] = useState<Record<AxisKey, number>>(() => ({
    sweetness: initial?.sweetness ?? 0.5,
    umami: initial?.umami ?? 0.5,
    acidity: initial?.acidity ?? 0.5,
    bitterness: initial?.bitterness ?? 0.3,
    aroma: initial?.aroma ?? 0.5,
  }));

  const [flavorRows, setFlavorRows] = useState<FlavorRow[]>(
    initial?.flavors.map((f) => ({
      flavor_id: f.flavorId,
      is_primary: f.isPrimary,
    })) ?? [],
  );
  const [pairingRows, setPairingRows] = useState<PairingRow[]>(
    initial?.pairings.map((p) => ({
      sakana_id: p.sakanaId,
      description: p.description,
    })) ?? [],
  );

  const [flavorMeta, setFlavorMeta] = useState<AdminFlavorMeta[]>([]);
  const [sakanaMeta, setSakanaMeta] = useState<AdminSakanaMeta[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiFetch<AdminFlavorMeta[]>("/admin/sakes/_meta/flavors").then(setFlavorMeta);
    apiFetch<AdminSakanaMeta[]>("/admin/sakes/_meta/sakana").then(setSakanaMeta);
  }, []);

  function step1Valid(): boolean {
    if (!isEdit && !id.trim()) return false;
    return Boolean(
      name.trim() &&
        brewery.trim() &&
        region.trim() &&
        type.trim() &&
        rice.trim() &&
        polishing.trim() &&
        servingTemperature.trim() &&
        servingSeason.trim(),
    );
  }

  function step2Valid(): boolean {
    return Boolean(description.trim());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!step1Valid()) {
      setStep(1);
      setError("基本情報の必須項目をすべて入力してください");
      return;
    }
    if (!step2Valid()) {
      setStep(2);
      setError("説明を入力してください");
      return;
    }

    setSubmitting(true);

    const cleanFlavors = flavorRows.filter((f) => f.flavor_id);
    const cleanPairings = pairingRows
      .filter((p) => p.sakana_id && p.description.trim())
      .map((p, i) => ({
        sakana_id: p.sakana_id,
        description: p.description.trim(),
        position: i,
      }));

    const baseBody: Omit<AdminSakeInput, "id"> = {
      name: name.trim(),
      brewery: brewery.trim(),
      region: region.trim(),
      description: description.trim(),
      type: type.trim(),
      rice: rice.trim(),
      polishing: polishing.trim(),
      serving_temperature: servingTemperature.trim(),
      serving_season: servingSeason.trim(),
      ...axes,
      image_url: imageUrl.trim() || null,
      amazon_url: amazonUrl.trim() || null,
      rakuten_url: rakutenUrl.trim() || null,
      flavors: cleanFlavors,
      pairings: cleanPairings,
    };

    try {
      if (isEdit && initial) {
        await apiPut<AdminSake>(`/admin/sakes/${initial.id}`, baseBody);
      } else {
        await apiPost<AdminSake>("/admin/sakes", { ...baseBody, id: id.trim() });
      }
      router.push("/admin/sake");
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
    if (
      !confirm(`「${initial.name}」を削除しますか？ペアリングも全て削除されます。`)
    )
      return;
    setSubmitting(true);
    try {
      await apiDelete(`/admin/sakes/${initial.id}`);
      router.push("/admin/sake");
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
      setError("基本情報の必須項目をすべて入力してください");
      return;
    }
    if (step === 2 && !step2Valid()) {
      setError("説明を入力してください");
      return;
    }
    setError(null);
    setStep((s) => (s < 4 ? ((s + 1) as StepNum) : s));
  }

  function goPrev() {
    setError(null);
    setStep((s) => (s > 1 ? ((s - 1) as StepNum) : s));
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <Stepper
        steps={STEPS}
        current={step}
        onJump={(n) => setStep(n as StepNum)}
      />

      {step === 1 && (
        <Section title="基本情報">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="銘柄" required>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                className={inputCls}
              />
            </Field>
            <Field label="ID (URL用スラッグ)" required>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                disabled={isEdit}
                maxLength={50}
                pattern="^[a-z0-9\-]+$"
                placeholder="dassai-45"
                className={`${inputCls} ${isEdit ? "opacity-60" : ""}`}
              />
            </Field>
            <Field label="蔵元" required>
              <input
                type="text"
                value={brewery}
                onChange={(e) => setBrewery(e.target.value)}
                required
                className={inputCls}
              />
            </Field>
            <Field label="地域" required>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                className={inputCls}
              />
            </Field>
            <Field label="種類" required>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                placeholder="純米大吟醸"
                className={inputCls}
              />
            </Field>
            <Field label="米" required>
              <input
                type="text"
                value={rice}
                onChange={(e) => setRice(e.target.value)}
                required
                placeholder="山田錦"
                className={inputCls}
              />
            </Field>
            <Field label="精米歩合" required>
              <input
                type="text"
                value={polishing}
                onChange={(e) => setPolishing(e.target.value)}
                required
                placeholder="45%"
                className={inputCls}
              />
            </Field>
            <Field label="提供温度" required>
              <input
                type="text"
                value={servingTemperature}
                onChange={(e) => setServingTemperature(e.target.value)}
                required
                placeholder="冷酒 5-10°C"
                className={inputCls}
              />
            </Field>
            <Field label="季節" required>
              <input
                type="text"
                value={servingSeason}
                onChange={(e) => setServingSeason(e.target.value)}
                required
                placeholder="通年"
                className={inputCls}
              />
            </Field>
            <Field label="Amazonリンク (任意)">
              <input
                type="url"
                value={amazonUrl}
                onChange={(e) => setAmazonUrl(e.target.value)}
                placeholder="https://www.amazon.co.jp/..."
                className={inputCls}
              />
            </Field>
            <Field label="楽天リンク (任意)">
              <input
                type="url"
                value={rakutenUrl}
                onChange={(e) => setRakutenUrl(e.target.value)}
                placeholder="https://item.rakuten.co.jp/..."
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="写真">
            <ImageUploader
              value={imageUrl || null}
              onChange={(url) => setImageUrl(url ?? "")}
              prefix="sake"
              aspect="photo"
            />
          </Field>
        </Section>
      )}

      {step === 2 && (
        <Section title="説明">
          <p className="font-body text-xs text-text-muted -mt-2">
            銘柄の物語、味わいの印象、合わせる料理のヒントなど。詳細ページに表示されます。
          </p>
          <Field label="説明" required>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={16}
              placeholder="例: 福井県永平寺町の名水で醸す、端正な大吟醸。控えめながら品のある吟醸香と、なめらかで柔らかな口当たり..."
              className={`${inputCls} resize-y min-h-[400px] leading-relaxed`}
            />
          </Field>
        </Section>
      )}

      {step === 3 && (
        <>
          <Section title="味わいプロファイル (0.0–1.0)">
            <p className="font-body text-xs text-text-muted -mt-2">
              5 軸でこの銘柄の味わいを表します。診断結果のマッチングに使われます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {AXES.map(({ key, label }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-body font-medium text-xs text-text-secondary">
                      {label}
                    </span>
                    <span className="font-body text-xs text-accent tabular-nums">
                      {axes[key].toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={axes[key]}
                    onChange={(e) =>
                      setAxes((s) => ({
                        ...s,
                        [key]: parseFloat(e.target.value),
                      }))
                    }
                    className="w-full accent-accent"
                  />
                </div>
              ))}
            </div>
          </Section>

          <Section title="味わいタグ">
            <div className="flex flex-col gap-2">
              {flavorRows.map((row, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <select
                    value={row.flavor_id}
                    onChange={(e) => {
                      const next = [...flavorRows];
                      next[idx] = { ...next[idx], flavor_id: e.target.value };
                      setFlavorRows(next);
                    }}
                    className={`${inputCls} flex-1`}
                  >
                    <option value="">— 選択 —</option>
                    {flavorMeta.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 px-3 py-2 font-body text-sm text-text-secondary">
                    <input
                      type="checkbox"
                      checked={row.is_primary}
                      onChange={(e) => {
                        const next = [...flavorRows];
                        next[idx] = {
                          ...next[idx],
                          is_primary: e.target.checked,
                        };
                        setFlavorRows(next);
                      }}
                      className="accent-accent"
                    />
                    primary
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFlavorRows(flavorRows.filter((_, i) => i !== idx))
                    }
                    className="px-2 py-2 text-text-muted hover:text-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setFlavorRows([
                    ...flavorRows,
                    { flavor_id: "", is_primary: false },
                  ])
                }
                className="self-start mt-2 px-4 py-2 rounded-full border border-border font-body text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
              >
                + タグを追加
              </button>
            </div>
          </Section>
        </>
      )}

      {step === 4 && (
        <Section title="ペアリング (キュレーター推し)">
          <p className="font-body text-xs text-text-muted -mt-2">
            手動キュレーション。アルゴリズムの寄り添う/意外/口直しとは別に、銘柄詳細ページの「醸造家からの一推し」として表示されます。
          </p>
          <div className="flex flex-col gap-3">
            {pairingRows.map((row, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface-raised/30"
              >
                <div className="flex gap-2 items-center">
                  <span className="font-body font-bold text-xs text-accent w-6">
                    #{idx + 1}
                  </span>
                  <select
                    value={row.sakana_id}
                    onChange={(e) => {
                      const next = [...pairingRows];
                      next[idx] = { ...next[idx], sakana_id: e.target.value };
                      setPairingRows(next);
                    }}
                    className={`${inputCls} flex-1`}
                  >
                    <option value="">— 肴を選択 —</option>
                    {sakanaMeta.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.emoji} {s.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      setPairingRows(pairingRows.filter((_, i) => i !== idx))
                    }
                    className="px-2 py-2 text-text-muted hover:text-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <textarea
                  value={row.description}
                  onChange={(e) => {
                    const next = [...pairingRows];
                    next[idx] = { ...next[idx], description: e.target.value };
                    setPairingRows(next);
                  }}
                  rows={2}
                  placeholder="ペアリングの説明..."
                  className={`${inputCls} resize-y`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setPairingRows([
                  ...pairingRows,
                  { sakana_id: "", description: "" },
                ])
              }
              className="self-start mt-2 px-4 py-2 rounded-full border border-border font-body text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
            >
              + ペアリングを追加
            </button>
          </div>
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
            onClick={() => router.push("/admin/sake")}
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
          {step < 4 ? (
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
