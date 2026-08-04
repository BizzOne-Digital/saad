import nodemailer, { type Transporter } from 'nodemailer';

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceAddress: string;
  city: string;
  postalCode: string;
  serviceRequired: string;
  propertyType: string;
  preferredContact: string;
  preferredDate?: string;
  urgency: string;
  message: string;
}

function getSmtpConfig() {
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  // Port 465 = SSL; 587 = STARTTLS. Vercel/serverless works most reliably on 465.
  const secure =
    process.env.SMTP_SECURE === 'true' ||
    process.env.SMTP_SECURE === '1' ||
    port === 465;

  const user = (process.env.SMTP_USER || '').trim();
  // Google App Passwords are often copied with spaces — strip them
  const pass = (process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');

  return { host, port, secure, user, pass };
}

export function isSmtpConfigured(): boolean {
  const { user, pass } = getSmtpConfig();
  return Boolean(user && pass);
}

export function getLeadNotificationEmail(): string {
  return (
    process.env.LEAD_NOTIFICATION_EMAIL ||
    process.env.BUSINESS_EMAIL ||
    'info@sorogaragedoors.ca'
  ).trim();
}

export function getSmtpFromAddress(): string {
  const { user } = getSmtpConfig();
  // Prefer SMTP_FROM; fall back to authenticated mailbox
  return (process.env.SMTP_FROM || user || 'info@sorogaragedoors.ca').trim();
}

function createTransporter(): Transporter {
  const { host, port, secure, user, pass } = getSmtpConfig();

  if (!user || !pass) {
    throw new Error(
      'SMTP is not configured. Set SMTP_USER and SMTP_PASSWORD in environment variables.'
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // Critical for Vercel serverless — avoid hanging connections
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
    tls: {
      // Required for many hosts on port 587
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
    // Helps with some Gmail / provider edge cases
    requireTLS: !secure && port === 587,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Verify SMTP credentials without sending mail (useful for /api/test-email). */
export async function verifySmtpConnection(): Promise<{
  success: boolean;
  message: string;
  config: Record<string, string | number | boolean>;
}> {
  const { host, port, secure, user } = getSmtpConfig();
  const config = {
    host,
    port,
    secure,
    user: user ? `${user.slice(0, 3)}***` : '(missing)',
    passwordSet: Boolean(getSmtpConfig().pass),
    from: getSmtpFromAddress(),
    notifyTo: getLeadNotificationEmail(),
  };

  if (!isSmtpConfigured()) {
    return {
      success: false,
      message: 'SMTP_USER or SMTP_PASSWORD is missing',
      config,
    };
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();
    return {
      success: true,
      message: 'SMTP connection verified successfully',
      config,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown SMTP error';
    return {
      success: false,
      message: `SMTP verification failed: ${message}`,
      config,
    };
  }
}

const urgencyLabels: Record<string, string> = {
  routine: 'Routine (No rush)',
  urgent: 'Urgent (Within a few days)',
  emergency: 'Emergency (Same day)',
};

const serviceLabels: Record<string, string> = {
  installation: 'New Garage Door Installation',
  replacement: 'Garage Door Replacement',
  repair: 'Garage Door Repair',
  spring: 'Spring Replacement',
  opener: 'Opener Installation/Repair',
  maintenance: 'Maintenance/Tune-Up',
  emergency: 'Emergency Service',
  other: 'Other',
};

/** Send lead notification to the business inbox */
export async function sendContactFormEmail(data: ContactFormData) {
  const transporter = createTransporter();
  const to = getLeadNotificationEmail();
  const fromAddress = getSmtpFromAddress();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #F58220; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #F58220; margin-bottom: 5px; }
        .value { color: #333; }
        .urgency-emergency { color: #dc2626; font-weight: bold; }
        .urgency-urgent { color: #ea580c; font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">New Service Request</h1>
          <p style="margin: 10px 0 0 0;">Soro Garage Door Services</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Customer Name</div>
            <div class="value">${escapeHtml(data.fullName)}</div>
          </div>
          <div class="field">
            <div class="label">Phone Number</div>
            <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
          </div>
          <div class="field">
            <div class="label">Service Address</div>
            <div class="value">
              ${escapeHtml(data.serviceAddress)}<br>
              ${escapeHtml(data.city)}, ${escapeHtml(data.postalCode)}
            </div>
          </div>
          <div class="field">
            <div class="label">Service Required</div>
            <div class="value">${escapeHtml(serviceLabels[data.serviceRequired] || data.serviceRequired)}</div>
          </div>
          <div class="field">
            <div class="label">Property Type</div>
            <div class="value">${data.propertyType === 'residential' ? 'Residential' : 'Commercial'}</div>
          </div>
          <div class="field">
            <div class="label">Urgency Level</div>
            <div class="value ${data.urgency === 'emergency' ? 'urgency-emergency' : data.urgency === 'urgent' ? 'urgency-urgent' : ''}">
              ${escapeHtml(urgencyLabels[data.urgency] || data.urgency)}
            </div>
          </div>
          <div class="field">
            <div class="label">Preferred Contact Method</div>
            <div class="value">${data.preferredContact === 'phone' ? 'Phone' : data.preferredContact === 'email' ? 'Email' : 'Text Message'}</div>
          </div>
          ${
            data.message
              ? `<div class="field">
                  <div class="label">Additional Details</div>
                  <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
                </div>`
              : ''
          }
          <div class="footer">
            <p>This email was sent from the contact form on sorogaragedoors.ca</p>
            <p>Submission Time: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
New Service Request - Soro Garage Door Services

Customer Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}

Service Address:
${data.serviceAddress}
${data.city}, ${data.postalCode}

Service Required: ${serviceLabels[data.serviceRequired] || data.serviceRequired}
Property Type: ${data.propertyType === 'residential' ? 'Residential' : 'Commercial'}
Urgency: ${urgencyLabels[data.urgency] || data.urgency}
Preferred Contact: ${data.preferredContact === 'phone' ? 'Phone' : data.preferredContact === 'email' ? 'Email' : 'Text Message'}

${data.message ? `Additional Details:\n${data.message}` : ''}

---
Submission Time: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}
  `.trim();

  const info = await transporter.sendMail({
    from: `"Soro Garage Doors Website" <${fromAddress}>`,
    to,
    replyTo: data.email,
    subject: `${data.urgency === 'emergency' ? '[EMERGENCY] ' : ''}New Service Request - ${data.fullName}`,
    text: textContent,
    html: htmlContent,
  });

  console.log('Lead notification email sent:', {
    messageId: info.messageId,
    to,
    accepted: info.accepted,
    rejected: info.rejected,
  });

  return { success: true, messageId: info.messageId, to };
}

/** Send confirmation email to the customer */
export async function sendCustomerConfirmationEmail(
  customerEmail: string,
  customerName: string
) {
  try {
    const transporter = createTransporter();
    const fromAddress = getSmtpFromAddress();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
          .header { background-color: #F58220; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .contact-box { background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Thank You!</h1>
            <p style="margin: 10px 0 0 0;">Your request has been received</p>
          </div>
          <div class="content">
            <p>Hi ${escapeHtml(customerName)},</p>
            <p>Thank you for contacting Soro Garage Door Services. We've received your service request and will review it shortly.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>We'll review your request within the next 24 hours</li>
              <li>A member of our team will contact you using your preferred method</li>
              <li>We'll discuss your needs and schedule a convenient time for service</li>
            </ul>
            <div class="contact-box">
              <p style="margin: 0 0 10px 0;"><strong>Need immediate assistance?</strong></p>
              <p style="margin: 0;">Call or text us: <a href="tel:+16472990283" style="color: #F58220; font-weight: bold;">647-299-0283</a></p>
              <p style="margin: 5px 0 0 0;">Email: <a href="mailto:info@sorogaragedoors.ca" style="color: #F58220;">info@sorogaragedoors.ca</a></p>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Available Mon-Sun: 8:00 AM - 8:00 PM</p>
            </div>
            <p>We look forward to serving you!</p>
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>Soro Garage Door Services Team</strong><br>
              Greater Toronto Area, Ontario
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"Soro Garage Door Services" <${fromAddress}>`,
      to: customerEmail,
      subject: 'Thank You for Contacting Soro Garage Door Services',
      html: htmlContent,
      text: `Hi ${customerName},\n\nThank you for contacting Soro Garage Door Services. We've received your request and will contact you soon.\n\nNeed help now? Call or text 647-299-0283.\n\n— Soro Garage Door Services`,
    });

    console.log('Customer confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
