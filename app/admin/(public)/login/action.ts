'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'
import { zfd } from 'zod-form-data'
import { actionClient } from '@/lib/safe-action'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const loginSchema = zfd.formData({
  email: zfd.text(z.email({ message: 'Informe um email válido' })),
  password: zfd.text(
    z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  ),
})

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput

    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      return { serverError: 'E-mail ou senha incorretos.' }
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      return { serverError: 'E-mail ou senha incorretos.' }
    }

    const cookieStore = await cookies()
    cookieStore.set('ADMIN_AUTH', 'token-ficticio-123', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    redirect('/admin')
  })
