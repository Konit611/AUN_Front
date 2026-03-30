interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  linkText,
  linkHref,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-1 ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      <div className="flex items-end justify-between w-full">
        <h2 className="font-display font-bold text-[22px] md:text-[42px] text-text-primary leading-tight">
          {title}
        </h2>
        {linkText && linkHref && (
          <a
            href={linkHref}
            className="hidden md:inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            {linkText}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>
      {subtitle && (
        <p className="text-xs md:text-sm text-text-muted tracking-widest uppercase">
          {subtitle}
        </p>
      )}
    </div>
  );
}
