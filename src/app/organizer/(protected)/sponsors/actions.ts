'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSponsor(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const logo_url = formData.get('logo_url') as string
  const website_url = formData.get('website_url') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const priority = parseInt(formData.get('priority') as string) || 0

  const { error } = await supabase
    .from('sponsors')
    .insert([{
      name, logo_url, website_url, description, category, priority
    }])

  if (error) throw new Error('Failed to create sponsor')

  revalidatePath('/organizer/sponsors')
  revalidatePath('/sponsors')
  revalidatePath('/')
}

export async function updateSponsor(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const logo_url = formData.get('logo_url') as string
  const website_url = formData.get('website_url') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const priority = parseInt(formData.get('priority') as string) || 0

  const { error } = await supabase
    .from('sponsors')
    .update({
      name, logo_url, website_url, description, category, priority
    })
    .eq('id', id)

  if (error) throw new Error('Failed to update sponsor')

  revalidatePath('/organizer/sponsors')
  revalidatePath('/sponsors')
  revalidatePath('/')
}

export async function deleteSponsor(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('sponsors')
    .delete()
    .eq('id', id)

  if (error) throw new Error('Failed to delete sponsor')

  revalidatePath('/organizer/sponsors')
  revalidatePath('/sponsors')
  revalidatePath('/')
}
