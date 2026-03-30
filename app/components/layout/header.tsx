import Button from "@/app/components/ui/button";

const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "日本酒図鑑", href: "/encyclopedia" },
  { label: "ストーリー", href: "/story" },
  { label: "AUN ブログ", href: "/blog" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 md:px-12 h-16 md:h-[92px] max-w-[1280px] mx-auto">
        {/* Logo */}
        <a href="/" className="font-display font-bold text-2xl md:text-[28px] text-text-primary">
          AUN
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-base text-text-primary hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button variant="primary" size="sm" href="/diagnosis">
          タイプ診断
        </Button>
      </nav>
      <div className="h-px bg-border" />
    </header>
  );
}
