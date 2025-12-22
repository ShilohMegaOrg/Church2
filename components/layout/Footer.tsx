import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer 
      className="border-t bg-muted/50"
      role="contentinfo"
    >
      <div className="container py-8 sm:py-10 md:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">RCCG Shiloh Mega Parish</h3>
            <p className="text-sm text-muted-foreground">
              A place to belong, grow, and serve in Richmond, Texas.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="text-muted-foreground hover:text-primary">
                  Ministries
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/visit" className="text-muted-foreground hover:text-primary">
                  Visit Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sermons" className="text-muted-foreground hover:text-primary">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/give" className="text-muted-foreground hover:text-primary">
                  Give
                </Link>
              </li>
              <li>
                <Link href="/visit" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Copyright RCCG SHILOH MEGA PARISH</p>
          <Link href="/privacy" className="hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

