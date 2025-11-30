/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minio.swiftsyn.com',
        pathname: '/backroomscript/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8501',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8501',
        pathname: '/api/v1/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.backroomscript.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.backroomscript.com',
        pathname: '/api/v1/uploads/**',
      },
    ],
  },
}
export default nextConfig;