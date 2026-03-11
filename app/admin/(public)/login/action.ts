'use server'

import { z } from 'zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// 1. Schema de validação usando Zod
const loginSchema = z.object({
  username: z.string().min(1, 'O usuário é obrigatório'),
  password: z.string().min(1, 'A senha é obrigatória'),
})

// Tipo do estado retornado para o cliente
export type ActionState = {
  error?: string
  success?: boolean
} | null

export async function loginAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 2. Extrai e valida os dados do formulário
  const data = Object.fromEntries(formData)
  const parsed = loginSchema.safeParse(data)

  if (!parsed.success) {
    return { error: 'Preencha todos os campos.' }
  }

  const { username, password } = parsed.data

  // Simula o tempo de resposta da rede
  await new Promise((r) => setTimeout(r, 400))

  // 3. Valida as credenciais (Fase Mock)
  // No futuro, aqui você chamará seu service que fará o fetch pro Node/Express
  if (username !== 'admin' || password !== 'admin123') {
    return { error: 'Credenciais inválidas. Use admin / admin123' }
  }

  // 4. Salva o token fictício nos Cookies de forma segura
  const cookieStore = await cookies()
  cookieStore.set('ADMIN_AUTH', 'mocked-jwt-token-123', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 dia de duração
    path: '/',
  })

  // 5. Redireciona para o painel privado (O Middleware vai deixar passar)
  redirect('/admin')
}
