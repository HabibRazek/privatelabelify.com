import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

export async function sendVerificationEmailWithGmail(email: string, code: string) {
  try {
    const mailOptions = {
      from: `"PrivateLabelify" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your PrivateLabelify Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">PrivateLabelify</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0;">Your Private Label Manufacturing Platform</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1e40af; margin-bottom: 20px;">Verify Your Email Address</h2>
            
            <p style="margin-bottom: 30px;">Thank you for signing up with PrivateLabelify! To complete your registration, please use the verification code below:</p>
            
            <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">Your verification code is:</p>
              <div style="font-size: 36px; font-weight: bold; color: #1e40af; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${code}
              </div>
            </div>
            
            <p style="margin: 30px 0 20px 0;">This code will expire in <strong>10 minutes</strong> for security reasons.</p>
            
            <p style="margin-bottom: 30px;">If you didn't request this verification code, please ignore this email or contact our support team.</p>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 30px; margin-top: 40px;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Best regards,<br>
                The PrivateLabelify Team
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              This email was sent to ${email}. If you have any questions, please contact us at support@privatelabelify.com
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        PrivateLabelify - Email Verification
        
        Thank you for signing up with PrivateLabelify!
        
        Your verification code is: ${code}
        
        This code will expire in 10 minutes.
        
        If you didn't request this verification code, please ignore this email.
        
        Best regards,
        The PrivateLabelify Team
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Gmail email service error:', error);
    return { success: false, error: 'Failed to send email via Gmail' };
  }
}
