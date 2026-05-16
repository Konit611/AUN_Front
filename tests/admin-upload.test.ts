import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/app/lib/api", () => ({
  apiPost: vi.fn(),
}));

import { apiPost } from "@/app/lib/api";
import { uploadAdminImage } from "@/app/lib/admin-upload";

const apiPostMock = vi.mocked(apiPost);

beforeEach(() => {
  vi.restoreAllMocks();
  apiPostMock.mockReset();
});

describe("uploadAdminImage", () => {
  it("returns a data URL when backend signals stub mode", async () => {
    apiPostMock.mockResolvedValue({
      upload_url: "https://stub/key?stub=1",
      public_url: "https://stub/key",
      key: "sake/abc.png",
      headers: {},
      stub: true,
    });
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const file = new File(["hello"], "img.png", { type: "image/png" });
    const url = await uploadAdminImage(file, "sake");

    expect(url.startsWith("data:image/png;base64,")).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("PUTs to upload_url and returns public_url on success", async () => {
    apiPostMock.mockResolvedValue({
      upload_url: "https://s3.example/upload",
      public_url: "https://cdn.example/sake/img.png",
      key: "sake/img.png",
      headers: { "Content-Type": "image/png" },
      stub: false,
    });
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    const file = new File(["bytes"], "img.png", { type: "image/png" });
    const url = await uploadAdminImage(file, "sake");

    expect(url).toBe("https://cdn.example/sake/img.png");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [calledUrl, init] = fetchSpy.mock.calls[0];
    expect(calledUrl).toBe("https://s3.example/upload");
    expect((init as RequestInit).method).toBe("PUT");
    expect((init as RequestInit).body).toBe(file);
    expect((init as RequestInit).headers).toEqual({
      "Content-Type": "image/png",
    });
  });

  it("throws when the S3 PUT fails (no silent success)", async () => {
    apiPostMock.mockResolvedValue({
      upload_url: "https://s3.example/upload",
      public_url: "https://cdn.example/sake/img.png",
      key: "sake/img.png",
      headers: {},
      stub: false,
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("denied", { status: 403, statusText: "Forbidden" }),
    );

    const file = new File(["x"], "img.png", { type: "image/png" });

    await expect(uploadAdminImage(file, "sake")).rejects.toThrow(
      /S3 upload failed: 403/,
    );
  });
});
