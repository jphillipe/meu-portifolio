'use client'

import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
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

export function ProjectsList({
  projects,
  onButtonClick,
}: {
  projects: ProjectWithYear[]
  onButtonClick: () => void
}) {
  const inputClass =
    'bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600'

  return (
    <>
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Buscar projetos..."
            className={`pl-10 h-10 ${inputClass}`}
          />
        </div>
        <Button
          className="bg-white text-zinc-900 hover:bg-zinc-200 gap-2"
          size="sm"
          onClick={onButtonClick}
        >
          <Plus className="h-4 w-4" /> Novo Projeto
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-800/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800/50 hover:bg-transparent">
              <TableHead className="text-zinc-400">Projeto</TableHead>
              <TableHead className="text-zinc-400 hidden sm:table-cell">
                Categoria
              </TableHead>
              <TableHead className="text-zinc-400 hidden md:table-cell">
                Ano
              </TableHead>
              <TableHead className="text-zinc-400 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
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
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
