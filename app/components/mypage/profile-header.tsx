import Link from "next/link";
import { getPersona, getPersonaColors, isValidCode } from "@/app/lib/persona";
import type { AuthUser } from "@/app/lib/auth";

interface Props {
  user: AuthUser;
  entryCount: number;
}

export default function ProfileHeader({ user, entryCount }: Props) {
  const persona =
    user.persona_code && isValidCode(user.persona_code)
      ? getPersona(user.persona_code)
      : null;
  const initial = user.username.slice(0, 1).toUpperCase();
  const displayName = user.display_name?.trim() || user.username;
  const showHandle = displayName !== user.username;

  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-12 items-center md:items-start py-8 md:py-12 border-b border-border">
      {/* Mobile: persona chip floats above the avatar as a "type label". */}
      <div className="md:hidden">
        {persona ? <PersonaChip persona={persona} /> : <DiagnosisChip />}
      </div>

      <Avatar avatarUrl={user.avatar_url} initial={initial} alt={displayName} />

      <div className="flex flex-col gap-3 flex-1 items-center md:items-start text-center md:text-left">
        {/* Desktop: same chip sits at the top of the right column. */}
        <div className="hidden md:block">
          {persona ? <PersonaChip persona={persona} /> : <DiagnosisChip />}
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
          <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
            {displayName}
          </h1>
          <Link
            href="/mypage/edit"
            className="inline-flex items-center justify-center px-5 py-1.5 rounded-full border border-border font-body font-medium text-sm text-text-primary hover:border-accent hover:text-accent transition-colors"
          >
            プロフィール編集
          </Link>
        </div>

        {showHandle && (
          <span className="font-body text-sm text-text-muted">
            @{user.username}
          </span>
        )}

        <div className="font-body text-sm">
          <b className="text-accent font-bold">{entryCount}</b>
          <span className="text-text-muted"> 件の記録</span>
        </div>

        {user.bio && (
          <p className="font-body text-sm text-text-primary whitespace-pre-line max-w-prose">
            {user.bio}
          </p>
        )}
      </div>
    </section>
  );
}

function PersonaChip({
  persona,
}: {
  persona: NonNullable<ReturnType<typeof getPersona>>;
}) {
  const colors = getPersonaColors(persona.code);
  return (
    <Link
      href={`/result/${persona.code}`}
      className="group inline-flex items-center gap-2.5 pl-2.5 pr-4 py-1.5 rounded-full text-white shadow-[0_2px_8px_rgba(43,58,103,0.08)] hover:shadow-[0_4px_12px_rgba(43,58,103,0.16)] transition-shadow"
      style={{
        background: `linear-gradient(135deg, ${colors.gradientFrom} 0%, ${colors.gradientTo} 100%)`,
      }}
    >
      <span className="font-display font-bold text-[11px] tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
        {persona.code}
      </span>
      <span className="font-body font-medium text-xs md:text-sm whitespace-nowrap">
        {persona.name}
      </span>
    </Link>
  );
}

function DiagnosisChip() {
  return (
    <Link
      href="/diagnosis"
      className="group inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full border border-dashed border-border bg-surface/50 text-accent hover:border-accent hover:bg-surface transition-colors"
    >
      <span className="text-sm" aria-hidden="true">
        🍶
      </span>
      <span className="font-body font-medium text-xs md:text-sm">
        タイプ診断を受ける →
      </span>
    </Link>
  );
}

function Avatar({
  avatarUrl,
  initial,
  alt,
}: {
  avatarUrl: string | null;
  initial: string;
  alt: string;
}) {
  return (
    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center shrink-0 overflow-hidden">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-display font-bold text-2xl md:text-3xl text-white">
          {initial}
        </span>
      )}
    </div>
  );
}
