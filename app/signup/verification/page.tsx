'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/ui/stepper';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export default function VerificationPage() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');

  // Get email from sessionStorage
  useEffect(() => {
    const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
    if (!signupData.email || !signupData.password) {
      router.push('/signup/account');
      return;
    }
    setEmail(signupData.email || 'your email');
  }, [router]);

  const handleContinue = () => {
    if (value.length !== 4) {
      return;
    }

    // Move to personal info step
    router.push('/signup/personal');
  };

  const handleResendCode = () => {
    // In a real app, you'd resend the verification code here
    console.log('Resending code...');
  };

  const handleChangeEmail = () => {
    router.push('/signup/account');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Stepper currentStep={2} totalSteps={3} />

      <div className="flex items-center justify-center p-4 pt-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Check your email
            </h1>
            <p className="text-sm text-gray-600">
              We&apos;ve sent a 4-digit code to <span className="font-medium">{email}</span>
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg border-gray-300" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg border-gray-300" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg border-gray-300" />
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg border-gray-300" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleContinue}
              disabled={value.length !== 4}
              className="w-full bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Continue
            </Button>

            <div className="text-center space-y-2">
              <button
                onClick={handleResendCode}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center w-full"
              >
                🔄 Resend code
              </button>
              <button
                onClick={handleChangeEmail}
                className="text-sm text-gray-400 hover:text-gray-600 block w-full"
              >
                Change email address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
