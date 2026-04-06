import LinkButton from "@/app/components/ui/link-button";

export default function HeroSection() {
  return (
    <section className="bg-bg px-6 py-12 md:px-12 md:py-[77px]">
      <div className="max-w-[1184px] mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-12">
        {/* Text */}
        <div className="flex flex-col items-center md:items-start gap-6 md:flex-1 text-center md:text-left">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-xs font-bold text-accent tracking-widest uppercase">
            Recommendations
          </span>
          <h1 className="font-display font-bold text-[36px] md:text-[72px] leading-[1.1] tracking-tight text-accent">
            今夜の一杯、
            <br />
            何にする？
          </h1>
          <p className="text-base md:text-xl text-text-primary/80 font-body leading-relaxed">
            あなたにぴったりの日本酒ペアリング。
            <br className="hidden md:block" />
            日常を彩る、洗練された一献の提案。
          </p>
          <div className="hidden md:flex gap-4 pt-6">
            <LinkButton variant="primary" size="lg" href="/pairing">
              ペアリングを探す
            </LinkButton>
            <LinkButton variant="secondary" size="lg" href="/encyclopedia">
              蔵元を知る
            </LinkButton>
          </div>
        </div>

        {/* Image */}
        <div className="relative md:flex-1 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[342px] md:max-w-[454px]">
            <div className="bg-surface-raised rounded-tl-[48px] rounded-br-[48px] overflow-hidden shadow-sm aspect-[454/568]">
              <div className="w-full h-full bg-gradient-to-br from-surface-raised to-border flex items-center justify-center">
                <span className="text-6xl">🍶</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="hidden md:block absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-accent/10 blur-[32px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
