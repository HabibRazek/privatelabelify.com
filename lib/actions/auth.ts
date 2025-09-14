'use server';

import { db } from '@/lib/db';
import { users, retailers, suppliers, emailVerificationCodes } from '@/lib/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import {
  emailVerificationRequestSchema,
  emailVerificationConfirmSchema,
  retailerSignupSchema,
  supplierSignupSchema,
  type RetailerSignupData,
  type SupplierSignupData,
  type ApiSuccess,
  type ApiError
} from '@/lib/validations/auth';

import { sendVerificationEmail } from '@/lib/email';

// Generate random 4-digit OTP
function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send email verification code
export async function sendEmailVerificationCode(email: string): Promise<ApiSuccess | ApiError> {
  try {
    // Validate email
    const validatedFields = emailVerificationRequestSchema.safeParse({ email });
    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid email address',
        details: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Check if user already exists (only select email to avoid schema issues)
    const existingUser = await db.select({ email: users.email }).from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      return {
        success: false,
        error: 'An account with this email already exists',
      };
    }

    // Generate OTP
    const code = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing codes for this email
    await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.email, email));

    // Insert new verification code
    await db.insert(emailVerificationCodes).values({
      email,
      code,
      expires,
    });

    // Send email with OTP
    const emailResult = await sendVerificationEmail(email, code);

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      return {
        success: false,
        error: emailResult.error || 'Failed to send verification email',
      };
    }

    console.log(`OTP sent to ${email}: ${code}`);

    return {
      success: true,
      message: 'Verification code sent successfully',
      // Include OTP for development/testing (remove in production)
      otp: process.env.NODE_ENV === 'development' ? code : undefined,
    };
  } catch (error) {
    console.error('Error sending verification code:', error);
    return {
      success: false,
      error: 'Failed to send verification code',
    };
  }
}

// Verify email verification code
export async function verifyEmailCode(email: string, code: string): Promise<ApiSuccess | ApiError> {
  try {
    // Validate input
    const validatedFields = emailVerificationConfirmSchema.safeParse({ email, code });
    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid email or code',
        details: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Find valid verification code
    const verificationRecord = await db
      .select()
      .from(emailVerificationCodes)
      .where(
        and(
          eq(emailVerificationCodes.email, email),
          eq(emailVerificationCodes.code, code),
          eq(emailVerificationCodes.verified, false),
          gt(emailVerificationCodes.expires, new Date())
        )
      )
      .limit(1);

    if (verificationRecord.length === 0) {
      return {
        success: false,
        error: 'Invalid or expired verification code',
      };
    }

    // Mark code as verified
    await db
      .update(emailVerificationCodes)
      .set({ verified: true })
      .where(eq(emailVerificationCodes.id, verificationRecord[0].id));

    return {
      success: true,
      message: 'Email verified successfully',
    };
  } catch (error) {
    console.error('Error verifying email code:', error);
    return {
      success: false,
      error: 'Failed to verify email code',
    };
  }
}

// Create retailer account
export async function createRetailerAccount(data: RetailerSignupData): Promise<ApiSuccess | ApiError> {
  try {
    // Validate all data
    const validatedFields = retailerSignupSchema.safeParse(data);
    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid form data',
        details: validatedFields.error.flatten().fieldErrors,
      };
    }

    const validatedData = validatedFields.data;

    // Check if email is verified
    const verificationRecord = await db
      .select()
      .from(emailVerificationCodes)
      .where(
        and(
          eq(emailVerificationCodes.email, validatedData.email),
          eq(emailVerificationCodes.verified, true)
        )
      )
      .limit(1);

    if (verificationRecord.length === 0) {
      return {
        success: false,
        error: 'Email not verified. Please verify your email first.',
      };
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1);
    if (existingUser.length > 0) {
      return {
        success: false,
        error: 'An account with this email already exists',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user first
    const newUser = await db.insert(users).values({
      email: validatedData.email,
      password: hashedPassword,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phone: validatedData.phone,
      phoneCountryCode: validatedData.phoneCountryCode,
      role: 'retailer',
      emailVerified: new Date(),
    }).returning();

    if (newUser.length === 0) {
      throw new Error('Failed to create user');
    }

    // Create retailer profile with all stepper data
    const newRetailer = await db.insert(retailers).values({
      userId: newUser[0].id,

      // Step 3: Personal Information (also stored in retailers for completeness)
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phone: validatedData.phone,
      phoneCountryCode: validatedData.phoneCountryCode,

      // Step 4: Company Information
      companyName: validatedData.companyName,
      address: validatedData.address,
      companyType: validatedData.companyType,
      annualRevenue: validatedData.annualRevenue,
      website: validatedData.website || null,

      // Step 5: Business Goals
      businessGoals: validatedData.businessGoals,

      // Step 6: Product Experience
      hasLaunchedProduct: validatedData.hasLaunchedProduct,

      // Step 7: Category Interests
      interestedCategories: validatedData.interestedCategories,

      // Step 8: Product Description & Preferences
      productDescription: validatedData.productDescription,
      autoCreateRequest: validatedData.autoCreateRequest,
      getDirectIntroductions: validatedData.getDirectIntroductions,
    }).returning();

    const result = { user: newUser[0], retailer: newRetailer[0] };

    // Clean up verification codes
    await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.email, validatedData.email));

    return {
      success: true,
      message: 'Account created successfully',
      data: { userId: result.user.id },
    };
  } catch (error) {
    console.error('Error creating retailer account:', error);
    return {
      success: false,
      error: 'Failed to create account',
    };
  }
}



// Resend verification code
export async function resendVerificationCode(email: string): Promise<ApiSuccess | ApiError> {
  return sendEmailVerificationCode(email);
}

// Create supplier account with all stepper data
export async function createSupplierAccount(data: SupplierSignupData): Promise<ApiSuccess | ApiError> {
  try {
    // Validate all data
    const validatedData = supplierSignupSchema.parse(data);

    // Check if email is verified
    const verificationRecord = await db
      .select()
      .from(emailVerificationCodes)
      .where(
        and(
          eq(emailVerificationCodes.email, validatedData.email),
          eq(emailVerificationCodes.verified, true),
          gt(emailVerificationCodes.expires, new Date())
        )
      )
      .limit(1);

    if (verificationRecord.length === 0) {
      return {
        success: false,
        error: 'Email not verified or verification expired',
      };
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1);
    if (existingUser.length > 0) {
      return {
        success: false,
        error: 'An account with this email already exists',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user with supplier role
    const newUser = await db.insert(users).values({
      email: validatedData.email,
      password: hashedPassword,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phone: validatedData.phone,
      phoneCountryCode: validatedData.phoneCountryCode,
      role: 'supplier',
      emailVerified: new Date(),
    }).returning();

    if (!newUser || newUser.length === 0) {
      throw new Error('Failed to create user');
    }

    // Create supplier profile with all stepper data
    const newSupplier = await db.insert(suppliers).values({
      userId: newUser[0].id,

      // Step 3: Personal Information
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phone: validatedData.phone,
      phoneCountryCode: validatedData.phoneCountryCode,

      // Step 4: Company Information
      companyName: validatedData.companyName,
      address: validatedData.address,
      website: validatedData.website,

      // Step 5: Company Type
      companyType: validatedData.companyType,

      // Step 6: User Role
      userRole: validatedData.userRole,

      // Step 7: Company Details
      teamSize: validatedData.teamSize,
      annualRevenue: validatedData.annualRevenue,

      // Step 8: Offerings and Production
      offerings: validatedData.offerings,
      productionTypes: validatedData.productionTypes,
      moqQuantities: validatedData.moqQuantities,

      // Step 9: Production Facilities
      productionOutsourcing: validatedData.productionOutsourcing,
      manufacturingCountries: validatedData.manufacturingCountries,

      // Step 10: Support Goals
      supportGoals: validatedData.supportGoals,

      // Step 11: Company Description
      companyDescription: validatedData.companyDescription,
    }).returning();

    const result = { user: newUser[0], supplier: newSupplier[0] };

    // Clean up verification codes
    await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.email, validatedData.email));

    return {
      success: true,
      message: 'Supplier account created successfully',
      data: { userId: result.user.id },
    };
  } catch (error) {
    console.error('Error creating supplier account:', error);
    return {
      success: false,
      error: 'Failed to create supplier account',
    };
  }
}
