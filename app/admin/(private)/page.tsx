import type { Metadata } from 'next'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DashboardStats } from './_components/dashboardStats'
import { ProjectsTabs } from './_components/projects-tabs'
import { prisma } from '@/lib/prisma'
import { logoutAction } from './_actions/logoutAction'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminDashboardPage() {
  const t = await getTranslations('Admin')

  const dbProjects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const projects = dbProjects.map((project) => ({
    ...project,
    year: project.createdAt.getFullYear(),
  }))

  const totalLikes = await prisma.like.count()

  const totalViews = await prisma.view.count()

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-50 flex items-center gap-3">
              <LayoutDashboard className="h-6 w-6" /> {t('title')}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">{t('subtitle')}</p>
          </div>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 gap-2"
            >
              <LogOut className="h-4 w-4" /> {t('logout')}
            </Button>
          </form>
        </div>

        <DashboardStats
          totalProjects={projects.length}
          totalViews={totalViews}
          totalLikes={totalLikes}
        />

        <ProjectsTabs projects={projects} />
      </div>
    </div>
  )
}
