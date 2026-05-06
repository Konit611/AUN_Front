"use client";

import type { AdminArticleBlock } from "@/app/lib/types";

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-border bg-surface font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors";

interface Props {
  blocks: AdminArticleBlock[];
  onChange: (next: AdminArticleBlock[]) => void;
}

const TYPE_LABELS: Record<AdminArticleBlock["type"], string> = {
  paragraph: "段落",
  heading: "見出し",
  image: "画像",
  quote: "引用",
};

const NEW_BLOCKS: Record<AdminArticleBlock["type"], () => AdminArticleBlock> = {
  paragraph: () => ({ type: "paragraph", text: "" }),
  heading: () => ({ type: "heading", text: "" }),
  image: () => ({ type: "image", emoji: "🍶", caption: "", image_url: "" }),
  quote: () => ({ type: "quote", text: "", author: "" }),
};

export default function ArticleBlockEditor({ blocks, onChange }: Props) {
  function update(idx: number, next: AdminArticleBlock) {
    const arr = [...blocks];
    arr[idx] = next;
    onChange(arr);
  }
  function remove(idx: number) {
    onChange(blocks.filter((_, i) => i !== idx));
  }
  function move(idx: number, dir: -1 | 1) {
    const ni = idx + dir;
    if (ni < 0 || ni >= blocks.length) return;
    const arr = [...blocks];
    [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
    onChange(arr);
  }
  function add(type: AdminArticleBlock["type"]) {
    onChange([...blocks, NEW_BLOCKS[type]()]);
  }

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, idx) => (
        <div
          key={idx}
          className="bg-surface-raised/30 border border-border rounded-xl p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
              #{idx + 1} {TYPE_LABELS[block.type]}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => move(idx, -1)}
                disabled={idx === 0}
                className="px-2 py-1 text-xs text-text-muted hover:text-accent disabled:opacity-30 transition-colors"
                aria-label="上へ"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(idx, 1)}
                disabled={idx === blocks.length - 1}
                className="px-2 py-1 text-xs text-text-muted hover:text-accent disabled:opacity-30 transition-colors"
                aria-label="下へ"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="px-2 py-1 text-xs text-text-muted hover:text-red-600 transition-colors"
                aria-label="削除"
              >
                ×
              </button>
            </div>
          </div>

          {block.type === "paragraph" && (
            <textarea
              value={block.text}
              onChange={(e) => update(idx, { ...block, text: e.target.value })}
              required
              rows={3}
              placeholder="段落のテキスト..."
              className={`${inputCls} resize-y`}
            />
          )}

          {block.type === "heading" && (
            <input
              type="text"
              value={block.text}
              onChange={(e) => update(idx, { ...block, text: e.target.value })}
              required
              placeholder="見出しのテキスト"
              className={`${inputCls} font-display font-bold text-base`}
            />
          )}

          {block.type === "image" && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={block.emoji}
                  onChange={(e) =>
                    update(idx, { ...block, emoji: e.target.value })
                  }
                  required
                  placeholder="🍶"
                  maxLength={10}
                  className={`${inputCls} text-2xl w-20 text-center`}
                />
                <input
                  type="text"
                  value={block.caption}
                  onChange={(e) =>
                    update(idx, { ...block, caption: e.target.value })
                  }
                  required
                  placeholder="キャプション"
                  className={`${inputCls} flex-1`}
                />
              </div>
              <input
                type="url"
                value={block.image_url ?? ""}
                onChange={(e) =>
                  update(idx, { ...block, image_url: e.target.value })
                }
                placeholder="画像URL (任意 — 空欄なら絵文字プレースホルダー)"
                className={inputCls}
              />
            </div>
          )}

          {block.type === "quote" && (
            <div className="flex flex-col gap-2">
              <textarea
                value={block.text}
                onChange={(e) =>
                  update(idx, { ...block, text: e.target.value })
                }
                required
                rows={2}
                placeholder="引用のテキスト"
                className={`${inputCls} italic resize-y`}
              />
              <input
                type="text"
                value={block.author}
                onChange={(e) =>
                  update(idx, { ...block, author: e.target.value })
                }
                required
                placeholder="出典 / 著者"
                className={inputCls}
              />
            </div>
          )}
        </div>
      ))}

      {blocks.length === 0 && (
        <p className="font-body text-sm text-text-muted text-center py-6">
          まだブロックがありません。下のボタンから追加してください。
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {(Object.keys(TYPE_LABELS) as AdminArticleBlock["type"][]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => add(t)}
            className="px-4 py-2 rounded-full border border-border font-body text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
          >
            + {TYPE_LABELS[t]}
          </button>
        ))}
      </div>
    </div>
  );
}
