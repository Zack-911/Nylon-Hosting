import Link from "next/link"
import { FileQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlowEffect } from "@/components/glow-effect"

export default function NotFound() {
  return (
    <div className="relative">
      <GlowEffect />
      <div className="container flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center px-4 py-12 text-center md:px-6 md:py-16">
        <FileQuestion className="h-24 w-24 text-muted-foreground" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">Post Not Found</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
