'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateOnboardingProgress } from '@/actions/onboarding';

export default function PasswordPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { text: 'At least 12 characters', met: password.length >= 12 },
    { text: 'Includes an uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { text: 'Includes a number (0-9)', met: /[0-9]/.test(password) },
    { text: 'Includes a special character (!@#$%^&*)', met: /[!@#$%^&*]/.test(password) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.met);

  const handleContinue = async () => {
    if (!session?.user?.id || !isPasswordValid) return;

    setIsLoading(true);
    try {
      await updateOnboardingProgress(session.user.id, {
        completed: true,
      });
      
      router.push('/onboarding/complete');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-green-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
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
            <div className="flex items-center p-3 bg-gray-50 border border-gray-300 rounded-lg">
              <span className="text-gray-800">{session?.user?.email}</span>
              <span className="ml-auto text-green-600">✓</span>
            </div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                placeholder="Enter your password"
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
                  <span className={`mr-2 ${req.met ? 'text-green-600' : 'text-gray-400'}`}>
                    {req.met ? '✓' : '○'}
                  </span>
                  <span className={req.met ? 'text-green-600' : 'text-gray-600'}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!isPasswordValid || isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? 'Creating Account...' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
