interface QuizNavigationDotsProps {
  total: number;
  current: number;
}

export default function QuizNavigationDots({
  total,
  current,
}: QuizNavigationDotsProps) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }, (_, i) => {
        const isPast = i < current - 1;
        const isCurrent = i === current - 1;

        return (
          <div
            key={i}
            className={`h-3 rounded-full transition-all duration-300 ${
              isCurrent
                ? "w-10 bg-accent"
                : isPast
                  ? "size-3 bg-accent/20 border border-text-primary/10"
                  : "size-3 bg-border border border-text-primary/10"
            }`}
          />
        );
      })}
    </div>
  );
}
