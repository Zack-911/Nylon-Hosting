"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { type AuthUser, getUserProfile } from "@/lib/auth"

type AuthContextType = {
  user: AuthUser | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      setIsLoading(true)

      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        try {
          const profile = await getUserProfile(session.user.id)
          if (profile) {
            setUser({
              ...session.user,
              profile: {
                firstName: profile.firstName || undefined,
                lastName: profile.lastName || undefined,
                company: profile.company || undefined,
                avatarUrl: profile.avatarUrl || undefined,
              },
            })
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      }

      setIsLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        try {
          const profile = await getUserProfile(session.user.id)
          if (profile) {
            setUser({
              ...session.user,
              profile: {
                firstName: profile.firstName || undefined,
                lastName: profile.lastName || undefined,
                company: profile.company || undefined,
                avatarUrl: profile.avatarUrl || undefined,
              },
            })
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      }

      setIsLoading(false)

      // Force refresh to update UI
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const value = {
    user,
    session,
    isLoading,
    signIn: async (email: string, password: string) => {
      setIsLoading(true)
      try {
        const { data } = await supabase.auth.signInWithPassword({ email, password })
        setUser(data.user)
        setSession(data.session)
        router.push("/dashboard")
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    signUp: async (email: string, password: string, firstName?: string, lastName?: string) => {
      setIsLoading(true)
      try {
        const { data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        })

        if (data.user) {
          // Create user profile in database via API
          await fetch("/api/auth/create-profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: data.user.id,
              email,
              firstName,
              lastName,
            }),
          })
        }

        router.push("/account/verify-email")
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    signOut: async () => {
      setIsLoading(true)
      try {
        await supabase.auth.signOut()
        setUser(null)
        setSession(null)
        router.push("/")
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    resetPassword: async (email: string) => {
      setIsLoading(true)
      try {
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/account/reset-password-confirm`,
        })
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

