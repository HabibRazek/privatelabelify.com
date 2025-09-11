'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateOnboardingProgress, createOnboardingProgress, getOnboardingProgress } from '@/actions/onboarding';

export default function ProductSourcingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [productDescription, setProductDescription] = useState('');
  const [autoCreateSourcing, setAutoCreateSourcing] = useState(true);
  const [getDirectIntroductions, setGetDirectIntroductions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeOnboarding = async () => {
      if (!session?.user?.id) return;

      const progress = await getOnboardingProgress(session.user.id);
      if (!progress) {
        await createOnboardingProgress(session.user.id);
      }
    };

    initializeOnboarding();
  }, [session]);

  const handleContinue = async () => {
    if (!session?.user?.id || !productDescription.trim()) return;

    setIsLoading(true);
    try {
      await updateOnboardingProgress(session.user.id, {
        currentStep: 2,
        productDescription,
        autoCreateSourcingRequest: autoCreateSourcing,
        getDirectIntroductions,
      });
      router.push('/onboarding/categories');
    } catch (error) {
      console.error('Error updating progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-green-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            What product or packaging are you sourcing?
          </h1>
          <p className="text-gray-600">
            Be specific so we can match you with the right suppliers
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="e.g. Collagen gummies for hair growth, Vitamin D3 immune drops, Private-label face serum for sensitive skin"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoCreateSourcing}
                    onChange={(e) => setAutoCreateSourcing(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Automatically create a sourcing request</h3>
                <p className="text-sm text-gray-600">
                  We'll start a sourcing request for you based on your inputs — you can review and add more details before submitting.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={getDirectIntroductions}
                    onChange={(e) => setGetDirectIntroductions(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Get direct introductions to preferred suppliers</h3>
                <p className="text-sm text-gray-600">
                  We'll connect you with trusted suppliers handpicked for your needs
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!productDescription.trim() || isLoading}
            className="w-full bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
