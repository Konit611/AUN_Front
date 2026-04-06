import Image from "next/image";

interface QuizChoiceCardProps {
  text: string;
  image?: string;
  imageAlt?: string;
  selected: boolean;
  onClick: () => void;
}

export default function QuizChoiceCard({
  text,
  image,
  imageAlt,
  selected,
  onClick,
}: QuizChoiceCardProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`relative flex flex-col items-start p-[43px] rounded-[20px] border-3 bg-surface text-left cursor-pointer transition-all duration-200 ${
        selected
          ? "border-accent shadow-[4px_4px_0px_0px_var(--color-accent)]"
          : "border-text-primary hover:border-accent"
      }`}
    >
      {/* Selection indicator */}
      <span className={`absolute top-6 right-6 ${selected ? "text-accent" : "text-border"}`} aria-hidden="true">
        {selected ? (
          <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
            <circle cx="13.5" cy="13.5" r="13.5" fill="currentColor" />
            <path
              d="M8 13.5L12 17.5L19 9.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <circle
              cx="12.5"
              cy="12.5"
              r="11.5"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )}
      </span>

      {/* Image */}
      {image && (
        <div className="mb-8 size-24 border-2 border-text-primary overflow-hidden grayscale relative">
          <Image
            src={image}
            alt={imageAlt || ""}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Text */}
      <span
        className={`font-body font-bold text-2xl leading-8 ${
          selected ? "text-accent" : "text-text-primary"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
