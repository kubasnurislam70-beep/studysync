import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*, subject:subjects(id, name, color)')
    .eq('user_id', user.id)
    .order('deadline', { ascending: true })

  const userName = user.user_metadata?.full_name || user.email || ''

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={userName} />
      <DashboardClient tasks={tasks || []} />
    </div>
  )
}
