import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError, apiFetch } from "@/app/lib/api";
import type { AuthUser } from "@/app/lib/auth";
import type { JournalEntry, PaginatedResponse } from "@/app/lib/types";
import JournalEmptyState from "@/app/components/mypage/journal-empty-state";
import JournalHeader from "@/app/components/mypage/journal-header";
import JournalGrid from "@/app/components/mypage/journal-grid";
import ProfileHeader from "@/app/components/mypage/profile-header";
import FabButton from "@/app/components/mypage/fab-button";

export default async function MyPage() {
  const cookie = (await cookies()).toString();

  let user: AuthUser;
  try {
    user = await apiFetch<AuthUser>("/auth/me", { cookie });
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login?next=/mypage");
    }
    throw err;
  }

  let entries: JournalEntry[];
  try {
    const data = await apiFetch<PaginatedResponse<JournalEntry>>("/journal", {
      cookie,
    });
    entries = data.items;
  } catch {
    entries = [];
  }
  const isEmpty = entries.length === 0;

  return (
    <div className="bg-bg min-h-screen">
      <div className="px-6 md:px-8 pt-6 md:pt-0 pb-32 md:pb-48 max-w-[1280px] mx-auto">
        <ProfileHeader user={user} entryCount={entries.length} />

        {/* Mobile-only journal section title (replaces the old top bar). */}
        <h2 className="md:hidden font-display font-bold text-2xl text-accent tracking-tight pt-8">
          私の記録
        </h2>

        {isEmpty ? (
          <JournalEmptyState />
        ) : (
          <div className="flex flex-col gap-6 md:gap-12 pt-6 md:pt-12">
            <JournalHeader entryCount={entries.length} />
            <JournalGrid entries={entries} />
          </div>
        )}
      </div>

      {!isEmpty && <FabButton />}
    </div>
  );
}
