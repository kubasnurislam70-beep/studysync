export interface Subject {
  id: string
  user_id: string
  name: string
  color: string
  created_at: string
}

export interface Task {
  id: string
  user_id: string
  subject_id: string
  title: string
  description?: string
  deadline: string
  is_completed: boolean
  priority: 'low' | 'medium' | 'high'
  created_at: string
  subject?: Subject
}

export interface Profile {
  id: string
  full_name: string
  avatar_url?: string
  created_at: string
}
