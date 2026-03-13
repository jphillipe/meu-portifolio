'use server'

import { authActionClient } from '@/lib/safe-action'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import z from 'zod'
import { zfd } from 'zod-form-data'

const editProjectSchema = zfd.formData({
  id: zfd.text(z.string()),
  title: zfd.text(z.string().min(4, { message: 'Mínimo de 4 caracteres' })),
  description: zfd.text(
    z.string().min(4, { message: 'Mínimo de 4 caracteres' }),
  ),
  category: zfd.text(z.string().min(1, 'Categoria é obrigatória')),
  imageUrl: zfd.text(z.string().optional()),
  repoUrl: zfd.text(z.string().optional()),
  liveUrl: zfd.text(z.string().optional()),
  tags: zfd.text(z.string().optional()),
  featured: z.unknown().transform((val) => val === 'true' || val === 'on'),
})

export const editProjectAction = authActionClient
  .inputSchema(editProjectSchema)
  .action(async ({ parsedInput }) => {
    const tagsArray = parsedInput.tags
      ? parsedInput.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : []

    const updatedProject = await prisma.project.update({
      where: { id: parsedInput.id },
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        category: parsedInput.category,
        imageUrl: parsedInput.imageUrl,
        repoUrl: parsedInput.repoUrl,
        liveUrl: parsedInput.liveUrl,
        featured: parsedInput.featured,
        tags: tagsArray,
      },
    })

    revalidatePath('/admin')
    revalidatePath('/')

    return { success: true, project: updatedProject }
  })
