# StudySync — умный планировщик учёбы

Веб-приложение для студентов: управляй предметами, заданиями и дедлайнами в одном месте.

## Стек технологий

- **Next.js 14** (App Router) + TypeScript
- **Supabase** — база данных (PostgreSQL), авторизация
- **Tailwind CSS** — стилизация
- **Vercel** — деплой
- **Git** — контроль версий

## Структура проекта

```
studysync/
├── app/
│   ├── (auth)/login/          # Страница входа
│   ├── (auth)/register/       # Страница регистрации
│   ├── api/subjects/          # API предметов (GET, POST, DELETE)
│   ├── api/tasks/             # API заданий (GET, POST, PATCH, DELETE)
│   ├── dashboard/             # Дашборд с заданиями
│   ├── subjects/              # Страница предметов
│   └── page.tsx               # Лендинг
├── components/
│   ├── Navbar.tsx
│   ├── TaskCard.tsx
│   └── AddTaskModal.tsx
├── lib/supabase/
│   ├── client.ts              # Клиент для браузера
│   └── server.ts              # Клиент для сервера
├── types/index.ts
├── middleware.ts              # Защита роутов
└── supabase_schema.sql        # SQL для Supabase
```

## Установка

### 1. Установить зависимости

```bash
npm install
```

### 2. Настроить Supabase

1. Создай проект на [supabase.com](https://supabase.com)
2. В **SQL Editor** выполни `supabase_schema.sql`
3. Скопируй `Project URL` и `anon key` из **Settings → API**

### 3. Переменные окружения

Создай `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Запуск

```bash
npm run dev
```

## Функционал

- Регистрация и вход (Supabase Auth)
- Предметы с цветовыми метками
- Задания с дедлайнами, приоритетами и привязкой к предмету
- Фильтрация и статистика на дашборде
- Защита роутов через middleware
