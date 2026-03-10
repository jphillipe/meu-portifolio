import { About } from '@/components/pages/home/about'
import { Featured } from '@/components/pages/home/featured'
import Hero from '@/components/pages/home/hero'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Separator className="max-w-6xl mx-auto bg-zinc-800/50" />
      <Featured />
    </div>
  )
}
