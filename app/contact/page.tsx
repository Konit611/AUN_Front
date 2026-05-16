import Link from "next/link";

export const metadata = {
  title: "お問い合わせ — AUN",
};

const CONTACT_EMAIL = "konit611@gmail.com";

export default function ContactPage() {
  return (
    <div className="bg-bg min-h-screen">
      <div className="px-6 md:px-8 lg:px-12 pt-8 md:pt-16 pb-32 md:pb-24 max-w-[800px] mx-auto">
        <div className="flex flex-col gap-2 mb-8 md:mb-12">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Contact
          </span>
          <h1 className="font-display font-bold text-[28px] md:text-[60px] md:leading-none md:tracking-tight text-accent">
            お問い合わせ
          </h1>
          <p className="font-body text-sm text-text-muted leading-relaxed mt-2">
            ご質問・ご感想・不具合のご報告など、お気軽にご連絡ください。
          </p>
        </div>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group block bg-surface border border-border rounded-xl px-6 py-6 md:px-8 md:py-8 transition-colors duration-200 hover:border-accent"
        >
          <div className="flex flex-col gap-2">
            <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
              Email
            </span>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-display font-bold text-xl md:text-2xl text-accent break-all">
                {CONTACT_EMAIL}
              </span>
              <span className="font-body text-sm text-text-muted opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                →
              </span>
            </div>
            <p className="font-body text-sm text-text-secondary leading-relaxed mt-1">
              通常2〜3営業日以内にご返信いたします。
              <br />
              内容によってはお時間をいただく場合がございます。
            </p>
          </div>
        </a>

        <p className="mt-12 font-body text-sm text-text-muted">
          <Link href="/" className="text-accent hover:text-accent-hover">
            ホームに戻る
          </Link>
        </p>
      </div>
    </div>
  );
}
