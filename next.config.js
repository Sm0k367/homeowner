/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  async redirects() {
    return [
      {
        source: '/subscribe',
        destination: 'https://buy.stripe.com/dR6dRZ5yc5yPaVq9AE',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
