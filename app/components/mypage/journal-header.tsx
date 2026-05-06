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
          あなたの一献一献が刻む、酒の物語。
        </p>
      </div>

      <Link
        href="/mypage/new"
        className="flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-full text-sm font-bold tracking-wide shadow-[0_20px_25px_-5px_rgba(20,36,80,0.1)] hover:bg-accent-hover transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 1v10M1 6h10" strokeLinecap="round" />
        </svg>
        Add Entry
      </Link>
    </div>
  );
}
