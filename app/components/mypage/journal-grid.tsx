import type { JournalEntry } from "@/app/lib/types";
import JournalCard from "./journal-card";

interface JournalGridProps {
  entries: JournalEntry[];
}

export default function JournalGrid({ entries }: JournalGridProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Mobile header row: view toggle + count */}
      <div className="flex md:hidden items-center justify-between">
        <div className="flex bg-surface-raised rounded-full p-1 gap-2">
          <button className="flex items-center justify-center size-10 rounded-full bg-surface shadow-sm" aria-label="Grid view">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" className="text-text-primary">
              <rect x="0" y="0" width="7" height="7" rx="1.5" />
              <rect x="11" y="0" width="7" height="7" rx="1.5" />
              <rect x="0" y="11" width="7" height="7" rx="1.5" />
              <rect x="11" y="11" width="7" height="7" rx="1.5" />
            </svg>
          </button>
          <button className="flex items-center justify-center size-10 rounded-full" aria-label="List view">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" className="text-text-secondary">
              <rect x="0" y="0" width="20" height="2.5" rx="1" />
              <rect x="0" y="6.75" width="20" height="2.5" rx="1" />
              <rect x="0" y="13.5" width="20" height="2.5" rx="1" />
            </svg>
          </button>
        </div>
        <span className="text-base text-text-secondary tracking-widest uppercase font-body opacity-70">
          {entries.length} Entries
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
        {entries.map((entry) => (
          <JournalCard key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Load more (desktop) */}
      <div className="hidden md:flex justify-center pt-8">
        <button className="text-xs text-accent tracking-wider uppercase border-b border-accent/20 pb-2 font-body hover:border-accent transition-colors">
          Load more archives
        </button>
      </div>
    </div>
  );
}
