import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QRIS Dinamis Generator',
    short_name: 'QRIS Dinamis',
    description: 'Generate QRIS dinamis dengan mudah. Upload QR code existing, ubah nominal pembayaran, dan download QR code baru.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png', 
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['finance', 'productivity', 'utilities'],
    lang: 'id',
  }
}
