'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type ExperienceItem = {
  title: string
  company: string
  period: string
  description: string[]
}

export const Experience = () => {
  const t = useTranslations('Experience')
  const items = t.raw('items') as ExperienceItem[]

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
              {t('eyebrow')}
            </h2>
            <p className="text-2xl sm:text-3xl font-semibold text-zinc-100">
              {t('title')}
            </p>
          </motion.div>
          <div className="lg:col-span-3">
            <Accordion type="multiple" className="relative">
              {/* Timeline line with gradient */}
              <div className="absolute left-1.25 top-2 bottom-0 w-px bg-linear-to-b from-blue-500/30 via-zinc-800 to-zinc-800/0" />

              {items.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                    ease: 'easeOut',
                  }}
                  className="relative pl-8 pb-10 last:pb-0 group"
                >
                  {/* Dot with hover glow */}
                  <div className="absolute left-0 top-1.5 -translate-x-[0.5px]">
                    <div className="w-2.75 h-2.75 rounded-full border-2 border-zinc-700 bg-zinc-950 group-hover:border-blue-400 group-hover:shadow-[0_0_8px_rgba(96,165,250,0.3)] transition-all duration-300" />
                  </div>

                  <AccordionItem
                    value={`experience-${index}`}
                    className="border-none"
                  >
                    <AccordionTrigger className="py-0 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-zinc-600 **:data-[slot=accordion-trigger-icon]:size-3.5">
                      <div>
                        <div className="text-xs text-zinc-500 mb-1.5 font-mono tracking-wide">
                          {exp.period}
                        </div>
                        <h3 className="text-[15px] font-semibold text-zinc-100 group-hover:text-white transition-colors">
                          {exp.title}
                        </h3>
                        <div className="text-sm text-blue-400/80">
                          {exp.company}
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pt-3 pb-0">
                      <ul className="space-y-2">
                        {exp.description.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex gap-2.5 text-[13px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors"
                          >
                            <span className="mt-1.75 shrink-0 w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-blue-400/50 transition-colors" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
