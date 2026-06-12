-- Таблица предметов
create table subjects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  color text not null default '#3B82F6',
  created_at timestamptz default now()
);

-- Таблица заданий
create table tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  subject_id uuid references subjects(id) on delete set null,
  title text not null,
  description text,
  deadline date not null,
  is_completed boolean default false,
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  created_at timestamptz default now()
);

-- Row Level Security (RLS) — каждый видит только свои данные
alter table subjects enable row level security;
alter table tasks enable row level security;

create policy "Users can manage their own subjects"
  on subjects for all
  using (auth.uid() = user_id);

create policy "Users can manage their own tasks"
  on tasks for all
  using (auth.uid() = user_id);
