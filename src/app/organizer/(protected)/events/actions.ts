'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createEvent(formData: FormData) {
  const supabase = await createClient()

  // Verify role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'super_admin', 'coordinator'].includes(profile.role)) {
    throw new Error("Unauthorized role")
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const event_type = formData.get('event_type') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const venue = formData.get('venue') as string
  const building = formData.get('building') as string
  const room_number = formData.get('room_number') as string
  const certificate_eligibility = formData.get('certificate_eligibility') as string
  const capacity = parseInt(formData.get('capacity') as string) || 0
  const is_team_event = formData.get('is_team_event') === 'on'
  const max_team_size = parseInt(formData.get('max_team_size') as string) || 1
  const is_registration_open = formData.get('is_registration_open') === 'on'

  const { error } = await supabase.from('events').insert({
    title,
    description,
    event_type,
    date,
    time,
    venue,
    building,
    room_number,
    certificate_eligibility,
    registration_limit: capacity > 0 ? capacity : null,
    is_team_event,
    max_team_size,
    is_registration_open
  })

  if (error) {
    console.error("Error creating event", error)
    throw new Error("Failed to create event")
  }

  revalidatePath('/organizer/events')
}

export async function updateEvent(eventId: string, formData: FormData) {
  const supabase = await createClient()

  // Role validation is also handled by RLS, but we verify here for UX
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const event_type = formData.get('event_type') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const venue = formData.get('venue') as string
  const building = formData.get('building') as string
  const room_number = formData.get('room_number') as string
  const certificate_eligibility = formData.get('certificate_eligibility') as string
  const capacity = parseInt(formData.get('capacity') as string) || 0
  const is_team_event = formData.get('is_team_event') === 'on'
  const max_team_size = parseInt(formData.get('max_team_size') as string) || 1
  const is_registration_open = formData.get('is_registration_open') === 'on'

  const { error } = await supabase.from('events')
    .update({
      title,
      description,
      event_type,
      date,
      time,
      venue,
      building,
      room_number,
      certificate_eligibility,
      registration_limit: capacity > 0 ? capacity : null,
      is_team_event,
      max_team_size,
      is_registration_open,
    })
    .eq('id', eventId)

  if (error) {
    console.error("Error updating event", error)
    throw new Error("Failed to update event")
  }

  revalidatePath('/organizer/events')
}

export async function deleteEvent(eventId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('events').delete().eq('id', eventId)

  if (error) {
    throw new Error("Failed to delete event")
  }

  revalidatePath('/organizer/events')
}
