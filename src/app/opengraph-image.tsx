import { ImageResponse } from "next/og";

export const alt = "NavaSound | Prepare your release. Keep your masters.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#fbfcfd", color: "#0b3558", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "48px 56px", width: "100%" }}>
      <div style={{ alignItems: "center", display: "flex", fontSize: 26, fontWeight: 800, justifyContent: "space-between" }}>
        <div style={{ alignItems: "center", display: "flex", gap: 14 }}>
          <div style={{ alignItems: "center", background: "#006bff", borderRadius: 8, display: "flex", gap: 2, height: 34, justifyContent: "center", width: 34 }}>
            <span style={{ background: "#ffffff", borderRadius: 2, height: 10, width: 3 }} />
            <span style={{ background: "#ffffff", borderRadius: 2, height: 20, width: 3 }} />
            <span style={{ background: "#ffffff", borderRadius: 2, height: 14, width: 3 }} />
          </div>
          <span>NavaSound</span>
        </div>
          <span style={{ background: "#edf5ff", borderRadius: 999, color: "#006bff", fontSize: 14, fontWeight: 650, padding: "10px 16px" }}>Founding artist beta</span>
      </div>
      <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 790 }}>
          <span style={{ color: "#006bff", fontSize: 16, fontWeight: 700, letterSpacing: 2.5, marginBottom: 20 }}>INDEPENDENT MUSIC DISTRIBUTION</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 750, letterSpacing: -5.5, lineHeight: .94 }}>
            <span>Prepare your release.</span>
            <span style={{ color: "#006bff" }}>Keep your masters.</span>
          </div>
          <span style={{ color: "#5f7180", fontSize: 21, marginTop: 28 }}>Planned launch pricing from A$10 per release</span>
        </div>
        <div style={{ alignItems: "center", background: "#edf5ff", borderRadius: 42, display: "flex", height: 260, justifyContent: "center", width: 260 }}>
          <div style={{ alignItems: "center", background: "#ffffff", border: "2px solid #dbe5ec", borderRadius: 28, display: "flex", flexDirection: "column", height: 190, justifyContent: "center", width: 190 }}>
            <span style={{ color: "#006bff", fontSize: 58, fontWeight: 750, letterSpacing: -4 }}>100%</span>
            <span style={{ color: "#5f7180", fontSize: 17, marginTop: 8 }}>artist owned</span>
          </div>
        </div>
      </div>
      <div style={{ alignItems: "center", borderTop: "2px solid #dbe5ec", color: "#5f7180", display: "flex", fontSize: 16, justifyContent: "space-between", paddingTop: 20 }}>
        <span>navasound.com</span><span>Founding artist beta · Australia</span>
      </div>
    </div>,
    { ...size },
  );
}
