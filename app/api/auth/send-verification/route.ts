import { NextRequest, NextResponse } from 'next/server';
import { sendEmailVerificationCode } from '@/lib/actions/auth';
import { emailVerificationRequestSchema } from '@/lib/validations/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedFields = emailVerificationRequestSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = validatedFields.data;
    
    // Send verification code
    const result = await sendEmailVerificationCode(email);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in send-verification API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
