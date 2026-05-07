"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { name: "Rings", href: "/rings" },
      { name: "Necklaces", href: "/necklaces" },
      { name: "Bracelets", href: "/bracelets" },
      { name: "Earrings", href: "/earrings" },
      { name: "Watches", href: "/watches" },
      { name: "Collections", href: "/collections" },
    ],
  },
  about: {
    title: "About",
    links: [
      { name: "Our Story", href: "/about" },
      { name: "Artisans", href: "/artisans" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Press", href: "/press" },
      { name: "Careers", href: "/careers" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { name: "Custom Design", href: "/custom" },
      { name: "Ring Sizing", href: "/ring-sizing" },
      { name: "Repairs", href: "/repairs" },
      { name: "Engraving", href: "/engraving" },
      { name: "Gift Cards", href: "/gift-cards" },
    ],
  },
  help: {
    title: "Help",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Track Order", href: "/track-order" },
    ],
  },
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-semibold tracking-wider">Lumiere</span>
            </Link>
            <p className="text-body-sm text-background/60 mb-6 max-w-xs">
              Curating the world&apos;s finest jewelry from master artisans since 2015.
            </p>
            
            {/* Contact */}
            <div className="space-y-3 text-body-sm text-background/60">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@lumiere.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-caption mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-background/60 hover:text-background transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-caption text-background/40">
              &copy; {new Date().getFullYear()} Lumiere. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-caption text-background/40">
              <Link href="/privacy" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-background transition-colors">
                Accessibility
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-background/40 hover:text-background transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
