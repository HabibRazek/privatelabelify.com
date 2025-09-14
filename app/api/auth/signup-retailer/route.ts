import { NextRequest, NextResponse } from 'next/server';
import { createRetailerAccount, signInUser } from '@/lib/actions/auth';
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

    // Automatically sign in the user
    const signInResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/api/auth/signin-after-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: validatedData.email,
        password: validatedData.password
      })
    });

    if (signInResponse.ok) {
      const signInData = await signInResponse.json();

      // Create response with redirect
      const response = NextResponse.json({
        success: true,
        message: 'Account created and signed in successfully',
        data: {
          ...result.data,
          shouldRedirect: true,
          redirectUrl: '/dashboard/retailer'
        },
      });

      // Copy session cookie from signin response
      const sessionCookie = signInResponse.headers.get('set-cookie');
      if (sessionCookie) {
        response.headers.set('set-cookie', sessionCookie);
      }

      return response;
    } else {
      // Account was created but sign in failed
      return NextResponse.json({
        success: true,
        message: 'Account created successfully, but automatic sign-in failed. Please sign in manually.',
        data: result.data,
      });
    }
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
