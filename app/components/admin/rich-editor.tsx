"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useImperativeHandle, type Ref } from "react";
import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import { apiPost } from "@/app/lib/api";

interface SignResponse {
  upload_url: string;
  public_url: string;
  key: string;
  headers: Record<string, string>;
  stub?: boolean;
}

export interface RichEditorHandle {
  getJSON: () => PartialBlock[];
  getHTML: () => string;
  editor: BlockNoteEditor;
}

interface RichEditorProps {
  initialContent?: PartialBlock[] | null;
  uploadPrefix?: string;
  ref?: Ref<RichEditorHandle>;
}

async function uploadFile(file: File, prefix: string): Promise<string> {
  const sign = await apiPost<SignResponse>("/admin/uploads/sign", {
    filename: file.name,
    content_type: file.type,
    prefix,
  });
  if (!sign.stub) {
    await fetch(sign.upload_url, {
      method: "PUT",
      headers: sign.headers,
      body: file,
    });
  }
  return sign.public_url;
}

export default function RichEditor({
  initialContent,
  uploadPrefix = "articles",
  ref,
}: RichEditorProps) {
  const editor = useCreateBlockNote({
    initialContent:
      initialContent && initialContent.length > 0 ? initialContent : undefined,
    uploadFile: (file) => uploadFile(file, uploadPrefix),
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
