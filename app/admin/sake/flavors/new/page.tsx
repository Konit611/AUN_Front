import Link from "next/link";
import FlavorForm from "@/app/components/admin/flavor-form";

export default function AdminFlavorNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/sake/flavors"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← タグ一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        新規タグを追加
      </h1>
      <FlavorForm />
    </div>
  );
}
