"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu, Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-slate-800/50 transition-all duration-300 ${
        transparent && !scrolled ? "bg-transparent" : "bg-black/70 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Cpu className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Nylon Hosting Services
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Home
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors">
                Products <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
              <div className="absolute left-0 top-full mt-1 w-48 origin-top-left rounded-md bg-black/90 backdrop-blur-md border border-purple-900/50 shadow-lg shadow-purple-900/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link
                    href="/buy/hosting"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-purple-900/30 hover:text-white"
                  >
                    Web Hosting
                  </Link>
                  <Link
                    href="/buy/cloudstorage"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-purple-900/30 hover:text-white"
                  >
                    Cloud Storage
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors">
                Solutions <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
              <div className="absolute left-0 top-full mt-1 w-48 origin-top-left rounded-md bg-black/90 backdrop-blur-md border border-purple-900/50 shadow-lg shadow-purple-900/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link
                    href="/buy"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-purple-900/30 hover:text-white"
                  >
                    Marketplace
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-purple-900/30 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/volunteer"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-purple-900/30 hover:text-white"
                  >
                    Volunteer
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Pricing
            </Link>

            <Link href="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              About
            </Link>

            <Link href="/support" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Support
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Link href="/account">
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-purple-900/20">
                  Sign In
                </Button>
              </Link>
              <Link href="/account?tab=register">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white border-0">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center text-white p-2 rounded-md hover:bg-purple-900/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-purple-900/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="px-2 py-1.5 text-sm text-white/80 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <div className="border-t border-purple-900/30 pt-2 mt-2">
                <div className="px-2 py-1 text-xs font-semibold text-purple-400 uppercase">Products</div>
                <Link
                  href="/buy/hosting"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Web Hosting
                </Link>
                <Link
                  href="/buy/cloudstorage"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cloud Storage
                </Link>
              </div>

              <div className="border-t border-purple-900/30 pt-2 mt-2">
                <div className="px-2 py-1 text-xs font-semibold text-purple-400 uppercase">Solutions</div>
                <Link
                  href="/buy"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Marketplace
                </Link>
                <Link
                  href="/dashboard"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/volunteer"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Volunteer
                </Link>
              </div>

              <div className="border-t border-purple-900/30 pt-2 mt-2">
                <div className="px-2 py-1 text-xs font-semibold text-purple-400 uppercase">Navigation</div>
                <Link
                  href="/pricing"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/support"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Support
                </Link>
                <Link
                  href="/docs"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Documentation
                </Link>
                <Link
                  href="/status"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Status
                </Link>
              </div>

              <div className="border-t border-purple-900/30 pt-3 mt-2 flex flex-col gap-2">
                <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-center text-white/80 hover:text-white hover:bg-purple-900/20"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/account?tab=register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-center bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white border-0">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
