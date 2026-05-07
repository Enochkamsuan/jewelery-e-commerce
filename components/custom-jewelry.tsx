"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Palette, Gem } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Choose Your Design",
    description: "Select from thousands of styles or upload your own sketch",
  },
  {
    icon: Gem,
    title: "Pick Your Materials",
    description: "Gold, platinum, diamonds, gemstones and more",
  },
  {
    icon: Sparkles,
    title: "Crafted For You",
    description: "Handcrafted by master artisans in 4-6 weeks",
  },
]

export function CustomJewelry() {
  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-sans tracking-[0.3em] uppercase text-background/60">
                Bespoke Service
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
                Design Your Own
                <span className="block italic font-medium">Masterpiece</span>
              </h2>
            </div>
            <p className="text-lg font-sans text-background/70 leading-relaxed max-w-md">
              Bring your vision to life with our custom jewelry design service. Work directly with our master craftsmen to create a piece that&apos;s uniquely yours.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm font-sans text-background/60">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group font-sans tracking-wider uppercase text-sm px-8 py-6"
            >
              <Link href="/custom">
                Start Designing
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square bg-background/5 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="text-8xl">💎</div>
                <div className="space-y-2">
                  <p className="text-2xl font-light italic">Your Design</p>
                  <p className="text-sm font-sans text-background/60">
                    Starting from $999
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
