import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-end",
        background: "#ffe600",
        borderRadius: "50%",
        display: "flex",
        gap: 4,
        height: "100%",
        justifyContent: "center",
        paddingBottom: 15,
        width: "100%",
      }}
    >
      <span style={{ background: "#10265f", borderRadius: 3, height: 14, width: 5 }} />
      <span style={{ background: "#10265f", borderRadius: 3, height: 30, width: 5 }} />
      <span style={{ background: "#10265f", borderRadius: 3, height: 22, width: 5 }} />
    </div>,
    size,
  );
}
