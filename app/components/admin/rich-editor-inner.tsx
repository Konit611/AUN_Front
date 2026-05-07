"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useImperativeHandle } from "react";
import type { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import { uploadAdminImage } from "@/app/lib/admin-upload";
import type { RichEditorHandle, RichEditorProps } from "./rich-editor";

export default function RichEditorInner({
  initialContent,
  uploadPrefix = "articles",
  ref,
}: RichEditorProps) {
  const editor = useCreateBlockNote({
    initialContent:
      initialContent && initialContent.length > 0 ? initialContent : undefined,
    uploadFile: (file) => uploadAdminImage(file, uploadPrefix),
  });

  useImperativeHandle(
    ref,
    () => ({
      getJSON: () => editor.document as PartialBlock[],
      getHTML: () => editor.blocksToHTMLLossy(editor.document),
      editor,
    }),
    [editor],
  );

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden min-h-[400px] py-4">
      <BlockNoteView editor={editor} theme="light" />
    </div>
  );
}
