interface QuizChoiceButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

export default function QuizChoiceButton({
  text,
  selected,
  onClick,
}: QuizChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-[26px] rounded-xl border-2 bg-surface text-left cursor-pointer transition-all duration-200 ${
        selected
          ? "border-text-primary shadow-[4px_4px_0px_0px_var(--color-text-primary)]"
          : "border-text-primary hover:border-accent"
      }`}
    >
      <span className="font-body font-bold text-lg text-text-primary leading-7 pr-4">
        {text}
      </span>
      <span className={`shrink-0 ${selected ? "text-accent" : "text-border"}`}>
        {selected ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="currentColor" />
            <path
              d="M6 10L9 13L14 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
