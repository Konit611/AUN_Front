"use client";

import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/app/lib/api";
import type { PaginatedResponse, SakeListItem } from "@/app/lib/types";

function inputClass() {
  return "w-full bg-surface border border-border md:border-border/30 rounded-lg md:rounded-[32px] px-4 md:px-5 py-4 md:py-5 text-sm md:text-base font-body text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent transition-colors";
}

export interface SakePickerProps {
  onSelect: (sake: SakeListItem) => void;
  onManual: () => void;
}

export default function SakePicker({ onSelect, onManual }: SakePickerProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SakeListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setSearched(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await apiFetch<PaginatedResponse<SakeListItem>>(
          `/sake?search=${encodeURIComponent(q)}&page_size=8`,
        );
        if (!controller.signal.aborted) {
          setResults(res.items);
          setSearched(true);
        }
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
          setSearched(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  const showDropdown = query.trim().length > 0;

  return (
    <div ref={boxRef} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="日本酒を検索（銘柄・蔵元）"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={inputClass()}
        autoComplete="off"
      />

      {showDropdown && (
        <div className="bg-surface border border-border md:border-border/30 rounded-lg md:rounded-2xl overflow-hidden">
          {loading && (
            <p className="px-4 py-4 text-sm font-body text-text-muted">検索中...</p>
          )}

          {!loading &&
            results.map((sake) => (
              <button
                key={sake.id}
                type="button"
                onClick={() => onSelect(sake)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent-light transition-colors border-b border-border/40 last:border-b-0"
              >
                <span className="w-10 h-10 shrink-0 rounded-md bg-surface-raised overflow-hidden flex items-center justify-center">
                  {sake.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sake.imageUrl}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-text-muted">酒</span>
                  )}
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="text-sm font-body font-medium text-text-primary truncate">
                    {sake.name}
                  </span>
                  <span className="text-xs font-body text-text-muted truncate">
                    {[sake.brewery, sake.region].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </button>
            ))}

          {!loading && searched && results.length === 0 && (
            <p className="px-4 py-4 text-sm font-body text-text-muted">
              該当する日本酒が見つかりませんでした。
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onManual}
        className="self-end text-sm font-body text-accent underline underline-offset-4 hover:text-accent-hover transition-colors"
      >
        見つからない場合は手動で入力
      </button>
    </div>
  );
}
