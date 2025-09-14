'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { Eye, EyeOff, Check, RotateCcw, Info, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from 'next/image';
import worldCountries from 'world-countries';
import ReactCountryFlag from 'react-country-flag';
import { toast } from 'sonner';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  type RetailerSignupData
} from '@/lib/validations/auth';

interface Country {
  code: string;
  name: string;
  dialCode: string;
}

// Process world countries data to get all countries with dial codes
const countries: Country[] = worldCountries
  .filter(country => country.idd?.root) // Only countries with dial codes
  .map(country => ({
    code: country.cca2,
    name: country.name.common,
    dialCode: country.idd.root + (country.idd.suffixes?.[0] || '')
  }))
  .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

export default function RetailerSignupPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState<string>('');

  // Redirect if already logged in
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard/retailer');
    }
  }, [status, session, router]);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find(c => c.code === 'US') || countries[0]
  ); // Default to US
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    firstName: '',
    lastName: '',
    phone: '',
    companyName: '',
    address: '',
    companyType: '',
    annualRevenue: '',
    website: '',
    businessGoals: [] as string[],
    hasLaunchedProduct: null as boolean | null,
    interestedCategories: [] as string[],
    productDescription: '',
    autoCreateRequest: true,
    getDirectIntroductions: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password validation rules
  const passwordRules = [
    { rule: 'At least 12 characters', check: formData.password.length >= 12 },
    { rule: 'Includes an uppercase letter (A-Z)', check: /[A-Z]/.test(formData.password) },
    { rule: 'Includes a number (0-9)', check: /[0-9]/.test(formData.password) },
    { rule: 'Includes a special character (!@#$%^&*)', check: /[!@#$%^&*]/.test(formData.password) },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      businessGoals: prev.businessGoals.includes(goal)
        ? prev.businessGoals.filter(g => g !== goal)
        : [...prev.businessGoals, goal]
    }));
  };

  const handleProductLaunchSelection = (hasLaunched: boolean) => {
    setFormData(prev => ({ ...prev, hasLaunchedProduct: hasLaunched }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      interestedCategories: prev.interestedCategories.includes(category)
        ? prev.interestedCategories.filter(c => c !== category)
        : [...prev.interestedCategories, category]
    }));
  };

  const handleToggleOption = (field: 'autoCreateRequest' | 'getDirectIntroductions') => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Send email verification
  const sendEmailVerification = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Verification code sent to your email');
        // Store the generated OTP for display (development only)
        if (result.otp) {
          setGeneratedOTP(result.otp);
        }
        setCurrentStep(2);
      } else {
        toast.error(result.error || 'Failed to send verification code');
        if (result.details) {
          setErrors(result.details);
        }
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email code
  const verifyEmailCode = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, code: formData.otp }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Email verified successfully');
        setCurrentStep(3);
      } else {
        toast.error(result.error || 'Invalid verification code');
        if (result.details) {
          setErrors(result.details);
        }
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Complete signup
  const completeSignup = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const signupData: RetailerSignupData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        phoneCountryCode: selectedCountry.dialCode,
        companyName: formData.companyName,
        address: formData.address,
        companyType: formData.companyType as 'Agency' | 'Consultant' | 'Corporation' | 'Creator' | 'D2C Brand' | 'Importer' | 'Marketplace' | 'Online Retailer' | 'Retailer' | 'Small Business' | 'Wholesaler',
        annualRevenue: formData.annualRevenue as 'Under $100K' | '$100K - $500K' | '$500K - $1M' | '$1M - $5M' | '$5M - $10M' | '$10M - $50M' | '$50M+' | 'Prefer not to say',
        website: formData.website,
        businessGoals: formData.businessGoals as ('Find suppliers' | 'Source products' | 'Source packaging' | 'Source raw materials' | 'Manage suppliers' | 'Finance inventory' | 'Streamline sourcing')[],
        hasLaunchedProduct: formData.hasLaunchedProduct!,
        interestedCategories: formData.interestedCategories as ('Beauty & Personal Care' | 'Fashion' | 'Food & Beverages' | 'Health & Supplements' | 'Home & Living' | 'Pet Supplies' | 'Packaging')[],
        productDescription: formData.productDescription,
        autoCreateRequest: formData.autoCreateRequest,
        getDirectIntroductions: formData.getDirectIntroductions,
      };

      const response = await fetch('/api/auth/signup-retailer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/dashboard/retailer');
        }, 2000);
      } else {
        toast.error(result.error || 'Failed to create account');
        if (result.details) {
          setErrors(result.details);
        }
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    setErrors({});

    // Validate current step
    if (currentStep === 1) {
      const validation = step1Schema.safeParse({
        email: formData.email,
        password: formData.password,
      });

      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      await sendEmailVerification();
    } else if (currentStep === 2) {
      const validation = step2Schema.safeParse({
        email: formData.email,
        otp: formData.otp,
      });

      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      await verifyEmailCode();
    } else if (currentStep === 8) {
      await completeSignup();
    } else {
      // Validate other steps and move forward
      let validation;

      switch (currentStep) {
        case 3:
          validation = step3Schema.safeParse({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            phoneCountryCode: selectedCountry.dialCode,
          });
          break;
        case 4:
          validation = step4Schema.safeParse({
            companyName: formData.companyName,
            address: formData.address,
            companyType: formData.companyType,
            annualRevenue: formData.annualRevenue,
            website: formData.website,
          });
          break;
        case 5:
          validation = step5Schema.safeParse({
            businessGoals: formData.businessGoals,
          });
          break;
        case 6:
          validation = step6Schema.safeParse({
            hasLaunchedProduct: formData.hasLaunchedProduct,
          });
          break;
        case 7:
          validation = step7Schema.safeParse({
            interestedCategories: formData.interestedCategories,
          });
          break;
        default:
          validation = { success: true };
      }

      if (validation && !validation.success && validation.error) {
        const fieldErrors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      if (currentStep < 8) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResendCode = async () => {
    await sendEmailVerification();
  };

  const isPasswordValid = passwordRules.every(rule => rule.check);
  const canContinueStep1 = formData.email && formData.password && isPasswordValid;
  const canContinueStep2 = formData.otp.length === 4;
  const canContinueStep3 = formData.firstName && formData.lastName && formData.phone;
  const canContinueStep4 = formData.companyName && formData.address && formData.companyType && formData.annualRevenue;
  const canContinueStep5 = formData.businessGoals.length > 0;
  const canContinueStep6 = formData.hasLaunchedProduct !== null;
  const canContinueStep7 = formData.interestedCategories.length > 0;
  const canContinueStep8 = formData.productDescription.trim().length > 0;

  const companyTypes = [
    'Agency',
    'Consultant',
    'Corporation',
    'Creator',
    'D2C Brand',
    'Importer',
    'Marketplace',
    'Online Retailer',
    'Retailer',
    'Small Business',
    'Wholesaler'
  ];

  // Annual revenue options
  const revenueRanges = [
    'Under $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M - $5M',
    '$5M - $10M',
    '$10M - $50M',
    '$50M+',
    'Prefer not to say'
  ];

  // Business goals options
  const businessGoals = {
    discovery: [
      'Find suppliers',
      'Source products',
      'Source packaging',
      'Source raw materials'
    ],
    operations: [
      'Manage suppliers',
      'Finance inventory',
      'Streamline sourcing'
    ]
  };

  // Product categories
  const productCategories = [
    'Beauty & Personal Care',
    'Fashion',
    'Food & Beverages',
    'Health & Supplements',
    'Home & Living',
    'Pet Supplies',
    'Packaging'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar integrated at top of card */}
        <div className="bg-white rounded-t-lg">
          <div className="h-2 bg-gray-200 rounded-t-lg overflow-hidden">
            <div
              className="h-full bg-blue-800 transition-all duration-300"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card Content */}
        <div className="bg-white rounded-b-lg shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/logo/Make your private label.png"
                alt="PrivateLabelify Logo"
                width={180}
                height={50}
                className="h-8 md:h-10 w-auto"
              />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              {currentStep === 1 ? 'Create your account' :
                currentStep === 2 ? 'Check your email' :
                  currentStep === 3 ? 'Tell us about yourself' :
                    currentStep === 4 ? 'Tell us about your company' :
                      currentStep === 5 ? 'What are you looking to do with PrivateLabelify?' :
                        currentStep === 6 ? 'Have you launched a product before?' :
                          currentStep === 7 ? 'What are you interested in?' :
                            'What product or packaging are you sourcing?'}
            </h1>
            <p className="text-xs md:text-sm text-gray-600">
              {currentStep === 1
                ? 'Use your work email and create a password to get started'
                : currentStep === 2 ? (
                  <>
                    We&aposve sent a 4-digit code to{' '}
                    <span className="font-medium text-blue-800">{formData.email}</span>
                  </>
                ) : currentStep === 3 ? 'This is how you&apos;ll appear on PrivateLabelify'
                  : currentStep === 5 ? 'Select all that apply - we&apos;ll personalize your experience accordingly'
                    : currentStep === 7 ? 'Choose the categories that are relevant to you'
                      : currentStep === 8 ? 'Be specific so we can match you with the right suppliers'
                        : ''
              }
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-6 md:mb-8 space-y-4">
            {currentStep === 1 ? (
              <>
                {/* Work Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs md:text-sm font-medium text-gray-700">
                    Work email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs md:text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Set password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="space-y-1.5">
                  {passwordRules.map((rule, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full flex items-center justify-center ${rule.check ? 'bg-green-500' : 'bg-gray-200'
                        }`}>
                        {rule.check && <Check className="h-2 w-2 md:h-2.5 md:w-2.5 text-white" />}
                      </div>
                      <span className={`text-xs ${rule.check ? 'text-green-600' : 'text-gray-500'}`}>
                        {rule.rule}
                      </span>
                    </div>
                  ))}
                </div>


              </>
            ) : currentStep === 2 ? (
              <>
                {/* OTP Input */}
                <div className="flex flex-col items-center mb-6">
                  <InputOTP
                    maxLength={4}
                    value={formData.otp}
                    onChange={(value) => handleInputChange('otp', value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                      <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                      <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                      <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                  {errors.otp && (
                    <p className="text-xs text-red-600 mt-2">{errors.otp}</p>
                  )}
                </div>



                {/* OTP Display for Testing */}
                {generatedOTP && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-yellow-800 font-medium">
                      🔧 Development Mode - Your OTP Code:
                    </p>
                    <p className="text-lg font-bold text-yellow-900 mt-1">
                      {generatedOTP}
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      (This will be hidden in production)
                    </p>
                  </div>
                )}

                {/* Resend Code */}
                <div className="text-center space-y-2">
                  <button
                    onClick={handleResendCode}
                    className="flex items-center justify-center space-x-2 text-sm text-blue-800 hover:text-blue-900 mx-auto"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Resend code</span>
                  </button>

                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Change email address
                  </button>
                </div>
              </>
            ) : currentStep === 3 ? (
              <>
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs md:text-sm font-medium text-gray-700">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Alex"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs md:text-sm font-medium text-gray-700">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Taylor"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs md:text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <div className="flex">
                    <Select value={selectedCountry.code} onValueChange={(value) => {
                      const country = countries.find(c => c.code === value);
                      if (country) setSelectedCountry(country);
                    }}>
                      <SelectTrigger className="w-[120px] rounded-r-none border-r-0">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <ReactCountryFlag
                              countryCode={selectedCountry.code}
                              svg
                              style={{ width: '20px', height: '15px' }}
                            />
                            <span className="text-sm">{selectedCountry.dialCode}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center gap-2">
                              <ReactCountryFlag
                                countryCode={country.code}
                                svg
                                style={{ width: '20px', height: '15px' }}
                              />
                              <span className="text-sm">{country.dialCode}</span>
                              <span className="text-sm text-gray-600">{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="1512 3456789"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 rounded-l-none"
                    />
                  </div>
                </div>


              </>
            ) : currentStep === 4 ? (
              <>
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    Company name
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="e.g. Freshly Foods"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Address
                  </Label>
                  <AddressAutocomplete
                    value={formData.address}
                    onChange={(value) => handleInputChange('address', value)}
                    placeholder="Search address..."
                    className="w-full"
                  />
                </div>

                {/* Company Type */}
                <div className="space-y-2">
                  <Label htmlFor="companyType" className="text-sm font-medium text-gray-700">
                    Company type
                  </Label>
                  <Select value={formData.companyType} onValueChange={(value) => handleInputChange('companyType', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a company type" />
                    </SelectTrigger>
                    <SelectContent>
                      {companyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Annual Revenue */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="annualRevenue" className="text-sm font-medium text-gray-700">
                      Annual revenue
                    </Label>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <Select value={formData.annualRevenue} onValueChange={(value) => handleInputChange('annualRevenue', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                    Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="e.g. freshly.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    No website? Use a public social profile (LinkedIn, Instagram, or TikTok)
                  </p>
                </div>


              </>
            ) : currentStep === 5 ? (
              <>
                {/* Business Goals Selection - Two Column Layout */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Discovery Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Discovery</h3>
                    <div className="space-y-3">
                      {businessGoals.discovery.map((goal) => {
                        const isSelected = formData.businessGoals.includes(goal);
                        return (
                          <div
                            key={goal}
                            onClick={() => handleBusinessGoalToggle(goal)}
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${isSelected
                                ? 'border-blue-800 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            <span className={`text-sm font-medium ${isSelected ? 'text-blue-800' : 'text-gray-700'
                              }`}>
                              {goal}
                            </span>
                            <div className={`w-5 h-5 flex items-center justify-center ${isSelected ? '' : 'border-2 border-gray-300 rounded'
                              }`}>
                              {isSelected ? (
                                <Check className="h-4 w-4 text-blue-800" />
                              ) : (
                                <span className="text-gray-400 text-lg">+</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operations Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Operations</h3>
                    <div className="space-y-3">
                      {businessGoals.operations.map((goal) => {
                        const isSelected = formData.businessGoals.includes(goal);
                        return (
                          <div
                            key={goal}
                            onClick={() => handleBusinessGoalToggle(goal)}
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${isSelected
                                ? 'border-blue-800 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            <span className={`text-sm font-medium ${isSelected ? 'text-blue-800' : 'text-gray-700'
                              }`}>
                              {goal}
                            </span>
                            <div className={`w-5 h-5 flex items-center justify-center ${isSelected ? '' : 'border-2 border-gray-300 rounded'
                              }`}>
                              {isSelected ? (
                                <Check className="h-4 w-4 text-blue-800" />
                              ) : (
                                <span className="text-gray-400 text-lg">+</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>


              </>
            ) : currentStep === 6 ? (
              <>
                {/* Yes/No Selection */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Yes Button */}
                  <Button
                    onClick={() => handleProductLaunchSelection(true)}
                    variant={formData.hasLaunchedProduct === true ? "default" : "outline"}
                    className={`h-12 ${formData.hasLaunchedProduct === true
                        ? 'bg-blue-800 hover:bg-blue-900 text-white'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Yes
                  </Button>

                  {/* No Button */}
                  <Button
                    onClick={() => handleProductLaunchSelection(false)}
                    variant={formData.hasLaunchedProduct === false ? "default" : "outline"}
                    className={`h-12 ${formData.hasLaunchedProduct === false
                        ? 'bg-blue-800 hover:bg-blue-900 text-white'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                  >
                    <span className="mr-2">✕</span>
                    No
                  </Button>
                </div>


              </>
            ) : currentStep === 7 ? (
              <>
                {/* Product Categories Selection */}
                <div className="space-y-3">
                  {productCategories.map((category) => {
                    const isSelected = formData.interestedCategories.includes(category);
                    return (
                      <div
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${isSelected
                            ? 'border-blue-800 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <span className={`text-sm font-medium ${isSelected ? 'text-blue-800' : 'text-gray-700'
                          }`}>
                          {category}
                        </span>
                        <div className={`w-6 h-6 flex items-center justify-center ${isSelected ? '' : 'border-2 border-gray-300 rounded'
                          }`}>
                          {isSelected ? (
                            <Check className="h-4 w-4 text-blue-800" />
                          ) : (
                            <span className="text-gray-400 text-lg">+</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>


              </>
            ) : currentStep === 8 ? (
              <>
                {/* Product Description Textarea */}
                <div className="space-y-4">
                  <textarea
                    value={formData.productDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, productDescription: e.target.value }))}
                    placeholder="e.g. Collagen gummies for hair growth, Vitamin D3 immune drops, Private-label face serum for sensitive skin"
                    className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm"
                  />
                </div>

                {/* Toggle Options */}
                <div className="space-y-4 mt-6">
                  {/* Auto Create Request */}
                  <div className="flex items-start space-x-3">
                    <div
                      onClick={() => handleToggleOption('autoCreateRequest')}
                      className={`flex-shrink-0 w-12 h-6 rounded-full cursor-pointer transition-all ${formData.autoCreateRequest ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${formData.autoCreateRequest ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Automatically create a sourcing request</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        We&apos;ll start a sourcing request for you based on your inputs — you can review and add more details before submitting.
                      </p>
                    </div>
                  </div>

                  {/* Direct Introductions */}
                  <div className="flex items-start space-x-3">
                    <div
                      onClick={() => handleToggleOption('getDirectIntroductions')}
                      className={`flex-shrink-0 w-12 h-6 rounded-full cursor-pointer transition-all ${formData.getDirectIntroductions ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${formData.getDirectIntroductions ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Get direct introductions to preferred suppliers</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        We&apos;ll connect you with trusted suppliers handpicked for your needs
                      </p>
                    </div>
                  </div>
                </div>


              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Step {currentStep} content coming soon...</p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>

            <Button
              onClick={handleContinue}
              disabled={
                isLoading ||
                (currentStep === 1 && !canContinueStep1) ||
                (currentStep === 2 && !canContinueStep2) ||
                (currentStep === 3 && !canContinueStep3) ||
                (currentStep === 4 && !canContinueStep4) ||
                (currentStep === 5 && !canContinueStep5) ||
                (currentStep === 6 && !canContinueStep6) ||
                (currentStep === 7 && !canContinueStep7) ||
                (currentStep === 8 && !canContinueStep8)
              }
              className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>
                {currentStep === 1 ? 'Send Code' :
                 currentStep === 2 ? 'Verify Email' :
                 currentStep === 8 ? 'Complete Signup' : 'Continue'}
              </span>
              {!isLoading && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
