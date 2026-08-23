import { ImageResponse } from "next/og";

export const alt = "NavaSound — Your release, clearly handled";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#10265f", color: "white", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "56px 64px", width: "100%" }}>
      <div style={{ alignItems: "center", display: "flex", fontSize: 26, fontWeight: 800, gap: 14 }}>
        <div style={{ alignItems: "flex-end", background: "#ffe600", borderRadius: 999, display: "flex", gap: 4, height: 42, justifyContent: "center", paddingBottom: 11, width: 42 }}>
          <span style={{ background: "#10265f", borderRadius: 3, height: 10, width: 4 }} />
          <span style={{ background: "#10265f", borderRadius: 3, height: 22, width: 4 }} />
          <span style={{ background: "#10265f", borderRadius: 3, height: 15, width: 4 }} />
        </div>
        <span>NavaSound</span>
      </div>
      <div style={{ alignItems: "flex-end", display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 780 }}>
          <span style={{ color: "#ffe600", fontSize: 18, fontWeight: 700, letterSpacing: 3, marginBottom: 20 }}>INDEPENDENT MUSIC DISTRIBUTION</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 82, fontWeight: 700, letterSpacing: -5, lineHeight: .92 }}>
            <span>Your release.</span>
            <span>Clearly handled.</span>
          </div>
          <span style={{ color: "#c7d2f5", fontSize: 23, marginTop: 26 }}>Clear fees · Artist-owned masters · Human review</span>
        </div>
        <div style={{ alignItems: "center", background: "#ffe600", border: "12px solid #ffffff", borderRadius: 999, display: "flex", height: 250, justifyContent: "center", position: "relative", width: 250 }}>
          <div style={{ border: "2px solid #10265f", borderRadius: 999, display: "flex", height: 164, position: "absolute", width: 164 }} />
          <div style={{ border: "2px solid #10265f", borderRadius: 999, display: "flex", height: 82, position: "absolute", width: 82 }} />
          <span style={{ color: "#10265f", fontSize: 52, fontWeight: 900 }}>N</span>
        </div>
      </div>
      <div style={{ alignItems: "center", borderTop: "1px solid rgba(255,255,255,.25)", color: "#c7d2f5", display: "flex", fontSize: 18, justifyContent: "space-between", paddingTop: 22 }}>
        <span>navasound.com</span><span>Founding-artist beta · Australia</span>
      </div>
    </div>,
    { ...size },
  );
}
