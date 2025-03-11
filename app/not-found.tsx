import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu, Home } from "lucide-react"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-dark)]">
      <main className="flex-1 flex items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 md:py-24 lg:py-32 text-center">
          <div className="relative glow-effect">
            <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-[var(--bg-card)] border border-slate-800">
              <div className="flex items-center justify-center">
                <Cpu className="h-10 w-10 text-purple-500" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
              404
            </h1>
            <p className="text-xl font-medium text-white">Page Not Found</p>
            <p className="max-w-[600px] text-slate-400 md:text-xl/relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Link href="#contact">
                <Cpu className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </div>
          <div className="w-full max-w-md">
            <div className="relative glow-effect">
              <div className="relative flex items-center h-12 rounded-lg bg-[var(--bg-card)]/70 border border-slate-800 px-4 z-10">
                <div className="w-full flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="flex-1 h-2 rounded-full bg-slate-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

