import { prisma } from '@/lib/prisma'
import { ProjectsClient } from './projectsClient'

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
