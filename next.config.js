/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  api: {
    responseLimit: false,
  },
}

module.exports = {
  nextConfig, env: {
    hostAPI: 'http://192.168.100.150:8011',
    hostUploadAPI: 'http://192.168.100.150:8099',
    privateKey :"imyourfather!!!",
    NEXTAUTH_SECRET: "imyourfather!!!",
    hostPdf: 'http://localhost/'
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production",
  // },
}