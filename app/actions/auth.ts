'use server'

import { z } from 'zod'
import { supabaseServer } from '@/lib/supabaseServer'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const validatedFields = loginSchema.safeParse({
    email,
    password,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Login.',
    }
  }

  const { data: user, error } = await supabaseServer
    .from('users')
    .select('*')
    .eq('username', validatedFields.data.email)
    .single()

  if (error || !user) {
    return {
      message: 'Invalid email or password.',
    }
  }

  if (user.password !== validatedFields.data.password) {
    return {
       message: 'Invalid email or password.',
    }
  }

  await createSession(user.id, user.role)
  
  redirect('/admin')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
