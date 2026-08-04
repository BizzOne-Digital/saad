# Email Setup - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Enable 2-Step Verification
🔗 https://myaccount.google.com/security
- Find "2-Step Verification"
- Click and follow steps
- You'll need your phone

### 2. Generate App Password
🔗 https://myaccount.google.com/apppasswords
- Select app: **Mail**
- Select device: **Windows Computer**
- Click **Generate**
- **Copy the 16-character password**

### 3. Update .env File
Open `.env` in your project and update:

```env
SMTP_PASSWORD=abcdefghijklmnop
```

Replace `abcdefghijklmnop` with your App Password (no spaces!)

### 4. Restart Server
```bash
npm run dev
```

### 5. Test It
1. Go to http://localhost:3000/contact
2. Fill out and submit form
3. Check email: sorogaragedoors@gmail.com

---

## ✅ What You Get

When customer submits contact form:

1. **Email to You** 📧
   - All customer details
   - Service requested
   - Emergency flagged if urgent

2. **Email to Customer** 📧
   - Thank you message
   - What happens next
   - Your contact info

3. **Saved to Database** 💾
   - Always saved (even if email fails)
   - View in admin: `/admin/leads`

---

## 🎯 Current Settings

Your `.env` file already has:

```env
SMTP_HOST=smtp.gmail.com          ✅ Correct
SMTP_PORT=587                      ✅ Correct
SMTP_USER=sorogaragedoors@gmail.com ✅ Correct
SMTP_PASSWORD=your-16-char-app-password-here ⚠️ UPDATE THIS
BUSINESS_EMAIL=sorogaragedoors@gmail.com ✅ Correct
```

**Only need to update:** `SMTP_PASSWORD`

---

## 🔧 Common Issues

### "Invalid login"
- ✅ Enable 2-Step Verification first
- ✅ Use App Password, not regular password
- ✅ Remove spaces from password

### No email received
- ✅ Check spam folder
- ✅ Check terminal for errors
- ✅ Restart server after changing .env

### Still not working?
**Good news:** Form still works!
- Lead saved to database
- View in `/admin/leads`
- Configure email later

---

## 📧 Email Preview

**You receive:**
```
Subject: New Service Request - John Smith

Customer Name: John Smith
Phone: (416) 555-1234
Email: john@example.com

Service Address:
123 Main Street
Toronto, M1M 1M1

Service Required: Garage Door Repair
Urgency: Emergency (Same day) 🚨
```

**Customer receives:**
```
Subject: Thank You for Contacting Soro Garage Door Services

Hi John,

Thank you for contacting Soro Garage Door Services...

What happens next?
✓ We'll review your request within 24 hours
✓ Our team will contact you
✓ We'll schedule a convenient time

Need immediate assistance?
Call or text: 647-299-0283
```

---

## 🎉 That's It!

Just update `SMTP_PASSWORD` in `.env`, restart server, and test!

Need more help? See `SMTP-SETUP-GUIDE.md` for detailed instructions.
