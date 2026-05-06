import Link from "next/link";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border pb-24 md:pb-0">
      <div className="flex flex-col md:flex-row items-center md:justify-between px-6 md:px-12 py-6 md:py-10 max-w-[1280px] mx-auto gap-4">
        <div className="flex flex-col items-center md:items-start gap-1 md:gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-accent hover:opacity-80 transition-opacity"
          >
            <svg
              viewBox="0 0 400 400"
              className="w-5 h-5 shrink-0 translate-y-0.5"
              aria-hidden="true"
            >
              <mask id="aun-footer-cutout">
                <rect width="400" height="400" fill="white" />
                <circle cx="200" cy="200" r="60" fill="black" />
              </mask>
              <path
                d="M0 100C0 44.7715 44.7715 0 100 0H400V300C400 355.228 355.228 400 300 400H0V100Z"
                fill="currentColor"
                mask="url(#aun-footer-cutout)"
              />
            </svg>
            <span className="font-display font-bold text-2xl leading-none">
              AUN
            </span>
          </Link>
          <p className="text-sm text-text-muted">
            © 2026 AUN Sake. GEUNIL PARK
          </p>
        </div>
        <ul className="flex items-center gap-6 md:gap-8">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs md:text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
