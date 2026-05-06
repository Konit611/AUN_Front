"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "ホーム",
    href: "/",
    icon: (
      <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
        <path
          d="M1 6.5L7.5 1L14 6.5V15C14 15.5523 13.5523 16 13 16H2C1.44772 16 1 15.5523 1 15V6.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "日本酒図鑑",
    href: "/encyclopedia",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "読みもの",
    href: "/articles",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M2 3C2 2.44772 2.44772 2 3 2H8V16H3C2.44772 16 2 15.5523 2 15V3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 2H15C15.5523 2 16 2.44772 16 3V15C16 15.5523 15.5523 16 15 16H8V2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "ペアリング",
    href: "/pairing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M5 1V4C5 6.20914 6.79086 8 9 8C11.2091 8 13 6.20914 13 4V1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 8V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 17H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 14V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 4H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "肴帖",
    href: "/sakana",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M3 6C3 4.89543 3.89543 4 5 4H13C14.1046 4 15 4.89543 15 6V13C15 14.1046 14.1046 15 13 15H5C3.89543 15 3 14.1046 3 13V6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M3 8H15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 4V2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 4V2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav aria-label="モバイルナビゲーション" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border">
      <ul className="flex items-center justify-around h-20 px-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center gap-1.5 text-[11px] ${
                  isActive
                    ? "text-accent font-medium"
                    : "text-text-muted hover:text-text-secondary"
                } transition-colors`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
