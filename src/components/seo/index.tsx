import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
}

const SEO = ({
  title = "QRIS Dinamis Generator - Generate QR Code Pembayaran dengan Nominal Custom",
  description = "Generate QRIS dinamis dengan mudah. Upload QR code existing, ubah nominal pembayaran, dan download QR code baru. Mendukung semua format QRIS Indonesia dengan preview real-time.",
  keywords = [
    "QRIS",
    "QR Code", 
    "Pembayaran Digital",
    "Generator QRIS",
    "QRIS Dinamis",
    "Payment Gateway",
    "Indonesia Payment"
  ],
  image = "/preview-web.png",
  url = "https://qris-dinamis.vercel.app",
  type = "website"
}: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Indonesian" />
      <meta name="author" content="QRIS Dinamis Generator" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="QRIS Dinamis Generator" />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  )
}

export default SEO
