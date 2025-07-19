import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AUTOWAIS - Your Complete Technology Solutions Partner',
  description: 'AUTOWAIS transforms businesses through innovative technology solutions. We tackle any challenge, from complex integrations to cutting-edge innovations, delivering results that drive real growth.',
  keywords: ['technology solutions', 'custom development', 'process automation', 'system integration', 'business transformation', 'AUTOWAIS'],
  authors: [{ name: 'AUTOWAIS' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: '/images/autowais-logo-original.png',
    apple: '/images/autowais-logo-original.png',
  },
  openGraph: {
    title: 'AUTOWAIS - Your Complete Technology Solutions Partner',
    description: 'Transform your business through innovative technology solutions that drive real growth.',
    type: 'website',
    locale: 'en_US',
          images: ['/images/autowais-logo-original.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 