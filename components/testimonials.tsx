"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    quote: "The craftsmanship is absolutely extraordinary. My engagement ring from Maison Étoile exceeded all expectations. Every detail was perfect.",
    author: "Alexandra Chen",
    location: "New York, NY",
    product: "Custom Engagement Ring",
    rating: 5,
  },
  {
    id: 2,
    quote: "Lumière connected me with an incredible artisan in Tokyo. The pearl necklace I received is a true heirloom piece that I will treasure forever.",
    author: "Victoria Sterling",
    location: "London, UK",
    product: "Akoya Pearl Strand",
    rating: 5,
  },
  {
    id: 3,
    quote: "The custom design process was seamless and collaborative. They brought my grandmother&apos;s vintage sketch to life in the most beautiful way possible.",
    author: "Maria Rodriguez",
    location: "Miami, FL",
    product: "Bespoke Bracelet",
    rating: 5,
  },
  {
    id: 4,
    quote: "Exceptional quality and service. The emerald earrings I purchased are stunning, and the authentication process gave me complete confidence.",
    author: "Sarah Thompson",
    location: "Sydney, AU",
    product: "Colombian Emerald Drops",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl p-8 md:p-12">
            {/* Quote Icon */}
            <Quote className="h-12 w-12 text-primary/20 mb-8" />

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-medium text-lg">{current.author}</p>
                <p className="text-sm font-sans text-muted-foreground">
                  {current.location} &middot; {current.product}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous testimonial</span>
                </Button>
                <span className="text-sm font-sans text-muted-foreground px-4">
                  {currentIndex + 1} / {testimonials.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next testimonial</span>
                </Button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8 sm:hidden">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                >
                  <span className="sr-only">Go to testimonial {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
