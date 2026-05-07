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

const AXIS_KEYS: Array<keyof SakanaTasteAxes> = [
  "sweetness",
  "umami",
  "acidity",
  "fat",
  "aroma",
  "saltiness",
];

function TasteRadar({
  axes,
  size = 280,
}: {
  axes: SakanaTasteAxes;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.34;
  const N = AXIS_KEYS.length;

  const vertex = (i: number, v: number) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
    return [cx + R * v * Math.cos(angle), cy + R * v * Math.sin(angle)] as const;
  };
  const labelPos = (i: number) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
    const r = R + 26;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };
  const polygon = (vals: number[]) =>
    vals.map((v, i) => vertex(i, v).join(",")).join(" ");

  const valuePoints = polygon(AXIS_KEYS.map((k) => axes[k]));

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full mx-auto md:mx-0"
      style={{ maxWidth: size }}
      role="img"
      aria-label="味わいプロファイル"
    >
      {/* Grid rings (0.33 / 0.66 / 1.0) */}
      <g stroke="var(--color-border)" fill="none" strokeWidth="1">
        {[0.33, 0.66, 1].map((v) => (
          <polygon key={v} points={polygon(Array(N).fill(v))} />
        ))}
      </g>
      {/* Axes spokes */}
      <g stroke="var(--color-border)" strokeWidth="1">
        {AXIS_KEYS.map((_, i) => {
          const [x, y] = vertex(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} />;
        })}
      </g>
      {/* Value shape */}
      <polygon
        points={valuePoints}
        fill="var(--color-accent)"
        fillOpacity="0.18"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
      />
      {/* Vertex dots */}
      {AXIS_KEYS.map((k, i) => {
        const [x, y] = vertex(i, axes[k]);
        return (
          <circle key={k} cx={x} cy={y} r="3.5" fill="var(--color-accent)" />
        );
      })}
      {/* Labels */}
      {AXIS_KEYS.map((k, i) => {
        const [x, y] = labelPos(i);
        return (
          <text
            key={k}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--color-text-secondary)"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {AXIS_LABEL[k]}
          </text>
        );
      })}
    </svg>
  );
}

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
        {/* Hero — image left, title + radar stacked right (radar bottom-aligns with image) */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-stretch">
          {/* Image */}
          <div className="w-full md:w-[320px] md:h-[320px] aspect-[4/3] md:aspect-auto bg-surface-raised rounded-tl-[48px] rounded-br-[48px] overflow-hidden flex items-center justify-center shrink-0">
            {sakana.foodImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sakana.foodImageUrl}
                alt={sakana.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[120px] md:text-[140px]">
                {sakana.emoji}
              </span>
            )}
          </div>

          {/* Right column: title at top, radar pinned to bottom (image-baseline aligned) */}
          <div className="flex flex-col gap-6 flex-1 w-full min-w-0">
            <div className="flex flex-col gap-3">
              <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
                Sakana / 肴
              </span>
              <h1 className="font-display font-bold text-[28px] md:text-[44px] md:leading-tight text-accent">
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
            </div>

            <div className="md:mt-auto flex flex-col gap-2">
              <TasteRadar axes={sakana.tasteAxes} size={200} />
            </div>
          </div>
        </section>

        {/* Description — bridges hero into the recipe sections */}
        {sakana.description && (
          <section className="mt-10 md:mt-14">
            <p className="font-body text-base md:text-lg text-text-primary/85 leading-[1.9] whitespace-pre-line">
              {sakana.description}
            </p>
          </section>
        )}

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
