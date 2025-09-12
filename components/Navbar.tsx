"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Calendar, Ticket, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-white/20 backdrop-blur-md shadow-lg"
        : "bg-transparent"
    }`}>
      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-4' : 'py-10'}`}>
          {/* Mobile: Burger Menu (only when scrolled) and Logo */}
          <div className="md:hidden flex justify-between items-center w-full">
            {/* Logo - Left side when scrolled, center when not scrolled */}
            <div className={`transition-all duration-500 ${isScrolled ? 'flex-shrink-0' : 'absolute left-1/2 transform -translate-x-1/2'} ${isScrolled ? 'mt-0' : 'mt-16'}`}>
              <Image
                src="/logo/Make your private label.png"
                alt="Private Labelify Logo"
                width={isScrolled ? 150 : 420}
                height={isScrolled ? 45 : 126}
                className={`w-auto transition-all duration-500 ${isScrolled ? 'h-10' : 'h-24'}`}
                priority
              />
            </div>

            {/* Burger Menu - Only visible when scrolled */}
            {isScrolled && (
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-blue-800" />
                ) : (
                  <Menu className="h-6 w-6 text-blue-800" />
                )}
              </button>
            )}
          </div>

          {/* Desktop: Full navbar */}
          <div className="hidden md:flex justify-between items-center w-full">
            {/* Left Side - Burger Menu */}
            <div className="flex items-center space-x-4">
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-blue-800" />
                ) : (
                  <Menu className="h-6 w-6 text-blue-800" />
                )}
              </button>
            </div>

            {/* Center - Logo */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${isScrolled ? 'mt-0' : 'mt-8'}`}>
              <Image
                src="/logo/Make your private label.png"
                alt="Private Labelify Logo"
                width={isScrolled ? 200 : 420}
                height={isScrolled ? 60 : 126}
                className={`w-auto transition-all duration-500 ${isScrolled ? 'h-12' : 'h-24'}`}
                priority
              />
            </div>

            {/* Right Side Icons & Buttons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-blue-800 hover:text-blue-600 transition-colors">
                <Calendar className="h-5 w-5" />
              </button>
              <button className="p-2 text-blue-800 hover:text-blue-600 transition-colors">
                <Ticket className="h-5 w-5" />
              </button>
              <button className="p-2 text-blue-800 hover:text-blue-600 transition-colors">
                <User className="h-5 w-5" />
              </button>
              <Button
                size="lg"
                onClick={() => router.push('/auth/signup')}
                className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white px-6 py-2.5 font-bold shadow-lg hover:shadow-blue-800/50 transition-all duration-300 transform hover:scale-105 rounded-lg border-0"
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Only shows when scrolled */}
        {isMenuOpen && isScrolled && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <nav className="px-4 py-4 space-y-4">
              <a href="#" className="block text-gray-700 hover:text-blue-800 transition-colors font-medium">
                Products
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-800 transition-colors font-medium">
                Services
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-800 transition-colors font-medium">
                About
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-800 transition-colors font-medium">
                Contact
              </a>
              <div className="pt-4 border-t border-gray-200">
                <Button
                  size="lg"
                  onClick={() => router.push('/auth/signup')}
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white px-4 py-3 font-bold shadow-lg hover:shadow-blue-800/50 transition-all duration-300 transform hover:scale-105 rounded-lg border-0"
                  style={{
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}

        {/* Desktop Menu */}
        {isMenuOpen && (
          <div className="hidden md:block absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <nav className="px-8 py-6">
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Private Label</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Custom Manufacturing</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Packaging Solutions</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Product Development</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Quality Control</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Supply Chain</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Industries</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Beauty & Personal Care</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Food & Beverage</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Health & Supplements</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">About Us</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Case Studies</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
