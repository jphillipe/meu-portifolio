'use client'
import { useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  // eslint-disable-next-line no-unused-vars
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('devfolio_auth')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  const login = (username: string, password: string): boolean => {
    if (
      username === MOCK_CREDENTIALS.username &&
      password === MOCK_CREDENTIALS.password
    ) {
      localStorage.setItem('devfolio_auth', 'authenticated')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = (): void => {
    localStorage.removeItem('devfolio_auth')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) return null
  if (!isAuthenticated) return null
  return <>{children}</>
}
