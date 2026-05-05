import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import DetailHeader from "@/app/components/layout/detail-header";
import NewEntryForm from "@/app/components/mypage/new-entry-form";
import { apiFetch } from "@/app/lib/api";
import type { JournalEntry } from "@/app/lib/types";

interface JournalEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function JournalEditPage({ params }: JournalEditPageProps) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  let entry: JournalEntry;
  try {
    entry = await apiFetch<JournalEntry>(`/journal/${id}`, { cookie });
  } catch {
    notFound();
  }

  return (
    <div className="bg-bg min-h-screen">
      <DetailHeader backHref={`/mypage/${id}`} title="記録を編集" />

      <div className="hidden md:flex flex-col items-center gap-4 pt-12 pb-4">
        <span className="text-base text-text-secondary tracking-[3.2px] uppercase font-body opacity-70">
          Edit Entry
        </span>
        <h1 className="font-display font-bold text-5xl text-accent tracking-tight">
          記録を編集
        </h1>
        <div className="w-12 h-px bg-accent/20 mt-2" />
      </div>

      <div className="px-6 md:px-6 pb-40 md:pb-24 max-w-[672px] mx-auto pt-2 md:pt-16">
        <NewEntryForm initialEntry={entry} />
      </div>
    </div>
  );
}
