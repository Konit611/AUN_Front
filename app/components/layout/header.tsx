"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LinkButton from "@/app/components/ui/link-button";
import { logout, useMe } from "@/app/lib/auth";

const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "日本酒図鑑", href: "/encyclopedia" },
  { label: "読みもの", href: "/articles" },
  { label: "ペアリングガイド", href: "/pairing" },
  { label: "マイページ", href: "/mypage" },
];

/** Detail pages: hide the default header on mobile */
const detailPatterns = [
  /^\/encyclopedia\/.+/,
  /^\/articles\/.+/,
  /^\/pairing\/.+/,
  /^\/mypage\/.+/,
  /^\/result\/.+/,
  /^\/diagnosis/,
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, refetch } = useMe();
  const isDetail = detailPatterns.some((p) => p.test(pathname));

  async function onLogout() {
    try {
      await logout();
    } finally {
      await refetch();
      router.push("/");
      router.refresh();
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-bg/95 backdrop-blur-sm ${
        isDetail ? "hidden md:block" : ""
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 h-16 md:h-[92px] max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-2xl md:text-[28px] text-text-primary">
          AUN
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-base text-text-primary hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="font-body text-sm text-text-secondary">
                {user.username}
              </span>
              <button
                onClick={onLogout}
                className="font-body text-sm text-text-secondary hover:text-accent transition-colors cursor-pointer"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline font-body text-sm text-text-primary hover:text-accent transition-colors"
            >
              ログイン
            </Link>
          )}
          <LinkButton variant="primary" size="sm" href="/diagnosis">
            タイプ診断
          </LinkButton>
        </div>
      </nav>
      <div className="h-px bg-border" />
    </header>
  );
}
