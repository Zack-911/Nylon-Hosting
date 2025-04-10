"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  onDecline: () => void
}

export function TermsModal({ isOpen, onClose, onAccept, onDecline }: TermsModalProps) {
  const [mounted, setMounted] = useState(false)

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* 3D Modal */}
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl border bg-card p-6 shadow-[0_0_15px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)]"
        style={{
          transform: "perspective(1000px) rotateX(1deg)",
          transformOrigin: "top",
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Terms of Service</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-bold">1. Introduction</h3>
            <p className="mt-2 text-muted-foreground">
              Welcome to Nylon Hosting. These Terms of Service govern your use of our website and services. By accessing
              or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms,
              you may not access the service.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold">2. Definitions</h3>
            <p className="mt-2 text-muted-foreground">
              &quot;Service&quot; refers to the website and hosting services provided by Nylon Hosting.
              &quot;User,&quot; &quot;You,&quot; and &quot;Your&quot; refers to the individual or entity using our
              Service. &quot;Company,&quot; &quot;We,&quot; &quot;Us,&quot; and &quot;Our&quot; refers to Nylon Hosting.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold">3. Account Terms</h3>
            <p className="mt-2 text-muted-foreground">
              You are responsible for maintaining the security of your account and password. The company cannot and will
              not be liable for any loss or damage from your failure to comply with this security obligation.
            </p>
            <p className="mt-2 text-muted-foreground">
              You are responsible for all content posted and activity that occurs under your account.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold">4. Payment Terms</h3>
            <p className="mt-2 text-muted-foreground">
              The Service is billed on a subscription basis. You will be billed in advance on a recurring and periodic
              basis, depending on the type of subscription plan you select.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold">5. Cancellation and Termination</h3>
            <p className="mt-2 text-muted-foreground">
              You can cancel your subscription at any time by contacting our customer support team or through your
              account settings.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold">6. Acceptable Use Policy</h3>
            <p className="mt-2 text-muted-foreground">
              You agree not to use the Service to upload or transmit any content that is unlawful, harmful, threatening,
              abusive, harassing, defamatory, vulgar, obscene, or invasive of another&apos;s privacy.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold">7. Limitation of Liability</h3>
            <p className="mt-2 text-muted-foreground">
              In no event shall the Company, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages.
            </p>
          </section>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={onDecline}>
            Decline
          </Button>
          <Button onClick={onAccept}>Accept</Button>
        </div>
      </div>
    </div>
  )
}
