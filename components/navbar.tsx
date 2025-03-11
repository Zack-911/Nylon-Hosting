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
            <span className={styles.logoText}>NexusHost</span>
          </Link>
          <nav className={styles.desktopNav}>
            <Link href="#features" className={styles.navLink}>
              Features
            </Link>
            <Link href="#hosting" className={styles.navLink}>
              Hosting
            </Link>
            <Link href="#marketplace" className={styles.navLink}>
              GPU Marketplace
            </Link>
            <Link href="/pricing" className={styles.navLink}>
              Pricing
            </Link>
            <Link href="#contact" className={styles.navLink}>
              Contact
            </Link>
          </nav>
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
              <Link href="#features" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Features
              </Link>
              <Link href="#hosting" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Hosting
              </Link>
              <Link href="#marketplace" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                GPU Marketplace
              </Link>
              <Link href="#pricing" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="#contact" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                Contact
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

