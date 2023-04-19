const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "niftory-assets-prod.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "niftory-assets-staging.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dkuxa1i6sgo8h.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/collection/vip",
        permanent: true,
      },
      {
        source: "/collection",
        destination: "/collection/vip",
        permanent: true,
      },
      {
        source: "/app/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}

module.exports = withPWA(nextConfig)
