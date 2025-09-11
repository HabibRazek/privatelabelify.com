'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function GetStartedPage() {
  const router = useRouter();

  const handleRoleSelection = (role: 'retailer' | 'supplier') => {
    if (role === 'retailer') {
      router.push('/signup/account');
    } else {
      // For now, redirect to account signup as well
      // Later you can create a separate manufacturer flow
      router.push('/signup/account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <Image
              src="/logo/Make your private label.png"
              alt="PrivateLabelify Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          
          {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Source, manufacture, and grow your product line - all in one place
            </h1>
            <p className="text-gray-600 mb-8">
              Choose your role to get started.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="space-y-4 mb-8">
            {/* For Retailers & Brands */}
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-800 hover:bg-blue-50 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">For Retailers & Brands</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Source products, manage suppliers, and streamline sourcing.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRoleSelection('retailer')}
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                Continue →
              </button>
            </div>

            {/* For Suppliers & Manufacturers */}
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-800 hover:bg-blue-50 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">For Suppliers & Manufacturers</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Showcase your products and receive new business opportunities.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRoleSelection('supplier')}
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                Continue →
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-sm text-gray-500">
            Have an account?{' '}
            <button
              onClick={() => router.push('/auth/signin')}
              className="text-blue-800 hover:text-blue-900 underline"
            >
              Log in here
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Gradient Background */}
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-100 to-blue-300">
        {/* This side is just the gradient background */}
      </div>
    </div>
  );
}
