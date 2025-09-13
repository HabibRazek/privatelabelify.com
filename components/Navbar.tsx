"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side with logo and navigation */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/logo/Make your private label.png"
                alt="PrivateLabelify Logo"
                width={140}
                height={40}
                className="h-8 w-auto sm:h-10"
                priority
              />
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-blue-800 transition-colors">
                  <span>Resources</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              <button className="text-sm text-gray-700 hover:text-blue-800 transition-colors">
                Create request
              </button>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-blue-800 transition-colors">
                  <span>Platform</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </nav>
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button className="text-sm text-gray-700 hover:text-blue-800 transition-colors font-medium">
              Login
            </button>
            <Button
              onClick={() => router.push('/auth/signup')}
              className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1.5 text-sm rounded-lg font-medium transition-colors"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-800 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <button className="w-full text-left text-sm text-gray-700 hover:text-blue-800 py-2">
                Resources
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-blue-800 py-2">
                Create request
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-blue-800 py-2">
                Platform
              </button>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button className="w-full text-center text-sm text-gray-700 hover:text-blue-800 py-2 font-medium">
                  Login
                </button>
                <Button
                  onClick={() => router.push('/auth/signup')}
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 text-sm rounded-lg font-medium"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}