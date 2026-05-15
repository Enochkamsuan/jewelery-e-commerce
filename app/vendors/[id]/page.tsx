"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  Star, 
  MapPin, 
  Calendar,
  Users,
  Award,
  Heart,
  ShoppingBag,
  ChevronRight,
  MessageCircle,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { products, vendors } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function VendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const vendor = vendors.find((v) => v.id === parseInt(id))
  
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isFollowing, setIsFollowing] = useState(false)

  if (!vendor) {
    notFound()
  }

  const vendorProducts = products.filter((p) => p.vendorId === vendor.id)

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((item) => item !== productId) : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-10 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/vendors" className="hover:text-foreground transition-colors">Vendors</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{vendor.name}</span>
          </nav>

          {/* Vendor Header */}
          <div className="bg-card rounded-2xl p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Vendor Avatar */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-secondary flex items-center justify-center text-5xl md:text-6xl shrink-0">
                {vendor.icon}
              </div>

              {/* Vendor Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl md:text-4xl font-light">{vendor.name}</h1>
                      {vendor.featured && (
                        <Badge className="font-sans text-[10px] tracking-wider uppercase">
                          Featured Artisan
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="font-sans">{vendor.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant={isFollowing ? "secondary" : "default"}
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground font-sans leading-relaxed mb-6 max-w-3xl">
                  {vendor.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-medium">{vendor.rating}</span>
                    <span className="text-sm font-sans text-muted-foreground">rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{vendor.products}</span>
                    <span className="text-sm font-sans text-muted-foreground">products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-sans text-muted-foreground">Est. {vendor.established}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{vendor.artisans}</span>
                    <span className="text-sm font-sans text-muted-foreground">artisans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="products" className="space-y-8">
            <TabsList className="bg-secondary">
              <TabsTrigger value="products" className="font-sans">
                Products ({vendorProducts.length})
              </TabsTrigger>
              <TabsTrigger value="about" className="font-sans">
                About
              </TabsTrigger>
              <TabsTrigger value="reviews" className="font-sans">
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              {vendorProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {vendorProducts.map((product) => (
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
                      <div className="absolute inset-x-3 bottom-35 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Button className="w-full font-sans text-xs tracking-wider uppercase">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Quick Add
                        </Button>
                      </div>

                      {/* Content */}
                      <Link href={`/products/${product.id}`}>
                        <div className="p-4">
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
                <div className="text-center py-16 bg-card rounded-lg">
                  <p className="text-muted-foreground font-sans">No products available from this vendor yet.</p>
                </div>
              )}
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-lg p-8">
                  <h3 className="text-xl font-medium mb-6">Our Story</h3>
                  <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                    {vendor.description}
                  </p>
                  <p className="text-muted-foreground font-sans leading-relaxed">
                    Since {vendor.established}, we have been dedicated to creating exceptional jewelry that combines traditional craftsmanship with contemporary design. Our team of {vendor.artisans} skilled artisans brings decades of combined experience to every piece we create.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Specialty */}
                  <div className="bg-card rounded-lg p-6">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Specialty
                    </h4>
                    <p className="text-muted-foreground font-sans">{vendor.specialty}</p>
                  </div>

                  {/* Certifications */}
                  <div className="bg-card rounded-lg p-6">
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {vendor.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="font-sans">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Workshop */}
                  <div className="bg-card rounded-lg p-6">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Workshop Location
                    </h4>
                    <p className="text-muted-foreground font-sans mb-4">{vendor.location}</p>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="bg-card rounded-lg p-8">
                {/* Rating Summary */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-8 pb-8 border-b border-border">
                  <div className="text-center md:text-left">
                    <div className="text-5xl font-light mb-2">{vendor.rating}</div>
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-5 w-5",
                            i < Math.floor(vendor.rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-sans text-muted-foreground">Based on 234 reviews</p>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm font-sans w-12">{stars} stars</span>
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${stars === 5 ? 75 : stars === 4 ? 20 : stars === 3 ? 4 : 1}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-sans text-muted-foreground w-12">
                          {stars === 5 ? "75%" : stars === 4 ? "20%" : stars === 3 ? "4%" : "1%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Elizabeth M.",
                      date: "2 weeks ago",
                      rating: 5,
                      text: "Absolutely stunning craftsmanship! The ring exceeded all my expectations. The attention to detail is remarkable.",
                    },
                    {
                      name: "James K.",
                      date: "1 month ago",
                      rating: 5,
                      text: "Purchased a custom necklace for my wife's birthday. The team was incredibly helpful throughout the design process.",
                    },
                    {
                      name: "Sophie L.",
                      date: "2 months ago",
                      rating: 4,
                      text: "Beautiful pieces and excellent customer service. Shipping took a bit longer than expected but the quality made up for it.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="pb-6 border-b border-border last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-xs font-sans text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground font-sans">{review.text}</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
