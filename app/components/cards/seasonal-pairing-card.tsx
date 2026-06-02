import Image from "next/image";
import Link from "next/link";

export interface SeasonalPairingCardProps {
  id: string;
  emoji: string;
  food: string;
  sake: string;
  temperature: string;
  description: string;
  heroImage: string | null;
}

export function SeasonalPairingCardMobile({
  id,
  emoji,
  food,
  sake,
  temperature,
  description,
  heroImage,
}: SeasonalPairingCardProps) {
  return (
    <Link
      href={`/pairing/${id}`}
      className="bg-surface border border-border/60 rounded-tl-[32px] rounded-br-[32px] flex flex-col w-[288px] shrink-0 snap-start shadow-sm hover:border-accent transition-colors duration-200"
    >
      <div className="p-4 pb-0">
        <div className="relative w-full h-[160px] rounded-2xl bg-surface-raised overflow-hidden flex items-center justify-center">
          {heroImage ? (
            <Image src={heroImage} alt={food} fill className="object-cover" />
          ) : (
            <span className="text-[64px] leading-none">{emoji}</span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-accent/10 text-accent w-fit">
          {temperature}
        </span>
        <div className="flex flex-col gap-1">
          <h3 className="font-display font-bold text-lg text-text-primary">
            {food}
          </h3>
          <span className="text-xs text-text-muted">&times;</span>
          <p className="font-display font-bold text-lg text-accent">{sake}</p>
        </div>
        <p className="font-body text-xs text-text-muted leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}

export function SeasonalPairingCardDesktop({
  id,
  emoji,
  food,
  sake,
  temperature,
  description,
  heroImage,
}: SeasonalPairingCardProps) {
  return (
    <Link
      href={`/pairing/${id}`}
      className="flex flex-col bg-surface border border-border/60 rounded-tl-[48px] rounded-br-[48px] hover:border-accent transition-colors duration-200"
    >
      <div className="p-6 pb-0">
        <div className="relative w-full h-[200px] rounded-[24px] bg-surface-raised overflow-hidden flex items-center justify-center">
          {heroImage ? (
            <Image src={heroImage} alt={food} fill className="object-cover" />
          ) : (
            <span className="text-[80px] leading-none">{emoji}</span>
          )}
        </div>
      </div>

      <div className="p-8 flex flex-col items-center text-center gap-4">
        <h3 className="font-display font-bold text-2xl text-accent">{food}</h3>

        <div className="flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-text-muted">
            <rect x="4" y="0" width="5.66" height="5.66" rx="1" transform="rotate(45 4 0)" fill="currentColor" />
          </svg>
        </div>

        <p className="font-body text-xl text-accent">{sake}</p>

        <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-accent/10 text-accent">
          {temperature}
        </span>

        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
