import { ImageResponse } from "next/og";
import { getPersona, getPersonaColors, isValidCode } from "@/app/lib/persona";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "AUN sake personality result";

interface OgImageProps {
  params: Promise<{ code: string }>;
}

export default async function OgImage({ params }: OgImageProps) {
  const { code } = await params;
  const upper = code.toUpperCase();

  const persona = isValidCode(upper) ? getPersona(upper) : null;
  const colors = isValidCode(upper)
    ? getPersonaColors(upper)
    : { gradientFrom: "#C2685A", gradientTo: "#7B5EA7" };

  const codeDisplay = persona?.code ?? "AUN";
  const nameDisplay = persona?.name ?? "あなたにぴったりの日本酒";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          background: `linear-gradient(135deg, ${colors.gradientFrom} 0%, ${colors.gradientTo} 100%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "12px",
            opacity: 0.85,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          {codeDisplay} TYPE
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            fontWeight: 700,
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 36,
          }}
        >
          {nameDisplay}
        </div>
        <div
          style={{
            display: "flex",
            width: 80,
            height: 2,
            background: "rgba(255,255,255,0.6)",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 28,
            opacity: 0.9,
            letterSpacing: "2px",
          }}
        >
          AUN — 日本酒パーソナリティ診断
        </div>
      </div>
    ),
    { ...size },
  );
}
