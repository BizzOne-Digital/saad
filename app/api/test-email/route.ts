import { NextResponse } from 'next/server';
import {
  isSmtpConfigured,
  verifySmtpConnection,
  sendContactFormEmail,
  getLeadNotificationEmail,
} from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * GET /api/test-email
 * 1) Verifies SMTP connection
 * 2) Sends a test lead notification email
 *
 * Optional query: ?send=false  → only verify, do not send
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sendMail = searchParams.get('send') !== 'false';

  if (!isSmtpConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message:
          'SMTP not configured. Add Google Workspace SMTP vars for info@sorogaragedoors.ca, then redeploy.',
        checklist: [
          'SMTP_HOST=smtp.gmail.com',
          'SMTP_PORT=465',
          'SMTP_SECURE=true',
          'SMTP_USER=info@sorogaragedoors.ca',
          'SMTP_PASSWORD=your-16-char-google-app-password (no spaces)',
          'SMTP_FROM=info@sorogaragedoors.ca',
          'LEAD_NOTIFICATION_EMAIL=info@sorogaragedoors.ca',
        ],
      },
      { status: 503 }
    );
  }

  const verification = await verifySmtpConnection();

  if (!verification.success) {
    return NextResponse.json(
      {
        success: false,
        step: 'verify',
        message: verification.message,
        config: verification.config,
        tips: [
          'Squarespace email = Google Workspace. Use smtp.gmail.com + an App Password.',
          'App Password: https://myaccount.google.com/apppasswords (signed in as info@…).',
          'On Vercel, prefer SMTP_PORT=465 and SMTP_SECURE=true (port 587 often times out).',
          'SMTP_FROM should be info@sorogaragedoors.ca (same as SMTP_USER).',
          'After changing env vars on Vercel, you must Redeploy.',
        ],
      },
      { status: 500 }
    );
  }

  if (!sendMail) {
    return NextResponse.json({
      success: true,
      step: 'verify',
      message: 'SMTP connection OK. Add ?send=true (default) to also send a test email.',
      config: verification.config,
      notifyTo: getLeadNotificationEmail(),
    });
  }

  try {
    const result = await sendContactFormEmail({
      fullName: 'SMTP Test',
      phone: '647-299-0283',
      email: getLeadNotificationEmail(),
      serviceAddress: 'Test Address',
      city: 'Toronto',
      postalCode: 'M5V 1A1',
      serviceRequired: 'repair',
      propertyType: 'residential',
      preferredContact: 'email',
      urgency: 'routine',
      message:
        'This is a test email from /api/test-email. If you received this, production SMTP is working.',
    });

    return NextResponse.json({
      success: true,
      step: 'send',
      message: `Test email sent successfully to ${result.to}`,
      messageId: result.messageId,
      config: verification.config,
    });
  } catch (error) {
    console.error('Test email send error:', error);
    return NextResponse.json(
      {
        success: false,
        step: 'send',
        message: 'SMTP verified, but sending failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        config: verification.config,
      },
      { status: 500 }
    );
  }
}
