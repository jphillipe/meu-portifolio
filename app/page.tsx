import type { Metadata } from 'next'
import { About } from '@/components/pages/home/about'
import { Experience } from '@/components/pages/home/experience'
import { Featured } from '@/components/pages/home/featured'
import Hero from '@/components/pages/home/hero'
import { Tech } from '@/components/pages/home/tech'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/prisma'
import { absoluteUrl } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Meta')

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      url: absoluteUrl('/'),
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
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: [absoluteUrl('/api/og')],
    },
  }
}

export default async function Home() {
  const featuredProjects = await prisma.project.findMany({
    where: {
      featured: true,
    },
    include: {
      _count: {
        select: { likes: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  })

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Separator className="max-w-6xl mx-auto bg-zinc-800/50" />
      <Featured projects={featuredProjects} />
      <Separator className="max-w-6xl mx-auto bg-zinc-800/50" />
      <Tech />
      <Separator className="max-w-6xl mx-auto bg-zinc-800/50" />
      <Experience />
    </div>
  )
}
