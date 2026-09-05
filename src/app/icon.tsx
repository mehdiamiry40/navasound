import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#ffffff",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          border: "2px solid #116454",
          borderRadius: "50%",
          display: "flex",
          gap: 4,
          height: 56,
          justifyContent: "center",
          width: 56,
        }}
      >
        {[12, 22, 28, 17].map((height) => (
          <div key={height} style={{ background: "#116454", borderRadius: 3, display: "flex", height, width: 5 }} />
        ))}
      </div>
    </div>,
    size,
  );
}
