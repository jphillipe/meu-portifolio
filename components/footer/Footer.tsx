import React, { ComponentType } from 'react'
import { Heart, Terminal, Mail, Linkedin } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { developerProfile } from '@/data/mock'

interface SocialLink {
  icon: ComponentType<{ className?: string }>
  href: string
  label: string
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: SiGithub,
      href: developerProfile.socialLinks.github,
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: developerProfile.socialLinks.linkedin,
      label: 'LinkedIn',
    },
    { icon: Mail, href: `mailto:${developerProfile.email}`, label: 'Email' },
  ]

  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <Terminal className="h-4 w-4 text-zinc-900" />
              </div>
              <span className="font-semibold text-zinc-50 text-sm">
                {developerProfile.name}
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              {developerProfile.title} based in {developerProfile.location}.
              Building software that makes a difference.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-300 mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Projects
              </Link>
              <a
                href={`mailto:${developerProfile.email}`}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-300 mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-zinc-800/50" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {developerProfile.name}. All
            rights reserved.
          </p>
          <p className="text-xs text-zinc-600 flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-red-400/60" /> using React
            & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
