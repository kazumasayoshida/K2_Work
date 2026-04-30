import Header from '@/components/Header'
import StatsCard from '@/components/StatsCard'
import { Users, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react'

const stats = [
  { title: '総ユーザー数', value: '12,345', change: '+12.5%', positive: true, icon: Users, color: 'bg-blue-500' },
  { title: '今月の売上', value: '¥2,456,789', change: '+8.2%', positive: true, icon: DollarSign, color: 'bg-green-500' },
  { title: '注文数', value: '1,234', change: '-3.1%', positive: false, icon: ShoppingCart, color: 'bg-orange-500' },
  { title: '成長率', value: '23.4%', change: '+4.6%', positive: true, icon: TrendingUp, color: 'bg-purple-500' },
]

const recentActivity = [
  { user: '山田 太郎', action: '新規登録', time: '3分前', avatar: 'Y' },
  { user: '佐藤 花子', action: '注文完了 #1234', time: '15分前', avatar: 'S' },
  { user: '田中 一郎', action: 'プロフィール更新', time: '1時間前', avatar: 'T' },
  { user: '鈴木 美咲', action: '問い合わせ送信', time: '2時間前', avatar: 'S' },
  { user: '高橋 健太', action: '退会申請', time: '3時間前', avatar: 'T' },
]

export default function DashboardPage() {
  return (
    <div>
      <Header title="ダッシュボード" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">最近のアクティビティ</h2>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-sm font-bold text-slate-600">
                    {item.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{item.user}</p>
                    <p className="text-xs text-slate-500">{item.action}</p>
                  </div>
                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">システム状態</h2>
            <div className="space-y-4">
              {[
                { label: 'CPU使用率', value: 42, color: 'bg-blue-500' },
                { label: 'メモリ使用率', value: 68, color: 'bg-green-500' },
                { label: 'ストレージ', value: 55, color: 'bg-orange-500' },
                { label: 'ネットワーク', value: 23, color: 'bg-purple-500' },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{label}</span>
                    <span className="font-medium text-slate-800">{value}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`${color} h-2 rounded-full`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
