"use client";

import dynamic from "next/dynamic";
import type { Ref } from "react";
import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";

export interface RichEditorHandle {
  getJSON: () => PartialBlock[];
  getHTML: () => string;
  editor: BlockNoteEditor;
}

export interface RichEditorProps {
  initialContent?: PartialBlock[] | null;
  uploadPrefix?: string;
  ref?: Ref<RichEditorHandle>;
}

// BlockNote touches `window` during initialisation, so it can't run during SSR.
// Defer to a client-only dynamic import; show a placeholder while it loads.
const RichEditorInner = dynamic(() => import("./rich-editor-inner"), {
  ssr: false,
  loading: () => (
    <div className="bg-surface border border-border rounded-xl min-h-[400px] flex items-center justify-center">
      <span className="font-body text-sm text-text-muted">
        エディタを読み込み中…
      </span>
    </div>
  ),
});

export default function RichEditor(props: RichEditorProps) {
  return <RichEditorInner {...props} />;
}
