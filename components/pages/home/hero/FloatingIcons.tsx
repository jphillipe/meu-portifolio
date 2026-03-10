'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  Terminal,
  GitBranch,
  Braces,
  Database,
  Globe,
  Layers,
  Cpu,
  FileCode2,
  Hash,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ReactLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    className={className}
  >
    <ellipse cx="12" cy="12" rx="10" ry="4" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

interface FloatingItem {
  icon?: LucideIcon
  text?: string
  top: string
  left: string
  size: string
  iconSize: string
  opacity: number
  anim: string
  dur: string
  delay: string
  color?: string
  bg?: string
  border?: string
  hideOnMobile?: boolean
}

const items: FloatingItem[] = [
  {
    text: '</>',
    top: '8%',
    left: '6%',
    size: 'w-14 h-14',
    iconSize: 'text-sm',
    opacity: 0.18,
    anim: 'animate-float-1',
    dur: '14s',
    delay: '0s',
    color: 'text-emerald-400/50',
  },
  {
    icon: Code2,
    top: '18%',
    left: '82%',
    size: 'w-12 h-12',
    iconSize: 'w-5 h-5',
    opacity: 0.15,
    anim: 'animate-float-3',
    dur: '12s',
    delay: '1s',
  },
  {
    icon: Terminal,
    top: '72%',
    left: '8%',
    size: 'w-11 h-11',
    iconSize: 'w-5 h-5',
    opacity: 0.12,
    anim: 'animate-float-2',
    dur: '16s',
    delay: '3s',
  },
  {
    icon: GitBranch,
    top: '28%',
    left: '92%',
    size: 'w-10 h-10',
    iconSize: 'w-4 h-4',
    opacity: 0.1,
    anim: 'animate-float-1',
    dur: '18s',
    delay: '0.5s',
    hideOnMobile: true,
  },
  {
    icon: Database,
    top: '82%',
    left: '72%',
    size: 'w-10 h-10',
    iconSize: 'w-4 h-4',
    opacity: 0.09,
    anim: 'animate-float-3',
    dur: '13s',
    delay: '4s',
  },
  {
    icon: Globe,
    top: '12%',
    left: '55%',
    size: 'w-11 h-11',
    iconSize: 'w-5 h-5',
    opacity: 0.08,
    anim: 'animate-float-2',
    dur: '17s',
    delay: '2.5s',
    hideOnMobile: true,
  },
  {
    icon: Layers,
    top: '58%',
    left: '4%',
    size: 'w-12 h-12',
    iconSize: 'w-5 h-5',
    opacity: 0.13,
    anim: 'animate-float-1',
    dur: '11s',
    delay: '1.5s',
    hideOnMobile: true,
  },
  {
    icon: Braces,
    top: '42%',
    left: '14%',
    size: 'w-9 h-9',
    iconSize: 'w-4 h-4',
    opacity: 0.14,
    anim: 'animate-float-3',
    dur: '10s',
    delay: '0.8s',
  },
  {
    icon: Cpu,
    top: '48%',
    left: '90%',
    size: 'w-10 h-10',
    iconSize: 'w-4 h-4',
    opacity: 0.09,
    anim: 'animate-float-2',
    dur: '19s',
    delay: '3.5s',
    hideOnMobile: true,
  },
  {
    icon: Hash,
    top: '88%',
    left: '38%',
    size: 'w-9 h-9',
    iconSize: 'w-4 h-4',
    opacity: 0.08,
    anim: 'animate-float-1',
    dur: '15s',
    delay: '5s',
  },
  {
    icon: FileCode2,
    top: '22%',
    left: '38%',
    size: 'w-10 h-10',
    iconSize: 'w-4 h-4',
    opacity: 0.07,
    anim: 'animate-float-3',
    dur: '16s',
    delay: '1.2s',
    hideOnMobile: true,
  },
  {
    text: '{ }',
    top: '68%',
    left: '88%',
    size: 'w-14 h-14',
    iconSize: 'text-sm',
    opacity: 0.1,
    anim: 'animate-float-2',
    dur: '20s',
    delay: '2s',
    color: 'text-amber-400/40',
    hideOnMobile: true,
  },
  {
    text: '=>',
    top: '78%',
    left: '52%',
    size: 'w-9 h-9',
    iconSize: 'text-xs',
    opacity: 0.11,
    anim: 'animate-float-1',
    dur: '14s',
    delay: '6s',
    color: 'text-purple-400/40',
  },
]

export const FloatingIcons = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      {/* Blue orb - top right */}
      <motion.div
        className="absolute -top-10 -right-10"
        animate={{
          x: mousePos.x * -30,
          y: mousePos.y * -20,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      >
        <motion.div
          className="w-75 h-75 rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0.15) 30%, rgba(59, 130, 246, 0.03) 60%, transparent 80%)',
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [0.6, 1.3, 0.6],
            opacity: [0.15, 1, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Cyan orb - left */}
      <motion.div
        className="absolute top-1/4 -left-20"
        animate={{
          x: mousePos.x * 25,
          y: mousePos.y * 30,
        }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
      >
        <motion.div
          className="w-70 h-70 rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0.1) 35%, rgba(6, 182, 212, 0.02) 60%, transparent 80%)',
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [0.5, 1.4, 0.5],
            opacity: [0.1, 1, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
      </motion.div>

      {/* Indigo/Purple orb - bottom right */}
      <motion.div
        className="absolute -bottom-10 right-1/4"
        animate={{
          x: mousePos.x * 20,
          y: mousePos.y * -25,
        }}
        transition={{ type: 'spring', stiffness: 45, damping: 28 }}
      >
        <motion.div
          className="w-65 h-65 rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(129, 140, 248, 0.32) 0%, rgba(99, 102, 241, 0.12) 35%, rgba(99, 102, 241, 0.02) 60%, transparent 80%)',
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [0.55, 1.35, 0.55],
            opacity: [0.12, 1, 0.12],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </motion.div>

      {/* Generic floating icons */}
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.hideOnMobile ? 'hidden md:block' : ''}`}
          style={{
            top: item.top,
            left: item.left,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: item.opacity,
            y: [0, -20 - (i % 3) * 8, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            rotate: [0, i % 2 === 0 ? 3 : -3, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: i * 0.1 },
            y: {
              duration: 10 + (i % 5) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            },
            x: {
              duration: 12 + (i % 4) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            },
            rotate: {
              duration: 14 + (i % 3) * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            },
          }}
        >
          <motion.div
            className={`${item.size} rounded-xl ${item.bg || 'bg-zinc-800/20'} ${item.border || 'border border-zinc-700/10'} backdrop-blur-sm flex items-center justify-center`}
            whileHover={{ scale: 1.1, opacity: item.opacity * 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {item.text ? (
              <span
                className={`font-mono font-bold ${item.iconSize} ${item.color || 'text-zinc-400'}`}
              >
                {item.text}
              </span>
            ) : item.icon ? (
              <item.icon
                className={`${item.iconSize} ${item.color || 'text-zinc-400'}`}
              />
            ) : null}
          </motion.div>
        </motion.div>
      ))}

      {/* React Logo - special colored */}
      <motion.div
        className="absolute hidden md:block"
        style={{ top: '15%', left: '22%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.2,
          y: [0, -25, 0],
          x: [0, 8, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5 },
          y: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          rotate: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <motion.div
          className="w-14 h-14 rounded-xl bg-cyan-500/5 border border-cyan-400/10 backdrop-blur-sm flex items-center justify-center"
          whileHover={{ scale: 1.15, opacity: 0.4 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <ReactLogo className="w-7 h-7 text-cyan-400/70" />
        </motion.div>
      </motion.div>

      {/* TS badge */}
      <motion.div
        className="absolute hidden md:block"
        style={{ top: '52%', left: '78%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.2,
          y: [0, -18, 0],
          x: [0, -12, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.8 },
          y: { duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 },
          x: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          },
        }}
      >
        <motion.div
          className="w-11 h-11 rounded-xl bg-blue-500/8 border border-blue-400/10 backdrop-blur-sm flex items-center justify-center"
          whileHover={{ scale: 1.15, opacity: 0.4 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-blue-400/80 text-xs font-extrabold font-mono">
            TS
          </span>
        </motion.div>
      </motion.div>

      {/* JS badge */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ top: '75%', left: '22%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.18,
          y: [0, -22, 0],
          x: [0, 10, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 1.2 },
          y: { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 },
          x: { duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          rotate: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-xl bg-yellow-500/8 border border-yellow-400/10 backdrop-blur-sm flex items-center justify-center"
          whileHover={{ scale: 1.15, opacity: 0.35 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-yellow-400/80 text-xs font-extrabold font-mono">
            JS
          </span>
        </motion.div>
      </motion.div>

      {/* CSS badge */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ top: '35%', left: '70%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.15,
          y: [0, -20, 0],
          x: [0, -8, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 1.5 },
          y: { duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 },
          x: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          },
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-xl bg-pink-500/8 border border-pink-400/10 backdrop-blur-sm flex items-center justify-center"
          whileHover={{ scale: 1.15, opacity: 0.3 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-pink-400/80 text-xs font-extrabold font-mono">
            #
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
