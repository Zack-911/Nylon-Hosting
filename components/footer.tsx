import Link from "next/link"
import { Cpu } from "lucide-react"
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa"
import { ToSButton } from "./tos-modal"

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-purple-900/30 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-white/80">
              © {new Date().getFullYear()} Nylon Hosting Services
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/about" className="text-xs text-white/60 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-xs text-white/60 hover:text-white transition-colors">
              Privacy
            </Link>
            <ToSButton css="text-xs text-white/60 hover:text-white transition-colors cursor-pointer" source="footer" />
            <Link href="/status" className="text-xs text-white/60 hover:text-white transition-colors">
              Status
            </Link>
            <Link href="/support" className="text-xs text-white/60 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com/nylonhosting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com/company/nylonhosting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/nylonhosting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://discord.gg/nylonhosting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Discord"
            >
              <FaDiscord className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
