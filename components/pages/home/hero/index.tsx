import { Badge } from '@/components/ui/badge'
import { FloatingIcons } from './FloatingIcons'
import { developerProfile } from '@/data/mock'
import { ArrowRight, Mail, Linkedin } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { TypingEffect } from './TypingEffect'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ComponentType } from 'react'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('Hero')

  const socialItems: {
    icon: ComponentType<{ className?: string }>
    href: string
    label: string
  }[] = [
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
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <FloatingIcons />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status Badge */}
        <div className="animate-fade-in-up mb-8">
          <Badge
            variant="secondary"
            className="bg-zinc-800/60 h-8 rounded-md! text-zinc-400 border border-zinc-700/50 px-4 py-1.5 text-xs font-normal"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 inline-block animate-pulse" />
            {t('available')}
          </Badge>
        </div>

        {/* Name */}
        <h1 className="animate-fade-in-up animation-delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="gradient-text">{developerProfile.name}</span>
        </h1>

        {/* Typing subtitle */}
        <div className="animate-fade-in-up animation-delay-200 text-xl sm:text-2xl text-zinc-400 mb-4 font-light h-9">
          <TypingEffect text={t('role')} speed={70} />
        </div>

        <p className="animate-fade-in-up animation-delay-300 text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t('tagline')}
          <span className="hidden sm:inline">. {t('specializing')}</span>
        </p>

        {/* Social */}
        <div className="animate-fade-in-up animation-delay-400 flex items-center justify-center gap-3 mb-10">
          {socialItems.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 rounded-lg border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800/50 hover:scale-110 transition-all duration-200"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-in-up animation-delay-500 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link href="/projects" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-white text-zinc-900 hover:bg-zinc-200 font-medium px-6 h-11 text-sm group">
              {t('viewProjects')}{' '}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <a
            href={`mailto:${developerProfile.email}`}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 font-medium px-6 h-11 text-sm"
            >
              {t('getInTouch')}
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-600">
        <div className="w-5 h-8 rounded-full border border-zinc-700/50 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-zinc-500 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
