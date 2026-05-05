const MAX_BYTES = 500 * 1024;
const MAX_DIMENSION = 1024;

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image decode failed"));
    img.src = src;
  });
}

function approxBytes(dataUrl: string): number {
  const base64 = dataUrl.split(",")[1] ?? "";
  return Math.ceil(base64.length * 0.75);
}

export async function compressToDataURL(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("選択されたファイルは画像ではありません。");
  }

  const original = await readAsDataURL(file);
  const img = await loadImage(original);

  const ratio = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const w = Math.round(img.width * ratio);
  const h = Math.round(img.height * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(img, 0, 0, w, h);

  for (const quality of [0.8, 0.7, 0.6, 0.5, 0.4, 0.3]) {
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    if (approxBytes(dataUrl) <= MAX_BYTES) return dataUrl;
  }

  throw new Error("画像が大きすぎます。別の画像をお試しください。");
}
