import { createSafeActionClient } from 'next-safe-action'
import { cookies } from 'next/headers'
import { decrypt } from './session'

export const actionClient = createSafeActionClient()

export const authActionClient = actionClient.use(async ({ next }) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('ADMIN_AUTH')?.value

  const session = await decrypt(token)

  if (!session) {
    throw new Error('Não autorizado!')
  }

  return next({ ctx: { userId: session.userId } })
})
