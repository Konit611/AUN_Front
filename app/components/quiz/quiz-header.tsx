"use client";

interface QuizHeaderProps {
  onClose: () => void;
}

export default function QuizHeader({ onClose }: QuizHeaderProps) {
  return (
    <header>
      <div className="flex items-center justify-between px-6 h-16 bg-bg">
        <span className="font-display font-bold text-2xl text-text-primary">
          AUN
        </span>
        <button
          onClick={onClose}
          className="flex items-center justify-center p-2 rounded-full cursor-pointer"
          aria-label="閉じる"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="h-px bg-border" />
    </header>
  );
}
