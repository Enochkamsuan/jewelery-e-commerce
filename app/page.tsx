import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedCategories } from "@/components/featured-categories"
import { TrendingProducts } from "@/components/trending-products"
import { CustomJewelry } from "@/components/custom-jewelry"
import { VendorShowcase } from "@/components/vendor-showcase"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <TrendingProducts />
        <CustomJewelry />
        <VendorShowcase />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
