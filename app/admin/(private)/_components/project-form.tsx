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

export function ProjectForm() {
  const inputClass =
    'bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600'
  const MOCK_CATEGORIES = ['Front-end', 'Back-end', 'Full Stack', 'Mobile']

  const formRef = useRef<HTMLFormElement>(null)

  const { executeAsync, result, isPending } = useAction(createProjectAction)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const toastId = toast.loading('Salvando projeto no banco de dados...')
    const response = await executeAsync(formData)

    if (response?.data?.success) {
      toast.success('Projeto criado com sucesso! 🚀', { id: toastId })
      formRef.current?.reset()
    } else {
      toast.error('Erro ao salvar. Verifique os campos em vermelho.', {
        id: toastId,
      })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-zinc-100">Novo Projeto</h2>
        <Separator className="bg-zinc-800/50" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-400 text-sm">
              Título *
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Nome do projeto"
              className={inputClass}
            />
            {result.validationErrors?.title && (
              <p className="text-xs text-red-500 mt-1">
                {result.validationErrors.title._errors}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-zinc-400 text-sm">
              Categoria
            </Label>
            <Select name="category">
              <SelectTrigger
                id="category"
                className="bg-zinc-800/50 border-zinc-700 w-full text-zinc-100"
              >
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                {MOCK_CATEGORIES.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="text-zinc-300 focus:bg-zinc-800 focus:text-zinc-100"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {result.validationErrors?.category && (
              <p className="text-xs text-red-500 mt-1">
                {result.validationErrors.category._errors}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="techStack" className="text-zinc-400 text-sm">
              Tech Stack (separado por vírgula)
            </Label>
            <Input
              id="tags"
              name="tags"
              placeholder="React, Node.js, PostgreSQL"
              className={inputClass}
            />
            {result.validationErrors?.tags && (
              <p className="text-xs text-red-500 mt-1">
                {result.validationErrors.tags._errors}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-zinc-400 text-sm">
            Descrição
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Descrição detalhada"
            className={`${inputClass} min-h-30 resize-none`}
          />
          {result.validationErrors?.description && (
            <p className="text-xs text-red-500 mt-1">
              {result.validationErrors.description._errors}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="githubUrl" className="text-zinc-400 text-sm">
              GitHub URL
            </Label>
            <Input
              id="repoUrl"
              name="repoUrl"
              placeholder="https://github.com/..."
              className={inputClass}
            />
            {result.validationErrors?.repoUrl && (
              <p className="text-xs text-red-500 mt-1">
                {result.validationErrors.repoUrl._errors}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl" className="text-zinc-400 text-sm">
              Live Demo URL
            </Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              placeholder="https://..."
              className={inputClass}
            />
            {result.validationErrors?.liveUrl && (
              <p className="text-xs text-red-500 mt-1">
                {result.validationErrors.liveUrl._errors}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail" className="text-zinc-400 text-sm">
            URL da Thumbnail
          </Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            placeholder="https://images.unsplash.com/..."
            className={inputClass}
          />
          {result.validationErrors?.imageUrl && (
            <p className="text-xs text-red-500 mt-1">
              {result.validationErrors.imageUrl._errors}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Switch id="featured" name="featured" value="on" />
          <Label htmlFor="featured" className="text-zinc-400 text-sm">
            Projeto em Destaque
          </Label>
          {result.validationErrors?.featured && (
            <p className="text-xs text-red-500 mt-1">
              {result.validationErrors.featured._errors}
            </p>
          )}
        </div>

        <Separator className="bg-zinc-800/50" />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
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
                <Loader2 className="h-4 w-4 animate-spin" /> Criando...
              </span>
            ) : (
              'Criar Projeto'
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
