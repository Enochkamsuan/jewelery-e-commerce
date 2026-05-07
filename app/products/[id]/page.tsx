"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  Heart, 
  Star, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronRight,
  Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { products, vendors } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === parseInt(id))
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  if (!product) {
    notFound()
  }

  const vendor = vendors.find((v) => v.id === product.vendorId)

  const handleAddToCart = () => {
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/category/${product.category}`} className="hover:text-foreground transition-colors capitalize">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-[120px]">{product.images[selectedImage]}</span>
              </div>
              <div className="flex gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-3xl transition-all",
                      selectedImage === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                    )}
                  >
                    {img}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  {/* Badges */}
                  <div className="flex gap-2 mb-3">
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

                  <Link 
                    href={`/vendors/${product.vendorId}`}
                    className="text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
                  >
                    {product.vendor}
                  </Link>
                  <h1 className="text-3xl md:text-4xl font-light mt-1">{product.name}</h1>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={cn("h-4 w-4", isWishlisted && "fill-destructive text-destructive")} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-sans">{product.rating}</span>
                <span className="text-sm font-sans text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-medium">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl font-sans text-muted-foreground line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Materials */}
              <div>
                <h3 className="font-medium mb-2">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material) => (
                    <Badge key={material} variant="outline" className="font-sans">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                <div>
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="ml-2">{product.weight}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="ml-2">{product.sku}</span>
                </div>
              </div>

              <Separator />

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-sans text-sm">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-sans">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 font-sans tracking-wider uppercase text-sm py-6"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {isAddedToCart ? "Added to Cart!" : "Add to Cart"}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="flex-1 font-sans tracking-wider uppercase text-sm py-6"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Truck className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs font-sans text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs font-sans text-muted-foreground">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs font-sans text-muted-foreground">30-Day Returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Info */}
          {vendor && (
            <section className="mb-20">
              <h2 className="text-2xl font-light mb-6">About the Artisan</h2>
              <Link 
                href={`/vendors/${vendor.id}`}
                className="block bg-card rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-3xl">
                    {vendor.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-1">{vendor.name}</h3>
                    <p className="text-sm font-sans text-muted-foreground mb-2">{vendor.location}</p>
                    <p className="text-muted-foreground font-sans">{vendor.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-sans">{vendor.rating}</span>
                      </div>
                      <span className="text-sm font-sans text-muted-foreground">
                        {vendor.products} products
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-6">You May Also Like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square bg-secondary flex items-center justify-center text-5xl">
                      {relatedProduct.icon}
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-sans text-muted-foreground">{relatedProduct.vendor}</p>
                      <h3 className="font-medium mt-1 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="font-medium mt-2">${relatedProduct.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
