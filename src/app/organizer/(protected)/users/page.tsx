import { createClient } from '@/utils/supabase/server'
import { UserListClient } from '@/components/organizer/UserListClient'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function UserManagerPage() {
  const supabase = await createClient()

  // Verify that the current user is an admin or super_admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/organizer/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
    return (
      <div className="p-8 text-center bg-white/5 border border-white/10 rounded-3xl">
        <h2 className="text-xl font-bold text-red-400 mb-2">Access Denied</h2>
        <p className="text-white/60">You must be an Admin to view and manage user roles.</p>
      </div>
    )
  }

  // Fetch all profiles
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching profiles:", error)
  }

  return <UserListClient initialUsers={profiles || []} />
}
