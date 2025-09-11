'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateOnboardingProgress } from '@/actions/onboarding';

export default function VerificationPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleContinue = async () => {
    if (!session?.user?.id || code.some(digit => !digit)) return;

    setIsLoading(true);
    try {
      // In a real app, you'd verify the code here
      await updateOnboardingProgress(session.user.id, {
        currentStep: 8,
      });
      
      router.push('/onboarding/password');
    } catch (error) {
      console.error('Error verifying code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = () => {
    // In a real app, you'd resend the verification code here
    console.log('Resending code...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-green-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Check your email
          </h1>
          <p className="text-sm text-gray-600">
            We've sent a 4-digit code to {session?.user?.email}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                maxLength={1}
              />
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={code.some(digit => !digit) || isLoading}
            className="w-full bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>

          <div className="text-center">
            <button
              onClick={resendCode}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Resend code
            </button>
            <br />
            <button
              onClick={() => router.push('/onboarding/personal')}
              className="text-sm text-gray-500 hover:text-gray-700 mt-2"
            >
              Change email address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
