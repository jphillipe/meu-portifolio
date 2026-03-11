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

export function ProjectForm() {
  const inputClass =
    'bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600'
  const MOCK_CATEGORIES = ['Front-end', 'Back-end', 'Full Stack', 'Mobile']

  return (
    // No futuro, isso será substituído por <form action={suaActionAqui}>
    <form>
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-zinc-100">Novo Projeto</h2>
        <Separator className="bg-zinc-800/50" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-400 text-sm">
              Título *
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Nome do projeto"
              className={inputClass}
              required
            />
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
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription" className="text-zinc-400 text-sm">
            Descrição Curta *
          </Label>
          <Textarea
            id="shortDescription"
            name="shortDescription"
            placeholder="Breve descrição"
            className={`${inputClass} min-h-20 resize-none`}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullDescription" className="text-zinc-400 text-sm">
            Descrição Completa
          </Label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            placeholder="Descrição detalhada"
            className={`${inputClass} min-h-30 resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="techStack" className="text-zinc-400 text-sm">
              Tech Stack (separado por vírgula)
            </Label>
            <Input
              id="techStack"
              name="techStack"
              placeholder="React, Node.js, PostgreSQL"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year" className="text-zinc-400 text-sm">
              Ano
            </Label>
            <Input
              id="year"
              name="year"
              type="number"
              defaultValue={new Date().getFullYear()}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="githubUrl" className="text-zinc-400 text-sm">
              GitHub URL
            </Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              placeholder="https://github.com/..."
              className={inputClass}
            />
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
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail" className="text-zinc-400 text-sm">
            URL da Thumbnail
          </Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            placeholder="https://images.unsplash.com/..."
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="problem" className="text-zinc-400 text-sm">
            Problema Resolvido
          </Label>
          <Textarea
            id="problem"
            name="problem"
            placeholder="Qual problema este projeto resolve?"
            className={`${inputClass} min-h-20 resize-none`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features" className="text-zinc-400 text-sm">
            Funcionalidades (separado por vírgula)
          </Label>
          <Input
            id="features"
            name="features"
            placeholder="Feature 1, Feature 2, Feature 3"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="architecture" className="text-zinc-400 text-sm">
            Arquitetura
          </Label>
          <Textarea
            id="architecture"
            name="architecture"
            placeholder="Detalhes da arquitetura técnica"
            className={`${inputClass} min-h-20 resize-none`}
          />
        </div>

        <div className="flex items-center gap-3">
          {/* No Shadcn, o Switch precisa dos atributos name e value para funcionar em formulários nativos */}
          <Switch id="featured" name="featured" value="true" />
          <Label htmlFor="featured" className="text-zinc-400 text-sm">
            Projeto em Destaque
          </Label>
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
            className="bg-white text-zinc-900 hover:bg-zinc-200"
          >
            Criar Projeto
          </Button>
        </div>
      </div>
    </form>
  )
}
