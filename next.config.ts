import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.adaptiveinsights.com/api/:path*', // Proxy to API
      },
    ];
  },
};

export default nextConfig;
