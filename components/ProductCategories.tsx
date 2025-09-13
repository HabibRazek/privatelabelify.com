"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: 1, name: "Food & Beverage", image: "/privatelabel-products/1.jpeg", description: "Premium food products and beverages" },
  { id: 2, name: "Beauty & Personal Care", image: "/privatelabel-products/2.jpeg", description: "Skincare, cosmetics, and personal care items" },
  { id: 3, name: "Supplements & Health", image: "/privatelabel-products/3.jpeg", description: "Health supplements and wellness products" },
  { id: 4, name: "Fashion & Accessories", image: "/privatelabel-products/4.jpeg", description: "Clothing, accessories, and fashion items" },
  { id: 5, name: "Home & Living", image: "/privatelabel-products/5.jpeg", description: "Home decor and lifestyle products" },
  { id: 6, name: "Packaging", image: "/privatelabel-products/6.jpeg", description: "Custom packaging and branding solutions" },
  { id: 7, name: "Household", image: "/privatelabel-products/7.jpeg", description: "Household essentials and cleaning products" },
  { id: 8, name: "Pet & Animal Products", image: "/privatelabel-products/8.jpeg", description: "Pet care and animal products" },
  { id: 9, name: "Ingredients & Materials", image: "/privatelabel-products/9.jpeg", description: "Raw materials and ingredients" },
  { id: 10, name: "Baby Products", image: "/privatelabel-products/10.jpeg", description: "Baby care and children's products" },
  { id: 11, name: "Electronics", image: "/privatelabel-products/11.jpeg", description: "Consumer electronics and tech accessories" },
  { id: 12, name: "Sports & Fitness", image: "/privatelabel-products/12.jpeg", description: "Athletic wear and fitness equipment" },
  { id: 13, name: "Automotive", image: "/privatelabel-products/13.jpeg", description: "Car accessories and automotive products" },
  { id: 14, name: "Office Supplies", image: "/privatelabel-products/14.jpeg", description: "Stationery and office equipment" },
  { id: 15, name: "Garden & Outdoor", image: "/privatelabel-products/15.jpeg", description: "Gardening tools and outdoor equipment" },
  { id: 16, name: "Tools & Hardware", image: "/privatelabel-products/16.jpeg", description: "Hand tools and hardware supplies" },
  { id: 17, name: "Toys & Games", image: "/privatelabel-products/17.jpeg", description: "Children's toys and educational games" },
  { id: 18, name: "Books & Media", image: "/privatelabel-products/18.jpeg", description: "Educational materials and media products" },
  { id: 19, name: "Jewelry & Watches", image: "/privatelabel-products/19.jpeg", description: "Fashion jewelry and timepieces" },
  { id: 20, name: "Travel & Luggage", image: "/privatelabel-products/20.jpeg", description: "Travel accessories and luggage" },
  { id: 21, name: "Musical Instruments", image: "/privatelabel-products/21.jpeg", description: "Musical instruments and audio equipment" },
  { id: 22, name: "Art & Crafts", image: "/privatelabel-products/22.jpeg", description: "Art supplies and craft materials" },
  { id: 23, name: "Industrial Supplies", image: "/privatelabel-products/23.jpeg", description: "Industrial equipment and supplies" }
];

export default function ProductCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Product Manufacturing Categories
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Scale your product line across
            <span className="text-blue-800 block">multiple FMCG categories</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manufacture across 20+ product categories with world-class quality and competitive pricing.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white shadow-lg aspect-square"
            >
              {/* Product Image */}
              <div className="relative h-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />

                {/* Centered category name on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="text-center px-4">
                    <h3 className="font-semibold text-sm text-white drop-shadow-2xl">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>


            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to start manufacturing?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get connected with verified manufacturers across all categories.
              Start your private label journey with competitive pricing and quality assurance.
            </p>
            <button className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}