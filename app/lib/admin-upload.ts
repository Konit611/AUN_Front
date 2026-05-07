import { apiPost } from "./api";

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

/**
 * Upload an image via the admin presigned-URL endpoint.
 *
 * In dev / pre-S3 mode the backend signals `stub: true` and we inline the file
 * as a data URL so the editor / preview works locally. Once S3 env vars are
 * set the backend returns a real PUT URL and we upload directly to S3.
 */
export async function uploadAdminImage(
  file: File,
  prefix: string,
): Promise<string> {
  const sign = await apiPost<SignResponse>("/admin/uploads/sign", {
    filename: file.name,
    content_type: file.type,
    prefix,
  });
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
