/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "www.gaming.gen.tr",
      "percdn.com",
      "http://localhost:3000",
      "localhost",
    ],
  },
  compiler: {
    removeConsole: true,
  },
};

module.exports = nextConfig;
