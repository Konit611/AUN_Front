import type { SakeDetail } from "@/app/lib/types";

interface DetailHeroProps {
  sake: SakeDetail;
}

export default function DetailHero({ sake }: DetailHeroProps) {
  return (
    <section>
      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-8">
        <div className="bg-surface-raised rounded-tl-[48px] rounded-br-[48px] p-4">
          <div className="rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
            <div className="h-[388px] bg-white flex items-center justify-center">
              {sake.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={sake.imageUrl}
                  alt={sake.name}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <span className="text-6xl">🍶</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {sake.servingTags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1 text-xs font-body font-medium tracking-wider border border-accent rounded-full text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display font-bold text-[28px] leading-[35px] text-accent">
            {sake.name}
          </h1>
          <p className="font-body font-medium text-sm text-text-secondary">
            {sake.brewery} / {sake.region}
          </p>
          <p className="font-body text-base leading-[26px] text-text-secondary mt-2">
            {sake.description}
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-2 gap-16 max-w-[1280px] mx-auto px-8 pt-16 pb-24">
        <div className="flex flex-col gap-10 justify-center">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              {sake.servingTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 text-xs font-body font-bold tracking-[1.2px] uppercase border border-accent rounded-full text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display font-extrabold text-[72px] leading-[72px] tracking-[-3.6px] text-accent">
              {sake.name}
            </h1>
            <p className="font-body font-medium text-xl tracking-wider text-text-secondary">
              {sake.brewery} / {sake.region}
            </p>
          </div>
          <div className="flex flex-col gap-8 max-w-[448px]">
            <p className="font-body text-base leading-[26px] text-text-secondary">
              {sake.description}
            </p>
            <PurchaseButtons
              amazonUrl={sake.amazonUrl}
              rakutenUrl={sake.rakutenUrl}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className="absolute -inset-7 -rotate-2 bg-accent/5 rounded-tl-[48px] rounded-br-[48px]" />
          <div className="relative aspect-[4/5] w-full bg-white rounded-tl-[48px] rounded-br-[48px] overflow-hidden flex items-center justify-center">
            {sake.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={sake.imageUrl}
                alt={sake.name}
                className="w-full h-full object-contain p-6"
              />
            ) : (
              <span className="text-8xl">🍶</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PurchaseButtons({
  amazonUrl,
  rakutenUrl,
}: {
  amazonUrl: string | null;
  rakutenUrl: string | null;
}) {
  const baseCls =
    "inline-flex items-center gap-3 font-body font-bold text-lg px-10 py-5 rounded-full w-fit";

  if (!amazonUrl && !rakutenUrl) {
    return (
      <span
        className={`${baseCls} bg-accent/40 text-white cursor-not-allowed`}
        aria-disabled="true"
      >
        購入する（準備中）
        <ArrowRight />
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {amazonUrl && (
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`${baseCls} bg-accent text-white hover:bg-accent-hover transition-colors`}
        >
          Amazonで購入
          <ArrowRight />
        </a>
      )}
      {rakutenUrl && (
        <a
          href={rakutenUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`${baseCls} bg-accent text-white hover:bg-accent-hover transition-colors`}
        >
          楽天で購入
          <ArrowRight />
        </a>
      )}
    </div>
  );
}
