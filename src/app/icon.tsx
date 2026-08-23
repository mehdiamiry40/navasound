import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#151319",
        borderRadius: "50%",
        color: "#d8ff3e",
        display: "flex",
        fontSize: 34,
        fontWeight: 800,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.08em",
        width: "100%",
      }}
    >
      N
    </div>,
    size,
  );
}
