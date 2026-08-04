import { NextRequest, NextResponse } from 'next/server';
import {
  sendContactFormEmail,
  sendCustomerConfirmationEmail,
  isSmtpConfigured,
} from '@/lib/email';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Allow enough time for SMTP on cold starts (Vercel Pro / compatible hosts)
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = [
      'fullName',
      'phone',
      'email',
      'serviceAddress',
      'city',
      'postalCode',
      'serviceRequired',
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    // Honeypot — bots fill hidden fields
    if (body.website || body.companyUrl) {
      return NextResponse.json({
        success: true,
        message: 'Request received successfully.',
      });
    }

    let leadId: string | null = null;

    // Save lead first so we never lose a submission if email fails
    try {
      await connectDB();

      const lead = new Lead({
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        serviceAddress: body.serviceAddress,
        city: body.city,
        postalCode: body.postalCode,
        serviceRequired: body.serviceRequired,
        propertyType: body.propertyType || 'residential',
        preferredContact: body.preferredContact || 'phone',
        preferredDate: body.preferredDate || null,
        urgency: body.urgency || 'routine',
        message: body.message || '',
        status: 'new',
        source: 'website',
      });

      await lead.save();
      leadId = String(lead._id);
      console.log('Lead saved to database:', leadId);
    } catch (dbError) {
      console.error('Database error (non-critical):', dbError);
    }

    if (!isSmtpConfigured()) {
      console.warn(
        'SMTP not configured. Lead saved, but no email was sent. Set SMTP_USER and SMTP_PASSWORD.'
      );
      return NextResponse.json({
        success: true,
        message:
          'Request received successfully. Our team will contact you soon.',
        emailSent: false,
        leadId,
      });
    }

    let emailSent = false;
    let emailError: string | undefined;

    try {
      // Await business notification — must finish before serverless function ends
      await sendContactFormEmail({
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        serviceAddress: body.serviceAddress,
        city: body.city,
        postalCode: body.postalCode,
        serviceRequired: body.serviceRequired,
        propertyType: body.propertyType || 'residential',
        preferredContact: body.preferredContact || 'phone',
        preferredDate: body.preferredDate,
        urgency: body.urgency || 'routine',
        message: body.message || '',
      });
      emailSent = true;

      // Also await confirmation so Vercel does not kill the request early
      const confirmation = await sendCustomerConfirmationEmail(
        body.email,
        body.fullName
      );
      if (!confirmation.success) {
        console.warn('Customer confirmation failed (lead email OK):', confirmation.error);
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : 'Unknown email error';
      console.error('Email error (lead still saved):', emailError);
    }

    return NextResponse.json({
      success: true,
      message:
        'Request received successfully. We will contact you within 24 hours.',
      emailSent,
      leadId,
      ...(emailError && !emailSent ? { emailError } : {}),
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          'Failed to process request. Please try again or call us directly at 647-299-0283.',
      },
      { status: 500 }
    );
  }
}
