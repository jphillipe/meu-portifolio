'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectsList } from './projects-list'
import { ProjectForm } from './project-form'

interface ProjectsTabsProps {
  initialProjects: unknown[]
}

export function ProjectsTabs({ initialProjects }: ProjectsTabsProps) {
  return (
    <Tabs defaultValue="projects">
      <TabsList className="bg-zinc-900/50 border border-zinc-800/50">
        <TabsTrigger
          value="projects"
          className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
        >
          Projetos
        </TabsTrigger>
        <TabsTrigger
          value="create"
          className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
        >
          Criar Novo
        </TabsTrigger>
      </TabsList>

      <TabsContent value="projects" className="mt-6">
        <ProjectsList projects={initialProjects} />
      </TabsContent>

      <TabsContent value="create" className="mt-6">
        <ProjectForm />
      </TabsContent>
    </Tabs>
  )
}
