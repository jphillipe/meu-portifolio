'use server'

import { authActionClient } from '@/lib/safe-action'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import z from 'zod'
import { zfd } from 'zod-form-data'

const projectSchema = zfd.formData({
  title: zfd.text(z.string().min(1, 'Título é obrigatório')),
  description: zfd.text(z.string().min(1, 'Descrição é obrigatória')),
  imageUrl: zfd.text(z.string().optional()),
  repoUrl: zfd.text(z.string().optional()),
  liveUrl: zfd.text(z.string().optional()),
  tags: zfd.text(z.string().optional()),
  featured: zfd.checkbox(),
})

export const createProjectAction = authActionClient
  .inputSchema(projectSchema)
  .action(async ({ parsedInput }) => {
    const tagsArray = parsedInput.tags
      ? parsedInput.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : []

    const newProject = await prisma.project.create({
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        imageUrl: parsedInput.imageUrl,
        repoUrl: parsedInput.repoUrl,
        liveUrl: parsedInput.liveUrl,
        featured: parsedInput.featured,
        tags: tagsArray,
      },
    })

    revalidatePath('/admin')
    revalidatePath('/')

    return { success: true, project: newProject }
  })
