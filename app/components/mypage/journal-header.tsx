import Link from "next/link";

interface JournalHeaderProps {
  entryCount: number;
}

export default function JournalHeader({ entryCount }: JournalHeaderProps) {
  return (
    <div className="hidden md:flex items-end justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-accent/60 tracking-[2.4px] uppercase font-body">
          Personal Archives
        </span>
        <h1 className="font-display font-bold text-[60px] text-accent tracking-tight leading-none">
          私の記録
        </h1>
        <p className="text-lg text-text-secondary font-body pt-2 max-w-md">
          A chronological journey through the refined nuances of artisanal sake.
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* View toggle */}
        <div className="flex bg-surface-raised rounded-full p-1">
          <button className="p-2 rounded-full bg-surface shadow-sm" aria-label="Grid view">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" className="text-text-primary">
              <rect x="0" y="0" width="6" height="6" rx="1" />
              <rect x="9" y="0" width="6" height="6" rx="1" />
              <rect x="0" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button className="p-2 rounded-full opacity-50" aria-label="List view">
            <svg width="17" height="13" viewBox="0 0 17 13" fill="currentColor" className="text-text-primary">
              <rect x="0" y="0" width="17" height="2" rx="1" />
              <rect x="0" y="5.5" width="17" height="2" rx="1" />
              <rect x="0" y="11" width="17" height="2" rx="1" />
            </svg>
          </button>
        </div>

        {/* Export */}
        <button className="flex items-center gap-2 px-6 py-3 rounded-full text-xs text-accent tracking-wider uppercase font-body">
          <svg width="9" height="12" viewBox="0 0 9 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4.5 1v8M1 4.5L4.5 1 8 4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 11h7" strokeLinecap="round" />
          </svg>
          Export
        </button>

        {/* Add Entry */}
        <Link
          href="/mypage/new"
          className="flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-full text-sm font-bold tracking-wide shadow-[0_20px_25px_-5px_rgba(20,36,80,0.1)]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 1v10M1 6h10" strokeLinecap="round" />
          </svg>
          Add Entry
        </Link>
      </div>
    </div>
  );
}
