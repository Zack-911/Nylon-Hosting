"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import styles from "./navbar.module.css"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header
      className={`${styles.header} ${transparent ? styles.headerTransparent : styles.headerDefault} sticky top-0 z-50`}
    >
      <div className={`container ${styles.container}`}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoContainer}>
            <Cpu className={styles.logoIcon} />
            <span className={styles.logoText}>Nylon Hosting Services</span>
          </Link>
          <div className="navWrapper hidden md:block">
            <nav className="flex justify-center gap-6">
              {/* Products Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`${styles.navLink} flex items-center gap-1`}>
                    Products <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
                  <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                    <Link href="/buy/gpu" className="w-full">
                      GPU Computing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                    <Link href="/buy/hosting" className="w-full">
                      Web Hosting
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                    <Link href="/buy/cloudstorage" className="w-full">
                      Cloud Storage
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Solutions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`${styles.navLink} flex items-center gap-1`}>
                    Solutions <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
                  <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                    <Link href="/buy" className="w-full">
                      Marketplace
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/pricing" className={styles.navLink}>
                Pricing
              </Link>

              <Link href="/docs" className={styles.navLink}>
                Documentation
              </Link>
              <Link href="/support" className={styles.navLink}>
                Support
              </Link>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
            </nav>
          </div>
        </div>
        <div className={styles.actionsContainer}>
          <nav className={styles.desktopNav}>
            <Link href="/account">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/account?tab=register">
              <Button className="gradient-purple-blue gradient-purple-blue-hover">Get Started</Button>
            </Link>
          </nav>
          <button className={styles.mobileMenuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={`container ${styles.mobileMenuContainer}`}>
            <nav className={styles.mobileNavList}>
              <div className="py-2 px-4 text-sm font-semibold text-slate-400 uppercase">Products</div>
              <Link href="/buy/gpu" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                GPU Computing
              </Link>
              <Link href="/buy/hosting" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Web Hosting
              </Link>
              <Link href="/buy/cloudstorage" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Cloud Storage
              </Link>

              <div className="py-2 px-4 text-sm font-semibold text-slate-400 uppercase mt-4">Navigation</div>
              <Link href="/pricing" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="/buy" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Marketplace
              </Link>
              <Link href="/dashboard" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/docs" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Documentation
              </Link>
              <Link href="/support" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Support
              </Link>
              <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </nav>
            <div className={styles.mobileActions}>
              <Link href="/account">
                <Button variant="ghost" className="justify-center text-slate-300 hover:text-white w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/account?tab=register">
                <Button className="justify-center gradient-purple-blue gradient-purple-blue-hover w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}