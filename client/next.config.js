/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Disabled because this isn't compatible with some architectures. Babel is used instead of SWC
  // https://nextjs.org/docs/messages/failed-loading-swc
  swcMinify: false,
  images: {
    domains: ["res.cloudinary.com"]
  }
}

module.exports = nextConfig
