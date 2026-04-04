"use client";

export default function DetailBottomBar() {
  return (
    <a
      href="#"
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[60] bg-accent hover:bg-accent-hover text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg transition-colors"
    >
      <span className="font-body font-bold text-sm tracking-wider">
        購入する
      </span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M2 5h6M5 2l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
