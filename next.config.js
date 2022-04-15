/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "BASE_URL": "https://fabulous-sable-461f36.netlify.app"
  },
  images:{
    domains: ['images.unsplash.com']
  }
}

module.exports = nextConfig
