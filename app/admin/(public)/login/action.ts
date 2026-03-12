'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

const loginSchema = z.object({
  email: z.email({ message: 'informe um email válido' }),
  password: z
    .string()
    .min(6, { message: 'senha deve ter no mínimo 6 caracteres' }),
})

type loginActionReturn = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
}

export async function loginAction(
  _prevState: loginActionReturn | null,
  formData: FormData,
): Promise<loginActionReturn> {
  const data = Object.fromEntries(formData.entries())

  const result = loginSchema.safeParse(data)

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors }
  }

  const { email, password } = result.data

  await new Promise((r) => setTimeout(r, 1000))

  if (email !== 'admin@admin.com' || password !== '123456') {
    return { message: 'E-mail ou senha incorretos.' }
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
}
