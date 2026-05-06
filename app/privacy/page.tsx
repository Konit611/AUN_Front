import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー — AUN",
};

export default function PrivacyPage() {
  return (
    <div className="bg-bg min-h-screen">
      <div className="px-6 md:px-8 lg:px-12 pt-8 md:pt-16 pb-32 md:pb-24 max-w-[800px] mx-auto">
        <div className="flex flex-col gap-2 mb-8 md:mb-12">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Privacy Policy
          </span>
          <h1 className="font-display font-bold text-[28px] md:text-[60px] md:leading-none md:tracking-tight text-accent">
            プライバシーポリシー
          </h1>
          <p className="font-body text-sm text-text-muted leading-relaxed mt-2">
            本ページは下書きです。正式なポリシーは順次掲載されます。
          </p>
        </div>

        <article className="flex flex-col gap-8 font-body text-base text-text-primary leading-relaxed">
          <Section title="1. 取得する情報">
            <p>
              当サービスは、利用者から以下の情報を取得します：メールアドレス、ユーザー名、生年月日、ハッシュ化されたパスワード、利用履歴（記録した日本酒・ペアリングなど）、診断結果。
            </p>
          </Section>

          <Section title="2. 利用目的">
            <p>
              取得した情報は、本人確認、年齢確認、サービスの提供・改善、利用者への通知、診断結果に基づくおすすめのご案内のために利用します。
            </p>
          </Section>

          <Section title="3. 第三者提供">
            <p>
              法令に基づく場合を除き、利用者の同意なく個人情報を第三者へ提供することはありません。
            </p>
          </Section>

          <Section title="4. 安全管理">
            <p>
              個人情報の漏洩、滅失、毀損を防止するため、必要かつ適切な安全管理措置を講じます。パスワードは平文では保存せず、ハッシュ化した上で管理します。
            </p>
          </Section>

          <Section title="5. 開示・訂正・削除">
            <p>
              利用者は、当サービスに対し、自身の個人情報の開示、訂正、削除を求めることができます。マイページから直接編集できる項目もございます。
            </p>
          </Section>

          <Section title="6. Cookie の利用">
            <p>
              当サービスは、ログイン状態の維持等のため Cookie
              を使用します。これらは利用者の操作に必要な範囲に限定されます。
            </p>
          </Section>

          <Section title="7. お問い合わせ">
            <p>
              本ポリシーに関するお問い合わせは、{" "}
              <Link
                href="/contact"
                className="text-accent hover:text-accent-hover"
              >
                お問い合わせフォーム
              </Link>{" "}
              よりご連絡ください。
            </p>
          </Section>
        </article>

        <p className="mt-12 font-body text-sm text-text-muted">
          最終更新日：2026年5月6日 ・{" "}
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
