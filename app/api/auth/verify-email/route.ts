import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailCode } from '@/lib/actions/auth';
import { emailVerificationConfirmSchema } from '@/lib/validations/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedFields = emailVerificationConfirmSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or verification code',
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, code } = validatedFields.data;
    
    // Verify email code
    const result = await verifyEmailCode(email, code);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in verify-email API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
