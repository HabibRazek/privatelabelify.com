import { Rocket, Palette, Globe } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why entrepreneurs choose PrivateLabelOne?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fast to Market */}
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Rocket className="w-8 h-8 text-blue-800" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Fast to Market
            </h3>
            <p className="text-gray-600 leading-relaxed">
              No need to build a factory. Pick a product, customize, and launch.
            </p>
          </div>

          {/* Your Brand, Your Identity */}
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Palette className="w-8 h-8 text-blue-800" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Your Brand, Your Identity
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Design your packaging & logo directly on the platform.
            </p>
          </div>

          {/* Global Opportunities */}
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-blue-800" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Global Opportunities
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Start local, expand internationally with our partners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
