"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LinkButton from "@/app/components/ui/link-button";
import { logout, useMe, type AuthUser } from "@/app/lib/auth";

const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "日本酒図鑑", href: "/encyclopedia" },
  { label: "読みもの", href: "/articles" },
  { label: "ペアリングガイド", href: "/pairing" },
  { label: "肴帖", href: "/sakana" },
];

/** Detail pages: hide the default header on mobile */
const detailPatterns = [
  /^\/encyclopedia\/.+/,
  /^\/articles\/.+/,
  /^\/pairing\/.+/,
  /^\/sakana\/.+/,
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

        {/* Auth */}
        <div className="flex items-center">
          {user ? (
            <UserMenu user={user} onLogout={onLogout} />
          ) : (
            <LinkButton variant="primary" size="sm" href="/login">
              ログイン
            </LinkButton>
          )}
        </div>
      </nav>
      <div className="h-px bg-border" />
    </header>
  );
}

function UserMenu({
  user,
  onLogout,
}: {
  user: AuthUser;
  onLogout: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initial = user.username.slice(0, 1).toUpperCase();

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="ユーザーメニューを開く"
        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-accent text-white font-display font-bold text-base hover:bg-accent-hover transition-colors cursor-pointer"
      >
        {initial}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 mt-2 w-56 rounded-2xl border border-border bg-surface shadow-[0_8px_32px_rgba(43,58,103,0.12)] overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-border/60">
            <p className="font-body font-medium text-sm text-text-primary truncate">
              {user.username}
            </p>
            {user.email && (
              <p className="font-body text-xs text-text-muted truncate mt-0.5">
                {user.email}
              </p>
            )}
          </div>
          <Link
            role="menuitem"
            href="/mypage"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 font-body text-sm text-text-primary hover:bg-accent-light hover:text-accent transition-colors"
          >
            マイページ
          </Link>
          <button
            role="menuitem"
            type="button"
            onClick={async () => {
              setOpen(false);
              await onLogout();
            }}
            className="block w-full text-left px-4 py-2.5 font-body text-sm text-text-secondary hover:bg-accent-light hover:text-accent transition-colors cursor-pointer"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}
