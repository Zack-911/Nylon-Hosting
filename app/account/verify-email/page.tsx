"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Mail } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function VerifyEmailPage() {
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
                  <CardTitle className="text-white">Check your email</CardTitle>
                  <CardDescription className="text-slate-400">
                    We've sent you a verification link to complete your registration
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-slate-300">
                  <p>Please check your email inbox and click on the verification link to activate your account.</p>
                  <p className="mt-2 text-sm text-slate-400">If you don't see the email, check your spam folder.</p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Link href="/account" className="w-full">
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Return to login</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

