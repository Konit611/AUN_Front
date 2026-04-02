import type { JournalEntry } from "@/app/lib/mock-journal";
import StarRating from "./star-rating";

interface JournalCardProps {
  entry: JournalEntry;
}

export default function JournalCard({ entry }: JournalCardProps) {
  return (
    <article className="flex flex-col gap-3">
      {/* Image */}
      <div className="bg-surface border border-border rounded-[48px] overflow-hidden">
        <div className="aspect-square bg-surface-raised flex items-center justify-center">
          {entry.imagePath ? (
            <div className="w-full h-full bg-surface-raised" />
          ) : (
            <span className="text-text-muted text-sm">No Image</span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 px-1">
        {/* Name + Category (desktop) */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-body font-bold text-base text-accent leading-tight">
            {entry.sakeName}
          </h3>
          {entry.category && (
            <span className="hidden md:inline-block shrink-0 px-2 py-1 rounded-2xl bg-surface-raised text-[10px] text-text-secondary tracking-wider uppercase">
              {entry.category}
            </span>
          )}
        </div>

        {/* Date */}
        <p className="text-xs text-text-muted">{entry.date}</p>

        {/* Rating */}
        <div className="pt-1.5">
          <StarRating rating={entry.rating} size="sm" />
        </div>

        {/* Note (desktop only) */}
        {entry.note && (
          <p className="hidden md:block mt-2 text-xs text-text-secondary leading-relaxed line-clamp-2 font-body font-light">
            &ldquo;{entry.note}&rdquo;
          </p>
        )}
      </div>
    </article>
  );
}
