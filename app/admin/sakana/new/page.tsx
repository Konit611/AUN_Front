import Link from "next/link";
import SakanaForm from "@/app/components/admin/sakana-form";

export default function AdminSakanaNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/sakana"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← 一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        新規肴を追加
      </h1>
      <SakanaForm />
    </div>
  );
}
