'use client';
import Image from 'next/image';
import { Package, Palette, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Browse & Choose",
      description: "Select products from verified manufacturers.",
      gifSrc: "/steps/1.gif",
      icon: Package,
    },
    {
      id: 2,
      title: "Customize",
      description: "Upload your logo & design packaging with our online tools.",
      gifSrc: "/steps/2.gif",
      icon: Palette,
    },
    {
      id: 3,
      title: "Launch",
      description: "We handle production & logistics, you start selling.",
      gifSrc: "/steps/3.jpeg",
      icon: Rocket,
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-3">
            From Idea to Market in Minutes
          </h2>
          <p className="text-lg text-gray-600">
            Your private label journey simplified
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-items-center">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              {/* GIF Container */}
              <div className="relative mb-8 overflow-hidden">
                <div className="w-[300px] h-[300px] relative mx-auto">
                  {/* Fallback Background */}
                  <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                    <step.icon className="h-24 w-24 text-gray-300" />
                  </div>

                  {/* GIF Image */}
                  <Image
                    src={step.gifSrc}
                    alt={`${step.title} demonstration`}
                    fill
                    className="object-contain z-10"
                    unoptimized
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}