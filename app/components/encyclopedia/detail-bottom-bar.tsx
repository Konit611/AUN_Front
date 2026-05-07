interface DetailBottomBarProps {
  purchaseUrl?: string | null;
}

export default function DetailBottomBar({ purchaseUrl }: DetailBottomBarProps) {
  const baseCls =
    "fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[60] rounded-full px-6 py-3 flex items-center gap-2 shadow-lg";
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

  if (purchaseUrl) {
    return (
      <a
        href={purchaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseCls} bg-accent text-white hover:bg-accent-hover transition-colors`}
      >
        <span className="font-body font-bold text-sm tracking-wider">
          購入する
        </span>
        {arrow}
      </a>
    );
  }

  return (
    <span
      className={`${baseCls} bg-accent/40 text-white cursor-not-allowed`}
      aria-disabled="true"
    >
      <span className="font-body font-bold text-sm tracking-wider">
        購入する（準備中）
      </span>
      {arrow}
    </span>
  );
}
