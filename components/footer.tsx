"use client"

import { useState } from "react"
import Link from "next/link"
import { constants } from "@/lib/constants"
import { TermsModal } from "@/components/terms-modal"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const { toast } = useToast()

  const handleAcceptTerms = () => {
    toast({
      title: "Terms Accepted",
      description: "You have accepted the Terms of Service.",
    })
    setIsTermsModalOpen(false)
  }

  const handleDeclineTerms = () => {
    toast({
      title: "Terms Declined",
      description: "You have declined the Terms of Service.",
      variant: "destructive",
    })
    setIsTermsModalOpen(false)
  }

  return (
    <>
      <footer className="border-t bg-background">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Nylon Hosting</h3>
              <p className="text-sm text-muted-foreground">
                High-performance hosting solutions for businesses of all sizes.
              </p>
            </div>
            {constants.footerLinks.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-medium">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} Nylon Hosting. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Button>
                <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={handleAcceptTerms}
        onDecline={handleDeclineTerms}
      />
    </>
  )
}
