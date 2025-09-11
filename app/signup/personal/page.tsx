'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/ui/stepper';

export default function PersonalInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if account data exists, if not redirect back
    const signupData = sessionStorage.getItem('signupData');
    if (!signupData) {
      router.push('/signup/account');
    }
  }, [router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      // Get existing signup data and merge with personal data
      const existingData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
      const completeData = { ...existingData, ...formData };

      // Create user account
      const { createUser } = await import('@/actions/user');
      const { signIn } = await import('next-auth/react');

      const result = await createUser({
        email: completeData.email,
        password: completeData.password,
        firstName: completeData.firstName,
        lastName: completeData.lastName,
        phone: completeData.phone,
      });

      if (result.error) {
        console.error('Error creating user:', result.error);
        return;
      }

      // Auto sign in after successful registration
      const signInResult = await signIn('credentials', {
        email: completeData.email,
        password: completeData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        console.error('Sign in failed:', signInResult.error);
      } else {
        // Clear signup data and redirect to onboarding
        sessionStorage.removeItem('signupData');
        router.push('/onboarding');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Stepper currentStep={3} totalSteps={3} />

      <div className="flex items-center justify-center p-4 pt-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Tell us about yourself
            </h1>
            <p className="text-sm text-gray-600">
              This is how you&apos;ll appear on Wonnda
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Habib"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Razek"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <div className="flex">
                <select className="p-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-sm">
                  <option value="+216">🇹🇳 +216</option>
                </select>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="26 362 224"
                  className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim() || isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-6"
            >
              {isLoading ? 'Creating Account...' : 'Continue →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
