import Header from '@/components/Header'

const users = [
  { id: 1, name: '山田 太郎', email: 'yamada@example.com', role: '管理者', status: 'アクティブ', joined: '2024-01-15' },
  { id: 2, name: '佐藤 花子', email: 'sato@example.com', role: 'ユーザー', status: 'アクティブ', joined: '2024-02-20' },
  { id: 3, name: '田中 一郎', email: 'tanaka@example.com', role: 'ユーザー', status: '停止中', joined: '2024-03-05' },
  { id: 4, name: '鈴木 美咲', email: 'suzuki@example.com', role: 'モデレーター', status: 'アクティブ', joined: '2024-03-18' },
  { id: 5, name: '高橋 健太', email: 'takahashi@example.com', role: 'ユーザー', status: 'アクティブ', joined: '2024-04-01' },
  { id: 6, name: '伊藤 さくら', email: 'ito@example.com', role: 'ユーザー', status: 'アクティブ', joined: '2024-04-10' },
]

const statusColor: Record<string, string> = {
  'アクティブ': 'bg-green-100 text-green-700',
  '停止中': 'bg-red-100 text-red-600',
}

const roleColor: Record<string, string> = {
  '管理者': 'bg-purple-100 text-purple-700',
  'モデレーター': 'bg-blue-100 text-blue-700',
  'ユーザー': 'bg-slate-100 text-slate-600',
}

export default function UsersPage() {
  return (
    <div>
      <Header title="ユーザー管理" />
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">全 {users.length} 件</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              + ユーザー追加
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['ID', '名前', 'メール', 'ロール', 'ステータス', '登録日', '操作'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-500">#{user.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${roleColor[user.role]}`}>{user.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[user.status]}`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{user.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-blue-600 hover:underline">編集</button>
                      <button className="text-xs text-red-500 hover:underline">削除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
