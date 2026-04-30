'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Bell, BellOff, Plus, Trash2, AlarmClock } from 'lucide-react'

interface Alarm {
  id: string
  time: string
  label: string
  enabled: boolean
  days: number[]
}

const DAY_LABELS = ['日', '月', '火', '水', '木', '金', '土']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export default function AlarmApp() {
  const [now, setNow] = useState(new Date())
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: '1', time: '07:00', label: '朝のアラーム', enabled: true, days: [1,2,3,4,5] },
    { id: '2', time: '12:00', label: 'ランチ', enabled: false, days: [1,2,3,4,5] },
  ])
  const [newTime, setNewTime] = useState('08:00')
  const [newLabel, setNewLabel] = useState('')
  const [newDays, setNewDays] = useState<number[]>([0,1,2,3,4,5,6])
  const [ringing, setRinging] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const audioRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)

  const stopRinging = useCallback(() => {
    oscillatorRef.current?.stop()
    oscillatorRef.current = null
    setRinging(null)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const h = now.getHours()
    const m = now.getMinutes()
    const s = now.getSeconds()
    const day = now.getDay()
    if (s !== 0) return
    const current = `${pad(h)}:${pad(m)}`
    alarms.forEach(alarm => {
      if (alarm.enabled && alarm.time === current && alarm.days.includes(day) && ringing !== alarm.id) {
        setRinging(alarm.id)
        try {
          const ctx = new AudioContext()
          audioRef.current = ctx
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.frequency.setValueAtTime(880, ctx.currentTime)
          osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.3)
          osc.frequency.setValueAtTime(880, ctx.currentTime + 0.6)
          gain.gain.setValueAtTime(0.3, ctx.currentTime)
          osc.start()
          oscillatorRef.current = osc
        } catch {}
      }
    })
  }, [now, alarms, ringing])

  const addAlarm = () => {
    if (!newTime) return
    setAlarms(prev => [...prev, {
      id: Date.now().toString(),
      time: newTime,
      label: newLabel || 'アラーム',
      enabled: true,
      days: newDays,
    }])
    setNewLabel('')
    setNewDays([0,1,2,3,4,5,6])
    setShowAdd(false)
  }

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a))
  }

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id))
    if (ringing === id) stopRinging()
  }

  const toggleDay = (day: number) => {
    setNewDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])
  }

  const nextAlarm = alarms
    .filter(a => a.enabled)
    .map(a => a.time)
    .sort()
    .find(t => t > `${pad(now.getHours())}:${pad(now.getMinutes())}`)
    ?? alarms.filter(a => a.enabled).map(a => a.time).sort()[0]

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center px-4 py-10">
      {/* 現在時刻 */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <AlarmClock className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-300">アラームアプリ</h1>
        </div>
        <div className="text-8xl font-mono font-bold text-white tracking-tight">
          {formatTime(now)}
        </div>
        <p className="mt-2 text-slate-400 text-sm">
          {now.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
        </p>
        {nextAlarm && (
          <p className="mt-1 text-blue-400 text-sm">次のアラーム: {nextAlarm}</p>
        )}
      </div>

      {/* アラームリスト */}
      <div className="w-full max-w-md space-y-3 mb-6">
        {alarms.length === 0 && (
          <p className="text-center text-slate-500 py-8">アラームがありません</p>
        )}
        {alarms.map(alarm => (
          <div
            key={alarm.id}
            className={`rounded-2xl p-4 flex items-center gap-4 transition-all border ${
              alarm.enabled
                ? 'bg-slate-800 border-blue-500/30'
                : 'bg-slate-800/50 border-slate-700/30 opacity-60'
            }${ringing === alarm.id ? ' ring-2 ring-yellow-400 animate-pulse' : ''}`}
          >
            <div className="flex-1">
              <div className="text-3xl font-mono font-bold text-white">{alarm.time}</div>
              <div className="text-sm text-slate-400 mt-0.5">{alarm.label}</div>
              <div className="flex gap-1 mt-2">
                {DAY_LABELS.map((d, i) => (
                  <span
                    key={i}
                    className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      alarm.days.includes(i)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-500'
                    }`}
                  >{d}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              {ringing === alarm.id ? (
                <button
                  onClick={stopRinging}
                  className="bg-yellow-400 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg"
                >停止</button>
              ) : (
                <button
                  onClick={() => toggleAlarm(alarm.id)}
                  className={`p-2 rounded-full transition-colors ${
                    alarm.enabled ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {alarm.enabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={() => deleteAlarm(alarm.id)}
                className="p-2 rounded-full text-slate-500 hover:text-red-400 hover:bg-slate-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* アラーム追加フォーム */}
      {showAdd ? (
        <div className="w-full max-w-md bg-slate-800 rounded-2xl p-5 border border-blue-500/30 space-y-4">
          <h2 className="font-semibold text-slate-200">新しいアラーム</h2>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">時刻</label>
            <input
              type="time"
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
              className="w-full bg-slate-700 text-white text-2xl font-mono rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">ラベル</label>
            <input
              type="text"
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              placeholder="アラーム"
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-2 block">繰り返し</label>
            <div className="flex gap-2">
              {DAY_LABELS.map((d, i) => (
                <button
                  key={i}
                  onClick={() => toggleDay(i)}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    newDays.includes(i)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >{d}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={addAlarm}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
            >追加</button>
            <button
              onClick={() => setShowAdd(false)}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2.5 rounded-xl transition-colors"
            >キャンセル</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          アラームを追加
        </button>
      )}
    </div>
  )
}
