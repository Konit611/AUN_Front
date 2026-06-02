import Image from "next/image";
import Link from "next/link";
import Tag from "@/app/components/ui/tag";

interface ClassicPairingCardProps {
  id: string;
  emoji: string;
  food: string;
  sake: string;
  temperature: string;
  description: string;
  heroImage: string | null;
}

export default function ClassicPairingCard({
  id,
  emoji,
  food,
  sake,
  temperature,
  description,
  heroImage,
}: ClassicPairingCardProps) {
  return (
    <Link
      href={`/pairing/${id}`}
      className="bg-surface border border-border/60 rounded-tl-[32px] rounded-br-[32px] md:rounded-tl-[48px] md:rounded-br-[48px] p-4 md:p-6 flex items-center gap-4 md:gap-6 hover:border-accent transition-colors duration-200"
    >
      {/* Image / Emoji */}
      <div className="shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-[24px] bg-surface-raised overflow-hidden flex items-center justify-center">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={food}
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl md:text-4xl">{emoji}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-base md:text-2xl text-accent leading-tight">
          {food}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <svg width="7" height="7" viewBox="0 0 7 7" className="text-accent shrink-0">
            <rect x="3.5" y="0" width="4.95" height="4.95" rx="1" transform="rotate(45 3.5 0)" fill="currentColor" />
          </svg>
          <span className="font-body font-bold text-sm md:text-base text-accent">
            {sake}
          </span>
        </div>
        <Tag className="bg-accent/10 text-accent mt-2">
          {temperature}
        </Tag>
        <p className="hidden md:block font-body text-sm text-text-secondary leading-relaxed mt-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
