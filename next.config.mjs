/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Optimización para Cloudflare Pages
  output: 'export',
  // Deshabilitar funciones server-side para static export
  trailingSlash: true,
  // Evitar errores de hidratación
  reactStrictMode: true,
}

export default nextConfig
