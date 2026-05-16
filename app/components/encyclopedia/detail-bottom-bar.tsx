interface DetailBottomBarProps {
  amazonUrl?: string | null;
  rakutenUrl?: string | null;
}

const arrow = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path
      d="M2 5h6M5 2l3 3-3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const pillCls =
  "rounded-full px-6 py-3 flex items-center gap-2 shadow-lg font-body font-bold text-sm tracking-wider";

export default function DetailBottomBar({
  amazonUrl,
  rakutenUrl,
}: DetailBottomBarProps) {
  const hasAny = Boolean(amazonUrl || rakutenUrl);

  if (!hasAny) {
    return (
      <span
        className={`fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[60] ${pillCls} bg-accent/40 text-white cursor-not-allowed`}
        aria-disabled="true"
      >
        購入する（準備中）
        {arrow}
      </span>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[60] flex flex-col items-end gap-2">
      {amazonUrl && (
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`${pillCls} bg-accent text-white hover:bg-accent-hover transition-colors`}
        >
          Amazonで購入
          {arrow}
        </a>
      )}
      {rakutenUrl && (
        <a
          href={rakutenUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`${pillCls} bg-accent text-white hover:bg-accent-hover transition-colors`}
        >
          楽天で購入
          {arrow}
        </a>
      )}
    </div>
  );
}
