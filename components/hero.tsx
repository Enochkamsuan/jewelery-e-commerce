"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <p className="text-caption text-muted-foreground tracking-[0.3em]">
                The 2026 Collection
              </p>
              <h1 className="text-display text-balance">
                Timeless elegance
                <span className="block italic">meets modern craft</span>
              </h1>
            </div>
            <p className="text-body-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Discover our curated collection of handcrafted jewelry from the world&apos;s most talented artisans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group text-caption px-8 py-6">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="text-caption px-8 py-6">
                View Lookbook
              </Button>
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-6xl">💍</span>
                  </div>
                </div>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <span className="text-5xl">✨</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <span className="text-5xl">📿</span>
                  </div>
                </div>
                <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span className="text-6xl">👑</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
