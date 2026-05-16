import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageUploader from "@/app/components/admin/image-uploader";

let createdBlobUrls: string[];
let revokedBlobUrls: string[];

beforeEach(() => {
  createdBlobUrls = [];
  revokedBlobUrls = [];
  let n = 0;
  vi.spyOn(URL, "createObjectURL").mockImplementation((obj) => {
    const u = `blob:mock/${++n}`;
    createdBlobUrls.push(u);
    return u;
  });
  vi.spyOn(URL, "revokeObjectURL").mockImplementation((u) => {
    revokedBlobUrls.push(u);
  });
});

function noop() {}

describe("ImageUploader", () => {
  it("shows the upload placeholder when url and pendingFile are both null", () => {
    render(
      <ImageUploader
        url={null}
        pendingFile={null}
        onPick={noop}
        onRemove={noop}
      />,
    );
    expect(screen.getByRole("button", { name: "写真を選択" })).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("shows the saved url as preview when no pending file", () => {
    render(
      <ImageUploader
        url="https://cdn.example/sake/saved.png"
        pendingFile={null}
        onPick={noop}
        onRemove={noop}
      />,
    );
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toBe("https://cdn.example/sake/saved.png");
    expect(createdBlobUrls).toHaveLength(0);
    expect(
      screen.queryByText("保存時にアップロードされます"),
    ).not.toBeInTheDocument();
  });

  it("shows the blob URL when a pending file is set (overrides saved url)", () => {
    const file = new File(["x"], "new.png", { type: "image/png" });
    render(
      <ImageUploader
        url="https://cdn.example/sake/old.png"
        pendingFile={file}
        onPick={noop}
        onRemove={noop}
      />,
    );
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(createdBlobUrls).toHaveLength(1);
    expect(img.src).toBe(createdBlobUrls[0]);
    expect(
      screen.getByText("保存時にアップロードされます"),
    ).toBeInTheDocument();
  });

  it("revokes the blob URL when pendingFile is cleared", () => {
    const file = new File(["x"], "new.png", { type: "image/png" });
    const { rerender } = render(
      <ImageUploader
        url={null}
        pendingFile={file}
        onPick={noop}
        onRemove={noop}
      />,
    );
    expect(createdBlobUrls).toHaveLength(1);
    const created = createdBlobUrls[0];

    rerender(
      <ImageUploader
        url={null}
        pendingFile={null}
        onPick={noop}
        onRemove={noop}
      />,
    );
    expect(revokedBlobUrls).toContain(created);
  });

  it("calls onPick with the selected file", async () => {
    const user = userEvent.setup();
    const onPick = vi.fn();
    const { container } = render(
      <ImageUploader
        url={null}
        pendingFile={null}
        onPick={onPick}
        onRemove={noop}
      />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["bytes"], "pick.png", { type: "image/png" });
    await user.upload(input, file);

    expect(onPick).toHaveBeenCalledTimes(1);
    expect(onPick).toHaveBeenCalledWith(file);
  });

  it("calls onRemove when 削除 is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <ImageUploader
        url="https://cdn.example/sake/saved.png"
        pendingFile={null}
        onPick={noop}
        onRemove={onRemove}
      />,
    );
    await user.click(screen.getByRole("button", { name: "削除" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
