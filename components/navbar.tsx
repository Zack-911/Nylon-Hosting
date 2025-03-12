"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu, Menu, X } from "lucide-react"
import { useState } from "react"
import styles from "./navbar.module.css"

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={`${styles.header} ${transparent ? styles.headerTransparent : styles.headerDefault}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoContainer}>
            <Cpu className={styles.logoIcon} />
            <span className={styles.logoText}>Nylon Hosting Services</span>
          </Link>
          <div className="navWrapper">
            <nav className="flex jusify-center gap-4">
              <Link href="/pricing" className={styles.navLink}>Pricing</Link>
              <Link href="/about" className={styles.navLink}>About</Link>
              <Link href="/buy-gpu" className={styles.navLink}>Gpu Marketplace</Link>
              <Link href="/docs" className={styles.navLink}>Documentation</Link>
              <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
              <Link href="/support" className={styles.navLink}>Support</Link>
            </nav>
          </div>
        </div>          
        <div className={styles.actionsContainer}>
          <nav className={styles.desktopNav}>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Sign In
            </Button>
            <Button className="gradient-purple-blue gradient-purple-blue-hover">Get Started</Button>
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
              <Link href="/pricing" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/buy-gpu" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                GPU Marketplace
              </Link>
              <Link href="/docs" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Documentation
              </Link>
              <Link href="/support" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Support
              </Link>
            </nav>
            <div className={styles.mobileActions}>
              <Button variant="ghost" className="justify-center text-slate-300 hover:text-white">
                Sign In
              </Button>
              <Button className="justify-center gradient-purple-blue gradient-purple-blue-hover">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
