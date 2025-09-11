
'use client';
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-section/make-your-private-label.png"
          alt="Make Your Private Label"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Enhanced Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-white"
          style={{
            textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4)'
          }}>
          Launch Your Brand Today
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight text-blue-100"
          style={{
            textShadow: '0 3px 6px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5), 0 6px 12px rgba(0,0,0,0.3)'
          }}>
          Private Label Made Easy
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed text-white/95 max-w-3xl mx-auto font-medium"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.6)'
          }}>
          Choose from thousands of products, add your brand, and start selling all in one platform.
        </p>

        <div className="flex justify-center mb-16">
          <Button
            size="lg"
            onClick={() => router.push('/get-started')}
            className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white px-10 py-5 text-lg font-bold shadow-2xl hover:shadow-blue-800/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-xl border-0"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.6)'
            }}
          >
            <UserPlus className="w-5 h-5 mr-3" />
            Get Started
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white">
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <span className="text-green-400 mr-2 text-sm font-bold">✓</span>
            <span className="text-sm font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>
              Verified Manufacturers
            </span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <span className="text-green-400 mr-2 text-sm font-bold">✓</span>
            <span className="text-sm font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>
              Low MOQs
            </span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <span className="text-green-400 mr-2 text-sm font-bold">✓</span>
            <span className="text-sm font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>
              MENA + Global
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}