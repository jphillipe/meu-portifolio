import type { Metadata } from 'next'
import { LoginForm } from './form'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Admin')

  return {
    title: `${t('login')} | ${t('title')}`,
    description: t('loginSubtitle'),
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default function LoginPage() {
  return <LoginForm />
}
