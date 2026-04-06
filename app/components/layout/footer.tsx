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
          <span className="font-display font-bold text-2xl text-text-primary">
            AUN
          </span>
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
