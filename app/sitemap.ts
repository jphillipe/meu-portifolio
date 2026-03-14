import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/projects'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        updatedAt: true,
        createdAt: true,
      },
    })

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: absoluteUrl(`/projects/${encodeURIComponent(project.id)}`),
      lastModified: project.updatedAt || project.createdAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

    return [...staticRoutes, ...projectRoutes]
  } catch {
    return staticRoutes
  }
}
