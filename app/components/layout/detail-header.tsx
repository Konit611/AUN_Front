"use client";

import { useRouter } from "next/navigation";

interface DetailHeaderProps {
  title?: string;
  backHref?: string;
}

export default function DetailHeader({ title, backHref }: DetailHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="md:hidden sticky top-0 z-50 bg-bg/95 backdrop-blur-sm">
      <div className="flex items-center h-14 px-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 py-2 pr-3 text-accent font-body text-sm cursor-pointer"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path
              d="M8.5 1L1.5 8L8.5 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          戻る
        </button>
        {title && (
          <span className="absolute left-1/2 -translate-x-1/2 font-display font-bold text-base text-accent truncate max-w-[60%] text-center">
            {title}
          </span>
        )}
      </div>
      <div className="h-px bg-border/50" />
    </div>
  );
}
