'use client'

import { useAction } from 'next-safe-action/hooks'
import { loginAction } from './action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Terminal, Loader2 } from 'lucide-react'
import Form from 'next/form'

export function LoginForm() {
  const { execute, result, isPending } = useAction(loginAction)

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-4">
            <Terminal className="h-6 w-6 text-zinc-900" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-50 mb-2">
            Acesso Restrito
          </h1>
          <p className="text-sm text-zinc-500">
            Entre com seu e-mail de administrador
          </p>
        </div>

        <Form action={execute} className="space-y-4">
          {result?.data?.serverError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {result.data.serverError?.toString() ||
                'Ocorreu um erro no servidor.'}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-400 text-sm">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="admin@admin.com"
              className="bg-zinc-900/50 border-zinc-800 text-zinc-100 h-11"
            />
            <p className="text-xs text-red-500 mt-1">
              {result.validationErrors?.email?._errors}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-400 text-sm">
              Senha
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              className="bg-zinc-900/50 border-zinc-800 text-zinc-100 h-11"
            />
            <p className="text-xs text-red-500 mt-1">
              {result?.validationErrors?.password?._errors}
            </p>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-zinc-900 hover:bg-zinc-200 h-11 font-medium disabled:opacity-70"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Entrar'
            )}
          </Button>
        </Form>
      </div>
    </div>
  )
}
