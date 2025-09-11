"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Packaging & Gift Boxes",
    image: "/privatelabel-products/1.jpeg"
  },
  {
    id: 2,
    name: "Home Fragrance & Aromatherapy",
    image: "/privatelabel-products/2.jpeg"
  },
  {
    id: 3,
    name: "Cosmetics & Makeup",
    image: "/privatelabel-products/3.jpeg"
  },
  {
    id: 4,
    name: "Men's Grooming & Skincare",
    image: "/privatelabel-products/4.jpeg"
  },
  {
    id: 5,
    name: "Sports Nutrition & Supplements",
    image: "/privatelabel-products/5.jpeg"
  },
  {
    id: 6,
    name: "Merchandise & Apparel",
    image: "/privatelabel-products/6.jpeg"
  },
  {
    id: 7,
    name: "Perfumes & Fragrances",
    image: "/privatelabel-products/7.jpeg"
  },
  {
    id: 8,
    name: "Tea & Hot Beverages",
    image: "/privatelabel-products/8.jpeg"
  },
  {
    id: 9,
    name: "Skincare & Beauty Essentials",
    image: "/privatelabel-products/9.jpeg"
  },
  {
    id: 10,
    name: "Sun Care & Body Care",
    image: "/privatelabel-products/10.jpeg"
  },
  {
    id: 11,
    name: "Household Cleaning Products",
    image: "/privatelabel-products/11.jpeg"
  },
  {
    id: 12,
    name: "Baby Food & Snacks",
    image: "/privatelabel-products/12.jpeg"
  },
  {
    id: 13,
    name: "Condiments & Sauces",
    image: "/privatelabel-products/13.jpeg"
  },
  {
    id: 14,
    name: "Spreads & Sauces",
    image: "/privatelabel-products/14.jpeg"
  },
  {
    id: 15,
    name: "Pet Food & Treats",
    image: "/privatelabel-products/15.jpeg"
  },
  {
    id: 16,
    name: "Juices & Energy Drinks",
    image: "/privatelabel-products/16.jpeg"
  },
  {
    id: 17,
    name: "Organic Food & Supplements",
    image: "/privatelabel-products/17.jpeg"
  },
  {
    id: 18,
    name: "Vitamins & Supplements",
    image: "/privatelabel-products/18.jpeg"
  },
  {
    id: 19,
    name: "Hair Care & Styling",
    image: "/privatelabel-products/19.jpeg"
  },
  {
    id: 20,
    name: "Oral Care & Dental",
    image: "/privatelabel-products/20.jpeg"
  },
  {
    id: 21,
    name: "Food & Snacks",
    image: "/privatelabel-products/21.jpeg"
  },
  {
    id: 22,
    name: "Beverages & Drinks",
    image: "/privatelabel-products/22.jpeg"
  },
  {
    id: 23,
    name: "Health & Wellness",
    image: "/privatelabel-products/23.jpeg"
  }
];

export default function ProductCategories() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  // Show all categories
  const visibleCategories = categories;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-blue-800 text-sm font-medium mb-2">
            Product Manufacturing Categories
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Scale your product line across multiple FMCG categories
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="mt-12"
          layout
        >
          {/* Main Grid - First 20 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
            {visibleCategories.slice(0, 20).map((category, index) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative rounded-lg overflow-hidden cursor-pointer bg-white shadow-lg aspect-square group w-full"
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                {/* Product Image */}
                <div className="relative h-full overflow-hidden">
                  <motion.div
                    className="relative h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-blue-800/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {/* Category Label */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
                  initial={{ y: 10, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between text-white">
                    <span className="font-medium text-sm leading-tight">
                      {category.name}
                    </span>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    </motion.div>
                  </div>
                </motion.div>


              </motion.div>
            ))}
          </div>

          {/* Last row centered - items 21, 22, and 23 */}
          {visibleCategories.length > 20 && (
            <div className="flex justify-center mt-8">
              <div className="grid grid-cols-3 gap-8 max-w-2xl">
                {visibleCategories.slice(20, 23).map((category, index) => (
                  <motion.div
                    key={category.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (index + 20) * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative rounded-lg overflow-hidden cursor-pointer bg-white shadow-lg aspect-square group w-full"
                    onHoverStart={() => setHoveredCategory(category.id)}
                    onHoverEnd={() => setHoveredCategory(null)}
                  >
                    {/* Same content structure as above */}
                    <div className="relative h-full overflow-hidden">
                      <motion.div
                        className="relative h-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      
                      <motion.div
                        className="absolute inset-0 bg-blue-800/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>

                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
                      initial={{ y: 10, opacity: 0.8 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between text-white">
                        <span className="font-medium text-sm leading-tight">
                          {category.name}
                        </span>
                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 border-2 border-blue-800 rounded-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
