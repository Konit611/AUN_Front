import Link from "next/link";
import PairingForm from "@/app/components/admin/pairing-form";

export default function AdminPairingNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/pairing"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← 一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        新規ペアリングを追加
      </h1>
      <PairingForm />
    </div>
  );
}
