'use client'

import { useActionState } from 'react'
import { Terminal, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Form from 'next/form'
import { loginAction } from './action'

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-4">
            <Terminal className="h-6 w-6 text-zinc-900" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-50 mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-zinc-500">
            Entre para acessar o painel de administração
          </p>
        </div>

        {/* Usamos o 'next/form' que gerencia progressiva aprimorada (Progressive Enhancement) */}
        <Form action={formAction} className="space-y-4">
          {/* Exibe o erro se a Server Action retornar um */}
          {state?.error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 animate-fade-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-zinc-400 text-sm">
              Usuário
            </Label>
            {/* O atributo 'name' é obrigatório para o FormData funcionar */}
            <Input
              id="username"
              name="username"
              placeholder="Digite o usuário"
              className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-400 text-sm">
              Senha
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite a senha"
              className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 h-11"
              required
            />
          </div>

          {/* isPending cuida automaticamente de desativar o botão durante a requisição */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-zinc-900 hover:bg-zinc-200 h-11 font-medium disabled:opacity-70"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </Button>
        </Form>

        <p className="text-xs text-zinc-600 text-center mt-6">
          Credenciais: admin / admin123
        </p>
      </div>
    </div>
  )
}
