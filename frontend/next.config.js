/** @type {import('next').NextConfig} */
// const withVideos = require('next-videos')
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1'], // Add the hostname here
  },
}
module.exports = nextConfig
// module.exports = withVideos()