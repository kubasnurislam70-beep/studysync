'use client'

import { useState } from 'react'
import { Task } from '@/types'
import TaskCard from '@/components/TaskCard'
import AddTaskModal from '@/components/AddTaskModal'

const PRIORITY_LABELS = { high: 'Высокий', medium: 'Средний', low: 'Низкий' }

export default function DashboardClient({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showAddTask, setShowAddTask] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const total = tasks.length
  const completed = tasks.filter(t => t.is_completed).length
  const overdue = tasks.filter(t => !t.is_completed && new Date(t.deadline) < new Date()).length

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.is_completed
    if (filter === 'completed') return t.is_completed
    return true
  })

  async function handleToggle(task: Task) {
    const res = await fetch(`/api/tasks?id=${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed: !task.is_completed }),
    })
    if (res.ok) {
      const updated = await res.json()
      setTasks(prev => prev.map(t => t.id === task.id ? updated : t))
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' })
    if (res.ok) setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleTaskAdded(task: Task) {
    setTasks(prev => [...prev, task].sort((a, b) =>
      new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    ))
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Мои задания</h1>
          <p className="text-gray-500 mt-1">Следи за дедлайнами и прогрессом</p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Добавить задание
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Всего заданий</p>
          <p className="text-3xl font-bold text-gray-900">{total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Выполнено</p>
          <p className="text-3xl font-bold text-green-600">{completed}</p>
          {total > 0 && (
            <div className="mt-2 bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all"
                style={{ width: `${Math.round((completed / total) * 100)}%` }}
              />
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Просрочено</p>
          <p className="text-3xl font-bold text-red-500">{overdue}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {(['all', 'active', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-medium">Нет заданий</p>
          <p className="text-sm mt-1">Нажми «Добавить задание», чтобы начать</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showAddTask && (
        <AddTaskModal
          onClose={() => setShowAddTask(false)}
          onAdded={handleTaskAdded}
        />
      )}
    </div>
  )
}
