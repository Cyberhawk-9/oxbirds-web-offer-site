/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ]
    if (process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true") {
      securityHeaders.push({ key: "X-Robots-Tag", value: "noindex, nofollow" })
    }
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig
