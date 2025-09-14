'use client';

import { Button } from "@/components/ui/button";
import { UserPlus, CheckCircle, Globe, Shield, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Image, { type StaticImageData } from "next/image";

// Product images
import Image1 from "@/public/privatelabel-products/1.jpeg";
import Image2 from "@/public/privatelabel-products/2.jpeg";
import Image3 from "@/public/privatelabel-products/3.jpeg";
import Image4 from "@/public/privatelabel-products/4.jpeg";
import Image5 from "@/public/privatelabel-products/5.jpeg";
import Image6 from "@/public/privatelabel-products/6.jpeg";
import Image7 from "@/public/privatelabel-products/7.jpeg";
import Image8 from "@/public/privatelabel-products/8.jpeg";

// Hero bottom image
import PrivateLabelImage from "@/public/hero-section/make your private label.png";

// Types
interface ProductImage {
  src: StaticImageData;
  alt: string;
}

interface TrustIndicator {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  iconColor: string;
}

export default function HeroSection() {
  const router = useRouter();

  // Trust indicators data
  const trustIndicators: TrustIndicator[] = [
    {
      icon: CheckCircle,
      title: "Verified Manufacturers",
      description: "Quality assured",
      iconColor: "text-green-500"
    },
    {
      icon: Shield,
      title: "Low MOQs",
      description: "Start small",
      iconColor: "text-blue-500"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "MENA + Worldwide",
      iconColor: "text-purple-500"
    }
  ];

  // Product images configuration
  const leftColumnImages: ProductImage[] = [
    { src: Image1, alt: "Private Label Product 1" },
    { src: Image2, alt: "Private Label Product 2" },
    { src: Image3, alt: "Private Label Product 3" },
    { src: Image4, alt: "Private Label Product 4" },
  ];

  const rightColumnImages: ProductImage[] = [
    { src: Image8, alt: "Private Label Product 8" },
    { src: Image5, alt: "Private Label Product 5" },
    { src: Image6, alt: "Private Label Product 6" },
    { src: Image7, alt: "Private Label Product 7" },
  ];

  // Create arrays for smooth infinite scroll
  const leftScrollImages = Array(4).fill(leftColumnImages).flat();
  const rightScrollImages = Array(4).fill(rightColumnImages).flat();

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="relative z-10 w-full max-w-none px-4 py-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-100 text-blue-800 rounded-full text-xs lg:text-sm font-medium">
                <Zap className="w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" />
                Launch Your Brand Today
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
                Private Label
                <span className="block text-blue-800">Made Easy</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Choose from thousands of products, add your brand, and start selling all in one platform. Connect with verified manufacturers worldwide.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => router.push('/auth/signup')}
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg w-full sm:w-auto"
              >
                <UserPlus className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
                Get Started Free
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-blue-800 text-blue-800 hover:bg-blue-50 px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-semibold rounded-lg w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-1 sm:gap-4 lg:gap-6 pt-4 lg:pt-6">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:space-x-3">
                  <indicator.icon className={`w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${indicator.iconColor} flex-shrink-0 mb-1 sm:mb-0`} />
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base leading-tight">
                      {indicator.title}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-tight">
                      {indicator.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Animated Product Image Grid */}
          <div className="hidden lg:block relative overflow-hidden h-[500px]">
            <div className="flex gap-6 justify-center max-w-2xl">
              {/* Left Column - Scrolling Up */}
              <div className="flex flex-col gap-6 animate-scroll-up">
                {leftScrollImages.map((image, index) => (
                  <div
                    key={`left-${index}`}
                    className="w-56 h-56 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group flex-shrink-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={224}
                      height={224}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      placeholder="blur"
                    />
                  </div>
                ))}
              </div>

              {/* Right Column - Scrolling Down */}
              <div className="flex flex-col gap-6 animate-scroll-down">
                {rightScrollImages.map((image, index) => (
                  <div
                    key={`right-${index}`}
                    className="w-56 h-56 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group flex-shrink-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={224}
                      height={224}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      placeholder="blur"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
        </div>

        {/* Bottom Private Label Image - Mobile Only */}
        <div className="block sm:hidden w-full max-w-sm mx-auto mt-6 px-4">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <Image
              src={PrivateLabelImage}
              alt="Make Your Private Label"
              className="w-full h-auto object-cover"
              priority
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </section>
  );
}