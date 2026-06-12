import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import SubjectsClient from './SubjectsClient'

export default async function SubjectsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const userName = user.user_metadata?.full_name || user.email || ''

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={userName} />
      <SubjectsClient subjects={subjects || []} />
    </div>
  )
}
