import { NextRequest, NextResponse } from 'next/server';
import { createRetailerAccount } from '@/lib/actions/auth';
import { retailerSignupSchema } from '@/lib/validations/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedFields = retailerSignupSchema.safeParse(body);
    if (!validatedFields.success) {
      console.error('Validation error:', validatedFields.error.flatten());
      console.error('Request body:', JSON.stringify(body, null, 2));
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = validatedFields.data;
    
    // Create retailer account
    const result = await createRetailerAccount(validatedData);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    // Return success - client will handle sign in with NextAuth
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: {
        ...result.data,
        shouldRedirect: true,
        redirectUrl: '/dashboard/retailer'
      },
    });
  } catch (error) {
    console.error('Error in signup-retailer API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
