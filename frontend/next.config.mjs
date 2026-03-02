/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Proxy /avatars/* requests to the backend server
        source: '/avatars/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000'}/avatars/:path*`,
      },
      {
        // Proxy /uploads/* requests to the backend server
        source: '/uploads/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000'}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
