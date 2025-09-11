'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateOnboardingProgress } from '@/actions/onboarding';

const categories = [
  'Beauty & Personal Care',
  'Fashion',
  'Food & Beverages',
  'Health & Supplements',
  'Home & Living',
  'Pet Supplies',
  'Packaging'
];

export default function CategoriesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Packaging']);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleContinue = async () => {
    if (!session?.user?.id || selectedCategories.length === 0) return;

    setIsLoading(true);
    try {
      await updateOnboardingProgress(session.user.id, {
        currentStep: 3,
        categories: JSON.stringify(selectedCategories),
      });
      router.push('/onboarding/experience');
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
            What are you interested in?
          </h1>
          <p className="text-gray-600">
            Choose the categories that are relevant to you
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => toggleCategory(category)}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedCategories.includes(category)
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span className="font-medium text-gray-800">{category}</span>
              <span className="text-2xl">
                {selectedCategories.includes(category) ? '✓' : '+'}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={selectedCategories.length === 0 || isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? 'Loading...' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}
