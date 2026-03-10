'use client'
import { techStack } from '@/data/mock'
import { motion } from 'framer-motion'

export const Tech = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
            Technologies
          </h2>
          <p className="text-2xl sm:text-3xl font-semibold text-zinc-100 mb-10">
            Tech Stack
          </p>
        </motion.div>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: i * 0.03, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
              className="group px-4 py-2.5 rounded-lg border border-zinc-800/50 bg-zinc-900/30 text-sm text-zinc-400 hover:border-zinc-600 hover:text-zinc-100 hover:bg-zinc-800/40 hover:shadow-lg hover:shadow-zinc-900/30 transition-colors duration-200 cursor-default"
            >
              {tech.name}
              <span className="ml-2 text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
