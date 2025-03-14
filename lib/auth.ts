import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"
import prisma from "./prisma"

export type AuthUser = User & {
  profile?: {
    firstName?: string
    lastName?: string
    company?: string
    avatarUrl?: string
  }
}

export async function signUp(email: string, password: string, firstName?: string, lastName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.user) {
    // Create user profile in Prisma
    await prisma.userProfile.create({
      data: {
        id: data.user.id,
        email: data.user.email || "",
        firstName: firstName || "",
        lastName: lastName || "",
      },
    })
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }

  return true
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/account/reset-password-confirm`,
  })

  if (error) {
    throw new Error(error.message)
  }

  return true
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return true
}

export async function getUserProfile(userId: string) {
  const profile = await prisma.userProfile.findUnique({
    where: {
      id: userId,
    },
  })

  return profile
}

export async function updateUserProfile(userId: string, data: any) {
  const profile = await prisma.userProfile.update({
    where: {
      id: userId,
    },
    data,
  })

  return profile
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw new Error(error.message)
  }

  return data.session
}

export async function refreshSession() {
  const { data, error } = await supabase.auth.refreshSession()

  if (error) {
    throw new Error(error.message)
  }

  return data.session
}

