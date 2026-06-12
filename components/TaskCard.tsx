'use client'

import { Task } from '@/types'

const PRIORITY_COLOR = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
}
const PRIORITY_LABEL = { high: 'Высокий', medium: 'Средний', low: 'Низкий' }

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function TaskCard({
  task,
  onToggle,
  onDelete,
}: {
  task: Task
  onToggle: (task: Task) => void
  onDelete: (id: string) => void
}) {
  const isOverdue = !task.is_completed && new Date(task.deadline) < new Date()

  return (
    <div className={`bg-white rounded-xl border p-5 flex items-start gap-4 transition-all ${
      task.is_completed ? 'opacity-60 border-gray-100' : isOverdue ? 'border-red-200' : 'border-gray-100'
    }`}>
      <button
        onClick={() => onToggle(task)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          task.is_completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        {task.is_completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`font-medium ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLOR[task.priority]}`}>
            {PRIORITY_LABEL[task.priority]}
          </span>
          {task.subject && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
              style={{ backgroundColor: task.subject.color }}
            >
              {task.subject.name}
            </span>
          )}
        </div>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        )}
        <p className={`text-xs mt-2 font-medium ${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
          {isOverdue ? '⚠️ Просрочено · ' : '📅 '}
          Дедлайн: {formatDate(task.deadline)}
        </p>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
        title="Удалить задание"
      >
        ×
      </button>
    </div>
  )
}
