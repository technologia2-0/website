'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function organizerLogin(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  let { error } = await supabase.auth.signInWithPassword(data)

  // Auto-provision the master admin if it doesn't exist
  if (error && data.email === 'technologiaitcsds@gmail.com' && data.password === 'Tech@2026') {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: 'Master Admin',
          roll_number: 'ADMIN-001',
          department: 'other'
        }
      }
    })
    
    if (!signUpError) {
      // Sign in again now that they are registered
      const { error: secondAttemptError } = await supabase.auth.signInWithPassword(data)
      error = secondAttemptError
    }
  }

  if (error) {
    redirect(`/organizer/login?error=${encodeURIComponent(error.message)}`)
  }

  // After successful login, redirect to organizer portal
  revalidatePath('/', 'layout')
  redirect('/organizer')
}
