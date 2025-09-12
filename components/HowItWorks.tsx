'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Package, Palette, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Browse & Choose",
      description: "Select products from verified manufacturers.",
      gifSrc: "/steps/1.gif",
      localGifSrc: "/steps/1.gif",
      icon: Package,
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Customize",
      description: "Upload your logo & design packaging with our online tools.",
      gifSrc: "/steps/2.gif",
      localGifSrc: "/steps/2.gif",
      icon: Palette,
      bgColor: "bg-purple-50"
    },
    {
      id: 3,
      title: "Launch",
      description: "We handle production & logistics, you start selling.",
      gifSrc: "/steps/3.gif",
      localGifSrc: "/steps/3.gif",
      icon: Rocket,
      bgColor: "bg-green-50"
    }
  ];

  const handleStepHover = (index: number) => {
    setHoveredStep(index);
  };

  const handleStepLeave = () => {
    setHoveredStep(null);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-none mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works?
            </h2>
            <p className="text-xl text-gray-600">
              Build your brand in 3 easy steps
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="text-center"
                onMouseEnter={() => handleStepHover(index)}
                onMouseLeave={handleStepLeave}
              >
                {/* GIF Container */}
                <div className="relative mb-12 bg-white shadow-lg overflow-hidden group transition-transform duration-300 hover:scale-105">
                    <div className="w-[500px] h-[500px] relative mx-auto">
                    {/* Fallback Background */}
                    <div className={`absolute inset-0 ${step.bgColor} flex items-center justify-center`}>
                      <step.icon className="h-32 w-32 text-blue-800/30" />
                    </div>

                    {/* GIF Image */}
                    <Image
                      src={step.gifSrc}
                      alt={`${step.title} demonstration`}
                      fill
                      className="object-contain z-10"
                      unoptimized // Important for GIFs to maintain animation
                      onError={(e) => {
                        // Hide the image if it fails to load, showing the fallback
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-blue-800/10 transition-opacity duration-300 z-20 ${
                      hoveredStep === index ? 'opacity-100' : 'opacity-0'
                    }`} />
                </div>
              </div>

                {/* Step Content */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-xl leading-relaxed max-w-md mx-auto">
                    {step.description}
                  </p>
                </div>
            </div>
          ))}
        </div>

          {/* Decorative Elements */}
          <div className="relative mt-16">
            {/* Connection Lines - Hidden on mobile, visible on large screens */}
            <div className="hidden lg:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 transform -translate-y-1/2"></div>
            <div className="hidden lg:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
