'use server'

import { authActionClient } from '@/lib/safe-action'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import z from 'zod'

const deleteSchema = z.object({
  id: z.string(),
})

export const deleteProjectAction = authActionClient
  .inputSchema(deleteSchema)
  .action(async ({ parsedInput }) => {
    await prisma.project.delete({
      where: {
        id: parsedInput.id,
      },
    })
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
  })
