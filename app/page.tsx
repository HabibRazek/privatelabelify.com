import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductCategories from "@/components/ProductCategories";
import Footer from "@/components/Footer";
import HowItWorksDemo from "./how-it-works-demo/page";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <HowItWorksDemo />
      <ProductCategories />
      <Footer />
    </div>
  );
}
