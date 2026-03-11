import { LayoutDashboard, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DashboardStats } from './_components/dashboardStats'
import { ProjectsTabs } from './_components/projects-tabs'

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Plataforma de E-commerce',
    category: 'Full Stack',
    year: 2024,
    featured: true,
    views: 1250,
  },
  {
    id: '2',
    title: 'App de Gestão Financeira',
    category: 'Mobile',
    year: 2023,
    featured: false,
    views: 890,
  },
]

export default async function AdminDashboardPage() {
  const projects = MOCK_PROJECTS

  const totalViews = projects.reduce((acc, p) => acc + p.views, 0)

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-50 flex items-center gap-3">
              <LayoutDashboard className="h-6 w-6" /> Painel Admin
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Gerencie os projetos do portfólio
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 gap-2"
          >
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>

        <DashboardStats
          totalProjects={projects.length}
          totalViews={totalViews}
          totalLikes={460} // Mockado por enquanto
        />

        <ProjectsTabs initialProjects={projects} />
      </div>
    </div>
  )
}
