import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/email';

export async function GET() {
  try {
    console.log('Testing email with API key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');

    // Test sending email with a test code to your email
    const result = await sendVerificationEmail('habibrazeg23@gmail.com', '1234');

    console.log('Email test result:', result);

    return NextResponse.json({
      ...result,
      apiKeyPresent: !!process.env.RESEND_API_KEY,
      apiKeyLength: process.env.RESEND_API_KEY?.length || 0
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to send test email',
        apiKeyPresent: !!process.env.RESEND_API_KEY
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Test sending email with a test code
    const result = await sendVerificationEmail(email, '1234');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}
