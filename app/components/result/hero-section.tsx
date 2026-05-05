import ShareButtons from "./share-buttons";

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
      {/* Mobile copy */}
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
      </div>

      {/* Desktop copy */}
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
      </div>

      <ShareButtons
        typeCode={typeCode}
        typeName={typeName}
        description={description}
        variant="hero"
      />
    </section>
  );
}
