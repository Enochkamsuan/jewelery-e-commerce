"use client"

import Link from "next/link"
import { Star, MapPin, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { vendors } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-10 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Vendors</span>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Our Artisans</h1>
            <p className="text-lg font-sans text-muted-foreground max-w-2xl mx-auto">
              Discover exceptional jewelry from master craftsmen around the world, each bringing centuries of tradition to their craft.
            </p>
          </div>

          {/* Vendors Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <Link
                key={vendor.id}
                href={`/vendors/${vendor.id}`}
                className="group bg-card rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-3xl">
                    {vendor.icon}
                  </div>
                  {vendor.featured && (
                    <Badge variant="secondary" className="font-sans text-[10px] tracking-wider uppercase">
                      Featured
                    </Badge>
                  )}
                </div>

                <h2 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                  {vendor.name}
                </h2>

                <div className="flex items-center gap-1 text-sm font-sans text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {vendor.location}
                </div>

                <p className="text-sm font-sans text-muted-foreground mb-4">
                  Specializing in {vendor.specialty}
                </p>

                <p className="text-sm font-sans text-muted-foreground line-clamp-2 mb-4">
                  {vendor.description}
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
