"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Content */}
          <p className="text-caption text-muted-foreground mb-4 tracking-[0.3em]">
            Stay Connected
          </p>
          <h2 className="text-headline mb-6">
            Join the Inner Circle
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8">
            Be the first to discover new collections, exclusive offers, and receive 10% off your first purchase.
          </p>

          {/* Form */}
          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 p-6 bg-card rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <p className="text-body text-foreground">
                Thank you for subscribing! Check your email for a welcome gift.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-body bg-card"
              />
              <Button
                type="submit"
                size="lg"
                className="group text-caption px-6"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          )}

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-8 text-caption text-muted-foreground">
            <span>Free Shipping</span>
            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span>Secure Checkout</span>
            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </section>
  )
}
