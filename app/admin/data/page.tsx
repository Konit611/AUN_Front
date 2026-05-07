"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { apiFetch, apiPost, ApiError } from "@/app/lib/api";

type Counts = Record<string, number>;

interface ExportPayload {
  version: number;
  exported_at: string;
  counts: Counts;
  tables: Record<string, unknown[]>;
}

interface ImportResult {
  version: number;
  imported_at: string;
  inserted: Counts;
  updated: Counts;
}

export default function AdminDataPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<"export" | "import" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exportInfo, setExportInfo] = useState<ExportPayload | null>(null);
  const [importInfo, setImportInfo] = useState<ImportResult | null>(null);

  async function onExport() {
    setError(null);
    setBusy("export");
    try {
      const data = await apiFetch<ExportPayload>("/admin/data/export");
      setExportInfo(data);
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = data.exported_at.slice(0, 19).replace(/[:T]/g, "-");
      a.href = url;
      a.download = `aun-export-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? `エクスポート失敗 (${err.status}: ${err.message})`
          : "エクスポート失敗",
      );
    } finally {
      setBusy(null);
    }
  }

  async function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (
      !confirm(
        `「${file.name}」を読み込みます。同じ ID の行は上書きされます。続行しますか？`,
      )
    )
      return;
    setError(null);
    setImportInfo(null);
    setBusy("import");
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      const result = await apiPost<ImportResult>(
        "/admin/data/import",
        payload,
      );
      setImportInfo(result);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? `インポート失敗 (${err.status}: ${err.message})`
          : err instanceof Error
            ? `インポート失敗: ${err.message}`
            : "インポート失敗",
      );
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <Link
        href="/admin"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← ダッシュボードに戻る
      </Link>

      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          データ管理
        </h1>
        <p className="font-body text-sm md:text-base text-text-secondary mt-2">
          全 12 テーブル（ユーザー・日記・銘柄・肴・記事・ペアリング 等）を
          1 つの JSON ファイルとして書き出し / 読み込みします。
        </p>
      </div>

      {/* Export */}
      <section className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-display font-bold text-lg text-accent">
            エクスポート
          </h2>
          <p className="font-body text-sm text-text-secondary">
            現在の DB を丸ごと JSON にしてダウンロード。バックアップや別環境への移行に。
          </p>
        </div>
        <button
          type="button"
          onClick={onExport}
          disabled={busy !== null}
          className="self-start px-6 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover disabled:opacity-50 transition-colors"
        >
          {busy === "export" ? "書き出し中..." : "全データを書き出す"}
        </button>
        {exportInfo && <CountsBlock label="書き出し結果" counts={exportInfo.counts} />}
      </section>

      {/* Import */}
      <section className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-display font-bold text-lg text-accent">
            インポート
          </h2>
          <p className="font-body text-sm text-text-secondary">
            書き出した JSON を読み込んで復元。同一 ID の行は上書き、
            DB に無い行は新規作成（upsert）。安全に再実行可能。
          </p>
          <p className="font-body text-xs text-amber-700 mt-1">
            ⚠ 既存データの DELETE は行いません。完全リセットしたい場合は
            事前に DB を空にしてからインポートしてください。
          </p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={onImport}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy !== null}
          className="self-start px-6 py-2.5 rounded-full border border-accent font-body font-medium text-sm text-accent hover:bg-accent/5 disabled:opacity-50 transition-colors"
        >
          {busy === "import" ? "読み込み中..." : "JSON ファイルから復元"}
        </button>
        {importInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CountsBlock label="新規作成" counts={importInfo.inserted} />
            <CountsBlock label="上書き更新" counts={importInfo.updated} />
          </div>
        )}
      </section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 font-body text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

function CountsBlock({ label, counts }: { label: string; counts: Counts }) {
  const entries = Object.entries(counts).filter(([, v]) => v > 0);
  return (
    <div className="bg-surface-raised/40 border border-border rounded-lg p-4 flex flex-col gap-2">
      <span className="font-body font-bold text-[10px] tracking-[2.4px] uppercase text-accent/60">
        {label}
      </span>
      {entries.length === 0 ? (
        <span className="font-body text-xs text-text-muted">— なし</span>
      ) : (
        <ul className="flex flex-col gap-1">
          {entries.map(([k, v]) => (
            <li
              key={k}
              className="flex justify-between gap-2 font-body text-xs text-text-secondary"
            >
              <span>{k}</span>
              <span className="text-accent tabular-nums font-medium">
                {v.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
