const DEFAULT_SITE_URL = 'http://localhost:3000'

function normalizeSiteUrl(rawUrl: string): string {
  const withProtocol = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`
  return withProtocol.endsWith('/') ? withProtocol.slice(0, -1) : withProtocol
}

export function getSiteUrl(): URL {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    DEFAULT_SITE_URL

  return new URL(normalizeSiteUrl(siteUrl))
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, getSiteUrl()).toString()
}

export function resolveImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) return absoluteUrl('/api/og')
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  return absoluteUrl(imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`)
}

export function getBrandIconUrl(): string {
  return absoluteUrl('/terminal-icon.svg')
}

export function mapOgLocale(locale: string): string {
  return locale === 'pt' ? 'pt_BR' : 'en_US'
}

export function summarize(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}...`
}
