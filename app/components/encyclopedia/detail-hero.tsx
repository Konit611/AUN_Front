import type { SakeDetail } from "@/app/lib/mock-sake-detail";

interface DetailHeroProps {
  sake: SakeDetail;
}

export default function DetailHero({ sake }: DetailHeroProps) {
  return (
    <section>
      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-8">
        <div className="bg-surface-raised rounded-[48px] p-4">
          <div className="rounded-[48px] overflow-hidden">
            <div className="h-[388px] bg-surface-raised flex items-center justify-center">
              <span className="text-6xl">🍶</span>
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
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-2 gap-16 max-w-[1536px] px-8 pt-16 pb-24">
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
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-accent text-white font-body font-bold text-lg px-10 py-5 rounded-full w-fit hover:bg-accent-hover transition-colors"
            >
              購入する
              <ArrowRight />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className="absolute -inset-7 -rotate-2 bg-accent/5 rounded-[48px]" />
          <div className="relative aspect-[4/5] w-full bg-white rounded-tl-[48px] overflow-hidden flex items-center justify-center p-12">
            <span className="text-8xl">🍶</span>
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
