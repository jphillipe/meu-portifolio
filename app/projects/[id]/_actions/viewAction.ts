'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function viewAction(projectId: string) {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get('sessionId')?.value

  if (!sessionId) {
    sessionId = crypto.randomUUID()

    cookieStore.set('sessionId', sessionId, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 365,
    })
  }

  const existingView = await prisma.view.findUnique({
    where: {
      sessionId_projectId: {
        sessionId: sessionId,
        projectId: projectId,
      },
    },
  })

  if (existingView) {
    return { success: true, newView: false }
  }

  await prisma.view.create({
    data: {
      sessionId: sessionId,
      projectId: projectId,
    },
  })

  revalidatePath(`/projetos/${projectId}`)

  return { success: true, newView: true }
}
