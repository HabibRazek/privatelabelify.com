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

        {/* Mobile Navigation Sheet */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-out"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Sheet */}
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              {/* Sheet Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <Image
                    src="/logo/Make your private label.png"
                    alt="PrivateLabelify Logo"
                    width={120}
                    height={35}
                    className="h-7 w-auto"
                  />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col h-full">
                <nav className="flex-1 px-6 py-6 space-y-1">
                  <div className="space-y-1">
                    <button className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
                      <span className="font-medium">Resources</span>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-800 transition-colors" />
                    </button>

                    <button className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200">
                      <span className="font-medium">Create Request</span>
                    </button>

                    <button className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
                      <span className="font-medium">Platform</span>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-800 transition-colors" />
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="my-6 border-t border-gray-200"></div>

                  {/* Additional Links */}
                  <div className="space-y-1">
                    <button className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200">
                      <span className="font-medium">About Us</span>
                    </button>
                    <button className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200">
                      <span className="font-medium">Contact</span>
                    </button>
                    <button className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200">
                      <span className="font-medium">Help Center</span>
                    </button>
                  </div>
                </nav>

                {/* Bottom Actions */}
                <div className="p-6 border-t border-gray-100 space-y-3">
                  <button className="w-full text-center py-3 px-4 text-gray-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200">
                    Login
                  </button>
                  <Button
                    onClick={() => {
                      router.push('/auth/signup');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}