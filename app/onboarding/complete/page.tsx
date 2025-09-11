'use client';

import { useRouter } from 'next/navigation';

export default function CompletePage() {
  const router = useRouter();

  const handleRoleSelection = (role: 'retailer' | 'supplier') => {
    if (role === 'retailer') {
      router.push('/dashboard');
    } else {
      // For now, redirect to dashboard as well
      // Later you can create a separate manufacturer flow
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-green-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold">
              W
            </div>
            <span className="ml-2 text-xl font-bold text-gray-800">Wonnda</span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Source, manufacture, and grow your product line - all in one place
          </h1>
          <p className="text-gray-600">
            Choose your role to get started.
          </p>
        </div>

        <div className="space-y-4">
          <div 
            onClick={() => handleRoleSelection('retailer')}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">For Retailers & Brands</h3>
                <p className="text-sm text-gray-600">
                  Source products, manage suppliers, and streamline sourcing.
                </p>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Continue →
              </button>
            </div>
          </div>

          <div 
            onClick={() => handleRoleSelection('supplier')}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">For Suppliers & Manufacturers</h3>
                <p className="text-sm text-gray-600">
                  Showcase your products and receive new business opportunities.
                </p>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Continue →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Have an account? 
            <button 
              onClick={() => router.push('/auth/signin')}
              className="text-orange-500 hover:text-orange-600 ml-1"
            >
              Log in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
