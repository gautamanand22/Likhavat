import { ImageResponse } from "next/og";
import { business } from "@/content/business";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = business.name;

const CMYK = ["#00b4d8", "#e23a7f", "#f6b51e", "#faf7f0"];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #17131f 0%, #2b2338 100%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "#faf7f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: 18,
              background: "#faf7f0",
              color: "#17131f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 700,
              flexDirection: "column",
            }}
          >
            <span>लि</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700 }}>Likhavat</span>
            <span style={{ fontSize: 17, letterSpacing: 8, color: "#e23a7f", fontWeight: 700 }}>
              PRINTING PRESS
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontSize: 25, color: "#f6b51e", fontWeight: 600 }}>
            Boring Road · Patna · Since {business.foundedYear}
          </span>
          <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.06, maxWidth: 980 }}>
            Every brand has its own likhavat. We print yours.
          </span>
          <span style={{ fontSize: 27, color: "#b7aec6", maxWidth: 1000 }}>
            Visiting cards · Wedding cards · Flex · Letterheads · Rx pads · Bill books · Bags · Tees
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {CMYK.map((c) => (
            <div key={c} style={{ width: 34, height: 34, borderRadius: 17, background: c, display: "flex" }} />
          ))}
          <span style={{ fontSize: 24, fontWeight: 700, color: "#faf7f0", marginLeft: 12 }}>
            Free design proof · Same-day printing · GST invoice
          </span>
        </div>
      </div>
    ),
    size,
  );
}
