import { ImageResponse } from "next/og";

export const alt = "NavaSound — Your release, clearly handled";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#f4f4ef", color: "#111111", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "48px 56px", width: "100%" }}>
      <div style={{ alignItems: "center", borderBottom: "2px solid #111111", display: "flex", fontSize: 26, fontWeight: 800, justifyContent: "space-between", paddingBottom: 22 }}>
        <div style={{ alignItems: "center", display: "flex", gap: 14 }}>
          <div style={{ background: "#f04432", display: "flex", height: 28, width: 28 }} />
          <span>NavaSound</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 500 }}>NS / AU / 2026</span>
      </div>
      <div style={{ alignItems: "flex-end", display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 830 }}>
          <span style={{ color: "#f04432", fontSize: 17, fontWeight: 700, letterSpacing: 3, marginBottom: 20 }}>INDEPENDENT MUSIC DISTRIBUTION</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 800, letterSpacing: -6, lineHeight: .88 }}>
            <span>Your release.</span>
            <span>Clearly handled.</span>
          </div>
          <span style={{ fontSize: 22, marginTop: 28 }}>Clear fees / Artist-owned masters / Human review</span>
        </div>
        <div style={{ alignItems: "flex-start", background: "#f04432", color: "white", display: "flex", fontSize: 92, fontWeight: 800, height: 240, justifyContent: "flex-start", letterSpacing: -8, padding: "18px 24px", width: 240 }}>
          01
        </div>
      </div>
      <div style={{ alignItems: "center", borderTop: "2px solid #111111", display: "flex", fontSize: 17, justifyContent: "space-between", paddingTop: 20 }}>
        <span>navasound.com</span><span>Founding-artist beta · Australia</span>
      </div>
    </div>,
    { ...size },
  );
}
