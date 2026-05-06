import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-accent">
          ようこそ
        </h1>
        <p className="font-body text-sm md:text-base text-text-secondary mt-2">
          AUN のコンテンツを管理します。左メニューから対象を選んでください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashCard
          href="/admin/sake"
          title="日本酒"
          description="銘柄の追加・編集、味わいの 5 軸、ペアリング設定"
        />
        <DashCard
          href="/admin/sakana"
          title="肴帖"
          description="食材プロファイル 6 軸と調理レシピ（材料・作り方）"
        />
        <DashCard
          href="/admin/pairing"
          title="ペアリングガイド"
          description="キュレーションされたペアリング記事の管理"
        />
      </div>
    </div>
  );
}

function DashCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-surface border border-border rounded-2xl p-6 hover:border-accent transition-colors"
    >
      <h2 className="font-display font-bold text-xl text-accent mb-2">
        {title}
      </h2>
      <p className="font-body text-sm text-text-secondary leading-6">
        {description}
      </p>
    </Link>
  );
}
