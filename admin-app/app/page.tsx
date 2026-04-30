import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">管理ダッシュボード</h1>
        <p className="text-slate-400 mb-8">シンプルで使いやすい管理システム</p>
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          ダッシュボードへ
        </Link>
      </div>
    </main>
  )
}
