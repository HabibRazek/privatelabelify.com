'use client';

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupForm() {
  const router = useRouter();

  const handleRoleSelection = (role: 'retailer' | 'supplier') => {
    router.push(`/auth/signup/${role}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Image
            src="/logo/Make your private label.png"
            alt="PrivateLabelify Logo"
            width={180}
            height={50}
            className="h-10 w-auto mx-auto mb-6"
          />

          {/* Business Email Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm font-medium">
              💼 Use your business email for full features and faster approval
            </p>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              Choose Your Account Type
            </h1>
            <p className="text-gray-600">
              Select the option that best describes your business
            </p>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-4">
          {/* For Retailers & Brands */}
          <Card
            className="cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-300 border-2 border-gray-100 p-6 group"
            onClick={() => handleRoleSelection('retailer')}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Users className="w-6 h-6 text-blue-800" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                  Retailer & Brand Owner
                </CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Source products, manage suppliers, and grow your product line with verified manufacturers.
                </CardDescription>
                <Button
                  className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  size="sm"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* For Suppliers & Manufacturers */}
          <Card
            className="cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-300 border-2 border-gray-100 p-6 group"
            onClick={() => handleRoleSelection('supplier')}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Building2 className="w-6 h-6 text-blue-800" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                  Supplier & Manufacturer
                </CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Showcase your products and connect with retailers looking for manufacturing partners.
                </CardDescription>
                <Button
                  className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  size="sm"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="text-blue-800 hover:text-blue-900 font-medium hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
