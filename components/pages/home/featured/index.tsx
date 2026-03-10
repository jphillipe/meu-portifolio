'use client'
import { getStoredProjects } from '@/data/mock'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ProjectCard } from './card'
import { motion } from 'framer-motion'

export const Featured = () => {
  const featuredProjects = getStoredProjects()
    .filter((p) => p.featured)
    .slice(0, 4)
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div>
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
              Featured Work
            </h2>
            <p className="text-2xl sm:text-3xl font-semibold text-zinc-100">
              Selected Projects
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1 group"
          >
            View all{' '}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
