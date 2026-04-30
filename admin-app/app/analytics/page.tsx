import Header from '@/components/Header'

const monthlyData = [
  { month: '1月', revenue: 1200000, users: 320 },
  { month: '2月', revenue: 1450000, users: 410 },
  { month: '3月', revenue: 1800000, users: 530 },
  { month: '4月', revenue: 1650000, users: 480 },
  { month: '5月', revenue: 2100000, users: 620 },
  { month: '6月', revenue: 2456789, users: 720 },
]

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))
const maxUsers = Math.max(...monthlyData.map((d) => d.users))

export default function AnalyticsPage() {
  return (
    <div>
      <Header title="アナリティクス" />
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">月別売上推移</h2>
          <div className="flex items-end gap-3 h-48">
            {monthlyData.map(({ month, revenue }) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-slate-500">¥{(revenue / 10000).toFixed(0)}万</span>
                <div
                  className="w-full bg-blue-500 rounded-t-md transition-all"
                  style={{ height: `${(revenue / maxRevenue) * 160}px` }}
                />
                <span className="text-xs font-medium text-slate-600">{month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">月別新規ユーザー数</h2>
          <div className="flex items-end gap-3 h-48">
            {monthlyData.map(({ month, users }) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-slate-500">{users}</span>
                <div
                  className="w-full bg-green-500 rounded-t-md transition-all"
                  style={{ height: `${(users / maxUsers) * 160}px` }}
                />
                <span className="text-xs font-medium text-slate-600">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
