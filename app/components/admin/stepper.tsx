"use client";

interface StepDef {
  num: number;
  label: string;
}

interface StepperProps {
  steps: readonly StepDef[];
  current: number;
  onJump: (n: number) => void;
}

export default function Stepper({ steps, current, onJump }: StepperProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const active = s.num === current;
        const done = s.num < current;
        return (
          <div key={s.num} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onJump(s.num)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-body text-xs font-bold tracking-wider transition-colors ${
                active
                  ? "bg-accent text-white"
                  : done
                    ? "bg-accent/15 text-accent hover:bg-accent/25"
                    : "bg-surface-raised text-text-muted hover:bg-surface-raised/80"
              }`}
            >
              <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-white/20 text-[10px]">
                {s.num}
              </span>
              {s.label}
            </button>
            {i < steps.length - 1 && (
              <span className="w-6 h-px bg-border" aria-hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}
