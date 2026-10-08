import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og.js"

const WIDTH = 1200
const HEIGHT = 630

const root = process.cwd()
const config = JSON.parse(await readFile(path.join(root, "config/partner.config.json"), "utf8"))
const { theme, offer, brand } = config

const logo = await readFile(path.join(root, "public", brand.logo))
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

const h = (type, style, children = []) => ({ type, props: { style, children } })

const tree = h(
  "div",
  {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "72px 80px",
    background: theme.background,
    borderBottom: `16px solid ${theme.primary}`,
    fontFamily: "Geist",
  },
  [
    { type: "img", props: { src: logoSrc, height: 72, style: { height: 72, objectFit: "contain", alignSelf: "flex-start" } } },
    h(
      "div",
      {
        display: "flex",
        flexDirection: "column",
        gap: 28,
        padding: "48px 56px",
        background: theme.surface,
        border: `2px solid ${theme.border}`,
        borderRadius: theme.radius * 2,
      },
      [
        h("div", { fontSize: 60, lineHeight: 1.15, color: theme.text, letterSpacing: -1.5 }, offer.headline),
        h(
          "div",
          { fontSize: 30, color: theme.primary },
          `Starting at $${offer.setupPrice} to get started, then $${offer.monthlyPrice}/month`,
        ),
      ],
    ),
  ],
)

const image = new ImageResponse(tree, { width: WIDTH, height: HEIGHT })
await writeFile(path.join(root, "public", brand.ogImage), Buffer.from(await image.arrayBuffer()))

console.log(`Wrote public${brand.ogImage} (${WIDTH}x${HEIGHT})`)
