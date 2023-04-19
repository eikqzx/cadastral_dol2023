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
    hostAPI: 'http://127.0.0.1:8011',
    hostUploadAPI: 'http://127.0.0.1:8099',
    privateKey :"imyourfather!!!",
    NEXTAUTH_SECRET: "imyourfather!!!",
    hostPdf: 'http://localhost/'
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production",
  // },
}