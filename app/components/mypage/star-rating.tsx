"use client";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

function StarIcon({ filled, size }: { filled: boolean; size: "sm" | "md" }) {
  const px = size === "sm" ? 12 : 20;
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 20 19"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

export default function StarRating({
  rating,
  size = "sm",
  interactive = false,
  onChange,
}: StarRatingProps) {
  return (
    <div className={`flex gap-0.5 ${interactive ? "cursor-pointer" : ""} text-accent`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={`${interactive ? "hover:scale-110 transition-transform" : ""} disabled:cursor-default`}
        >
          <StarIcon filled={star <= rating} size={size} />
        </button>
      ))}
    </div>
  );
}
