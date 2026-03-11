import { FolderOpen, Eye, Heart } from 'lucide-react'

interface DashboardStatsProps {
  totalProjects: number
  totalViews: number
  totalLikes: number
}

export function DashboardStats({
  totalProjects,
  totalViews,
  totalLikes,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center">
          <FolderOpen className="h-5 w-5 text-zinc-400" />
        </div>
        <div>
          <div className="text-xl font-bold text-zinc-100">{totalProjects}</div>
          <div className="text-xs text-zinc-500">Total de Projetos</div>
        </div>
      </div>
      <div className="p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center">
          <Eye className="h-5 w-5 text-zinc-400" />
        </div>
        <div>
          <div className="text-xl font-bold text-zinc-100">
            {totalViews.toLocaleString()}
          </div>
          <div className="text-xs text-zinc-500">Visualizações Totais</div>
        </div>
      </div>
      <div className="p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center">
          <Heart className="h-5 w-5 text-zinc-400" />
        </div>
        <div>
          <div className="text-xl font-bold text-zinc-100">
            {totalLikes.toLocaleString()}
          </div>
          <div className="text-xs text-zinc-500">Likes Totais</div>
        </div>
      </div>
    </div>
  )
}
