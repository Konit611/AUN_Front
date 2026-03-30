import Tag from "@/app/components/ui/tag";

interface ClassicPairingCardProps {
  emoji: string;
  food: string;
  sake: string;
  temperature: string;
  description: string;
}

export default function ClassicPairingCard({
  emoji,
  food,
  sake,
  temperature,
  description,
}: ClassicPairingCardProps) {
  return (
    <div className="bg-surface border border-border/60 rounded-tl-[60px] rounded-br-[60px] p-6 md:p-10 flex items-center gap-6 md:gap-8">
      {/* Emoji circle */}
      <div className="shrink-0 w-16 h-16 md:w-32 md:h-32 rounded-full bg-surface-raised flex items-center justify-center">
        <span className="text-3xl md:text-5xl">{emoji}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-base md:text-2xl text-accent leading-tight">
          {food}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <svg
            width="7"
            height="7"
            viewBox="0 0 7 7"
            className="text-accent shrink-0"
          >
            <rect
              x="3.5"
              y="0"
              width="4.95"
              height="4.95"
              rx="1"
              transform="rotate(45 3.5 0)"
              fill="currentColor"
            />
          </svg>
          <span className="font-body font-bold text-sm md:text-base text-accent">
            {sake}
          </span>
        </div>
        <Tag className="bg-border/80 text-text-secondary mt-2">
          {temperature}
        </Tag>
        <p className="hidden md:block font-body text-sm text-text-secondary leading-relaxed mt-2">
          {description}
        </p>
      </div>
    </div>
  );
}
