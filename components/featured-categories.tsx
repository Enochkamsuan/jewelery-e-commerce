"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Rings",
    description: "Statement pieces for every occasion",
    itemCount: 156,
    icon: "💍",
    href: "/category/rings",
  },
  {
    name: "Necklaces",
    description: "Elegant chains and pendants",
    itemCount: 89,
    icon: "📿",
    href: "/category/necklaces",
  },
  {
    name: "Bracelets",
    description: "Timeless wrist adornments",
    itemCount: 72,
    icon: "⌚",
    href: "/category/bracelets",
  },
  {
    name: "Earrings",
    description: "From studs to chandeliers",
    itemCount: 124,
    icon: "✨",
    href: "/category/earrings",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-caption text-muted-foreground mb-4 tracking-[0.3em]">
            Browse By Category
          </p>
          <h2 className="text-headline">
            Curated Collections
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative bg-secondary rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-5xl mb-6">{category.icon}</div>
              <h3 className="font-serif text-xl font-medium mb-2">{category.name}</h3>
              <p className="text-body-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-caption text-muted-foreground">
                  {category.itemCount} pieces
                </span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
