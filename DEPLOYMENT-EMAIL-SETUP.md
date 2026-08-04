# Production Email Setup — Squarespace (Google Workspace)

`info@sorogaragedoors.ca` on Squarespace is **Google Workspace** email.  
Squarespace does **not** host mailboxes — SMTP is **Gmail / Google**:

| Setting | Value |
|---------|--------|
| Host | `smtp.gmail.com` |
| Port | `465` (SSL) — best on Vercel |
| User | `info@sorogaragedoors.ca` |
| Password | Google **App Password** (not the normal login password) |
| From | `info@sorogaragedoors.ca` |

---

## 1. Create a Google App Password

1. Sign in as **info@sorogaragedoors.ca** (Google Workspace / admin.google.com if needed)
2. Open [Google Account Security](https://myaccount.google.com/security)
3. Turn on **2-Step Verification**
4. Open [App passwords](https://myaccount.google.com/apppasswords)
5. Create an app password for **Mail**
6. Copy the **16-character** code and **remove spaces**

If App Passwords is missing, Workspace admin must allow them:  
Admin console → Security → Authentication → App passwords / 2-Step Verification.

---

## 2. Local `.env`

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@sorogaragedoors.ca
SMTP_PASSWORD=your16charapppassword
SMTP_FROM=info@sorogaragedoors.ca
LEAD_NOTIFICATION_EMAIL=info@sorogaragedoors.ca
BUSINESS_EMAIL=info@sorogaragedoors.ca
NEXT_PUBLIC_EMAIL=info@sorogaragedoors.ca
```

Restart `npm run dev` after editing `.env`.

---

## 3. Vercel env vars (then Redeploy)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@sorogaragedoors.ca
SMTP_PASSWORD=your16charapppassword
SMTP_FROM=info@sorogaragedoors.ca
LEAD_NOTIFICATION_EMAIL=info@sorogaragedoors.ca
BUSINESS_EMAIL=info@sorogaragedoors.ca
NEXT_PUBLIC_EMAIL=info@sorogaragedoors.ca
```

---

## 4. Test

- Local: `http://localhost:3000/api/test-email`
- Live: `https://www.sorogaragedoors.ca/api/test-email`

Expect `success: true` and mail in `info@sorogaragedoors.ca`.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Username/Password not accepted | Use **App Password**, not Workspace login password |
| App passwords unavailable | Enable 2FA; ask Workspace admin to allow App Passwords |
| Timeout on Vercel | `SMTP_PORT=465` + `SMTP_SECURE=true` |
| Only forwarding (no Workspace mailbox) | You cannot SMTP-send as info@ without a real mailbox — set up Google Workspace through Squarespace, or use another provider |

**Leads still save to MongoDB even if SMTP fails.**
