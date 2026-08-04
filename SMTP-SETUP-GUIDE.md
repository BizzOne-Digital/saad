# SMTP Email Setup Guide

This guide will help you configure email functionality for the contact form on your Soro Garage Door Services website.

## Overview

When a customer submits the contact form on your website, the system will:
1. Save the lead to your MongoDB database
2. Send you an email notification with all the details
3. Send the customer a confirmation email

## Gmail SMTP Setup (Recommended)

### Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/security
2. Find "2-Step Verification" under "How you sign in to Google"
3. Click on "2-Step Verification" and follow the steps to enable it
4. You'll need your phone to complete this process

### Step 2: Create App Password

1. After enabling 2-Step Verification, go to: https://myaccount.google.com/apppasswords
2. You might need to sign in again
3. Under "Select app", choose "Mail"
4. Under "Select device", choose "Windows Computer" or "Other (Custom name)"
5. Click "Generate"
6. Google will display a 16-character password (like: `abcd efgh ijkl mnop`)
7. **IMPORTANT**: Copy this password immediately - you won't see it again!

### Step 3: Update Your .env File

1. Open the `.env` file in your project root
2. Find the SMTP section
3. Update `SMTP_PASSWORD` with your 16-character App Password (remove the spaces)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sorogaragedoors@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
BUSINESS_EMAIL=sorogaragedoors@gmail.com
```

### Step 4: Test the Configuration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to: http://localhost:3000/contact

3. Fill out and submit the contact form

4. Check your email inbox (sorogaragedoors@gmail.com) for:
   - A notification email with the form submission details
   - The customer should also receive a confirmation email

## Alternative: Other Email Providers

### Using Office 365 / Outlook

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
BUSINESS_EMAIL=your-email@outlook.com
```

### Using Custom Domain Email (e.g., sorogaragedoors.ca)

Contact your domain/hosting provider for SMTP settings. Common examples:

**GoDaddy:**
```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_USER=your-email@sorogaragedoors.ca
SMTP_PASSWORD=your-password
BUSINESS_EMAIL=your-email@sorogaragedoors.ca
```

**Bluehost:**
```env
SMTP_HOST=mail.sorogaragedoors.ca
SMTP_PORT=587
SMTP_USER=your-email@sorogaragedoors.ca
SMTP_PASSWORD=your-password
BUSINESS_EMAIL=your-email@sorogaragedoors.ca
```

## Email Templates

### Business Notification Email

When a customer submits the form, you'll receive an email with:
- Customer name, phone, and email
- Service address and postal code
- Service required
- Property type (Residential/Commercial)
- Urgency level (highlighted for emergencies)
- Preferred contact method
- Additional details from the customer

### Customer Confirmation Email

The customer automatically receives a confirmation email with:
- Thank you message
- What to expect next
- Your contact information for urgent needs
- Professional branding matching your website

## Troubleshooting

### "Invalid login" or "Authentication failed"

**Problem**: Gmail is rejecting the login.

**Solutions**:
1. Make sure 2-Step Verification is enabled on your Google account
2. Use an App Password, not your regular Gmail password
3. Remove any spaces from the 16-character App Password
4. Make sure `SMTP_USER` exactly matches your Gmail address

### Emails not sending

**Problem**: Form submits successfully but no emails arrive.

**Solutions**:
1. Check your `.env` file has the correct SMTP settings
2. Restart your development server after changing `.env`
3. Check your spam/junk folder
4. Check the terminal/console for error messages
5. Make sure your Gmail account isn't blocked or suspended

### "Connection timeout"

**Problem**: Can't connect to SMTP server.

**Solutions**:
1. Check your internet connection
2. Make sure `SMTP_PORT` is `587` (not 465 or 25)
3. Firewall might be blocking port 587
4. Try switching between `SMTP_HOST=smtp.gmail.com` and `smtp-relay.gmail.com`

### Form submits but lead still saved

**Good news**: Even if email fails, the lead is always saved to your MongoDB database. You can view all leads in the admin panel at `/admin/leads`.

## Testing Checklist

- [ ] 2-Step Verification enabled on Gmail
- [ ] App Password generated
- [ ] `.env` file updated with App Password (no spaces)
- [ ] Development server restarted
- [ ] Test form submission completed
- [ ] Business notification email received
- [ ] Customer confirmation email received
- [ ] Lead appears in `/admin/leads`

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add all `.env` variables to your hosting platform's environment variables
2. Update `NEXT_PUBLIC_SITE_URL` to your production domain
3. Consider using a professional email service like:
   - **SendGrid** (free tier: 100 emails/day)
   - **AWS SES** (very cheap, highly reliable)
   - **Postmark** (great for transactional emails)
   - **Resend** (modern, developer-friendly)

## Email Service Recommendations

For production, consider upgrading from Gmail SMTP to a professional service:

| Service | Free Tier | Best For |
|---------|-----------|----------|
| SendGrid | 100/day | Getting started |
| AWS SES | 62,000/month | High volume, low cost |
| Postmark | 100/month | Reliable delivery |
| Resend | 100/day | Modern API, great DX |

## Security Notes

- ⚠️ **NEVER commit your `.env` file to Git**
- ⚠️ **Keep your App Password secret**
- ✅ The `.env` file is already in `.gitignore`
- ✅ Use `.env.example` for sharing configuration structure

## Need Help?

If you continue having issues:

1. Check the browser console for errors
2. Check the terminal/server logs
3. Verify MongoDB is running (leads should still save even if email fails)
4. Try submitting a test form and checking the admin panel

## Summary

Once configured properly:
- ✅ Customer fills out contact form
- ✅ Lead saved to database
- ✅ You receive email notification
- ✅ Customer receives confirmation
- ✅ You can manage leads in admin panel

The system is designed to be resilient - even if emails fail, leads are always saved to the database so you never lose a potential customer!
