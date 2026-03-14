import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { ProjectsClient } from './projectsClient'
import { absoluteUrl } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Meta')

  return {
    title: t('projectsTitle'),
    description: t('projectsDescription'),
    alternates: {
      canonical: '/projects',
    },
    openGraph: {
      title: t('projectsTitle'),
      description: t('projectsDescription'),
      url: absoluteUrl('/projects'),
      images: [
        {
          url: absoluteUrl('/api/og'),
          width: 1200,
          height: 630,
          alt: t('projectsTitle'),
        },
      ],
    },
    twitter: {
      title: t('projectsTitle'),
      description: t('projectsDescription'),
      images: [absoluteUrl('/api/og')],
    },
  }
}

export default async function Porjects() {
  const allProjects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: { likes: true },
      },
    },
  })

  return <ProjectsClient projects={allProjects} />
}
