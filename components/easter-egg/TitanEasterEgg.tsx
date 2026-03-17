'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Particle {
  id: number
  angle: number
  distance: number
  size: number
  delay: number
  duration: number
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + (Math.random() * 30 - 15),
    distance: 60 + Math.random() * 80,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 0.15,
    duration: 0.8 + Math.random() * 0.4,
  }))
}

export function TitanEasterEgg() {
  const [triggered, setTriggered] = useState(false)
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  const handleHeartClick = useCallback(() => {
    clickCount.current += 1

    if (clickTimer.current) clearTimeout(clickTimer.current)

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0
    }, 800)

    if (clickCount.current >= 5) {
      clickCount.current = 0
      if (clickTimer.current) clearTimeout(clickTimer.current)
      setParticles(generateParticles(20))
      setTriggered(true)
    }
  }, [])

  useEffect(() => {
    if (triggered) {
      const timer = setTimeout(() => setTriggered(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [triggered])

  return (
    <>
      <button
        onClick={handleHeartClick}
        className="inline-flex items-center cursor-pointer select-none"
        aria-label="Easter egg"
        type="button"
      >
        <span className="text-xs text-zinc-600 flex items-center gap-1">
          Built with{' '}
          <motion.span
            key={String(triggered)}
            animate={
              triggered ? { scale: [1, 1.8, 0], opacity: [1, 1, 0] } : undefined
            }
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 text-[#F2A900]"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </motion.span>{' '}
          using Next.js & Tailwind CSS
        </span>
      </button>

      <AnimatePresence>
        {triggered && (
          <motion.div
            className="fixed inset-0 z-9999 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Burst particles */}
            {particles.map((p) => {
              const rad = (p.angle * Math.PI) / 180
              const tx = Math.cos(rad) * p.distance
              const ty = Math.sin(rad) * p.distance
              return (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: '#F2A900',
                    boxShadow: '0 0 8px 2px #F2A90080',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: 'easeOut',
                  }}
                />
              )
            })}

            {/* Logo */}
            <motion.div
              className="relative z-10 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 1, 0],
                scale: [0, 1.1, 1, 1, 0.9],
              }}
              transition={{
                duration: 4,
                times: [0, 0.15, 0.25, 0.8, 1],
                ease: 'easeInOut',
              }}
            >
              {/* Spinning logo with glow — fill + scale to crop dark border evenly */}
              <motion.div
                className="rounded-full overflow-hidden relative"
                style={{
                  width: 130,
                  height: 130,
                  boxShadow: '0 0 40px 15px #F2A90040, 0 0 80px 30px #F2A90018',
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Image
                  src="/titan-logo.png"
                  alt="TITAN"
                  fill
                  unoptimized
                  className="object-cover scale-[1.15]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
