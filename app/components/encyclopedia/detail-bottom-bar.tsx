"use client";

export default function DetailBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-accent/85 backdrop-blur-sm rounded-t-[48px] shadow-[0px_-20px_40px_0px_rgba(43,58,103,0.06)]">
      <div className="flex items-center px-8 py-4">
        <button className="flex flex-col items-center gap-1 px-6 py-2">
          <BookmarkIcon />
          <span className="font-body font-medium text-[10px] text-white/70 tracking-wider uppercase">
            Add to Collection
          </span>
        </button>
        <a
          href="#"
          className="flex-1 max-w-[240px] bg-white rounded-full py-3 flex items-center justify-center gap-2"
        >
          <span className="font-body font-bold text-sm text-accent tracking-wider uppercase leading-5">
            購入<br />する
          </span>
          <ArrowIcon />
        </a>
        <button className="flex flex-col items-center gap-1 px-6 py-2">
          <ShareIcon />
          <span className="font-body font-medium text-[10px] text-white/70 tracking-wider uppercase">
            Purchase
          </span>
        </button>
      </div>
    </div>
  );
}

function BookmarkIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
      <path
        d="M1 3C1 1.89543 1.89543 1 3 1H11C12.1046 1 13 1.89543 13 3V17L7 13L1 17V3Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M2 5h6M5 2l3 3-3 3"
        stroke="#142450"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path
        d="M1 10V17C1 18.1046 1.89543 19 3 19H13C14.1046 19 15 18.1046 15 17V10"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 1V13M4 5L8 1L12 5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
