/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'grace-backend-9a4n.vercel.app'],
    unoptimized: true
  },
  
  // Отключаем Prisma во время сборки
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  
  // Headers для Telegram Web App
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://web.telegram.org",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
