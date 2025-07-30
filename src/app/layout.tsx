import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationComponent from "@/components/navigation";
import { ThemeProvider } from "@/components/theme/theme-provider"
import { seoConfig } from "@/lib/seo-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: seoConfig.title,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.author.name, url: seoConfig.author.url }],
  creator: seoConfig.author.name,
  publisher: seoConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(seoConfig.siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.images.default,
        width: 1200,
        height: 630,
        alt: `${seoConfig.siteName} Preview`,
      },
    ],
    locale: 'id-ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
    images: [seoConfig.images.default],
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
  icons: {
    icon: seoConfig.images.favicon,
    shortcut: seoConfig.images.favicon,
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <NavigationComponent />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
