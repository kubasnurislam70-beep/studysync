'use client'

import { useState } from 'react'
import { Subject } from '@/types'

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
]

export default function SubjectsClient({ subjects: initial }: { subjects: Subject[] }) {
  const [subjects, setSubjects] = useState<Subject[]>(initial)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [loading, setLoading] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    })
    if (res.ok) {
      const subject = await res.json()
      setSubjects(prev => [subject, ...prev])
      setName('')
      setColor(COLORS[0])
      setShowForm(false)
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/subjects?id=${id}`, { method: 'DELETE' })
    if (res.ok) setSubjects(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Мои предметы</h1>
          <p className="text-gray-500 mt-1">Организуй задания по предметам</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Добавить предмет
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Новый предмет</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm"
                placeholder="Математический анализ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full transition-transform ${color === c ? 'scale-125 ring-2 ring-offset-2 ring-gray-400' : 'hover:scale-110'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? 'Сохраняем...' : 'Добавить'}
              </button>
            </div>
          </form>
        </div>
      )}

      {subjects.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📖</p>
          <p className="font-medium">Нет предметов</p>
          <p className="text-sm mt-1">Добавь свои предметы для удобной организации заданий</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {subjects.map(subject => (
            <div
              key={subject.id}
              className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0"
                style={{ backgroundColor: subject.color + '22', border: `2px solid ${subject.color}` }}
              >
                <div className="w-full h-full flex items-center justify-center text-xl">📖</div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{subject.name}</p>
                <div
                  className="mt-1 h-1 rounded-full w-16"
                  style={{ backgroundColor: subject.color }}
                />
              </div>
              <button
                onClick={() => handleDelete(subject.id)}
                className="text-gray-300 hover:text-red-400 transition-colors text-xl leading-none flex-shrink-0"
                title="Удалить"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
