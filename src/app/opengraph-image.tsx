import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "NavaSound — Release prep for artists. Built around your music.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// This static, OFL-licensed subset keeps the share image independent of font CDNs.
const displayFont = readFile(join(process.cwd(), "public/fonts/Fraunces-Share-Regular.ttf"));
const bodyFont = readFile(join(process.cwd(), "public/fonts/Geist-Share-Regular.ttf"));

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#fafaf9",
        color: "#292524",
        display: "flex",
        fontFamily: "Geist",
        height: "100%",
        padding: "0 52px",
        width: "100%",
      }}
    >
      <div
        style={{
          borderLeft: "1px solid #e7e5e4",
          borderRight: "1px solid #e7e5e4",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderBottom: "1px solid #e7e5e4",
            display: "flex",
            height: 94,
            justifyContent: "space-between",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 13 }}>
            <div
              style={{
                alignItems: "center",
                border: "1.5px solid #116454",
                borderRadius: "50%",
                display: "flex",
                gap: 3,
                height: 40,
                justifyContent: "center",
                width: 40,
              }}
            >
              {[9, 16, 21, 13].map((height) => (
                <div key={height} style={{ background: "#116454", borderRadius: 3, display: "flex", height, width: 4 }} />
              ))}
            </div>
            <span style={{ fontSize: 21, letterSpacing: 2 }}>NAVASOUND</span>
          </div>
          <span style={{ color: "#78716c", fontSize: 17 }}>Made for independent music</span>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: 8,
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e7e5e4",
              borderRadius: 20,
              color: "#116454",
              display: "flex",
              fontSize: 14,
              letterSpacing: 1.4,
              marginBottom: 28,
              padding: "9px 16px",
            }}
          >
            RELEASE READINESS BETA
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Fraunces",
              fontSize: 66,
              fontWeight: 400,
              letterSpacing: -2,
              lineHeight: 1.16,
            }}
          >
            <span>Release prep for artists.</span>
            <span style={{ color: "#147d6b" }}>Built around your music.</span>
          </div>
          <span style={{ color: "#78716c", fontSize: 21, marginTop: 24 }}>
            Your metadata, credits and next steps. In one place.
          </span>
        </div>

        <div
          style={{
            alignItems: "center",
            borderTop: "1px solid #e7e5e4",
            color: "#78716c",
            display: "flex",
            fontSize: 16,
            height: 72,
            justifyContent: "space-between",
          }}
        >
          <span>Prepare your release. Keep your independence.</span>
          <span style={{ color: "#116454" }}>navasound.com</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: await displayFont, weight: 400, style: "normal" },
        { name: "Geist", data: await bodyFont, weight: 400, style: "normal" },
      ],
    },
  );
}
