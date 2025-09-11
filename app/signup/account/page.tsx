'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/ui/stepper';

export default function AccountPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const passwordRequirements = [
    { text: 'At least 12 characters', met: formData.password.length >= 12 },
    { text: 'Includes an uppercase letter (A-Z)', met: /[A-Z]/.test(formData.password) },
    { text: 'Includes a number (0-9)', met: /[0-9]/.test(formData.password) },
    { text: 'Includes a special character (!@#$%^&*)', met: /[!@#$%^&*]/.test(formData.password) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.met);
  const isFormValid = formData.email.includes('@') && isPasswordValid;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (!isFormValid) return;
    
    // Store data in sessionStorage for the signup flow
    sessionStorage.setItem('signupData', JSON.stringify(formData));
    router.push('/signup/verification');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Stepper currentStep={1} totalSteps={3} />

      <div className="flex items-center justify-center p-4 pt-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Create your account
            </h1>
            <p className="text-sm text-gray-600">
              Use your work email and create a password to get started
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="name@company.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.email && formData.email.includes('@') && (
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <span className="mr-2">✓</span>
                  Valid email format
                </div>
              )}
              <div className="flex items-center mt-2 text-sm text-orange-600">
                <span className="mr-2">⚠️</span>
                Business email recommended for faster approval and full feature access
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Set password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      req.met ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {req.met && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={req.met ? 'text-gray-900' : 'text-gray-500'}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!isFormValid}
              className="w-full bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
