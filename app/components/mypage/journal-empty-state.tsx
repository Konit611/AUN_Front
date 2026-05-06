import Link from "next/link";

export default function JournalEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 pt-12 md:pt-20 pb-16">
      <div className="flex flex-col items-center gap-10 max-w-md w-full">
        {/* Ceramic Frame Illustration */}
        <div className="relative flex items-center justify-center size-64">
          {/* Background decorations */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-64 rotate-3 bg-surface-raised/50 rounded-tl-[64px] rounded-tr-[48px] rounded-bl-[48px] rounded-br-[48px]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-64 -rotate-3 bg-border/30 rounded-tl-[48px] rounded-tr-[48px] rounded-bl-[48px] rounded-br-[64px]" />
          </div>
          {/* Main frame */}
          <div className="relative size-52 bg-surface rounded-tl-[64px] rounded-tr-[48px] rounded-bl-[48px] rounded-br-[48px] shadow-[0_20px_40px_rgba(43,58,103,0.06)] flex items-center justify-center">
            <span className="text-8xl" aria-hidden="true">
              🍶
            </span>
          </div>
        </div>

        {/* Text & CTA */}
        <div className="flex flex-col items-center gap-4 w-full">
          <h2 className="font-display font-bold text-xl md:text-[30px] text-text-primary text-center">
            まだ記録がありません
          </h2>
          <p className="text-sm md:text-lg text-text-secondary text-center font-body">
            <span className="hidden md:inline">あなただけの酒の物語をここから始めましょう。</span>
            <br className="hidden md:inline" />
            最初の一杯を記録しましょう！
          </p>

          <div className="pt-8">
            <Link
              href="/mypage/new"
              className="inline-flex items-center gap-3 px-10 py-4 bg-accent text-white font-body font-bold text-sm md:text-lg rounded-full shadow-[0_10px_15px_-3px_rgba(20,36,80,0.1)] tracking-widest transition-colors hover:bg-accent-hover"
            >
              記録する
            </Link>
          </div>
        </div>

        {/* Placeholder cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm opacity-40 pt-8 md:hidden">
          <div className="h-24 bg-surface-raised border-t-2 border-accent/5 rounded-[48px]" />
          <div className="h-24 bg-surface-raised border-t-2 border-accent/5 rounded-[48px]" />
        </div>
      </div>

      {/* Desktop floating tags */}
      <div className="hidden md:flex gap-4 pt-16 opacity-60">
        {["#テイスティング", "#ペアリング", "#お気に入り"].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-border text-xs text-text-secondary font-body"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
