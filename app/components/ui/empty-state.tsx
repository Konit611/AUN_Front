import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-20 px-6">
      <div className="w-14 h-14 rounded-full bg-surface-raised flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent/60">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="font-display font-bold text-xl text-accent">{title}</h2>
      {description && (
        <p className="font-body text-sm text-text-secondary max-w-sm">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-2 px-6 py-2 rounded-full bg-accent text-white font-body font-bold text-sm hover:bg-accent-hover transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
