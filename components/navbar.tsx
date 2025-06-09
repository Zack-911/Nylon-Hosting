"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu, Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "@/styles/modules/animations.module.css"

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

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`sticky top-0 z-50 w-full border-b border-slate-800/50 transition-all duration-300 ${
        transparent && !scrolled ? "bg-transparent" : "bg-black/70 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Cpu className={`h-6 w-6 text-purple-500 ${styles.pulseAnimation}`} />
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Nylon Hosting Services
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.div variants={itemVariants}>
              <Link href="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Home
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
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
                  <Link
                    href="/buy/dedicated-servers"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-purple-900/30 hover:text-white"
                  >
                    Dedicated Servers
                  </Link>
                  <Link
                    href="/buy/vps"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-purple-900/30 hover:text-white"
                  >
                    VPS
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
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
                    href="/volunteer"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-purple-900/30 hover:text-white"
                  >
                    Volunteer
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Pricing
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                About
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/support" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Support
              </Link>
            </motion.div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <motion.div variants={itemVariants}>
                <Link href="/account">
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-purple-900/20">
                    Sign In
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/account?tab=register">
                  <Button
                    className={`bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white border-0 ${styles.buttonHover}`}
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              variants={itemVariants}
              className="md:hidden flex items-center justify-center text-white p-2 rounded-md hover:bg-purple-900/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/95 backdrop-blur-md border-t border-purple-900/30"
        >
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
                <Link
                  href="/buy/dedicated-servers"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dedicated Servers
                </Link>
                <Link
                  href="/buy/vps"
                  className="px-4 py-1.5 text-sm text-white/80 hover:text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  VPS
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
                  <Button
                    className={`w-full justify-center bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white border-0 ${styles.buttonHover}`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
