interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="flex flex-col gap-4 w-full pt-8">
      <div className="flex items-end justify-between">
        <span className="font-body font-bold text-xs tracking-[1.2px] uppercase text-text-muted">
          Question
        </span>
        <span className="font-body font-bold text-lg text-text-primary">
          {current} / {total}
        </span>
      </div>
      <div className="w-full h-[3px] bg-border rounded-full">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
