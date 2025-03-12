import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu } from "lucide-react"
import { ToSButton } from "./tos-modal"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.companyInfo}>
            <Link href="/" className={styles.logoContainer}>
              <Cpu className={styles.logoIcon} />
              <span className={styles.logoText}>Nylon Hosting Services</span>
            </Link>
            <p className={styles.companyDescription}>
              NexusHost provides comprehensive hosting solutions for websites, applications, Discord bots, and
              high-performance GPU computing. Power your digital presence with our cutting-edge infrastructure.
            </p>
            <div className={styles.socialLinks}>
              <Button variant="ghost" size="icon" className={styles.socialButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className={styles.socialButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className={styles.socialButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 2H2v10h10V2zM22 2h-10v10h10V2zM12 12H2v10h10V12zM22 12h-10v10h10V12z"></path>
                </svg>
                <span className="sr-only">Discord</span>
              </Button>
            </div>
          </div>
          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkGroupTitle}>Company</h3>
              <ul className={styles.linksList}>
                <li>
                  <Link href="/about" className={styles.footerLink}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/support" className={styles.footerLink}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkGroupTitle}>Legal</h3>
              <ul className={styles.linksList}>
                <li>
                  <ToSButton css={styles.footerLink} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} NexusHost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

