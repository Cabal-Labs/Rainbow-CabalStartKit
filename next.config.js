/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ALCHEMY_ID: process.env.ALCHEMY,  
  }
}

module.exports = nextConfig
