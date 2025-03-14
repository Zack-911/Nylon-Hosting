"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { resetPassword } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await resetPassword(email)
      setIsSubmitted(true)
      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email",
      })
    } catch (error) {
      console.error("Reset password error:", error)
      toast({
        title: "Error",
        description: "Failed to send reset instructions. Please try again.",
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
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Reset your password</CardTitle>
                  <CardDescription className="text-slate-400">
                    {isSubmitted
                      ? "Check your email for reset instructions"
                      : "Enter your email to receive reset instructions"}
                  </CardDescription>
                </CardHeader>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <Button
                        type="submit"
                        className="w-full gradient-purple-blue gradient-purple-blue-hover"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Reset Instructions"}
                      </Button>
                      <Link href="/account" className="w-full">
                        <Button variant="ghost" className="w-full text-slate-400 hover:text-white">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to login
                        </Button>
                      </Link>
                    </CardFooter>
                  </form>
                ) : (
                  <CardContent className="space-y-4 text-center">
                    <p className="text-slate-300">
                      We've sent password reset instructions to <span className="font-medium text-white">{email}</span>
                    </p>
                    <p className="text-sm text-slate-400">If you don't see the email, check your spam folder.</p>
                    <Link href="/account" className="w-full">
                      <Button className="w-full gradient-purple-blue gradient-purple-blue-hover mt-4">
                        Return to login
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

