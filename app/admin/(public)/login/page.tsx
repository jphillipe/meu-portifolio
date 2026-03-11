import type { Metadata } from 'next'
import { LoginForm } from './form'

export const metadata: Metadata = {
  title: 'Login | Painel Admin',
  description:
    'Faça login para acessar o painel de administração do portfólio.',
}

export default function LoginPage() {
  return <LoginForm />
}
