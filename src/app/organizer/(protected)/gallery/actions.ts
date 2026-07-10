'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createGalleryItem(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const url = formData.get('url') as string
  const type = formData.get('type') as string || 'image'
  const event_name = formData.get('event_name') as string
  const category_id = formData.get('category_id') as string || null
  const photographer = formData.get('photographer') as string
  const visibility = formData.get('visibility') as string || 'published'
  const is_featured = formData.get('is_featured') === 'on'

  const { error } = await supabase
    .from('gallery_items')
    .insert([{
      title, description, url, type, event_name, 
      category_id: category_id === 'none' ? null : category_id, 
      photographer, visibility, is_featured
    }])

  if (error) throw new Error('Failed to create gallery item')

  revalidatePath('/organizer/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
}

export async function updateGalleryItem(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const url = formData.get('url') as string
  const type = formData.get('type') as string || 'image'
  const event_name = formData.get('event_name') as string
  const category_id = formData.get('category_id') as string || null
  const photographer = formData.get('photographer') as string
  const visibility = formData.get('visibility') as string || 'published'
  const is_featured = formData.get('is_featured') === 'on'

  const { error } = await supabase
    .from('gallery_items')
    .update({
      title, description, url, type, event_name, 
      category_id: category_id === 'none' ? null : category_id, 
      photographer, visibility, is_featured
    })
    .eq('id', id)

  if (error) throw new Error('Failed to update gallery item')

  revalidatePath('/organizer/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('gallery_items')
    .delete()
    .eq('id', id)

  if (error) throw new Error('Failed to delete gallery item')

  revalidatePath('/organizer/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
}
