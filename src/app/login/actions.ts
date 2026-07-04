'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
        roll_number: formData.get('roll_number') as string,
        department: formData.get('department') as string,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error("Supabase SignUp Error:", error)
    return { error: error.message, message: null }
  }

  revalidatePath('/', 'layout')
  return { error: null, message: 'Check your email to continue sign in process' }
}
