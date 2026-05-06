import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch, ApiError } from "@/app/lib/api";
import type { SakanaDetail, SakanaTasteAxes } from "@/app/lib/types";
import DetailHeader from "@/app/components/layout/detail-header";

interface Props {
  params: Promise<{ id: string }>;
}

const AXIS_LABEL: Record<keyof SakanaTasteAxes, string> = {
  sweetness: "甘味",
  umami: "旨味",
  acidity: "酸味",
  fat: "脂",
  aroma: "香り",
  saltiness: "塩味",
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "易しい",
  medium: "ふつう",
  hard: "難しい",
};

export default async function SakanaDetailPage({ params }: Props) {
  const { id } = await params;

  let sakana: SakanaDetail;
  try {
    sakana = await apiFetch<SakanaDetail>(`/sakana/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const time =
    (sakana.prepTimeMin ?? 0) + (sakana.cookTimeMin ?? 0) || null;
  const difficulty = sakana.difficulty
    ? DIFFICULTY_LABEL[sakana.difficulty] ?? sakana.difficulty
    : null;

  return (
    <div className="flex flex-col">
      <DetailHeader backHref="/sakana" />
      <div className="px-6 md:px-8 lg:px-12 pt-4 md:pt-16 pb-32 md:pb-24 max-w-[1280px] mx-auto w-full">
        {/* Hero */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          <div className="w-full md:w-[420px] aspect-[4/3] md:aspect-square bg-surface-raised rounded-tl-[48px] rounded-br-[48px] overflow-hidden flex items-center justify-center shrink-0">
            {sakana.foodImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sakana.foodImageUrl}
                alt={sakana.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[120px] md:text-[160px]">
                {sakana.emoji}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
              Sakana / 肴
            </span>
            <h1 className="font-display font-bold text-[28px] md:text-[48px] md:leading-tight text-accent">
              {sakana.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-1">
              {time && (
                <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
                  {time}分
                </span>
              )}
              {difficulty && (
                <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full border border-accent/40 text-accent">
                  {difficulty}
                </span>
              )}
              {sakana.servings && (
                <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full border border-border text-text-secondary">
                  {sakana.servings}人前
                </span>
              )}
            </div>

            {/* Taste axes */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 mt-6">
              {(Object.keys(AXIS_LABEL) as Array<keyof SakanaTasteAxes>).map(
                (key) => {
                  const value = sakana.tasteAxes[key];
                  return (
                    <div key={key} className="flex flex-col gap-1">
                      <div className="flex justify-between font-body text-xs">
                        <span className="text-text-secondary">
                          {AXIS_LABEL[key]}
                        </span>
                        <span className="text-accent tabular-nums">
                          {value.toFixed(2)}
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-surface-raised overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>

        {/* Ingredients */}
        {sakana.ingredients.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display font-bold text-xl md:text-2xl text-accent mb-6">
              材料
              {sakana.servings && (
                <span className="font-body font-medium text-sm text-text-muted ml-2">
                  ({sakana.servings}人前)
                </span>
              )}
            </h2>
            <ul className="bg-surface border border-border rounded-2xl divide-y divide-border/60">
              {sakana.ingredients.map((ing, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-5 py-3 font-body text-sm"
                >
                  <span className="text-text-primary">{ing.name}</span>
                  <span className="text-text-secondary tabular-nums">
                    {ing.amount}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Steps */}
        {sakana.steps.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display font-bold text-xl md:text-2xl text-accent mb-6">
              作り方
            </h2>
            <ol className="flex flex-col gap-4">
              {sakana.steps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex gap-4 bg-surface border border-border rounded-2xl px-5 py-4"
                >
                  <span className="font-display font-bold text-lg text-accent shrink-0 w-8">
                    {idx + 1}
                  </span>
                  <span className="font-body text-sm text-text-primary leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Curated pairings */}
        {sakana.pairings.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display font-bold text-xl md:text-2xl text-accent mb-2">
              この肴に合う日本酒
            </h2>
            <p className="font-body text-sm text-text-muted mb-6">
              キュレーターが選んだ一推し
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sakana.pairings.map((p) => (
                <Link
                  key={p.sakeId}
                  href={`/encyclopedia/${p.sakeId}`}
                  className="group block bg-surface border border-border rounded-tl-[32px] rounded-br-[32px] p-5 hover:border-accent transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl shrink-0">🍶</span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-display font-bold text-base text-accent group-hover:text-accent-hover transition-colors truncate">
                        {p.sakeName}
                      </span>
                      <span className="font-body text-xs text-text-muted truncate">
                        {p.brewery} / {p.type}
                      </span>
                    </div>
                  </div>
                  {p.description && (
                    <p className="font-body text-sm text-text-secondary leading-relaxed">
                      {p.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Algorithm-suggested pairings */}
        {sakana.synergyPairings.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display font-bold text-xl md:text-2xl text-accent mb-2">
              寄り添う日本酒
            </h2>
            <p className="font-body text-sm text-text-muted mb-6">
              味わいプロファイルから自動で選んだ組み合わせ
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sakana.synergyPairings.map((p) => (
                <Link
                  key={p.sakeId}
                  href={`/encyclopedia/${p.sakeId}`}
                  className="group block bg-surface border border-border rounded-tl-[32px] rounded-br-[32px] p-5 hover:border-accent transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">🍶</span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-display font-bold text-sm text-accent group-hover:text-accent-hover transition-colors truncate">
                        {p.sakeName}
                      </span>
                      <span className="font-body text-xs text-text-muted truncate">
                        {p.brewery} / {p.type}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
