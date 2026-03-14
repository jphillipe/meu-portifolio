'use client'
import { techStack } from '@/data/mock'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'

export const Tech = () => {
  const t = useTranslations('Tech')
  const plugins = useMemo(
    () => [AutoScroll({ speed: 0.8, stopOnInteraction: false })],
    [],
  )

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
            {t('eyebrow')}
          </h2>
          <p className="text-2xl sm:text-3xl font-semibold text-zinc-100 mb-10">
            {t('title')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Carousel
            plugins={plugins}
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
              containScroll: 'trimSnaps',
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {techStack.map((tech) => (
                <CarouselItem key={tech.name} className="basis-auto pl-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group whitespace-nowrap px-4 py-2.5 rounded-lg border border-zinc-800/50 bg-zinc-900/30 text-sm text-zinc-400 hover:border-zinc-600 hover:text-zinc-100 hover:bg-zinc-800/40 hover:shadow-lg hover:shadow-zinc-900/30 transition-colors duration-200 cursor-default"
                  >
                    {tech.name}
                    <span className="ml-2 text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      {tech.category}
                    </span>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
