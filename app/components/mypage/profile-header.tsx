import Link from "next/link";
import { getPersona, isValidCode } from "@/app/lib/persona";
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
    <section className="flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start py-8 md:py-12 border-b border-border">
      <Avatar avatarUrl={user.avatar_url} initial={initial} alt={displayName} />

      <div className="flex flex-col gap-3 flex-1 items-center md:items-start text-center md:text-left">
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

        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 font-body text-sm text-text-secondary">
          <span>
            <b className="text-accent font-bold">{entryCount}</b>{" "}
            <span className="text-text-muted">件の記録</span>
          </span>
          {persona ? (
            <Link
              href={`/result/${persona.code}`}
              className="hover:text-accent transition-colors"
            >
              <b className="text-accent font-bold">{persona.code}</b>
              <span className="text-text-muted"> ・ {persona.name}</span>
            </Link>
          ) : (
            <Link
              href="/diagnosis"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              タイプ診断を受ける →
            </Link>
          )}
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
    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-accent flex items-center justify-center shrink-0 overflow-hidden">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-display font-bold text-3xl md:text-5xl text-white">
          {initial}
        </span>
      )}
    </div>
  );
}
