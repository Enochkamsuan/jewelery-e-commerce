"use client"

import Link from "next/link"
import { Star, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const vendors = [
  {
    id: 1,
    name: "Maison Étoile",
    location: "Paris, France",
    specialty: "Diamond Rings",
    rating: 4.9,
    products: 156,
    featured: true,
    icon: "🇫🇷",
  },
  {
    id: 2,
    name: "Atelier Perle",
    location: "Tokyo, Japan",
    specialty: "Pearl Jewelry",
    rating: 4.8,
    products: 89,
    featured: true,
    icon: "🇯🇵",
  },
  {
    id: 3,
    name: "Oro Fino",
    location: "Florence, Italy",
    specialty: "Gold Craftsmanship",
    rating: 4.9,
    products: 124,
    featured: false,
    icon: "🇮🇹",
  },
  {
    id: 4,
    name: "Azure Gems",
    location: "Jaipur, India",
    specialty: "Precious Gemstones",
    rating: 4.7,
    products: 203,
    featured: true,
    icon: "🇮🇳",
  },
  {
    id: 5,
    name: "Heritage House",
    location: "London, UK",
    specialty: "Vintage Pieces",
    rating: 4.8,
    products: 67,
    featured: false,
    icon: "🇬🇧",
  },
  {
    id: 6,
    name: "Verdant Jewels",
    location: "Bogotá, Colombia",
    specialty: "Emeralds",
    rating: 4.9,
    products: 98,
    featured: true,
    icon: "🇨🇴",
  },
]

export function VendorShowcase() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Artisans
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            Meet the Makers
          </h2>
          <p className="text-lg font-sans text-muted-foreground max-w-2xl mx-auto">
            Discover exceptional jewelry from master craftsmen around the world, each bringing centuries of tradition to their craft.
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {vendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendors/${vendor.id}`}
              className="group bg-card rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-2xl">
                  {vendor.icon}
                </div>
                {vendor.featured && (
                  <Badge variant="secondary" className="font-sans text-[10px] tracking-wider uppercase">
                    Featured
                  </Badge>
                )}
              </div>

              <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                {vendor.name}
              </h3>

              <div className="flex items-center gap-1 text-sm font-sans text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" />
                {vendor.location}
              </div>

              <p className="text-sm font-sans text-muted-foreground mb-4">
                Specializing in {vendor.specialty}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-sans font-medium">{vendor.rating}</span>
                </div>
                <span className="text-xs font-sans text-muted-foreground">
                  {vendor.products} products
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="group font-sans tracking-wider uppercase text-sm px-8 py-6">
            View All Vendors
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
