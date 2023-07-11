/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  api: {
    responseLimit: false,
    bodyParser: false,
  },
}

module.exports = {
  nextConfig, env: {
    hostAPI: 'http://192.168.100.150:8011',
    hostUploadAPI: 'http://192.168.100.150:8099',
    privateKey :"imyourfather!!!",
    NEXTAUTH_SECRET: "imyourfather!!!",
    hostPdf: 'http://localhost/',
    hostMapServer:'http://192.168.100.150:8021/geoserver/MapLandGis4X/'
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production",
  // },
}