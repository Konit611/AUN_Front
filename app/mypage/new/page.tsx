import NewEntryForm from "@/app/components/mypage/new-entry-form";
import DetailHeader from "@/app/components/layout/detail-header";

export default function NewEntryPage() {
  return (
    <div className="bg-bg min-h-screen">
      <DetailHeader backHref="/mypage" title="新しい記録" />

      {/* Desktop title */}
      <div className="hidden md:flex flex-col items-center gap-4 pt-12 pb-4">
        <span className="text-base text-text-secondary tracking-[3.2px] uppercase font-body opacity-70">
          Journal Entry
        </span>
        <h1 className="font-display font-bold text-5xl text-accent tracking-tight">
          新しい記録
        </h1>
        <div className="w-12 h-px bg-accent/20 mt-2" />
      </div>

      {/* Form */}
      <div className="px-6 md:px-6 pb-40 md:pb-24 max-w-[672px] mx-auto pt-2 md:pt-16">
        <NewEntryForm />
      </div>

      {/* Mobile fixed bottom button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-bg via-bg to-bg/0 px-6 pb-8 pt-12">
        <button
          type="submit"
          className="w-full py-4 bg-accent text-white font-body font-bold text-base rounded-full shadow-[0_8px_30px_rgba(43,58,103,0.2)] hover:bg-accent-hover transition-colors"
        >
          保存する
        </button>
      </div>
    </div>
  );
}
