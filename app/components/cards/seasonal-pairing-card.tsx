interface SeasonalPairingCardProps {
  emoji: string;
  food: string;
  sake: string;
  temperature: string;
  description: string;
}

export default function SeasonalPairingCard({
  emoji,
  food,
  sake,
  temperature,
  description,
}: SeasonalPairingCardProps) {
  return (
    <>
      {/* ===== Mobile card ===== */}
      <div className="md:hidden bg-surface border border-border/60 rounded-tl-[32px] rounded-br-[32px] p-6 flex flex-col items-start gap-4 w-[288px] shrink-0 snap-start shadow-sm">
        {/* Temperature tag */}
        <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-accent/10 text-accent">
          {temperature}
        </span>

        {/* Food + separator + sake */}
        <div className="flex flex-col gap-1">
          <h3 className="font-display font-bold text-lg text-text-primary">
            {emoji} {food}
          </h3>
          <span className="text-xs text-text-muted">×</span>
          <p className="font-display font-bold text-lg text-accent">
            {sake}
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-xs text-text-muted leading-relaxed">
          {description}
        </p>
      </div>

      {/* ===== Desktop card ===== */}
      <div className="hidden md:flex flex-col items-center text-center bg-surface border border-border/60 rounded-tl-[48px] rounded-br-[48px] p-8">
        {/* Large emoji */}
        <span className="text-[60px] leading-none mb-4">{emoji}</span>

        {/* Food name */}
        <h3 className="font-display font-bold text-2xl text-accent mb-2">
          {food}
        </h3>

        {/* Diamond separator */}
        <div className="my-4 flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-text-muted">
            <rect
              x="4"
              y="0"
              width="5.66"
              height="5.66"
              rx="1"
              transform="rotate(45 4 0)"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Sake name */}
        <p className="font-body text-xl text-accent mb-6">{sake}</p>

        {/* Temperature tag */}
        <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-border/80 text-text-secondary mb-4">
          {temperature}
        </span>

        {/* Description */}
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </>
  );
}
