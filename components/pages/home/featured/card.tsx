'use client'

import { Github, ExternalLink, Eye, Heart, Star } from 'lucide-react'
import { Project } from '@/types'
import { getExtraViews, isLiked } from '@/data/mock'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { motion, useAnimation } from 'framer-motion'

interface ProjectCardProps {
  project: Project
  index?: number
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const liked = isLiked(project.id)
  const extraViews = getExtraViews(project.id)
  const totalViews = project.views + extraViews
  const totalLikes = project.likes + (liked ? 1 : 0)
  const shineControls = useAnimation()

  const handleHoverStart = async () => {
    await shineControls.start({
      x: '100%',
      transition: { duration: 0.6, ease: 'easeOut' },
    })
    shineControls.set({ x: '-100%' })
  }

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <motion.div
        className="relative rounded-xl border border-zinc-800/50 bg-zinc-900/30 overflow-hidden"
        whileHover={{
          y: -6,
          borderColor: 'rgba(113,113,122,0.5)',
          boxShadow:
            '0 0 40px -10px rgba(59,130,246,0.12), 0 20px 40px -15px rgba(0,0,0,0.4)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onHoverStart={handleHoverStart}
      >
        {/* Shine sweep overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ x: '-100%' }}
          animate={shineControls}
          style={{
            width: '100%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
          }}
        />
        {/* Image */}
        <div className="aspect-video overflow-hidden bg-zinc-900 relative">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white uppercase tracking-wider">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-semibold text-zinc-100 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <span className="text-xs text-zinc-600 shrink-0 font-mono">
              {project.year}
            </span>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2 group-hover:text-zinc-300 transition-colors">
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-zinc-800/80 text-zinc-400 border-0 text-xs font-normal group-hover:bg-zinc-700/60 group-hover:text-zinc-300 transition-colors"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge
                variant="secondary"
                className="bg-zinc-800/80 text-zinc-500 border-0 text-xs font-normal"
              >
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50">
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5 group-hover:text-zinc-400 transition-colors">
                <Eye className="h-3.5 w-3.5" />
                {totalViews.toLocaleString()}
              </span>
              <span
                className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-red-400' : 'group-hover:text-zinc-400'}`}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${liked ? 'fill-current' : ''}`}
                />
                {totalLikes}
              </span>
              <span className="flex items-center gap-1.5 group-hover:text-zinc-400 transition-colors">
                <Star className="h-3.5 w-3.5" />
                {project.stars}
              </span>
            </div>

            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {project.githubUrl && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(
                      project.githubUrl,
                      '_blank',
                      'noopener,noreferrer',
                    )
                  }}
                  className="text-zinc-500 hover:text-zinc-200 transition-colors p-1 rounded hover:bg-zinc-800/50"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </button>
              )}
              {project.liveUrl && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(
                      project.liveUrl,
                      '_blank',
                      'noopener,noreferrer',
                    )
                  }}
                  className="text-zinc-500 hover:text-zinc-200 transition-colors p-1 rounded hover:bg-zinc-800/50"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
