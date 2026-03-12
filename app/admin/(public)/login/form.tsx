'use client'

import { useAction } from 'next-safe-action/hooks'
import { loginAction } from './action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Loader2, Terminal } from 'lucide-react'
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function LoginForm() {
  const router = useRouter()
  const { executeAsync, result, isPending } = useAction(loginAction)

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const toastId = toast.loading('Verificando credenciais...')
    const response = await executeAsync(formData)

    if (response?.data?.success) {
      toast.success('Login realizado com sucesso! 🚀', { id: toastId })
      router.push('/admin')
    } else {
      toast.error(response?.data?.serverError || 'Erro ao realizar login.', {
        id: toastId,
      })
    }
  }

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

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {result.data?.serverError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {result.data.serverError}
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
            {result.validationErrors?.email && (
              <p className="text-xs text-red-500 mt-1">
                {result.validationErrors.email._errors}
              </p>
            )}
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
            {result.validationErrors?.password && (
              <p className="text-xs text-red-500 mt-1">
                {result.validationErrors.password._errors}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-zinc-900 hover:bg-zinc-200 h-11 font-medium disabled:opacity-70"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
