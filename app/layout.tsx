import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { Toaster } from '@/components/ui/sonner'
import { TitanConsoleEgg } from '@/components/easter-egg/TitanConsoleEgg'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import {
  absoluteUrl,
  getBrandIconUrl,
  getSiteUrl,
  mapOgLocale,
} from '@/lib/seo'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Meta')
  const locale = await getLocale()
  const ogLocale = mapOgLocale(locale)

  return {
    metadataBase: getSiteUrl(),
    title: {
      default: t('siteTitle'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('siteDescription'),
    applicationName: t('siteName'),
    keywords: t('keywords')
      .split(',')
      .map((item) => item.trim()),
    authors: [{ name: t('authorName'), url: absoluteUrl('/') }],
    creator: t('authorName'),
    publisher: t('siteName'),
    icons: {
      icon: getBrandIconUrl(),
      shortcut: getBrandIconUrl(),
      apple: getBrandIconUrl(),
    },
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: absoluteUrl('/'),
      siteName: t('siteName'),
      title: t('siteTitle'),
      description: t('siteDescription'),
      images: [
        {
          url: absoluteUrl('/api/og'),
          width: 1200,
          height: 630,
          alt: t('siteName'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteTitle'),
      description: t('siteDescription'),
      images: [absoluteUrl('/api/og')],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background ">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <TitanConsoleEgg />
          <Toaster theme="dark" position="bottom-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
