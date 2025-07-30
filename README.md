# QRIS Dinamis Generator

Aplikasi web untuk menggenerate QRIS (Quick Response Code Indonesian Standard) dinamis dengan nominal yang dapat disesuaikan. Aplikasi ini memungkinkan pengguna untuk mengubah nominal pembayaran pada QR code yang sudah ada.

![Preview Web](public/preview-web.png)

## ✨ Fitur

- 🔄 **Generate QRIS Dinamis**: Upload gambar QR code dan ubah nominal pembayaran
- 📝 **Input Text Code**: Masukkan kode QRIS dalam format text untuk diproses
- 🖼️ **Upload Image**: Upload gambar QR code untuk didecode dan dimodifikasi
- 📊 **Merchant Information**: Tampilkan informasi merchant secara detail dalam format JSON
- 💰 **Custom Nominal**: Ubah nominal pembayaran sesuai kebutuhan
- 📱 **Preview Real-time**: Lihat preview QR code yang sudah dimodifikasi
- 💾 **Download QR**: Download QR code yang sudah dimodifikasi dalam format gambar
- 🌙 **Dark/Light Theme**: Toggle antara tema gelap dan terang
- 🔍 **SEO Optimized**: Fully optimized untuk search engines
- 📱 **PWA Ready**: Progressive Web App support

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Next.js 14](https://nextjs.org) dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: Zustand
- **QR Processing**: Custom QRIS decoder
- **Canvas**: html2canvas-pro untuk export gambar
- **SEO**: Next.js Metadata API, JSON-LD, Sitemap
- **Analytics**: Google Analytics & Tag Manager support

## 📋 Prerequisites

Pastikan Anda memiliki yang berikut ini terinstall:

- Node.js (versi 18 atau lebih baru)
- npm, yarn, pnpm, atau bun

## 🚀 Getting Started

1. **Clone repository**

```bash
git clone <repository-url>
cd nextjs-qris-dinamis
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
# atau
pnpm install
# atau
bun install
```

3. **Jalankan development server**

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

4. **Setup Environment Variables (Optional)**
```bash
cp .env.example .env.local
# Edit .env.local dengan konfigurasi Anda
```

5. **Buka browser**
Akses [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## ⚙️ Environment Variables

Untuk menggunakan fitur analytics dan SEO penuh, setup environment variables berikut:

```env
# SEO & Analytics
NEXT_PUBLIC_SITE_URL=https://qris-dinamis.vercel.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX

# Verification Codes
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

## 📖 Cara Penggunaan### 1. Input via Text Code

- Pilih tab "Text Code"
- Paste kode QRIS dalam format text
- Aplikasi akan otomatis decode informasi merchant

### 2. Input via Image Upload

- Pilih tab "Image"
- Upload gambar QR code yang valid
- Aplikasi akan memproses dan extract informasi

### 3. Modifikasi Nominal

- Masukkan nominal baru di field "Nominal"
- Klik "Generate" untuk membuat QR code baru
- Preview akan menampilkan QR code yang sudah dimodifikasi

### 4. Download QR Code

- Klik icon download di bagian preview
- QR code akan tersimpan sebagai file JPG

## 📁 Struktur Project

```
src/
├── app/                    # App router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout dengan SEO
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Sitemap generator
│   ├── robots.ts          # Robots.txt generator  
│   └── manifest.ts        # PWA manifest
├── components/            # React components
│   ├── analytics/         # Google Analytics components
│   ├── seo/              # SEO components
│   ├── form-qris-change/  # Form untuk mengubah QRIS
│   ├── form-qris-image/   # Form upload image
│   ├── form-qris-string/  # Form input text
│   ├── json-template/     # Template JSON viewer
│   ├── navigation/        # Navigation component
│   ├── qris-image/        # Preview QR image
│   ├── theme/            # Theme provider
│   ├── theme-button/     # Theme toggle button
│   └── ui/               # UI components (shadcn)
├── lib/                  # Utilities dan libraries
│   ├── store/            # Zustand store
│   ├── qris-decoder/     # Custom QRIS decoder
│   ├── seo-config.ts     # SEO configuration
│   ├── seo-utils.ts      # SEO utility functions
│   └── utils.ts          # Utility functions
└── types/               # TypeScript type definitions
```

## � Responsive Design

Aplikasi ini telah dioptimasi untuk berbagai ukuran layar:
- 📱 Mobile (360px+)
- 📱 Tablet (768px+)  
- 💻 Desktop (1024px+)

## 🔍 SEO Features

Website ini telah dioptimasi untuk search engines dengan:

### ✅ Technical SEO
- **Meta Tags**: Title, description, keywords yang relevan
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization  
- **JSON-LD**: Structured data untuk search engines
- **Sitemap**: Otomatis generate sitemap.xml
- **Robots.txt**: Search engine crawling guidelines
- **Canonical URLs**: Mencegah duplicate content

### ✅ Performance SEO
- **Core Web Vitals**: Optimized loading speed
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts optimization
- **Mobile-First**: Responsive design approach

### ✅ Content SEO
- **Semantic HTML**: Proper HTML structure
- **Alt Text**: Images dengan alt text yang descriptive
- **Heading Structure**: Proper H1-H6 hierarchy
- **Internal Linking**: Strategic internal links

### ✅ Analytics Ready
- **Google Analytics**: Event tracking support
- **Google Tag Manager**: Tag management support
- **Custom Events**: User interaction tracking

## ���🔧 Konfigurasi

Project ini menggunakan konfigurasi standar Next.js dengan tambahan:

- **Tailwind CSS**: Untuk styling
- **TypeScript**: Untuk type safety
- **ESLint**: Untuk code linting
- **PostCSS**: Untuk CSS processing
- **SEO**: Metadata API, JSON-LD, Sitemap/Robots
- **PWA**: Manifest dan service worker ready


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Shadcn/ui](https://ui.shadcn.com) - UI components
- [Zustand](https://github.com/pmndrs/zustand) - State management
