import Header from '@/components/Header'

export default function SettingsPage() {
  return (
    <div>
      <Header title="設定" />
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">一般設定</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">サイト名</label>
              <input
                type="text"
                defaultValue="AdminApp"
                className="w-full max-w-md px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">管理者メール</label>
              <input
                type="email"
                defaultValue="admin@example.com"
                className="w-full max-w-md px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">言語</label>
              <select className="w-full max-w-md px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>日本語</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">通知設定</h2>
          <div className="space-y-3">
            {[
              { label: 'メール通知', desc: '新しいユーザー登録時にメールを受信する' },
              { label: 'システムアラート', desc: 'エラーや異常を検知した際に通知する' },
              { label: 'レポート配信', desc: '週次レポートを自動送信する' },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-slate-800">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
                <button className="relative w-11 h-6 bg-blue-500 rounded-full transition-colors">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors">
            保存する
          </button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-6 py-2 rounded-lg transition-colors">
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}
