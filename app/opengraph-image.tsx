import { ImageResponse } from "next/og"
import { brandName, monthlyPrice, partner, setupPrice } from "@/lib/partner"

export const alt = `${brandName}: ${partner.offer.headline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  const { theme, offer } = partner

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          background: theme.background,
        }}
      >
        <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 1, color: theme.primary }}>{brandName}</div>
        <div
          style={{
            marginTop: 40,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.2,
            color: theme.text,
            maxWidth: 980,
          }}
        >
          {offer.headline}
        </div>
        <div style={{ marginTop: 40, fontSize: 36, color: theme.muted }}>
          {`${setupPrice} to get started, then ${monthlyPrice} a month`}
        </div>
      </div>
    ),
    { ...size },
  )
}
