import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#006bff",
        borderRadius: 14,
        display: "flex",
        gap: 4,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <span style={{ background: "#ffffff", borderRadius: 3, height: 16, width: 5 }} />
      <span style={{ background: "#ffffff", borderRadius: 3, height: 32, width: 5 }} />
      <span style={{ background: "#ffffff", borderRadius: 3, height: 23, width: 5 }} />
    </div>,
    size,
  );
}
