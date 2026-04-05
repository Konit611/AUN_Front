import { apiFetch } from "@/app/lib/api";
import type { JournalEntry } from "@/app/lib/types";
import JournalEmptyState from "@/app/components/mypage/journal-empty-state";
import JournalHeader from "@/app/components/mypage/journal-header";
import JournalGrid from "@/app/components/mypage/journal-grid";
import FabButton from "@/app/components/mypage/fab-button";

export default async function MyPage() {
  const entries = await apiFetch<JournalEntry[]>("/journal");
  const isEmpty = entries.length === 0;

  return (
    <div className="bg-bg min-h-screen">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
            <path d="M1 1h20M1 8h14M1 15h20" strokeLinecap="round" />
          </svg>
          <h1 className="font-display font-bold text-2xl text-accent tracking-tight">
            私の記録
          </h1>
        </div>
        <button className="text-sm text-accent/70 font-body">
          Export
        </button>
      </div>

      {isEmpty ? (
        <JournalEmptyState />
      ) : (
        <div className="px-6 md:px-8 pb-32 md:pb-48 max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-16 pt-2 md:pt-12">
            <JournalHeader entryCount={entries.length} />
            <JournalGrid entries={entries} />
          </div>
        </div>
      )}

      {!isEmpty && <FabButton />}
    </div>
  );
}
