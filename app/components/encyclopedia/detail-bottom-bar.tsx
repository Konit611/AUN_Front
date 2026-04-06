export default function DetailBottomBar() {
  return (
    <span
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[60] bg-accent/40 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg cursor-not-allowed"
      aria-disabled="true"
    >
      <span className="font-body font-bold text-sm tracking-wider">
        購入する（準備中）
      </span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path
          d="M2 5h6M5 2l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
