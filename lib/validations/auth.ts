import { z } from 'zod';

// Password validation schema
export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must include an uppercase letter (A-Z)')
  .regex(/[0-9]/, 'Password must include a number (0-9)')
  .regex(/[!@#$%^&*]/, 'Password must include a special character (!@#$%^&*)');

// Email validation schema
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

// Phone validation schema
export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number');

// OTP validation schema
export const otpSchema = z
  .string()
  .length(4, 'OTP must be exactly 4 digits')
  .regex(/^\d{4}$/, 'OTP must contain only numbers');

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// Step 1: Email and Password
export const step1Schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Step 2: OTP Verification
export const step2Schema = z.object({
  email: emailSchema,
  otp: otpSchema,
});

// Step 3: Personal Information
export const step3Schema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  phone: phoneSchema,
  phoneCountryCode: z.string().min(1, 'Country code is required'),
});

// Step 4: Company Information
export const step4Schema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(100, 'Company name is too long'),
  address: z.string().min(1, 'Address is required').max(200, 'Address is too long'),
  companyType: z.enum([
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
  ], { required_error: 'Please select a company type' }),
  annualRevenue: z.enum([
    'Under $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M - $5M',
    '$5M - $10M',
    '$10M - $50M',
    '$50M+',
    'Prefer not to say'
  ], { required_error: 'Please select an annual revenue range' }),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

// Step 5: Business Goals
export const step5Schema = z.object({
  businessGoals: z.array(z.enum([
    'Find suppliers',
    'Source products',
    'Source packaging',
    'Source raw materials',
    'Manage suppliers',
    'Finance inventory',
    'Streamline sourcing'
  ])).min(1, 'Please select at least one business goal'),
});

// Step 6: Product Launch Experience
export const step6Schema = z.object({
  hasLaunchedProduct: z.boolean({ required_error: 'Please select an option' }),
});

// Step 7: Interested Categories
export const step7Schema = z.object({
  interestedCategories: z.array(z.enum([
    'Beauty & Personal Care',
    'Fashion',
    'Food & Beverages',
    'Health & Supplements',
    'Home & Living',
    'Pet Supplies',
    'Packaging'
  ])).min(1, 'Please select at least one category'),
});

// Step 8: Product Description and Preferences
export const step8Schema = z.object({
  productDescription: z.string().min(10, 'Please provide a more detailed description (at least 10 characters)').max(1000, 'Description is too long'),
  autoCreateRequest: z.boolean().default(true),
  getDirectIntroductions: z.boolean().default(true),
});

// Complete retailer signup schema
export const retailerSignupSchema = step1Schema
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .merge(step8Schema);

// Email verification request schema
export const emailVerificationRequestSchema = z.object({
  email: emailSchema,
});

// Email verification confirm schema
export const emailVerificationConfirmSchema = z.object({
  email: emailSchema,
  code: otpSchema,
});

// User creation schema for database
export const createUserSchema = z.object({
  email: emailSchema,
  password: z.string(), // Already validated by passwordSchema
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  phoneCountryCode: z.string(),
  role: z.enum(['retailer', 'supplier']).default('retailer'),
});

// Retailer creation schema for database
export const createRetailerSchema = z.object({
  userId: z.string().uuid(),
  companyName: z.string(),
  address: z.string(),
  companyType: z.string(),
  annualRevenue: z.string(),
  website: z.string().optional(),
  businessGoals: z.array(z.string()),
  hasLaunchedProduct: z.boolean(),
  interestedCategories: z.array(z.string()),
  productDescription: z.string(),
  autoCreateRequest: z.boolean().default(true),
  getDirectIntroductions: z.boolean().default(true),
});

// Supplier validation schemas
export const supplierStep5Schema = z.object({
  companyType: z.enum(['Distributor', 'Manufacturer', 'Packaging Supplier', 'Raw Ingredient Supplier', 'Service Provider', 'Sourcing Agency']),
});

export const supplierStep6Schema = z.object({
  userRole: z.enum(['Founder/CEO', 'Senior-Level Management', 'Mid-Level Management', 'Junior-Level', 'Intern', 'Sales Manager', 'Export Manager', 'Other']),
});

export const supplierStep7Schema = z.object({
  teamSize: z.enum(['1-10', '11-50', '51-100', '101-500', '501-1000', '1000+']),
  annualRevenue: z.enum(['under-100k', '100k-250k', '250k-1m', '1m-5m', '5m-10m', '10m-50m', '50m+']),
});

export const supplierStep8Schema = z.object({
  offerings: z.array(z.string()).min(1, 'Please select at least one offering'),
  productionTypes: z.array(z.string()).min(1, 'Please select at least one production type'),
  moqQuantities: z.array(z.object({
    type: z.string(),
    quantity: z.string(),
  })),
});

export const supplierStep9Schema = z.object({
  productionOutsourcing: z.enum(['Inhouse', 'Outsourced']),
  manufacturingCountries: z.array(z.string()).min(1, 'Please select at least one manufacturing country'),
});

export const supplierStep10Schema = z.object({
  supportGoals: z.array(z.string()).min(1, 'Please select at least one support goal'),
});

export const supplierStep11Schema = z.object({
  companyDescription: z.string().min(140, 'Company description must be at least 140 characters').max(500, 'Company description must not exceed 500 characters'),
});

// Complete supplier signup schema
export const supplierSignupSchema = z.object({
  // Steps 1-4 use the same schemas as retailer
  email: emailSchema,
  password: passwordSchema,
  otp: otpSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: phoneSchema,
  phoneCountryCode: z.string(),
  companyName: z.string().min(1, 'Company name is required'),
  address: z.string().min(1, 'Address is required'),
  website: z.string().url('Please enter a valid website URL'),

  // Supplier-specific fields
  companyType: supplierStep5Schema.shape.companyType,
  userRole: supplierStep6Schema.shape.userRole,
  teamSize: supplierStep7Schema.shape.teamSize,
  annualRevenue: supplierStep7Schema.shape.annualRevenue,
  offerings: supplierStep8Schema.shape.offerings,
  productionTypes: supplierStep8Schema.shape.productionTypes,
  moqQuantities: supplierStep8Schema.shape.moqQuantities,
  productionOutsourcing: supplierStep9Schema.shape.productionOutsourcing,
  manufacturingCountries: supplierStep9Schema.shape.manufacturingCountries,
  supportGoals: supplierStep10Schema.shape.supportGoals,
  companyDescription: supplierStep11Schema.shape.companyDescription,
});

// Supplier creation schema for database
export const createSupplierSchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  phoneCountryCode: z.string(),
  companyName: z.string(),
  address: z.string(),
  website: z.string(),
  companyType: z.string(),
  userRole: z.string(),
  teamSize: z.string(),
  annualRevenue: z.string(),
  offerings: z.array(z.string()),
  productionTypes: z.array(z.string()),
  moqQuantities: z.array(z.object({
    type: z.string(),
    quantity: z.string(),
  })),
  productionOutsourcing: z.string(),
  manufacturingCountries: z.array(z.string()),
  supportGoals: z.array(z.string()),
  companyDescription: z.string(),
});

// API response schemas
export const apiSuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
});

export const apiErrorSchema = z.object({
  success: z.boolean().default(false),
  error: z.string(),
  details: z.any().optional(),
});

// Type exports
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;
export type Step6Data = z.infer<typeof step6Schema>;
export type Step7Data = z.infer<typeof step7Schema>;
export type Step8Data = z.infer<typeof step8Schema>;
export type RetailerSignupData = z.infer<typeof retailerSignupSchema>;
export type SupplierSignupData = z.infer<typeof supplierSignupSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type CreateUserData = z.infer<typeof createUserSchema>;
export type CreateRetailerData = z.infer<typeof createRetailerSchema>;
export type CreateSupplierData = z.infer<typeof createSupplierSchema>;
export type ApiSuccess = z.infer<typeof apiSuccessSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;

// Supplier step type exports
export type SupplierStep5Data = z.infer<typeof supplierStep5Schema>;
export type SupplierStep6Data = z.infer<typeof supplierStep6Schema>;
export type SupplierStep7Data = z.infer<typeof supplierStep7Schema>;
export type SupplierStep8Data = z.infer<typeof supplierStep8Schema>;
export type SupplierStep9Data = z.infer<typeof supplierStep9Schema>;
export type SupplierStep10Data = z.infer<typeof supplierStep10Schema>;
export type SupplierStep11Data = z.infer<typeof supplierStep11Schema>;
