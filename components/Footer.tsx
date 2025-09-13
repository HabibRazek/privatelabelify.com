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
  Linkedin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Private Label", href: "/services/private-label" },
        { name: "Product Development", href: "/services/product-development" },
        { name: "Custom Packaging", href: "/services/packaging" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Process", href: "/process" },
        { name: "Contact", href: "/contact" }
      ]
    }
  ];

  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo/Make your private label.png"
                alt="PrivateLabelify"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your trusted partner in private label manufacturing solutions.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                <span>contact@privatelabelify.com</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 mb-3 md:mb-0">
              © {currentYear} PrivateLabelify. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs">
              <Link href="/privacy" className="text-gray-500 hover:text-blue-600">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-blue-600">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;