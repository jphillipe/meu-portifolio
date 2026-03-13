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
  const [editingProject, setEditingProject] = useState<ProjectWithYear | null>(
    null,
  )

  const handleFormClose = () => {
    setEditingProject(null)
    setActiveTab('projects')
  }

  const handleNewProject = () => {
    setEditingProject(null)
    setActiveTab('create')
  }

  const handleEditProject = (project: ProjectWithYear) => {
    setEditingProject(project)
    setActiveTab('create')
  }

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
          {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="projects" className="mt-6">
        <ProjectsList
          projects={projects}
          onNewProject={handleNewProject}
          onEditProject={handleEditProject}
        />
      </TabsContent>

      <TabsContent value="create" className="mt-6">
        <ProjectForm
          key={editingProject?.id || 'new'}
          initialData={editingProject ?? undefined}
          onSuccess={handleFormClose}
        />
      </TabsContent>
    </Tabs>
  )
}
