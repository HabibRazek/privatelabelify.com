"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Product categories for landing page
const categories = [
  {
    id: 1,
    name: "Beauty & Cosmetics",
    image: "/privatelabel-products/3.jpeg",
    description: "Premium skincare, makeup, and beauty essentials",
    products: "500+"
  },
  {
    id: 2,
    name: "Health & Wellness",
    image: "/privatelabel-products/5.jpeg",
    description: "Supplements, nutrition, and wellness products",
    products: "300+"
  },
  {
    id: 3,
    name: "Home & Lifestyle",
    image: "/privatelabel-products/2.jpeg",
    description: "Home fragrances, decor, and lifestyle essentials",
    products: "250+"
  },
  {
    id: 4,
    name: "Personal Care",
    image: "/privatelabel-products/4.jpeg",
    description: "Grooming, skincare, and personal hygiene",
    products: "400+"
  },
  {
    id: 5,
    name: "Food & Beverage",
    image: "/privatelabel-products/8.jpeg",
    description: "Gourmet foods, teas, and specialty beverages",
    products: "200+"
  },
  {
    id: 6,
    name: "Packaging Solutions",
    image: "/privatelabel-products/1.jpeg",
    description: "Custom packaging, gift boxes, and branding",
    products: "150+"
  }
];

export default function ProductCategories() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-800 mb-6">
            Product Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of high-quality products across multiple categories.
            Start your private label journey with our curated selection.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group">
              {/* Image Container */}
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-800 mb-3">
                  {category.name}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="text-sm text-blue-800 font-medium mb-6">
                  {category.products} products available
                </div>

                <button className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Can&apos;t find what you&apos;re looking for? We have thousands more products available.
          </p>
          <button className="inline-flex items-center gap-2 border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300">
            <span>View All Categories</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
