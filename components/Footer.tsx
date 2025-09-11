"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Factory,
  Shield,
  Truck,
  Award
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Private Label Manufacturing", href: "/services/private-label" },
        { name: "Product Development", href: "/services/product-development" },
        { name: "Custom Packaging", href: "/services/packaging" },
        { name: "Quality Control", href: "/services/quality" },
        { name: "Supply Chain", href: "/services/supply-chain" }
      ]
    },
    {
      title: "Industries",
      links: [
        { name: "Beauty & Personal Care", href: "/industries/beauty" },
        { name: "Food & Beverage", href: "/industries/food" },
        { name: "Health & Supplements", href: "/industries/health" },
        { name: "Household Products", href: "/industries/household" },
        { name: "Pet Products", href: "/industries/pet" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Process", href: "/process" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
        { name: "Documentation", href: "/docs" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" }
      ]
    }
  ];

  const features = [
    {
      icon: Factory,
      title: "Manufacturing Excellence",
      description: "State-of-the-art facilities"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "ISO certified processes"
    },
    {
      icon: Truck,
      title: "Global Shipping",
      description: "Worldwide delivery network"
    },
    {
      icon: Award,
      title: "Industry Leader",
      description: "15+ years of experience"
    }
  ];

  return (
    <footer className="bg-white text-black">
      {/* Main Footer Content */}
      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section - Company Info & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="mb-4">
                <Image
                  src="/logo/Make your private label.png"
                  alt="PrivateLabelify"
                  width={200}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Your trusted partner in private label manufacturing. We help businesses
                scale their product lines with high-quality manufacturing solutions across
                multiple FMCG categories.
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-gray-700 text-sm">
                  <Mail className="w-4 h-4 mr-2 text-blue-800" />
                  <span>contact@privatelabelify.com</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm">
                  <Phone className="w-4 h-4 mr-2 text-blue-800" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-blue-800" />
                  <span>123 Manufacturing Ave, Industrial City, IC 12345</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-black">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-800 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold mb-4 text-black">Why Choose Us</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-black text-sm mb-1">{feature.title}</h5>
                    <p className="text-gray-600 text-xs">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-black mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-600 text-sm hover:text-black transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-lg font-bold text-black mb-3">
              Stay Updated with Industry Insights
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              Get the latest trends, manufacturing tips, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold text-sm rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-600 text-xs mb-3 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              © {currentYear} PrivateLabelify. All rights reserved.
            </motion.p>
            <motion.div
              className="flex space-x-4 text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/privacy" className="text-gray-600 hover:text-black transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-black transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-black transition-colors duration-300">
                Cookie Policy
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;