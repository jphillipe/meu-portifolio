import { About } from '@/components/pages/home/about'
import { Experience } from '@/components/pages/home/experience'
import { Featured } from '@/components/pages/home/featured'
import Hero from '@/components/pages/home/hero'
import { Tech } from '@/components/pages/home/tech'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const featuredProjects = await prisma.project.findMany({
    where: {
      featured: true,
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
