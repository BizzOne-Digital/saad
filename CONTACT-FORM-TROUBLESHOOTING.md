# Contact Form Troubleshooting Guide

## Quick Diagnostic Steps

### Step 1: Test Email Configuration
Open your browser and go to:
```
http://localhost:3000/api/test-email
```

**Expected Results:**
- ✅ Success: `{"success":true,"message":"Test email sent successfully!"}`
- ❌ Failure: Shows error details

### Step 2: Check Browser Console
1. Open your website: `http://localhost:3000/contact`
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Fill out and submit the form
5. Look for any error messages

### Step 3: Check Server Terminal
Look at your terminal where `npm run dev` is running.
You should see:
```
Submitting form with data: { ... }
Response status: 200
Response data: { success: true, ... }
```

---

## Common Issues & Solutions

### Issue 1: "SMTP not configured"
**Symptoms:** Form submits but shows "Email notifications are not configured"

**Solution:**
1. Check your `.env` file has these values:
   ```env
   SMTP_USER=sorogaragedoors@gmail.com
   SMTP_PASSWORD=your-app-password-here
   ```
2. Make sure SMTP_PASSWORD is your **App Password** (not regular Gmail password)
3. Restart the development server: `Ctrl+C` then `npm run dev`

### Issue 2: "Invalid login"
**Symptoms:** Error message about authentication failure

**Solution:**
1. Generate a new App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Create new password for "Mail"
   - Copy the 16-character password (remove spaces)
   - Update `.env` file with new password
2. Restart server

### Issue 3: Form shows success but no email received
**Possible Causes:**
1. **Email in spam folder** - Check spam/junk
2. **Wrong email address** - Verify `BUSINESS_EMAIL` in `.env`
3. **SMTP blocked** - Firewall blocking port 587

**Solutions:**
- Check spam folder first
- Verify email address in `.env`
- Try test endpoint: `http://localhost:3000/api/test-email`

### Issue 4: Database connection error
**Symptoms:** Form fails with MongoDB error

**Solution:**
1. Make sure MongoDB is running:
   ```bash
   mongosh mongodb://127.0.0.1:27017
   ```
2. If not running, start MongoDB service
3. Restart your dev server

### Issue 5: Form submission freezes/hangs
**Symptoms:** Submit button shows "Submitting..." forever

**Solution:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Check Network tab for failed requests
4. Try refreshing the page

---

## Testing Checklist

Run through these tests:

### ✅ Environment Variables
```bash
# Check if variables are loaded
node -e "require('dotenv').config(); console.log(process.env.SMTP_USER)"
```

Should output: `sorogaragedoors@gmail.com`

### ✅ MongoDB Connection
```bash
mongosh mongodb://127.0.0.1:27017/soro-garage-doors
```

Should connect successfully.

### ✅ Test Email API
Visit: `http://localhost:3000/api/test-email`

Should send test email to your inbox.

### ✅ Submit Real Form
1. Go to: `http://localhost:3000/contact`
2. Fill out all required fields
3. Submit form
4. Check console and terminal logs
5. Check email inbox (and spam)

---

## Manual Email Test

If automated tests fail, try this manual test:

1. Create file: `test-email.js`
```javascript
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.BUSINESS_EMAIL,
    subject: 'Test Email',
    text: 'This is a test email from nodemailer',
  });

  console.log('Email sent:', info.messageId);
}

testEmail().catch(console.error);
```

2. Run: `node test-email.js`

---

## Debugging Steps

### Enable Detailed Logging

Update `.env`:
```env
NODE_ENV=development
DEBUG=nodemailer
```

Restart server and check terminal for detailed logs.

### Check Gmail Settings

1. Go to: https://myaccount.google.com/security
2. Verify:
   - ✅ 2-Step Verification is ON
   - ✅ App Password is generated
   - ✅ "Less secure app access" is OFF (not needed with App Password)

### Verify Network Access

1. Check if port 587 is open:
   ```bash
   telnet smtp.gmail.com 587
   ```
2. Should connect successfully

---

## Still Not Working?

### Collect Debug Information

1. **Browser Console Output:**
   - F12 → Console tab
   - Copy all messages when submitting form

2. **Server Terminal Output:**
   - Copy terminal logs when form is submitted

3. **Environment Check:**
   ```bash
   echo SMTP_USER: %SMTP_USER%
   echo SMTP_HOST: %SMTP_HOST%
   ```

4. **Test Endpoint Result:**
   - Visit: `http://localhost:3000/api/test-email`
   - Copy the JSON response

### Alternative: Use Different Email Service

If Gmail SMTP continues to fail, try:

**SendGrid (Free 100 emails/day):**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

**Mailtrap (Testing):**
```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-user
SMTP_PASSWORD=your-mailtrap-password
```

---

## Quick Fix: Disable Email (Testing Only)

To test form without email:

1. Comment out email in API route:
```typescript
// Temporarily disable email for testing
// await sendContactFormEmail(...)

return NextResponse.json({
  success: true,
  message: 'Form submitted (email disabled for testing)',
  emailSent: false,
});
```

Form will work and save to database, but won't send emails.

---

## Contact Form Flow

```
User fills form
    ↓
Click Submit
    ↓
POST to /api/contact
    ↓
Validate fields
    ↓
Save to MongoDB ← Always happens (even if email fails)
    ↓
Send business email
    ↓
Send customer confirmation
    ↓
Return success
    ↓
Show success message
```

**Important:** Even if email fails, the lead is saved to database!
Check `/admin/leads` to see all submissions.

---

## Success Indicators

✅ Form submission successful:
- Console: `Response status: 200`
- Terminal: `Lead saved to database: [id]`
- Terminal: `Email sent successfully: [messageId]`
- Success page appears

✅ Email sent:
- Terminal: `Email sent successfully`
- Email arrives in inbox (check spam)
- Customer receives confirmation email

✅ Database saved:
- Terminal: `Lead saved to database`
- Lead appears in `/admin/leads`

---

## Summary

1. **First:** Visit `http://localhost:3000/api/test-email`
2. **Check:** Browser console for errors
3. **Verify:** Terminal logs
4. **Confirm:** Email in inbox (check spam)
5. **Verify:** Lead saved to `/admin/leads`

If test endpoint works but form doesn't, the issue is in form submission (browser-side).
If test endpoint fails, the issue is in email configuration (server-side).
