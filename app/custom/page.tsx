"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ChevronRight,
  Sparkles, 
  Palette, 
  Gem,
  MessageCircle,
  Clock,
  Shield,
  Check,
  ArrowRight,
  Upload,
  Pencil
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { vendors } from "@/lib/data"

const jewelryTypes = [
  { value: "ring", label: "Ring", icon: "💍" },
  { value: "necklace", label: "Necklace", icon: "📿" },
  { value: "bracelet", label: "Bracelet", icon: "⌚" },
  { value: "earrings", label: "Earrings", icon: "✨" },
  { value: "pendant", label: "Pendant", icon: "🔶" },
  { value: "brooch", label: "Brooch", icon: "🌹" },
]

const metalOptions = [
  { value: "yellow-gold", label: "18k Yellow Gold", color: "bg-yellow-500" },
  { value: "white-gold", label: "18k White Gold", color: "bg-gray-300" },
  { value: "rose-gold", label: "18k Rose Gold", color: "bg-rose-300" },
  { value: "platinum", label: "Platinum", color: "bg-slate-400" },
  { value: "silver", label: "Sterling Silver", color: "bg-gray-200" },
]

const gemstoneOptions = [
  { value: "diamond", label: "Diamond", icon: "💎" },
  { value: "ruby", label: "Ruby", icon: "❤️" },
  { value: "sapphire", label: "Sapphire", icon: "💙" },
  { value: "emerald", label: "Emerald", icon: "💚" },
  { value: "pearl", label: "Pearl", icon: "🤍" },
  { value: "none", label: "No Gemstone", icon: "⭕" },
]

const priceRanges = [
  { value: "1000-2500", label: "$1,000 - $2,500" },
  { value: "2500-5000", label: "$2,500 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000+", label: "$10,000+" },
]

const features = [
  {
    icon: Palette,
    title: "Choose Your Design",
    description: "Select from thousands of styles or upload your own sketch. Our designers will bring your vision to life.",
  },
  {
    icon: Gem,
    title: "Pick Your Materials",
    description: "Gold, platinum, diamonds, sapphires, emeralds and more. Only the finest materials sourced ethically.",
  },
  {
    icon: Sparkles,
    title: "Crafted For You",
    description: "Handcrafted by master artisans in 4-6 weeks. Each piece is unique and made with exceptional care.",
  },
  {
    icon: MessageCircle,
    title: "Personal Consultation",
    description: "Work directly with our design team throughout the process. We ensure every detail is perfect.",
  },
]

const guarantees = [
  { icon: Clock, text: "4-6 Week Delivery" },
  { icon: Shield, text: "Lifetime Warranty" },
  { icon: Check, text: "Certified Materials" },
]

export default function CustomJewelryPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    jewelryType: "",
    metal: "",
    gemstone: "",
    budget: "",
    description: "",
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.jewelryType !== ""
      case 2:
        return formData.metal !== "" && formData.gemstone !== ""
      case 3:
        return formData.budget !== "" && formData.description !== ""
      case 4:
        return formData.name !== "" && formData.email !== ""
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Custom Jewelry</span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-sans tracking-wider uppercase text-xs">
              Bespoke Service
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Design Your Own
              <span className="block italic font-medium">Masterpiece</span>
            </h1>
            <p className="text-lg font-sans text-muted-foreground max-w-2xl mx-auto">
              Bring your vision to life with our custom jewelry design service. Work directly with master craftsmen to create a piece that&apos;s uniquely yours.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm font-sans text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Design Form */}
          {!isSubmitted ? (
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl font-light text-center mb-8">Start Your Design</h2>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-12">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans transition-colors ${
                          s <= step
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {s < step ? <Check className="h-4 w-4" /> : s}
                      </div>
                      {s < 4 && (
                        <div
                          className={`w-12 h-0.5 transition-colors ${
                            s < step ? "bg-primary" : "bg-secondary"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Jewelry Type */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-medium mb-2">What would you like to create?</h3>
                        <p className="text-sm font-sans text-muted-foreground">
                          Select the type of jewelry you&apos;d like to design
                        </p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {jewelryTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleInputChange("jewelryType", type.value)}
                            className={`p-6 rounded-lg border-2 transition-all ${
                              formData.jewelryType === type.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="text-4xl mb-2">{type.icon}</div>
                            <p className="font-medium">{type.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Materials */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-medium mb-2">Choose Your Materials</h3>
                        <p className="text-sm font-sans text-muted-foreground">
                          Select the metal and gemstone for your piece
                        </p>
                      </div>

                      {/* Metal Selection */}
                      <div>
                        <Label className="text-sm font-sans mb-4 block">Metal Type</Label>
                        <RadioGroup
                          value={formData.metal}
                          onValueChange={(value) => handleInputChange("metal", value)}
                          className="grid grid-cols-2 md:grid-cols-3 gap-3"
                        >
                          {metalOptions.map((metal) => (
                            <div key={metal.value}>
                              <RadioGroupItem
                                value={metal.value}
                                id={metal.value}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={metal.value}
                                className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                              >
                                <div className={`w-6 h-6 rounded-full ${metal.color}`} />
                                <span className="text-sm">{metal.label}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {/* Gemstone Selection */}
                      <div>
                        <Label className="text-sm font-sans mb-4 block">Gemstone</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {gemstoneOptions.map((gem) => (
                            <button
                              key={gem.value}
                              type="button"
                              onClick={() => handleInputChange("gemstone", gem.value)}
                              className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                                formData.gemstone === gem.value
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <span className="text-2xl">{gem.icon}</span>
                              <span className="text-sm">{gem.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Design Details */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-medium mb-2">Design Details</h3>
                        <p className="text-sm font-sans text-muted-foreground">
                          Tell us about your vision and budget
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm font-sans mb-3 block">Budget Range</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => handleInputChange("budget", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            {priceRanges.map((range) => (
                              <SelectItem key={range.value} value={range.value}>
                                {range.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-sans mb-3 block">Describe Your Vision</Label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Tell us about your dream piece. Include details about style, occasion, engravings, or any inspiration images..."
                          rows={5}
                          className="resize-none"
                        />
                      </div>

                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                        <p className="font-medium mb-1">Upload Reference Images</p>
                        <p className="text-sm font-sans text-muted-foreground mb-3">
                          Share sketches, photos, or inspiration images
                        </p>
                        <Button variant="outline" type="button">
                          <Pencil className="h-4 w-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Contact Info */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-medium mb-2">Contact Information</h3>
                        <p className="text-sm font-sans text-muted-foreground">
                          Our design team will reach out within 24 hours
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-sans mb-2 block">Full Name *</Label>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-sans mb-2 block">Email Address *</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-sans mb-2 block">Phone Number (Optional)</Label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-10 pt-6 border-t border-border">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      disabled={step === 1}
                    >
                      Back
                    </Button>
                    {step < 4 ? (
                      <Button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        disabled={!canProceed()}
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button type="submit" disabled={!canProceed()}>
                        Submit Request
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-card rounded-2xl p-12">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-light mb-4">Request Submitted!</h2>
                <p className="text-muted-foreground font-sans mb-8">
                  Thank you for your custom jewelry request. Our design team will review your vision and contact you within 24 hours to discuss the next steps.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                  <Button variant="outline" onClick={() => { setIsSubmitted(false); setStep(1); setFormData({ jewelryType: "", metal: "", gemstone: "", budget: "", description: "", name: "", email: "", phone: "" }); }}>
                    Start New Design
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Guarantees */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {guarantees.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-sans">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Featured Artisans */}
          <section className="mt-20">
            <h2 className="text-2xl font-light text-center mb-8">Our Master Artisans</h2>
            <p className="text-center text-muted-foreground font-sans mb-12 max-w-2xl mx-auto">
              Your custom piece will be crafted by one of our talented artisans, selected based on your design requirements and their expertise.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.slice(0, 3).map((vendor) => (
                <Link
                  key={vendor.id}
                  href={`/vendors/${vendor.id}`}
                  className="bg-card rounded-lg p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                      {vendor.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{vendor.name}</h3>
                      <p className="text-sm font-sans text-muted-foreground">{vendor.specialty}</p>
                    </div>
                  </div>
                  <p className="text-sm font-sans text-muted-foreground line-clamp-2">
                    {vendor.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
