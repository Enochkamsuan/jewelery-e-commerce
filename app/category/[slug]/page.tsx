"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  Heart, 
  Star, 
  ShoppingBag, 
  ChevronRight,
  SlidersHorizontal,
  Grid3X3,
  LayoutList
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { products, categories } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const category = categories.find((c) => c.slug === slug)
  
  const [wishlist, setWishlist] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (!category) {
    notFound()
  }

  const categoryProducts = products.filter((p) => p.category === slug)

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return a.isNew ? -1 : 1
      default:
        return 0
    }
  })

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-10 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{category.name}</span>
          </nav>

          {/* Category Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl font-light mb-4">{category.name}</h1>
            <p className="text-lg font-sans text-muted-foreground max-w-2xl mx-auto">
              {category.longDescription}
            </p>
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="font-sans">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <p className="text-sm font-sans text-muted-foreground">
                {sortedProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] font-sans">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
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
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => toggleWishlist(product.id)}
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
                  <div className="absolute inset-x-3 bottom-[140px] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Button className="w-full font-sans text-xs tracking-wider uppercase">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Quick Add
                    </Button>
                  </div>

                  {/* Content */}
                  <Link href={`/products/${product.id}`}>
                    <div className="p-4">
                      <p className="text-xs font-sans text-muted-foreground mb-1">
                        {product.vendor}
                      </p>
                      <h3 className="font-medium mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-xs font-sans">{product.rating}</span>
                        <span className="text-xs font-sans text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm font-sans text-muted-foreground line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex gap-6 bg-card rounded-lg p-4 hover:shadow-lg transition-all"
                >
                  <div className="w-32 h-32 bg-secondary rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                    {product.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-sans text-muted-foreground mb-1">
                          {product.vendor}
                        </p>
                        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span className="text-xs font-sans">{product.rating}</span>
                          <span className="text-xs font-sans text-muted-foreground">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-sm font-sans text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          {product.originalPrice && (
                            <span className="text-sm font-sans text-muted-foreground line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-xl font-medium">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {product.isNew && (
                            <Badge className="bg-foreground text-background font-sans text-[10px]">New</Badge>
                          )}
                          {product.isBestseller && (
                            <Badge variant="secondary" className="font-sans text-[10px]">Bestseller</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-sans mb-4">No products found in this category.</p>
              <Button asChild>
                <Link href="/">Browse All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
