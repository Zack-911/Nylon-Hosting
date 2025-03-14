"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Lock, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordConfirmPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if we have the access token in the URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    if (!hashParams.get("access_token")) {
      toast({
        title: "Error",
        description: "Invalid or expired reset link. Please try again.",
        variant: "destructive",
      })
      router.push("/account/reset-password")
    }
  }, [router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        throw error
      }

      setIsSuccess(true)
      toast({
        title: "Success",
        description: "Your password has been reset successfully",
      })

      // Redirect to login after a delay
      setTimeout(() => {
        router.push("/account")
      }, 3000)
    } catch (error: any) {
      console.error("Update password error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-6xl px-4 py-12 md:py-16 lg:py-24">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <Card className="bg-[var(--bg-card)]/70 border-slate-800 backdrop-blur-xs">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                    {isSuccess ? (
                      <Check className="h-6 w-6 text-green-400" />
                    ) : (
                      <Lock className="h-6 w-6 text-purple-400" />
                    )}
                  </div>
                  <CardTitle className="text-white">
                    {isSuccess ? "Password Reset Complete" : "Create New Password"}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {isSuccess ? "Your password has been reset successfully" : "Enter your new password below"}
                  </CardDescription>
                </CardHeader>
                {!isSuccess ? (
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-300">
                          New Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <p className="text-xs text-slate-400">Password must be at least 8 characters long</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-slate-300">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full gradient-purple-blue gradient-purple-blue-hover"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                      </Button>
                    </CardFooter>
                  </form>
                ) : (
                  <CardContent className="space-y-4 text-center">
                    <p className="text-slate-300">
                      Your password has been reset successfully. You can now log in with your new password.
                    </p>
                    <Link href="/account" className="w-full">
                      <Button className="w-full gradient-purple-blue gradient-purple-blue-hover mt-4">
                        Go to login
                      </Button>
                    </Link>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

