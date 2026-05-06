import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="bg-bg min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center flex flex-col gap-4">
        <span className="font-body font-bold text-[10px] tracking-[2.4px] uppercase text-accent/60">
          403 Forbidden
        </span>
        <h1 className="font-display font-bold text-3xl text-accent">
          管理者権限が必要です
        </h1>
        <p className="font-body text-sm text-text-secondary leading-6">
          このページは管理者のみアクセスできます。アカウントに権限がないか、ログインしていません。
        </p>
        <div className="flex gap-3 justify-center mt-2">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-accent text-white font-body text-sm hover:bg-accent-hover transition-colors"
          >
            ホームへ
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full border border-border font-body text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
