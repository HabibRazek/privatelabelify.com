'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateOnboardingProgress } from '@/actions/onboarding';

const discoveryOptions = [
  'Find suppliers',
  'Source products',
  'Source packaging',
  'Source raw materials'
];

const operationsOptions = [
  'Manage suppliers',
  'Finance inventory',
  'Streamline sourcing'
];

export default function GoalsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = async () => {
    if (!session?.user?.id || selectedInterests.length === 0) return;

    setIsLoading(true);
    try {
      await updateOnboardingProgress(session.user.id, {
        currentStep: 5,
        interests: JSON.stringify(selectedInterests),
      });
      router.push('/onboarding/company');
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
            What are you looking to do with Wonnda?
          </h1>
          <p className="text-gray-600">
            Select all that apply - we'll personalize your experience accordingly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Discovery</h3>
            <div className="space-y-3">
              {discoveryOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => toggleInterest(option)}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedInterests.includes(option)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="text-gray-800">{option}</span>
                  <span className="text-xl">
                    {selectedInterests.includes(option) ? '✓' : '+'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Operations</h3>
            <div className="space-y-3">
              {operationsOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => toggleInterest(option)}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedInterests.includes(option)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="text-gray-800">{option}</span>
                  <span className="text-xl">
                    {selectedInterests.includes(option) ? '✓' : '+'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={selectedInterests.length === 0 || isLoading}
          className="w-full bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {isLoading ? 'Loading...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
