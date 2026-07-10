'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateHomepageContent(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const hero_title = formData.get('hero_title') as string
  const hero_subtitle = formData.get('hero_subtitle') as string
  const hero_description = formData.get('hero_description') as string
  const countdown_date = formData.get('countdown_date') as string
  
  const about_title = formData.get('about_title') as string
  const about_description = formData.get('about_description') as string
  const vision_text = formData.get('vision_text') as string
  const mission_text = formData.get('mission_text') as string

  const { error } = await supabase
    .from('homepage_content')
    .update({
      hero_title,
      hero_subtitle,
      hero_description,
      countdown_date,
      about_title,
      about_description,
      vision_text,
      mission_text,
      updated_at: new Date().toISOString(),
      updated_by: user.id
    })
    .eq('id', 1)

  if (error) {
    console.error(error)
    throw new Error('Failed to update homepage content')
  }

  revalidatePath('/')
  revalidatePath('/organizer/homepage')
}
