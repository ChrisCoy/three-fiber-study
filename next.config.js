/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["@react-three/fiber", "@react-three/drei", "three"],
  },
};

module.exports = nextConfig;
