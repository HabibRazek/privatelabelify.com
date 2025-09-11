'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createCompany } from '@/actions/company';
import { updateOnboardingProgress } from '@/actions/onboarding';

const companyTypes = [
  'Importer',
  'Manufacturer',
  'Distributor',
  'Retailer',
  'Brand Owner',
  'Other'
];

const revenueRanges = [
  'Under €50,000',
  '€50,000 - €100,000',
  '€100,000 - €250,000',
  '€250,000 - €500,000',
  '€500,000 - €1,000,000',
  'Over €1,000,000'
];

export default function CompanyPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'Importer',
    annualRevenue: '€100,000 - €250,000',
    website: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = async () => {
    if (!session?.user?.id || !formData.name.trim()) return;

    setIsLoading(true);
    try {
      await createCompany({
        userId: session.user.id,
        ...formData
      });
      
      await updateOnboardingProgress(session.user.id, {
        currentStep: 6,
      });
      
      router.push('/onboarding/personal');
    } catch (error) {
      console.error('Error saving company:', error);
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
            Tell us about your company
          </h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="packedin"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Tunis Centre, Tunis, Tunisia"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {companyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual revenue
            </label>
            <select
              value={formData.annualRevenue}
              onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {revenueRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="packedin.tn"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              No website? Use a public social profile (LinkedIn, Instagram, or TikTok)
            </p>
          </div>

          <button
            onClick={handleContinue}
            disabled={!formData.name.trim() || isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? 'Loading...' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
