'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

function useGlitchText(target: string, duration = 1500) {
  const [text, setText] = useState('')

  useEffect(() => {
    const steps = target.length
    const interval = duration / steps

    let current = 0
    const timer = setInterval(() => {
      if (current <= steps) {
        const resolved = target.slice(0, current)
        const remaining = Array.from(
          { length: steps - current },
          () => glitchChars[Math.floor(Math.random() * glitchChars.length)],
        ).join('')
        setText(resolved + remaining)
        current++
      } else {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [target, duration])

  return text
}

function FloatingParticle({
  delay,
  x,
  y,
  duration,
}: {
  delay: number
  x: string
  y: string
  duration: number
}) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-blue-500/30"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -20, 0],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  delay: Math.random() * 3,
  x: `${10 + Math.random() * 80}%`,
  y: `${10 + Math.random() * 80}%`,
  duration: 3 + Math.random() * 2,
}))

export default function NotFound() {
  const t = useTranslations('NotFound')
  const glitchedTitle = useGlitchText('404', 1200)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-6">
      {/* Subtle floating particles */}
      {particles.map((p) => (
        <FloatingParticle
          key={p.id}
          delay={p.delay}
          x={p.x}
          y={p.y}
          duration={p.duration}
        />
      ))}

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Big 404 with glitch decode effect */}
        <motion.h1
          className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-bold leading-none tracking-tighter font-mono select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="gradient-text">{glitchedTitle}</span>
        </motion.h1>

        {/* Terminal-style message */}
        {showContent && (
          <motion.div
            className="mt-2 mb-8 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 mb-6">
              <Terminal className="h-3.5 w-3.5 text-zinc-500" />
              <span className="font-mono text-sm text-zinc-400">
                <span className="text-blue-400">~</span> {t('terminal')}
                <span className="inline-block w-1.5 h-4 bg-zinc-400 ml-1 align-middle animate-blink" />
              </span>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed">
              {t('description')}
            </p>
          </motion.div>
        )}

        {/* CTA button */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <Link href="/">
              <Button className="bg-white text-zinc-900 hover:bg-zinc-200 font-medium px-6 h-11 text-sm group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {t('backHome')}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
