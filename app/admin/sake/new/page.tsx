import Link from "next/link";
import SakeForm from "@/app/components/admin/sake-form";

export default function AdminSakeNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/sake"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← 一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        新規日本酒を追加
      </h1>
      <SakeForm />
    </div>
  );
}
