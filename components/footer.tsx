import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu } from "lucide-react"
import { ToSButton } from "./tos-modal"
import styles from "./footer.module.css"
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa"

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
              <Button variant="ghost" size="icon" className={styles.socialButton} asChild>
                <a href="https://twitter.com/nexushost" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className={styles.socialButton} asChild>
                <a
                  href="https://linkedin.com/company/nexushost"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className={styles.socialButton} asChild>
                <a href="https://github.com/nexushost" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className={styles.socialButton} asChild>
                <a href="https://discord.gg/nexushost" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                  <FaDiscord className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkGroupTitle}>Products</h3>
              <ul className={styles.linksList}>
                <li>
                  <Link href="/buy/gpu" className={styles.footerLink}>
                    GPU Computing
                  </Link>
                </li>
                <li>
                  <Link href="/buy/hosting" className={styles.footerLink}>
                    Web Hosting
                  </Link>
                </li>
                <li>
                  <Link href="/buy/cloudstorage" className={styles.footerLink}>
                    Cloud Storage
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className={styles.footerLink}>
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkGroupTitle}>Resources</h3>
              <ul className={styles.linksList}>
                <li>
                  <Link href="/docs" className={styles.footerLink}>
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className={styles.footerLink}>
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className={styles.footerLink}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/buy" className={styles.footerLink}>
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkGroupTitle}>Company</h3>
              <ul className={styles.linksList}>
                <li>
                  <Link href="/about" className={styles.footerLink}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/support" className={styles.footerLink}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about#careers" className={styles.footerLink}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className={styles.footerLink}>
                    Blog
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
                <li>
                  <Link href="/privacy" className={styles.footerLink}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/acceptable-use" className={styles.footerLink}>
                    Acceptable Use
                  </Link>
                </li>
                <li>
                  <Link href="/sla" className={styles.footerLink}>
                    SLA
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} NexusHost. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/status" className="text-sm text-slate-400 hover:text-white">
              System Status
            </Link>
            <Link href="/sitemap" className="text-sm text-slate-400 hover:text-white">
              Sitemap
            </Link>
            <Link href="/cookies" className="text-sm text-slate-400 hover:text-white">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

