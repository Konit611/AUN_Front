interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full bg-accent-light text-accent ${className}`}
    >
      {children}
    </span>
  );
}
