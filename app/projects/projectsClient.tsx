'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Project } from '@/lib/generated/prisma/client'
import { ProjectCard } from '@/components/pages/home/featured/card'

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = [
    'All',
    ...(Array.from(
      new Set(projects.map((p) => p.category).filter(Boolean)),
    ) as string[]),
  ]

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const searchTerm = search.toLowerCase()
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some((t) => t.toLowerCase().includes(searchTerm))
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [projects, search, activeCategory])

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-3">
            Projetos
          </h1>
          <p className="text-zinc-400 text-lg">
            Uma coleção de projetos que construí e aos quais contribuí.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar projetos, tecnologias..."
              className="pl-10 bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 h-11"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                activeCategory === cat
                  ? 'bg-white text-zinc-900 font-medium'
                  : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat === 'All' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-zinc-500 mb-6">
          {filteredProjects.length} projeto
          {filteredProjects.length !== 1 ? 's' : ''}
        </p>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-500">Nenhum projeto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
