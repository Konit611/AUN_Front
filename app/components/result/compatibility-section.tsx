import Link from "next/link";

interface CompatibilitySectionProps {
  compatibleCode: string;
  compatibleName: string;
  compatibleDescription: string;
}

export default function CompatibilitySection({
  compatibleCode,
  compatibleName,
  compatibleDescription,
}: CompatibilitySectionProps) {
  return (
    <section className="px-6 py-24 md:px-8 md:py-0">
      <div className="max-w-[1280px] mx-auto">
        {/* Mobile */}
        <div className="md:hidden">
          <h2 className="font-display text-[30px] leading-9 text-accent text-center mb-6">
            あなたの相性タイプ
          </h2>

          <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-lg p-10">
            <div className="flex flex-col items-center gap-2 mb-8">
              <p className="font-body text-[10px] text-text-muted/60 tracking-[4px] uppercase">
                Best Drinking Partner
              </p>
              <h3 className="font-display font-bold text-[30px] leading-9 text-accent">
                {compatibleName}
              </h3>
            </div>
            <div className="w-10 h-0.5 bg-accent/20 mx-auto mb-8" />
            <p className="font-body text-sm text-text-secondary text-center leading-7 mb-8">
              {compatibleDescription}
            </p>
            <button className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-accent text-white font-body font-bold text-sm tracking-[1.4px] shadow-md">
              <ShareIcon />
              この相性をシェアする
            </button>
          </div>

          <div className="flex flex-col items-center gap-8 mt-16">
            <Link
              href="/diagnosis"
              className="px-10 py-[13px] rounded-full border border-text-secondary text-text-secondary font-body text-sm tracking-[1.4px] text-center"
            >
              もう一度診断する
            </Link>
            <Link
              href="/"
              className="font-body font-bold text-sm text-accent tracking-[1.4px] underline underline-offset-4 decoration-accent/20"
            >
              ホームに戻る
            </Link>
          </div>
        </div>

        {/* PC */}
        <div className="hidden md:flex items-center gap-12 bg-surface-raised rounded-[48px] p-20">
          <div className="flex-1 flex flex-col gap-4 max-w-[672px]">
            <p className="font-body font-bold text-[10px] text-accent tracking-[2px] uppercase">
              The Complementary Soul
            </p>
            <h2 className="font-display text-[30px] leading-9 text-accent">
              最高の相棒：{compatibleName}
            </h2>
            <p className="font-body font-light text-base text-text-secondary leading-relaxed pt-2 pb-4">
              {compatibleDescription}
            </p>
            <div>
              <Link
                href={`/result/${compatibleCode}`}
                className="inline-flex items-center px-8 py-3 rounded-full bg-accent text-white font-body font-medium text-base"
              >
                {compatibleName.replace("タイプ", "")}の特性を見る
              </Link>
            </div>
          </div>
          <div className="w-[320px] h-[320px] shrink-0 rounded-full bg-accent/5 border-8 border-white overflow-hidden flex items-center justify-center">
            <span className="text-6xl text-accent/20 font-display">
              {compatibleCode}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShareIcon() {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}
