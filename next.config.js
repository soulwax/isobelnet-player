// File: next.config.js

import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: process.env.ELECTRON_BUILD === "true" ? "standalone" : undefined,
  // Electron runs a bundled Next.js server with standalone output
  // This allows API routes to work in the Electron app
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "api.deezer.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/**",
      },
    ],
    unoptimized: process.env.ELECTRON_BUILD === "true", // Required for Electron
  },
};

export default config;
