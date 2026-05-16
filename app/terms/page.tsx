import Link from "next/link";

export const metadata = {
  title: "利用規約 — AUN",
};

export default function TermsPage() {
  return (
    <div className="bg-bg min-h-screen">
      <div className="px-6 md:px-8 lg:px-12 pt-8 md:pt-16 pb-32 md:pb-24 max-w-[800px] mx-auto">
        <div className="flex flex-col gap-2 mb-8 md:mb-12">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Terms of Service
          </span>
          <h1 className="font-display font-bold text-[28px] md:text-[60px] md:leading-none md:tracking-tight text-accent">
            利用規約
          </h1>
          <p className="font-body text-sm text-text-muted leading-relaxed mt-2">
            本ページは下書きです。正式な利用規約は順次掲載されます。
          </p>
        </div>

        <article className="flex flex-col gap-8 font-body text-base text-text-primary leading-relaxed">
          <Section title="第1条 （本規約の適用）">
            <p>
              本利用規約（以下「本規約」といいます）は、AUN（以下「当サービス」といいます）の利用条件を定めるものです。利用者は、本規約に同意の上、当サービスをご利用ください。
            </p>
          </Section>

          <Section title="第2条 （年齢制限）">
            <p>
              当サービスは20歳以上の方を対象としています。20歳未満の方の利用、および20歳未満の方への飲酒の勧誘は固くお断りいたします。
            </p>
          </Section>

          <Section title="第3条 （アカウント）">
            <p>
              利用者は、登録情報を正確に提供し、最新の状態に保つ責任を負います。アカウントの不正利用が疑われる場合は、ただちに当サービスにご連絡ください。
            </p>
          </Section>

          <Section title="第4条 （禁止事項）">
            <p>
              当サービスを利用するにあたり、法令違反、第三者の権利侵害、虚偽情報の登録、他の利用者への迷惑行為等を禁止します。
            </p>
          </Section>

          <Section title="第5条 （免責事項）">
            <p>
              当サービスは情報提供を目的としており、ペアリング情報や推奨事項の正確性・完全性を保証するものではありません。利用者ご自身の判断と責任においてご利用ください。
            </p>
          </Section>

          <Section title="第6条 （規約の変更）">
            <p>
              当サービスは、必要に応じて本規約を変更することがあります。変更後の規約は本ページで掲示された時点から効力を生じます。
            </p>
          </Section>

          <Section title="第7条 （アフィリエイトプログラム）">
            <p>
              AUNは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
            </p>
            <p className="mt-3">
              また、AUNは楽天市場をはじめとする各サービスを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、楽天アフィリエイトの参加者です。
            </p>
          </Section>
        </article>

        <p className="mt-12 font-body text-sm text-text-muted">
          最終更新日：2026年5月16日 ・{" "}
          <Link href="/" className="text-accent hover:text-accent-hover">
            ホームに戻る
          </Link>
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display font-bold text-lg md:text-xl text-accent">
        {title}
      </h2>
      <div className="text-sm md:text-base text-text-secondary">{children}</div>
    </section>
  );
}
