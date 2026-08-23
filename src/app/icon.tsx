import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#f04432",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <span style={{ color: "#ffffff", fontSize: 36, fontWeight: 900, letterSpacing: -4 }}>N</span>
    </div>,
    size,
  );
}
