'use client'

import { developerProfile } from '@/data/mock'
import {
  Briefcase,
  Code2,
  GitBranch,
  LucideIcon,
  Mail,
  MapPin,
} from 'lucide-react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

const AnimatedCounter = ({
  target,
  suffix = '',
}: {
  target: number
  suffix?: string
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    Math.round(v).toLocaleString('pt-BR'),
  )

  useEffect(() => {
    if (isInView) {
      animate(count, target, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
      })
    }
  }, [isInView, target, count])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export const About = () => {
  const stats: {
    icon: LucideIcon
    value: number
    suffix: string
    label: string
  }[] = [
    {
      icon: Briefcase,
      value: developerProfile.yearsOfExperience,
      suffix: '+',
      label: 'Years Experience',
    },
    {
      icon: Code2,
      value: developerProfile.projectsCompleted,
      suffix: '+',
      label: 'Projects Completed',
    },
    {
      icon: GitBranch,
      value: developerProfile.githubContributions,
      suffix: '+',
      label: 'Technologies Used',
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
              About
            </h2>
            <p className="text-2xl sm:text-3xl font-semibold text-zinc-100 leading-snug mb-6">
              I build software that solves real problems and delights users.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              {developerProfile.bio}
            </p>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {developerProfile.location}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {developerProfile.email}
              </span>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: 'easeOut',
                }}
              >
                <div className="p-5 rounded-xl border border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700/50 hover:bg-zinc-800/20 transition-all duration-300 group">
                  <stat.icon className="h-5 w-5 text-zinc-500 mb-3 group-hover:text-blue-400/70 transition-colors" />
                  <div className="text-2xl font-bold text-zinc-100">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
