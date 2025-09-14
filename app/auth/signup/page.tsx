import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Store, Factory } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/logo/Make your private label.png"
                alt="PrivateLabelify Logo"
                width={180}
                height={50}
                className="h-8 md:h-10 w-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Join PrivateLabelify
            </h1>
            <p className="text-gray-600">
              Choose your account type to get started
            </p>
          </div>

          {/* Account Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Retailer Option */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  I'm a Retailer
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  I want to source products and build my private label business
                </p>
                <Button asChild className="w-full bg-blue-800 hover:bg-blue-900">
                  <Link href="/auth/signup/retailer">
                    Get Started as Retailer
                  </Link>
                </Button>
              </div>
            </div>

            {/* Supplier Option */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
              <div className="text-center">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  I'm a Supplier
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  I manufacture products and want to connect with retailers
                </p>
                <Button asChild variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  <Link href="/auth/signup/supplier">
                    Get Started as Supplier
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
