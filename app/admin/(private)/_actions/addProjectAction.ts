'use server'

import { authActionClient } from '@/lib/safe-action'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import z from 'zod'
import { zfd } from 'zod-form-data'

const projectSchema = zfd.formData({
  title: zfd.text(
    z
      .string({ message: 'Título é obrigatório' })
      .min(4, { message: 'Título deve ter no mínimo 4 caracteres' }),
  ),
  titleEN: zfd.text(z.string({ message: 'Título é obrigatório' }).optional()),
  description: zfd.text(
    z
      .string({ message: 'Descrição é obrigatória' })
      .min(4, { message: 'Descrição deve ter no mínimo 4 caracteres' }),
  ),
  descriptionEN: zfd.text(
    z.string({ message: 'Descrição é obrigatória' }).optional(),
  ),
  category: zfd.text(
    z
      .string({ message: 'Categoria é obrigatória' })
      .min(1, 'Categoria é obrigatória'),
  ),
  imageUrl: zfd.text(z.string().optional()),
  repoUrl: zfd.text(z.string().optional()),
  liveUrl: zfd.text(z.string().optional()),
  tags: zfd.text(z.string().optional()),
  featured: z.unknown().transform((val) => val === 'true' || val === 'on'),
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
        titleEN: parsedInput.titleEN,
        description: parsedInput.description,
        descriptionEN: parsedInput.descriptionEN,
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

    return { success: true, project: newProject }
  })
