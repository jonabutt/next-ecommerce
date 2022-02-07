/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "BASE_URL": "http://localhost:3000"
  },
  images:{
    domains: ['images.unsplash.com']
  }
}

module.exports = nextConfig
