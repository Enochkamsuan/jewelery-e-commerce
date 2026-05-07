"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { products } from "@/lib/data"

export function TrendingProducts() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-caption text-muted-foreground mb-4 tracking-[0.3em]">
              Most Loved
            </p>
            <h2 className="text-headline">
              Trending Now
            </h2>
          </div>
          <Link
            href="/category/rings"
            className="text-caption hover:text-primary transition-colors"
          >
            View All Products
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square bg-secondary">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {product.icon}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-foreground text-background font-sans text-[10px] tracking-wider uppercase">
                        New
                      </Badge>
                    )}
                    {product.isBestseller && (
                      <Badge variant="secondary" className="font-sans text-[10px] tracking-wider uppercase">
                        Bestseller
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge variant="destructive" className="font-sans text-[10px] tracking-wider uppercase">
                        Sale
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>

              {/* Wishlist Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
                onClick={(e) => {
                  e.preventDefault()
                  toggleWishlist(product.id)
                }}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    wishlist.includes(product.id)
                      ? "fill-destructive text-destructive"
                      : "text-muted-foreground"
                  )}
                />
              </Button>

              {/* Quick Add */}
              <div className="absolute inset-x-3 bottom-[140px] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                <Button className="w-full font-sans text-xs tracking-wider uppercase">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Quick Add
                </Button>
              </div>

              {/* Content */}
              <Link href={`/products/${product.id}`}>
                <div className="p-4">
                  <p className="text-body-sm text-muted-foreground mb-1">
                    {product.vendor}
                  </p>
                  <h3 className="font-serif text-lg font-medium mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-body-sm">{product.rating}</span>
                    <span className="text-body-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-medium">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-body-sm text-muted-foreground line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
