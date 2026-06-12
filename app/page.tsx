import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <span className="text-5xl">📚</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          StudySync
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Умный планировщик учёбы. Добавляй предметы, задания и дедлайны — всё в одном месте.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Начать бесплатно
          </Link>
          <Link
            href="/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            Войти
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-6">
          {[
            { icon: '📖', title: 'Предметы', desc: 'Организуй учёбу по предметам с цветовыми метками' },
            { icon: '✅', title: 'Задания', desc: 'Создавай задания с дедлайнами и приоритетами' },
            { icon: '📊', title: 'Прогресс', desc: 'Следи за выполнением заданий на дашборде' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
