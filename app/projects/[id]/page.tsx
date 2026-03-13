import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink, Calendar, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { LikeButton } from './_components/likeButton'
import { ViewTracker } from './_components/viewTracker'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value

  const project = await prisma.project.findUnique({
    where: { id: id },
    include: {
      _count: {
        select: { likes: true, views: true },
      },
    },
  })

  if (!project) notFound()

  let userHasLiked = false

  if (sessionId) {
    const existingLike = await prisma.like.findUnique({
      where: {
        sessionId_projectId: {
          sessionId: sessionId,
          projectId: id,
        },
      },
    })
    userHasLiked = !!existingLike
  }

  const year = new Date(project.createdAt).getFullYear()
  const totalLikes = project._count.likes

  console.log('Project:', project)

  return (
    <div className="min-h-screen">
      <ViewTracker projectId={id} />
      <section className="relative">
        <div className="aspect-3/1 max-h-100 w-full overflow-hidden bg-zinc-900">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="w-full h-full object-cover opacity-50"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 opacity-50" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-3">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-6 px-6 border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-zinc-800/80 text-zinc-400 border-0 text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-500 sm:ml-auto">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {year}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" /> {project._count.views}
            </span>
            <LikeButton
              projectId={project.id}
              initialLikes={totalLikes}
              initialHasLiked={userHasLiked}
            />
          </div>
          <div className="flex gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2"
                >
                  <Github className="h-4 w-4" /> GitHub
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="bg-white text-zinc-900 hover:bg-zinc-200 gap-2"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-xl font-semibold text-zinc-100 mb-4">
                Visão Geral
              </h2>
              <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-6">
              <h3 className="text-sm font-medium text-zinc-300 mb-4">
                Tecnologias
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800/50 text-xs text-zinc-400"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-6xl mx-auto bg-zinc-800/50 mb-16" />
    </div>
  )
}
