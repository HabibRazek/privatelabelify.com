'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateOnboardingProgress } from '@/actions/onboarding';

export default function ExperiencePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelection = async (launched: boolean) => {
    if (!session?.user?.id) return;

    setHasLaunched(launched);
    setIsLoading(true);
    
    try {
      await updateOnboardingProgress(session.user.id, {
        currentStep: 4,
        hasLaunchedBefore: launched,
      });
      router.push('/onboarding/goals');
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
            Have you launched a product before?
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSelection(true)}
            disabled={isLoading}
            className="flex items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors disabled:opacity-50"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">✓</div>
              <span className="font-semibold text-gray-800">Yes</span>
            </div>
          </button>

          <button
            onClick={() => handleSelection(false)}
            disabled={isLoading}
            className="flex items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">✗</div>
              <span className="font-semibold text-gray-800">No</span>
            </div>
          </button>
        </div>

        {isLoading && (
          <div className="text-center mt-4">
            <div className="text-gray-600">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
}
