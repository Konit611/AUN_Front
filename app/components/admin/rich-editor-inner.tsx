"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useImperativeHandle } from "react";
import type { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import { apiPost } from "@/app/lib/api";
import type { RichEditorHandle, RichEditorProps } from "./rich-editor";

interface SignResponse {
  upload_url: string;
  public_url: string;
  key: string;
  headers: Record<string, string>;
  stub?: boolean;
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

async function uploadFile(file: File, prefix: string): Promise<string> {
  const sign = await apiPost<SignResponse>("/admin/uploads/sign", {
    filename: file.name,
    content_type: file.type,
    prefix,
  });
  // Dev / pre-S3 mode: the backend signals stub=true and the upload_url isn't
  // real. Inline the image as a data URL so it renders in the editor and survives
  // draft save. Once S3 env vars are configured, stub flips off and the real
  // PUT path runs.
  if (sign.stub) {
    return fileToDataURL(file);
  }
  await fetch(sign.upload_url, {
    method: "PUT",
    headers: sign.headers,
    body: file,
  });
  return sign.public_url;
}

export default function RichEditorInner({
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
