/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ['img.youtube.com'],
    },
  };
  
  module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.youtube.com', // или нужный хост
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
