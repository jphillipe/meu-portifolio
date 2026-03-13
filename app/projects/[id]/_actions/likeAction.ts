'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function toggleLikeAction(projectId: string) {
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

  const existingLike = await prisma.like.findUnique({
    where: {
      sessionId_projectId: {
        sessionId: sessionId,
        projectId: projectId,
      },
    },
  })

  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    })
  } else {
    await prisma.like.create({
      data: {
        sessionId: sessionId,
        projectId: projectId,
      },
    })
  }

  revalidatePath(`/projects/${projectId}`)

  return { liked: !existingLike }
}
