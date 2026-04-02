import Link from "next/link";

export default function FabButton() {
  return (
    <Link
      href="/mypage/new"
      className="fixed bottom-28 md:bottom-12 right-6 md:right-12 z-40 flex items-center justify-center size-14 md:size-16 bg-accent rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:bg-accent-hover transition-colors"
      aria-label="新しい記録を追加"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2.5">
        <path d="M9 1v16M1 9h16" strokeLinecap="round" />
      </svg>
    </Link>
  );
}
