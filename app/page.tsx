import { About } from '@/components/pages/home/about'
import Hero from '@/components/pages/home/hero'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
    </div>
  )
}
