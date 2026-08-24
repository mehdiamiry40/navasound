import { ImageResponse } from "next/og";

export const alt = "NavaSound | Prepare your release. Keep your masters.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#f3f1ea",
        borderTop: "10px solid #2448d8",
        color: "#111111",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "42px 54px 40px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "baseline",
          borderBottom: "2px solid #c8c4b9",
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 24,
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>NavaSound</span>
        <span style={{ color: "#2448d8", fontFamily: "monospace", fontSize: 17, letterSpacing: 2 }}>
          NS / 001
        </span>
      </div>

      <div style={{ alignItems: "stretch", display: "flex", flex: 1, paddingTop: 58 }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center" }}>
          <span
            style={{
              color: "#5d5b55",
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: 2,
              marginBottom: 27,
              textTransform: "uppercase",
            }}
          >
            Founding artist beta / Australia
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              fontWeight: 600,
              letterSpacing: -4.5,
              lineHeight: 0.96,
            }}
          >
            <span>Prepare your release.</span>
            <span style={{ color: "#2448d8" }}>Keep your masters.</span>
          </div>
        </div>

        <div
          style={{
            alignItems: "flex-end",
            borderLeft: "2px solid #c8c4b9",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: 42,
            paddingLeft: 34,
            width: 235,
          }}
        >
          <span style={{ color: "#2448d8", fontFamily: "monospace", fontSize: 23 }}>NS</span>
          <span style={{ fontSize: 112, fontWeight: 500, letterSpacing: -9, lineHeight: 0.8 }}>001</span>
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "2px solid #c8c4b9",
          color: "#5d5b55",
          display: "flex",
          fontFamily: "monospace",
          fontSize: 15,
          justifyContent: "space-between",
          letterSpacing: 1,
          paddingTop: 20,
        }}
      >
        <span>navasound.com</span>
        <span>Independent music distribution</span>
      </div>
    </div>,
    { ...size },
  );
}
