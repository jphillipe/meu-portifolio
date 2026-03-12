'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'
import { zfd } from 'zod-form-data'
import { actionClient } from '@/lib/safe-action'

const loginSchema = zfd.formData({
  email: zfd.text(z.email({ error: 'Informe um email válido' })),
  password: zfd.text(
    z
      .string({ error: 'Senha é obrigatória' })
      .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  ),
})

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput

    await new Promise((r) => setTimeout(r, 1000))

    if (email !== 'admin@admin.com' || password !== '123456') {
      return { serverError: 'E-mail ou senha incorretos.' }
    }

    const cookieStore = await cookies()
    cookieStore.set('ADMIN_AUTH', 'mock-jwt-token-123', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    redirect('/admin')
  })
