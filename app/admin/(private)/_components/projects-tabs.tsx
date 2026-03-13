'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectsList } from './projects-list'
import { ProjectForm } from './project-form'
import { Project } from '@/lib/generated/prisma/client'
import { useState } from 'react'

export type ProjectWithYear = Project & {
  year: number
}

export function ProjectsTabs({ projects }: { projects: ProjectWithYear[] }) {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
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
        <ProjectsList
          onButtonClick={() => setActiveTab('create')}
          projects={projects}
        />
      </TabsContent>

      <TabsContent value="create" className="mt-6">
        <ProjectForm onSuccess={() => setActiveTab('projects')} />
      </TabsContent>
    </Tabs>
  )
}
