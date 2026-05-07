"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const categories = [
  { name: "Rings", href: "/category/rings" },
  { name: "Necklaces", href: "/category/necklaces" },
  { name: "Bracelets", href: "/category/bracelets" },
  { name: "Earrings", href: "/category/earrings" },
  { name: "Custom", href: "/custom" },
  { name: "Vendors", href: "/vendors" },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-2">
          <p className="text-center text-caption text-muted-foreground">
            Complimentary shipping on orders over $500
          </p>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <nav className="mt-8 flex flex-col gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="text-lg font-light tracking-wide hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="mt-8 pt-8 border-t border-border">
                    <Link href="/login" className="block py-2 text-sm font-sans tracking-wide hover:text-primary">
                      Sign In
                    </Link>
                    <Link href="/register" className="block py-2 text-sm font-sans tracking-wide hover:text-primary">
                      Create Account
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider">
                Lumiere
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-caption hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative hidden md:block">
                {isSearchOpen ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-48 h-9 text-sm font-sans"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                )}
              </div>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* User */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-sans font-medium text-primary-foreground flex items-center justify-center">
                  3
                </span>
                <span className="sr-only">Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
