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
    active: true,
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
    label: "記録",
    href: "/records",
    icon: (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
        <rect
          x="2"
          y="2"
          width="17"
          height="17"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M7 7h7M7 10.5h7M7 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "タイプ診断",
    href: "/diagnosis",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function BottomNavBar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border">
      <ul className="flex items-center justify-around h-20 px-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`flex flex-col items-center gap-1.5 text-[11px] ${
                item.active
                  ? "text-accent font-medium"
                  : "text-text-muted hover:text-text-secondary"
              } transition-colors`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
