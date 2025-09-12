'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { AddressAutocomplete } from '@/components/ui/address-autocomplete';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Check, RotateCcw, MapPin } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Image from 'next/image';

interface Step {
  id: number;
  title: string;
  description: string;
  imageSrc?: string;
  completed: boolean;
}

const WORLD_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function ManufacturerStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [formData, setFormData] = useState({
    businessEmail: '',
    password: '',
    otp: '',
    firstName: '',
    lastName: '',
    phone: '',
    companyName: '',
    address: '',
    website: '',
    companyType: '',
    userRole: '',
    teamSize: '',
    annualRevenue: '',
    offerings: [] as string[],
    productionTypes: [] as string[],
    moqQuantities: [] as { type: string; quantity: string }[],
    productionOutsourcing: '',
    manufacturingCountries: [] as string[],
    supportGoals: [] as string[],
    companyDescription: '',
  });

  // Password validation rules
  const passwordRules = [
    { rule: 'Min. 8 characters', check: formData.password.length >= 8 },
    { rule: 'Contains a number', check: /[0-9]/.test(formData.password) },
    { rule: 'Contains a capital letter', check: /[A-Z]/.test(formData.password) },
  ];

  const handleInputChange = (field: string, value: string | string[] | { type: string; quantity: string }[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: 'offerings' | 'productionTypes' | 'manufacturingCountries' | 'supportGoals', value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const filteredCountries = WORLD_COUNTRIES.filter(country =>
    country.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  const steps: Step[] = [
    {
      id: 1,
      title: "Create your account",
      description: "Get started by creating your manufacturer account",
      imageSrc: "/manufacturer-steps/step-1.png",
      completed: false
    },
    {
      id: 2,
      title: "Confirm your email",
      description: "We've sent a 4-digit code to verify your account",
      imageSrc: "/manufacturer-steps/step-2.png",
      completed: false
    },
    {
      id: 3,
      title: "Tell us about you",
      description: "Please enter your name and phone number to continue",
      imageSrc: "/manufacturer-steps/step-3.png",
      completed: false
    },
    {
      id: 4,
      title: "Company details",
      description: "Provide your company name, website, and address to continue",
      imageSrc: "/manufacturer-steps/step-4.png",
      completed: false
    },
    {
      id: 5,
      title: "How would you describe your company?",
      description: "Select the option that best represents your business to help us tailor your experience",
      imageSrc: "/manufacturer-steps/step-5.png",
      completed: false
    },
    {
      id: 6,
      title: "How would you describe your role within the company?",
      description: "Understanding your role helps us tailor our platform to better serve your specific needs",
      imageSrc: "/manufacturer-steps/step-6.png",
      completed: false
    },
    {
      id: 7,
      title: "Tell us more about your company",
      description: "Learning about your company helps us to match you with suitable customers",
      imageSrc: "/manufacturer-steps/step-7.png",
      completed: false
    },
    {
      id: 8,
      title: "Tell us what you offer",
      description: "This helps buyers find and contact you more easily.",
      imageSrc: "/manufacturer-steps/step-8.png",
      completed: false
    },
    {
      id: 9,
      title: "Production Facilities",
      description: "Tell us more about your production facilities",
      imageSrc: "/manufacturer-steps/step-9.png",
      completed: false
    },
    {
      id: 10,
      title: "How can we support your goals?",
      description: "We'd love to know what motivated you to sign up with Wonnda.",
      imageSrc: "/manufacturer-steps/step-10.png",
      completed: false
    },
    {
      id: 11,
      title: "Introduce Your Company to Potential Partners",
      description: "Write a short, compelling description that clearly explains what your company does and the products or services you offer.",
      imageSrc: "/manufacturer-steps/step-11.png",
      completed: false
    },
    {
      id: 9,
      title: "Email Verification",
      description: "Confirm your email with verification code",
      imageSrc: "/manufacturer-steps/step-9.png",
      completed: false
    },
    {
      id: 10,
      title: "Account Creation",
      description: "Create your secure account",
      imageSrc: "/manufacturer-steps/step-10.png",
      completed: false
    },
    {
      id: 11,
      title: "Introduce Your Company to Potential Partners",
      description: "Write a short, compelling description that clearly explains what your company does and the products or services you offer",
      imageSrc: "/manufacturer-steps/step-11.png",
      completed: false
    },
    {
      id: 12,
      title: "How can we support your goals?",
      description: "We'd love to know what motivated you to sign up with Wonnda",
      imageSrc: "/manufacturer-steps/step-12.png",
      completed: false
    }
  ];

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return formData.businessEmail &&
               formData.password &&
               passwordRules.every(rule => rule.check);
      case 2:
        return formData.otp.length === 4;
      case 3:
        return formData.firstName && formData.lastName && formData.phone;
      case 4:
        return formData.companyName && formData.address && formData.website;
      case 5:
        return formData.companyType;
      case 6:
        return formData.userRole;
      case 7:
        return formData.teamSize && formData.annualRevenue;
      case 8:
        return formData.offerings.length > 0 && formData.productionTypes.length > 0;
      case 9:
        return formData.productionOutsourcing && formData.manufacturingCountries.length > 0;
      case 10:
        return formData.supportGoals.length > 0;
      case 11:
        return formData.companyDescription.trim().length >= 140;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep === 11 && canContinue()) {
      // Handle form completion
      console.log('Form completed with data:', formData);
      alert('Manufacturer registration completed successfully!');
      // Here you would typically submit the form data to your backend
    } else if (currentStep < steps.length && canContinue()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const currentStepData = steps[currentStep - 1];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
              {/* Business Email */}
              <div className="space-y-2">
                <Label htmlFor="businessEmail" className="text-sm font-medium text-gray-700">
                  Business Email
                </Label>
                <Input
                  id="businessEmail"
                  type="email"
                  placeholder="habibrazak1@gmail.com"
                  value={formData.businessEmail}
                  onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-red-500">
                  Use your business email for full features and faster approval.
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Rules */}
                <div className="space-y-1">
                  {passwordRules.map((rule, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <Check className={`h-3 w-3 ${rule.check ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={rule.check ? 'text-green-600' : 'text-gray-500'}>
                        {rule.rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="text-xs text-gray-500 text-center">
                By proceeding, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>,{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> &{' '}
                <a href="#" className="text-blue-600 hover:underline">Code of Conduct</a>.
              </div>
            </div>
        );
      case 2:
        return (
          <div className="space-y-6">
              {/* Email confirmation text */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  We've sent a 4-digit code to{' '}
                  <span className="font-semibold text-gray-900">{formData.businessEmail}</span>.{' '}
                  This helps us verify your account and keep it secure.
                </p>
              </div>

              {/* OTP Input */}
              <div className="flex justify-center">
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
              </div>

              {/* Resend code */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't get a code?{' '}
                  <button className="text-blue-600 hover:underline">
                    Resend it
                  </button>
                </p>
              </div>
            </div>
        );
      case 3:
        return (
          <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone number <span className="text-red-500">*</span>
                </Label>
                <PhoneInput
                  international
                  defaultCountry="DE"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value || '')}
                  className="w-full"
                  placeholder="+49 1512 3456789"
                />
                <p className="text-xs text-gray-500">
                  Providing your phone number allows buyers to contact you directly
                </p>
              </div>
            </div>
        );
      case 4:
        return (
          <div className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  Company name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Your Company GmbH"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <AddressAutocomplete
                    value={formData.address}
                    onChange={(value) => handleInputChange('address', value)}
                    placeholder="Type your address..."
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                  Website <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
        );
      case 5:
        return (
          <div className="space-y-6">
              {/* Company Type Selection */}
              <div className="grid grid-cols-3 gap-3">
                {/* Top Row */}
                <button
                  type="button"
                  onClick={() => handleInputChange('companyType', 'Distributor')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.companyType === 'Distributor'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Distributor
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('companyType', 'Manufacturer')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.companyType === 'Manufacturer'
                      ? 'border-blue-800 bg-blue-800 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Manufacturer
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('companyType', 'Packaging Supplier')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.companyType === 'Packaging Supplier'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Packaging Supplier
                </button>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('companyType', 'Raw Ingredient Supplier')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.companyType === 'Raw Ingredient Supplier'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Raw Ingredient Supplier
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('companyType', 'Service Provider')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.companyType === 'Service Provider'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Service Provider
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('companyType', 'Sourcing Agency')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.companyType === 'Sourcing Agency'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Sourcing Agency
                </button>
              </div>
            </div>
        );
      case 6:
        return (
          <div className="space-y-6">
              {/* Role Selection */}
              <div className="grid grid-cols-3 gap-3">
                {/* Top Row */}
                <button
                  type="button"
                  onClick={() => handleInputChange('userRole', 'Founder/CEO')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.userRole === 'Founder/CEO'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Founder/CEO
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('userRole', 'Senior-Level Management')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.userRole === 'Senior-Level Management'
                      ? 'border-blue-800 bg-blue-800 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Senior-Level Management
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('userRole', 'Mid-Level Management')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.userRole === 'Mid-Level Management'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Mid-Level Management
                </button>
              </div>

              {/* Middle Row */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('userRole', 'Junior-Level')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.userRole === 'Junior-Level'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Junior-Level
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('userRole', 'Intern')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.userRole === 'Intern'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Intern
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('userRole', 'Sales Manager')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.userRole === 'Sales Manager'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Sales Manager
                </button>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('userRole', 'Export Manager')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.userRole === 'Export Manager'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Export Manager
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('userRole', 'Other')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.userRole === 'Other'
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Other
                </button>
              </div>
            </div>
        );
      case 7:
        return (
          <div className="space-y-8">
              {/* Team Size */}
              <div className="space-y-3">
                <div>
                  <Label className="text-lg font-medium text-gray-900">
                    Team size
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    This helps us to customize your workspace
                  </p>
                </div>
                <Select value={formData.teamSize} onValueChange={(value) => handleInputChange('teamSize', value)}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="11 - 50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1 - 10</SelectItem>
                    <SelectItem value="11-50">11 - 50</SelectItem>
                    <SelectItem value="51-100">51 - 100</SelectItem>
                    <SelectItem value="101-500">101 - 500</SelectItem>
                    <SelectItem value="501-1000">501 - 1000</SelectItem>
                    <SelectItem value="1000+">1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Annual Revenue */}
              <div className="space-y-3">
                <div>
                  <Label className="text-lg font-medium text-gray-900">
                    Annual revenue
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    This helps us to match you with suitable customers.
                  </p>
                </div>
                <Select value={formData.annualRevenue} onValueChange={(value) => handleInputChange('annualRevenue', value)}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="$250,000 - $1 mio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-100k">Under $100,000</SelectItem>
                    <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                    <SelectItem value="250k-1m">$250,000 - $1 mio</SelectItem>
                    <SelectItem value="1m-5m">$1 mio - $5 mio</SelectItem>
                    <SelectItem value="5m-10m">$5 mio - $10 mio</SelectItem>
                    <SelectItem value="10m-50m">$10 mio - $50 mio</SelectItem>
                    <SelectItem value="50m+">$50 mio+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
        );
      case 8:
        return (
          <div className="space-y-8">
              {/* What do you offer? */}
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium text-gray-900">
                    What do you offer?
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Select one or more options that describe what your company offers
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Product Manufacturing', 'Packaging', 'Services', 'Raw Ingredients'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleArrayValue('offerings', option)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        formData.offerings.includes(option)
                          ? option === 'Packaging'
                            ? 'border-blue-800 bg-blue-800 text-white'
                            : 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Which production types do you cover? */}
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium text-gray-900">
                    Which production types do you cover?
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Choose the types of production your company offers
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Wholesale', 'White Label', 'Private Label', 'Custom Development', 'Merchandise'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleArrayValue('productionTypes', option)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        formData.productionTypes.includes(option)
                          ? option === 'Custom Development'
                            ? 'border-blue-800 bg-blue-800 text-white'
                            : 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* What is your minimum order quantity (MOQ)? */}
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium text-gray-900">
                    What is your minimum order quantity (MOQ)?
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Enter the minimum order quantities for each product type
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center space-x-2"
                  onClick={() => {
                    const newMoq = { type: '', quantity: '' };
                    handleInputChange('moqQuantities', [...formData.moqQuantities, newMoq]);
                  }}
                >
                  <span className="text-lg">+</span>
                  <span>Add Quantity</span>
                </Button>

                {formData.moqQuantities.map((moq, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <Input
                      placeholder="Product type"
                      value={moq.type}
                      onChange={(e) => {
                        const newMoqs = [...formData.moqQuantities];
                        newMoqs[index].type = e.target.value;
                        handleInputChange('moqQuantities', newMoqs);
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Minimum quantity"
                      value={moq.quantity}
                      onChange={(e) => {
                        const newMoqs = [...formData.moqQuantities];
                        newMoqs[index].quantity = e.target.value;
                        handleInputChange('moqQuantities', newMoqs);
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newMoqs = formData.moqQuantities.filter((_, i) => i !== index);
                        handleInputChange('moqQuantities', newMoqs);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
        );
      case 9:
        return (
          <div className="space-y-8">
              {/* Do you outsource your production? */}
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium text-gray-900">
                    Do you outsource your production?
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Let us know if you manufacture your products yourself or if you outsource your production
                  </p>
                </div>
                <div className="flex gap-3">
                  {['Inhouse', 'Outsourced'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleInputChange('productionOutsourcing', option)}
                      className={`px-6 py-3 rounded-lg border transition-colors ${
                        formData.productionOutsourcing === option
                          ? option === 'Outsourced'
                            ? 'border-blue-800 bg-blue-800 text-white'
                            : 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Where do you manufacture your products? */}
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium text-gray-900">
                    Where do you manufacture your products?
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    You can select multiple production countries
                  </p>
                </div>

                {/* Search input */}
                <div className="relative">
                  <Input
                    placeholder="Search countries..."
                    value={countrySearchTerm}
                    onChange={(e) => setCountrySearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Selected countries display */}
                {formData.manufacturingCountries.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Selected Countries:</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.manufacturingCountries.map((country) => (
                        <span
                          key={country}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200"
                        >
                          {country}
                          <button
                            type="button"
                            onClick={() => toggleArrayValue('manufacturingCountries', country)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Countries dropdown */}
                <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                  {filteredCountries.slice(0, 20).map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        toggleArrayValue('manufacturingCountries', country);
                        setCountrySearchTerm('');
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                        formData.manufacturingCountries.includes(country)
                          ? 'bg-blue-50 text-blue-800'
                          : 'text-gray-900'
                      }`}
                    >
                      {country}
                      {formData.manufacturingCountries.includes(country) && (
                        <span className="float-right text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-2 text-gray-500 text-center">
                      No countries found
                    </div>
                  )}
                  {filteredCountries.length > 20 && (
                    <div className="px-4 py-2 text-gray-500 text-center text-sm">
                      Showing first 20 results. Continue typing to narrow down...
                    </div>
                  )}
                </div>
              </div>
            </div>
        );
      case 10:
        return (
          <div className="space-y-8">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    How can we support your goals?
                  </h2>
                  <p className="text-gray-600">
                    We'd love to know what motivated you to sign up with Wonnda.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    'Explore Product Trends',
                    'Manage Suppliers',
                    'Finance Inventory',
                    'Streamline Operations',
                    'Get New Customers',
                    'Manage Existing Customers',
                    'Digitize Product Catalog'
                  ].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleArrayValue('supportGoals', goal)}
                      className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                        formData.supportGoals.includes(goal)
                          ? goal === 'Manage Suppliers'
                            ? 'border-blue-800 bg-blue-800 text-white shadow-md'
                            : 'border-blue-800 bg-blue-50 text-blue-800 shadow-md'
                          : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-medium">
                        {goal}
                      </div>
                    </button>
                  ))}
                </div>

                {formData.supportGoals.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      Selected Goals ({formData.supportGoals.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.supportGoals.map((goal) => (
                        <span
                          key={goal}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-white text-blue-800 rounded-full text-sm border border-blue-300"
                        >
                          {goal}
                          <button
                            type="button"
                            onClick={() => toggleArrayValue('supportGoals', goal)}
                            className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
        );
      case 11:
        return (
          <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Introduce Your Company to Potential Partners
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Write a short, compelling description that clearly explains what your company does and the products or services you offer. This information will appear in the supplier directory and help buyers understand your relevance.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      placeholder='E.g. "We are a family-owned manufacturer of natural skincare packaging, offering eco-friendly jars, bottles, and caps made from recycled materials."'
                      value={formData.companyDescription}
                      onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                      className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      maxLength={500}
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className={`${
                      formData.companyDescription.trim().length >= 140
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}>
                      Min. 140 characters ({formData.companyDescription.length}/140)
                    </span>
                    <span className="text-gray-400">
                      Max. 500 characters
                    </span>
                  </div>

                  {formData.companyDescription.trim().length > 0 && formData.companyDescription.trim().length < 140 && (
                    <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                      Please write at least 140 characters to provide a comprehensive description of your company.
                    </p>
                  )}

                  {formData.companyDescription.trim().length >= 140 && (
                    <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                      Great! Your company description meets the minimum requirements.
                    </p>
                  )}
                </div>
              </div>
            </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-800">{currentStep}</span>
              </div>
              <p className="text-gray-500">Step {currentStep} content coming soon</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar integrated at top of card */}
        <div className="bg-white rounded-t-lg">
          <div className="h-2 bg-gray-200 rounded-t-lg overflow-hidden">
            <div
              className="h-full bg-blue-800 transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card Content */}
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">PrivateLabelify</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-gray-600">
              {currentStepData.description}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length || !canContinue()}
              className={`flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                currentStep === 11
                  ? 'bg-gray-500 hover:bg-gray-600 text-white'
                  : 'bg-blue-800 hover:bg-blue-900 text-white'
              }`}
            >
              <span>{currentStep === 11 ? 'Complete' : 'Continue'}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
