'use client'
import React, { useState } from 'react'
import { Menu, X, Terminal, Lock } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
  label: string
  path: string
}

const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
]

const Navbar: React.FC = () => {
  const location = usePathname()
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  const isActive = (path: string): boolean => {
    if (path === '/') return location === '/'
    return location.startsWith(path)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <Terminal className="h-4 w-4 text-zinc-900" />
          </div>
          <span className="font-semibold text-zinc-50 text-sm tracking-tight hidden sm:block">
            Alex Chen
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                isActive(link.path)
                  ? 'text-zinc-50 bg-zinc-800/50'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button
              variant="ghost"
              size="sm"
              className={`text-sm gap-2 ${
                location.startsWith('/admin')
                  ? 'text-zinc-50 bg-zinc-800/50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Lock className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-400 hover:text-zinc-200"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive(link.path)
                    ? 'text-zinc-50 bg-zinc-800/50'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 flex items-center gap-2"
            >
              <Lock className="h-3.5 w-3.5" />
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
