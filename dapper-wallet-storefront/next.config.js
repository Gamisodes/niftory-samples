const withPWA = require("next-pwa")({
  dest: "public",
  // skipWaiting: false,
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
