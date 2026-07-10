'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createCommitteeMember(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const designation = formData.get('designation') as string
  const department = formData.get('department') as string
  const year = formData.get('year') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const github_url = formData.get('github_url') as string
  const linkedin_url = formData.get('linkedin_url') as string
  const instagram_url = formData.get('instagram_url') as string
  const description = formData.get('description') as string
  const priority = parseInt(formData.get('priority') as string) || 0
  const visibility = formData.get('visibility') as string || 'published'
  const image_url = formData.get('image_url') as string

  const { error } = await supabase
    .from('committee_members')
    .insert([{
      name, designation, department, year, email, phone, 
      github_url, linkedin_url, instagram_url, description, 
      priority, visibility, image_url
    }])

  if (error) throw new Error('Failed to create committee member')

  revalidatePath('/organizer/committee')
  revalidatePath('/committee')
  revalidatePath('/')
}

export async function updateCommitteeMember(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const designation = formData.get('designation') as string
  const department = formData.get('department') as string
  const year = formData.get('year') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const github_url = formData.get('github_url') as string
  const linkedin_url = formData.get('linkedin_url') as string
  const instagram_url = formData.get('instagram_url') as string
  const description = formData.get('description') as string
  const priority = parseInt(formData.get('priority') as string) || 0
  const visibility = formData.get('visibility') as string || 'published'
  const image_url = formData.get('image_url') as string

  const { error } = await supabase
    .from('committee_members')
    .update({
      name, designation, department, year, email, phone, 
      github_url, linkedin_url, instagram_url, description, 
      priority, visibility, image_url
    })
    .eq('id', id)

  if (error) throw new Error('Failed to update committee member')

  revalidatePath('/organizer/committee')
  revalidatePath('/committee')
  revalidatePath('/')
}

export async function deleteCommitteeMember(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('committee_members')
    .delete()
    .eq('id', id)

  if (error) throw new Error('Failed to delete committee member')

  revalidatePath('/organizer/committee')
  revalidatePath('/committee')
  revalidatePath('/')
}
