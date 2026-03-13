'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createProjectAction } from '../_actions/addProjectAction'
import { useAction } from 'next-safe-action/hooks'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRef } from 'react'
import { ProjectWithYear } from './projects-tabs'
import { editProjectAction } from '../_actions/editProjectAction'

type ProjectFormProps = {
  onSuccess?: () => void
  initialData?: ProjectWithYear
}

export function ProjectForm({ onSuccess, initialData }: ProjectFormProps) {
  const inputClass =
    'bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600'
  const MOCK_CATEGORIES = ['Front-end', 'Back-end', 'Full Stack', 'Mobile']

  const formRef = useRef<HTMLFormElement>(null)

  const createAction = useAction(createProjectAction)
  const editAction = useAction(editProjectAction)

  const isPending = createAction.isPending || editAction.isPending
  const result = initialData ? editAction.result : createAction.result

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (initialData) {
      formData.append('id', initialData.id)
    }

    const toastId = toast.loading(
      initialData ? 'Atualizando...' : 'Salvando...',
    )

    const response = initialData
      ? await editAction.executeAsync(formData)
      : await createAction.executeAsync(formData)

    if (response?.data?.success) {
      toast.success(
        initialData ? 'Atualizado com sucesso! 🚀' : 'Criado com sucesso! 🚀',
        { id: toastId },
      )
      formRef.current?.reset()
      if (onSuccess) onSuccess()
    } else {
      toast.error('Erro ao salvar os dados.', { id: toastId })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-zinc-100">
          {initialData ? 'Editar Projeto' : 'Novo Projeto'}
        </h2>
        <Separator className="bg-zinc-800/50" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>

            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title}
              className={inputClass}
            />
            {result.validationErrors?.title && (
              <p className="text-xs text-red-500">
                {result.validationErrors.title._errors}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              name="category"
              defaultValue={initialData?.category || undefined}
            >
              <SelectTrigger
                id="category"
                className="bg-zinc-800/50 border-zinc-700 w-full text-zinc-100"
              >
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                {MOCK_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-zinc-300">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {result.validationErrors?.category && (
              <p className="text-xs text-red-500">
                {result.validationErrors.category._errors}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tech Stack</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={initialData?.tags.join(', ')}
              placeholder="React, Next"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description}
            className={`${inputClass} min-h-30`}
          />
          {result.validationErrors?.description && (
            <p className="text-xs text-red-500">
              {result.validationErrors.description._errors}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="repoUrl">GitHub URL</Label>
            <Input
              id="repoUrl"
              name="repoUrl"
              defaultValue={initialData?.repoUrl || ''}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live Demo URL</Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              defaultValue={initialData?.liveUrl || ''}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">URL da Thumbnail</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            defaultValue={initialData?.imageUrl || ''}
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="featured"
            name="featured"
            value="on"
            defaultChecked={initialData?.featured}
          />
          <Label htmlFor="featured">Projeto em Destaque</Label>
        </div>

        <Separator className="bg-zinc-800/50" />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
            className="border-zinc-700 text-zinc-400"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-white text-zinc-900 hover:bg-zinc-200"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Salvando...
              </span>
            ) : initialData ? (
              'Salvar Alterações'
            ) : (
              'Criar Projeto'
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
