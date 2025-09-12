'use client';

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupForm() {
  const router = useRouter();

  const handleRoleSelection = (role: 'retailer' | 'supplier') => {
    // Navigate to the appropriate signup flow based on role
    router.push(`/auth/signup/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Image
              src="/logo/Make your private label.png"
              alt="PrivateLabelify Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-blue-800 leading-tight">
              Source, manufacture, and grow your product line - all in one place
            </h1>
            <p className="text-gray-600 text-sm">
              Choose your role to get started.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="space-y-4">
            {/* For Retailers & Brands */}
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold text-blue-800 mb-1">
                    For Retailers & Brands
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Source products, manage suppliers, and streamline sourcing.
                  </CardDescription>
                </div>
                <Button
                  onClick={() => handleRoleSelection('retailer')}
                  className="ml-4 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 text-sm"
                  size="sm"
                >
                  Continue
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </Card>

            {/* For Suppliers & Manufacturers */}
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold text-blue-800 mb-1">
                    For Suppliers & Manufacturers
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Showcase your products and receive new business opportunities.
                  </CardDescription>
                </div>
                <Button
                  onClick={() => handleRoleSelection('supplier')}
                  className="ml-4 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 text-sm"
                  size="sm"
                >
                  Continue
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Have an account?{' '}
              <Link href="/auth/signin" className="text-blue-800 hover:text-blue-900 font-medium">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Blue Gradient Background */}
      <div className="flex-1 bg-gradient-to-br from-blue-200 to-blue-300">
        {/* Empty gradient background matching the design */}
      </div>
    </div>
  );
}
