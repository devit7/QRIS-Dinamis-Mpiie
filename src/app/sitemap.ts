import { MetadataRoute } from 'next'
import { seoConfig } from '@/lib/seo-config'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seoConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
