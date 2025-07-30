import { Metadata } from 'next'
import { seoConfig } from './seo-config'

interface GenerateMetadataProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export function generateMetadata({
  title,
  description = seoConfig.description,
  keywords = seoConfig.keywords,
  image = seoConfig.images.default,
  url = seoConfig.siteUrl,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = seoConfig.author.name,
}: GenerateMetadataProps = {}): Metadata {
  const metaTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.title
  
  return {
    title: metaTitle,
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: seoConfig.author.name,
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: metaTitle,
      description,
      url,
      siteName: seoConfig.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${metaTitle} - ${seoConfig.siteName}`,
        },
      ],
      locale: 'id-ID',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description,
      images: [image],
      creator: seoConfig.social.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateJsonLd({
  title = seoConfig.title,
  description = seoConfig.description,
  url = seoConfig.siteUrl,
  image = seoConfig.images.default,
  type = 'WebApplication',
  author = seoConfig.author.name,
  publishedTime,
  modifiedTime,
}: {
  title?: string
  description?: string
  url?: string
  image?: string
  type?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
} = {}) {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url,
    image,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.author.name,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}${seoConfig.images.logo}`,
      },
    },
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
  }

  if (type === 'WebApplication') {
    return {
      ...baseStructure,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'IDR',
      },
      featureList: [
        'Upload gambar QR code existing',
        'Generate QRIS dengan nominal custom',
        'Preview real-time QR code',
        'Download QR code dalam format gambar',
        'Decode informasi merchant',
        'Support semua format QRIS Indonesia'
      ]
    }
  }

  return baseStructure
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
