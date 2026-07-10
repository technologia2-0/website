'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createAnnouncement(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const priority = formData.get('priority') as string || 'info'
  const publication_status = formData.get('publication_status') as string || 'draft'

  const { error } = await supabase
    .from('announcements')
    .insert([{
      title,
      description,
      priority,
      publication_status
    }])

  if (error) {
    console.error(error)
    throw new Error('Failed to create announcement')
  }

  revalidatePath('/organizer/announcements')
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/notifications')
}

export async function updateAnnouncement(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const priority = formData.get('priority') as string || 'info'
  const publication_status = formData.get('publication_status') as string || 'draft'

  const { error } = await supabase
    .from('announcements')
    .update({
      title,
      description,
      priority,
      publication_status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) throw new Error('Failed to update announcement')

  revalidatePath('/organizer/announcements')
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/notifications')
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id)

  if (error) throw new Error('Failed to delete announcement')

  revalidatePath('/organizer/announcements')
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/notifications')
}
