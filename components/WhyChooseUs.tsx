"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <section className="py-12">
      <div className="max-w-9/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:items-center">
          {/* Text content - First on mobile, right side on desktop */}
          <motion.div
            className="order-1 lg:order-2 lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-center">
              <p className="text-blue-800 text-xs font-semibold uppercase tracking-wide mb-2">
                Why Choose Us
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Why Entrepreneurs Choose PrivateLabelOne
              </h2>
              <p className="text-sm text-gray-600">
                Join thousands of successful entrepreneurs who trust us to bring their private label products to market
              </p>
            </div>

            <div className="space-y-4">
              {/* Fast to Market */}
              <motion.div
                className="p-3 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Rapid Market Entry
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Accelerate your time-to-market with our streamlined manufacturing process. No factory investment required—simply select, customize, and launch your products.
                </p>
              </motion.div>

              {/* Your Brand, Your Identity */}
              <motion.div
                className="p-3 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Complete Brand Control
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Maintain full ownership of your brand identity with our comprehensive design platform. Create custom packaging, logos, and product specifications that reflect your vision.
                </p>
              </motion.div>

              {/* Global Opportunities */}
              <motion.div
                className="p-3 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Global Market Access
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Scale your business internationally with our extensive network of manufacturing partners and distribution channels across multiple continents.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Image section - Bottom on mobile, left side on desktop */}
          <motion.div
            className="order-2 lg:order-1 lg:col-span-2 flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 200, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            viewport={{ once: true, amount: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ rotateX: 15, rotateY: -10 }}
              whileInView={{ rotateX: 0, rotateY: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-lg"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src="/private-label/private-label.png"
                  alt="Private Label Manufacturing"
                  width={800}
                  height={600}
                  className="shadow-xl object-cover w-full h-auto transition-transform duration-500"
                />

                {/* Animated overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 0.8 }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "200%" }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
