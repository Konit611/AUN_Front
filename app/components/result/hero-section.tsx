interface HeroSectionProps {
  typeCode: string;
  typeName: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const CSS_COLOR_RE = /^#[0-9a-fA-F]{3,8}$/;

function sanitizeColor(color: string, fallback: string): string {
  return CSS_COLOR_RE.test(color) ? color : fallback;
}

export default function HeroSection({
  typeCode,
  typeName,
  description,
  gradientFrom,
  gradientTo,
}: HeroSectionProps) {
  const safeFrom = sanitizeColor(gradientFrom, "#C2685A");
  const safeTo = sanitizeColor(gradientTo, "#7B5EA7");

  return (
    <section
      className="flex flex-col items-center justify-center overflow-hidden px-6 py-24 md:px-8 md:py-32"
      style={{
        background: `linear-gradient(135deg, ${safeFrom} 0%, ${safeTo} 100%)`,
      }}
    >
      {/* Mobile */}
      <div className="flex flex-col items-center max-w-[576px] md:hidden">
        <p className="font-mono text-[10px] text-white/80 tracking-[10px] uppercase animate-fade-in">
          {typeCode}
        </p>
        <h1 className="font-display font-bold text-[48px] leading-[60px] text-white text-center mt-6 animate-fade-in-delay">
          {typeName}
        </h1>
        <p className="font-body text-base text-white/90 text-center leading-relaxed max-w-[410px] mt-8 animate-slide-up-delay">
          {description}
        </p>
        <div className="flex flex-col gap-4 w-full max-w-[280px] mt-12 animate-slide-up-delay">
          <button className="flex items-center justify-center px-8 py-[15px] rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-body font-medium text-sm tracking-[0.7px]">
            結果をシェア
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-[14px] rounded-full bg-[#06c755] text-white font-body font-medium text-sm tracking-[0.7px]">
            <LineIcon />
            LINEでシェア
          </button>
        </div>
      </div>

      {/* PC */}
      <div className="hidden md:flex flex-col items-center max-w-[896px]">
        <p className="text-sm text-white/80 tracking-[4.2px] font-light animate-fade-in">
          {typeCode} TYPE
        </p>
        <h1 className="font-display text-[96px] leading-[96px] text-white text-center mt-6 animate-fade-in-delay">
          {typeName}
        </h1>
        <p className="font-body font-light text-xl text-white/70 text-center leading-7 max-w-[672px] mt-4 animate-slide-up-delay">
          {description}
        </p>
        <div className="flex gap-4 mt-12 animate-slide-up-delay">
          <button className="flex items-center gap-2 px-8 py-[13px] rounded-full border border-white text-white font-body font-medium text-base">
            <ShareIcon />
            Share Identity
          </button>
          <button className="flex items-center px-8 py-[13px] rounded-full bg-[#06c755] text-white font-body font-medium text-base">
            LINEで送る
          </button>
        </div>
      </div>
    </section>
  );
}

function LineIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 5.81 2 10.5c0 4.08 3.42 7.5 8.05 8.36.31.07.74.21.85.48.1.25.06.63.03.88l-.14.81c-.04.24-.2.93.81.51s5.35-3.15 7.3-5.39C20.68 13.98 22 12.36 22 10.5 22 5.81 17.52 2 12 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      width="14"
      height="14"
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
