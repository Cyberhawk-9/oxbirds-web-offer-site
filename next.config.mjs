/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // EmailJS public values are safe to ship to the browser. Explicit NEXT_PUBLIC_* variables win; otherwise
  // fall back to the project's `Key` variable for the public key and to the account's service/template IDs.
  env: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "oxbird-sender",
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_o3zt9jh",
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.Key || "",
  },
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
