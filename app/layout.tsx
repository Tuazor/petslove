import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import 'leaflet/dist/leaflet.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'PetsLove - Find Animal Shelters Across North America',
    template: '%s | PetsLove'
  },
  description: 'Connect with trusted animal shelters across North America. Find adoption centers, rescue services, and help animals in need find their forever homes.',
  keywords: 'pet shelter, animal adoption, rescue animals, animal shelter network, pet adoption, North America shelters',
  authors: [{ name: 'PetsLove' }],
  creator: 'PetsLove',
  publisher: 'PetsLove',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'PetsLove - Find Animal Shelters Across North America',
    description: 'Connect with trusted animal shelters across North America. Find adoption centers, rescue services, and help animals in need find their forever homes.',
    url: 'https://petslove.info',
    siteName: 'PetsLove',
    images: [
      {
        url: '/logo.svg',
        width: 200,
        height: 200,
        alt: 'PetsLove Logo',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PetsLove - Find Animal Shelters Across North America',
    description: 'Connect with trusted animal shelters across North America. Find adoption centers and rescue services.',
    images: ['/logo.svg'],
    creator: '@petslove',
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
  verification: {
    google: 'Q-MibwxKmu78121Z1LKkjNSoPd__gOgqL4wtA74S1ws', // You'll need to replace this with your actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PetsLove",
              "url": "https://petslove.info",
              "logo": "https://petslove.info/logo.svg",
              "description": "Connect with trusted animal shelters across North America. Find adoption centers and rescue services.",
              "sameAs": [
                "https://facebook.com/petslove",
                "https://twitter.com/petslove",
                "https://instagram.com/petslove"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

