'use client'

import { Plus, Search, Pencil, Sparkles, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProjectWithYear } from './projects-tabs'
import { useAction } from 'next-safe-action/hooks'
import { deleteProjectAction } from '../_actions/deleteProjectAction'
import { toast } from 'sonner'
import { DeleteDialog } from './dialog'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function ProjectsList({
  projects,
  onNewProject,
  onEditProject,
}: {
  projects: ProjectWithYear[]

  onNewProject: () => void
  onEditProject: (_project: ProjectWithYear) => void
}) {
  const t = useTranslations('Admin')
  const hasProjects = projects.length > 0
  const inputClass =
    'bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600'

  const { executeAsync, isPending } = useAction(deleteProjectAction)
  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = async (id: string) => {
    const toastId = toast.loading(t('toastDeleting'))

    const response = await executeAsync({ id })

    if (response?.data?.success) {
      toast.success(t('toastDeleteSuccess'), { id: toastId })
    } else {
      toast.error(t('toastDeleteError'), {
        id: toastId,
      })
    }
  }

  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase()
    const matchTitle = project.title.toLowerCase().includes(term)
    const matchCategory =
      project.category?.toLowerCase().includes(term) || false
    const matchYear = project.year.toString().includes(term)
    return matchTitle || matchCategory || matchYear
  })
  const hasFilteredProjects = filteredProjects.length > 0

  return (
    <>
      <div className="flex items-center justify-between mb-4 gap-4">
        {hasProjects ? (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder={t('searchPlaceholder')}
              className={`pl-10 h-10 ${inputClass}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Sparkles className="h-4 w-4 text-zinc-400" />
            {t('emptyHint')}
          </div>
        )}
        <Button
          className="bg-white text-zinc-900 hover:bg-zinc-200 gap-2"
          size="sm"
          onClick={onNewProject}
        >
          <Plus className="h-4 w-4" /> {t('newProject')}
        </Button>
      </div>

      {hasProjects ? (
        hasFilteredProjects ? (
          <div className="rounded-xl border border-zinc-800/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800/50 hover:bg-transparent">
                  <TableHead className="text-zinc-400">
                    {t('tableProject')}
                  </TableHead>
                  <TableHead className="text-zinc-400 hidden sm:table-cell">
                    {t('tableCategory')}
                  </TableHead>
                  <TableHead className="text-zinc-400 hidden md:table-cell">
                    {t('tableYear')}
                  </TableHead>
                  <TableHead className="text-zinc-400 text-right">
                    {t('tableActions')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="border-zinc-800/50 hover:bg-zinc-900/30"
                  >
                    <TableCell className="font-medium text-zinc-200">
                      {project.title}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant="secondary"
                        className="bg-zinc-800/80 text-zinc-400 border-0 text-xs"
                      >
                        {project.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-400 hidden md:table-cell">
                      {project.year}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400 hover:text-zinc-200"
                          onClick={() => onEditProject?.(project)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <DeleteDialog
                          disabled={isPending}
                          onDeleteProject={() => handleDelete(project.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/20 px-6 py-14 sm:px-10">
            <div className="relative flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5">
                <Search className="h-3.5 w-3.5 text-zinc-500" />
                <span className="font-mono text-sm text-zinc-400">
                  <span className="text-zinc-200">~</span>{' '}
                  {t('noMatchesTerminal')}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-zinc-50">
                {t('noMatchesTitle')}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500 sm:text-base">
                {t('noMatchesDescription')}
                <span className="text-zinc-300"> &quot;{searchTerm}&quot;</span>
                .
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                  onClick={() => setSearchTerm('')}
                >
                  {t('clearSearch')}
                </Button>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/20 px-6 py-14 sm:px-10">
          <div className="relative flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5">
              <Terminal className="h-3.5 w-3.5 text-zinc-500" />
              <span className="font-mono text-sm text-zinc-400">
                <span className="text-zinc-200">~</span>{' '}
                {t('noProjectsTerminal')}
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-zinc-50">
              {t('noProjectsTitle')}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500 sm:text-base">
              {t('noProjectsDescription')}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Button
                className="bg-white text-zinc-900 hover:bg-zinc-200 gap-2"
                onClick={onNewProject}
              >
                <Plus className="h-4 w-4" /> {t('createFirst')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
