/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'], // Add the domain here
  },
  // Remove the target property
}

module.exports = nextConfig;
