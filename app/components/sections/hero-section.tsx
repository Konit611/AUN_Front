import Link from "next/link";
import LinkButton from "@/app/components/ui/link-button";
import type { FeaturedSake } from "@/app/lib/types";

interface HeroSectionProps {
  featuredSake: FeaturedSake | null;
}

export default function HeroSection({ featuredSake }: HeroSectionProps) {
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
          <div className="hidden md:flex flex-wrap gap-4 pt-6">
            <LinkButton variant="primary" size="lg" href="/diagnosis">
              タイプ診断をする
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </LinkButton>
            <LinkButton variant="secondary" size="lg" href="/pairing">
              ペアリングを探す
            </LinkButton>
          </div>
        </div>

        {/* Featured sake card */}
        <div className="relative md:flex-1 flex justify-center md:justify-end">
          <FeaturedSakeCard sake={featuredSake} />
        </div>
      </div>
    </section>
  );
}

function FeaturedSakeCard({ sake }: { sake: FeaturedSake | null }) {
  return (
    <div className="relative w-full max-w-[342px] md:max-w-[454px]">
      <Link
        href={sake ? `/encyclopedia/${sake.id}` : "/encyclopedia"}
        className="group block bg-surface-raised rounded-tl-[48px] rounded-br-[48px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Visual */}
        <div className="relative bg-gradient-to-br from-surface-raised to-border aspect-[454/280] flex items-center justify-center overflow-hidden">
          {sake?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sake.imageUrl}
              alt={sake.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="text-7xl md:text-8xl">🍶</span>
          )}
          {/* Badge */}
          <span
            className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
              sake?.personalized
                ? "bg-accent text-white"
                : "bg-white/90 text-accent backdrop-blur-sm"
            }`}
          >
            {sake?.personalized ? "あなたへのおすすめ" : "今日のおすすめ"}
          </span>
        </div>

        {/* Info */}
        <div className="px-6 py-6 md:px-8 md:py-7 flex flex-col gap-3 bg-surface">
          {sake ? (
            <>
              <div className="flex flex-col gap-1">
                <span className="font-body text-xs text-text-muted">
                  {sake.brewery}
                  {sake.region && ` · ${sake.region}`}
                </span>
                <h2 className="font-display font-bold text-2xl md:text-[28px] text-accent leading-tight">
                  {sake.name}
                </h2>
              </div>
              <p className="font-body text-sm text-text-secondary line-clamp-2">
                {sake.description}
              </p>
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/60 mt-1">
                <span className="font-body text-xs text-text-muted">
                  {sake.type}
                </span>
                <span className="font-body font-bold text-sm text-accent group-hover:text-accent-hover transition-colors">
                  詳しく見る →
                </span>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display font-bold text-xl md:text-2xl text-accent leading-tight">
                日本酒図鑑を覗く
              </h2>
              <p className="font-body text-sm text-text-secondary">
                まだ推薦できる銘柄が登録されていません。
              </p>
            </>
          )}
        </div>
      </Link>
      {/* Decorative element */}
      <div className="hidden md:block absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-accent/10 blur-[32px] -z-10" />
    </div>
  );
}
