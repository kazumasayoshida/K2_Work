import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  icon: LucideIcon
  color: string
}

export default function StatsCard({ title, value, change, positive, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
      <p className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-500'}`}>
        {change} <span className="text-slate-400 font-normal">先月比</span>
      </p>
    </div>
  )
}
