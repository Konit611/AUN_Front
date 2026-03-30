const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="hidden md:block bg-bg border-t border-border">
      <div className="flex items-center justify-between px-12 py-10 max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-3">
          <span className="font-display font-bold text-2xl text-text-primary">
            AUN
          </span>
          <p className="text-sm text-text-muted">
            © 2026 AUN Sake. GEUNIL PARK
          </p>
        </div>
        <ul className="flex items-center gap-8">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
