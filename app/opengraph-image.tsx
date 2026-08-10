import { ImageResponse } from "next/og";
import { BRAND_NAME } from "@/lib/mock-data";

export const runtime = "edge";
export const alt = `${BRAND_NAME} — premium digital products`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(900px 480px at 12% -8%, rgba(139,92,246,0.35) 0%, transparent 55%), linear-gradient(165deg, #09051a 0%, #120a2b 48%, #0c0620 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 28,
            background: "linear-gradient(135deg, #9d6cff, #7c4dff)",
            marginBottom: 36,
            boxShadow: "0 0 60px rgba(139,92,246,0.55)",
          }}
        >
          <span style={{ fontSize: 48, color: "#fff", fontWeight: 800 }}>S</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#fff",
          }}
        >
          {BRAND_NAME}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 32,
            color: "#cfc7f8",
            maxWidth: 820,
          }}
        >
          Premium digital products, delivered fast.
        </div>
      </div>
    ),
    { ...size },
  );
}
