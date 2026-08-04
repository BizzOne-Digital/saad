# Deployment Guide - Soro Garage Door Services

## Production Deployment Checklist

### 1. Pre-Deployment Preparation

#### Code Review
- [ ] All TypeScript compilation errors resolved
- [ ] All ESLint warnings addressed
- [ ] No console.log statements in production code
- [ ] All TODO comments reviewed
- [ ] Code tested in development environment

#### Environment Variables
- [ ] All required environment variables documented
- [ ] `.env.example` file is up to date
- [ ] No secrets committed to repository
- [ ] Production environment variables prepared

#### Database
- [ ] MongoDB Atlas cluster created (or production MongoDB ready)
- [ ] Database credentials secured
- [ ] Connection string tested
- [ ] Seed script tested (if applicable)
- [ ] Backup strategy in place

#### Assets
- [ ] Logo uploaded to `/public/logo.png`
- [ ] Favicon configured
- [ ] All placeholder images replaced with real images
- [ ] Image optimization completed
- [ ] Alt text added to all images

### 2. MongoDB Atlas Setup (Recommended for Production)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier or paid plan

2. **Create Cluster**
   - Choose cloud provider (AWS, GCP, or Azure)
   - Select region closest to your users (Toronto/Canada)
   - Configure cluster tier based on traffic

3. **Configure Security**
   - Create database user with strong password
   - Add IP whitelist (0.0.0.0/0 for Vercel or specific IPs)
   - Enable network access

4. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/soro-garage-doors?retryWrites=true&w=majority
   ```

5. **Test Connection**
   ```bash
   # In your .env file
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soro-garage-doors
   npm run dev
   ```

### 3. Vercel Deployment

#### Initial Setup

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Soro Garage Door Services website"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**
   
   Go to Project Settings → Environment Variables and add:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soro-garage-doors
   AUTH_SECRET=<generate-with-openssl-rand-base64-32>
   NEXTAUTH_URL=https://www.sorogaragedoors.ca
   ADMIN_SEED_EMAIL=admin@sorogaragedoors.ca
   ADMIN_SEED_PASSWORD=<strong-password>
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=info@sorogaragedoors.ca
   LEAD_NOTIFICATION_EMAIL=sorogaragedoors@gmail.com
   NEXT_PUBLIC_SITE_URL=https://www.sorogaragedoors.ca
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   GOOGLE_SITE_VERIFICATION=your-verification-code
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Test deployment URL

#### Domain Configuration

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add `www.sorogaragedoors.ca`
   - Add `sorogaragedoors.ca`

2. **Update DNS Records**
   
   At your domain registrar, add:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.21.21
   ```

3. **Wait for SSL Certificate**
   - Vercel automatically provisions SSL
   - Usually takes 5-10 minutes

4. **Verify HTTPS**
   - Visit https://www.sorogaragedoors.ca
   - Check for padlock icon

### 4. Post-Deployment Tasks

#### Immediate

1. **Verify Site is Live**
   - [ ] Homepage loads correctly
   - [ ] All pages accessible
   - [ ] Navigation works
   - [ ] Mobile responsive
   - [ ] Forms submit successfully

2. **Test Core Functionality**
   - [ ] Contact form submissions
   - [ ] Email notifications working
   - [ ] Database connections stable
   - [ ] Admin login functional
   - [ ] Images loading properly

3. **Performance Testing**
   - [ ] Run Lighthouse audit (target 90+)
   - [ ] Test on real mobile devices
   - [ ] Check page load speeds
   - [ ] Verify Core Web Vitals

#### Within 24 Hours

1. **SEO Configuration**
   - [ ] Submit sitemap to Google Search Console
   - [ ] Request indexing for key pages
   - [ ] Verify structured data
   - [ ] Check robots.txt accessibility

2. **Analytics Setup**
   - [ ] Verify Google Analytics tracking
   - [ ] Test conversion events
   - [ ] Set up goals
   - [ ] Configure Search Console

3. **Monitoring**
   - [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
   - [ ] Configure error tracking (Sentry optional)
   - [ ] Enable Vercel Analytics

### 5. SMTP Email Configuration

#### Gmail Setup

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Enable 2FA

2. **Generate App Password**
   - Go to Security → App Passwords
   - Create new app password for "Mail"
   - Copy the 16-character password

3. **Configure Environment Variables**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=<app-password>
   SMTP_FROM=info@sorogaragedoors.ca
   LEAD_NOTIFICATION_EMAIL=sorogaragedoors@gmail.com
   ```

#### Alternative SMTP Providers

- **SendGrid**: Free tier, 100 emails/day
- **Mailgun**: Free tier, 5,000 emails/month
- **AWS SES**: Pay as you go
- **Resend**: Modern email API

### 6. Database Seeding (Production)

**⚠️ Only run once after initial deployment**

Option 1: Run seed script via API route (create temporary endpoint)

Option 2: Connect to production DB locally and run seed:
```bash
MONGODB_URI=<production-uri> npm run seed
```

Option 3: Use MongoDB Compass to import data

### 7. Backup Strategy

#### MongoDB Backups

1. **Enable Atlas Automated Backups**
   - Go to Atlas → Cluster → Backup
   - Enable continuous backups
   - Configure retention policy

2. **Manual Backups**
   ```bash
   # Export production data
   mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/soro-garage-doors" --out=./backup-$(date +%Y%m%d)
   ```

3. **Schedule Regular Backups**
   - Weekly automated backups
   - Monthly archives
   - Test restoration process

### 8. Monitoring & Maintenance

#### Daily Checks
- [ ] Site is accessible
- [ ] Forms are working
- [ ] No critical errors in logs

#### Weekly Checks
- [ ] Review new leads in admin
- [ ] Check email delivery
- [ ] Monitor site performance
- [ ] Review analytics data

#### Monthly Checks
- [ ] Security updates
- [ ] Dependency updates
- [ ] Content updates
- [ ] Backup verification
- [ ] Performance audit

### 9. Rollback Plan

If something goes wrong:

1. **Vercel Instant Rollback**
   - Go to Deployments
   - Find previous working deployment
   - Click "..." → Promote to Production

2. **Database Rollback**
   - Restore from Atlas backup
   - Or restore from local backup using mongorestore

3. **DNS Rollback**
   - Point domain back to old server (if applicable)

### 10. Security Hardening

- [ ] Change default admin password
- [ ] Enable rate limiting on API routes
- [ ] Configure CORS if needed
- [ ] Review environment variable security
- [ ] Enable Vercel password protection for staging
- [ ] Set up 2FA for admin accounts
- [ ] Regular security audits

### 11. Performance Optimization

- [ ] Enable Vercel Edge Caching
- [ ] Configure image optimization
- [ ] Implement CDN for assets (Cloudinary)
- [ ] Monitor and optimize database queries
- [ ] Enable compression
- [ ] Minimize JavaScript bundles

### 12. Support & Documentation

#### For Client

Provide:
- [ ] Admin login credentials (secure delivery)
- [ ] Admin portal user guide
- [ ] Contact form notification email setup
- [ ] How to add/edit content
- [ ] How to view leads
- [ ] Emergency contact information

#### For Future Developers

Document:
- [ ] Architecture decisions
- [ ] API endpoints
- [ ] Database schema
- [ ] Environment variables
- [ ] Deployment process
- [ ] Common troubleshooting

## Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
npm run build
```

### Database Connection Issues

- Verify MongoDB URI format
- Check IP whitelist in Atlas
- Verify credentials
- Test connection with MongoDB Compass

### Email Not Sending

- Verify SMTP credentials
- Check app password (not account password)
- Review email logs in Vercel
- Test with different SMTP provider

### Performance Issues

- Check Vercel function logs
- Review database query performance
- Optimize images
- Enable caching
- Use Vercel Analytics

## Emergency Contacts

- **Vercel Support**: https://vercel.com/support
- **MongoDB Support**: https://support.mongodb.com
- **Domain Registrar**: [Your registrar support]

## Success Criteria

✅ Site is live and accessible
✅ All pages load without errors
✅ Forms submit successfully
✅ Emails are being sent
✅ Admin portal is functional
✅ SSL certificate is active
✅ Analytics is tracking
✅ Search Console is configured
✅ Mobile responsive
✅ Performance scores 90+

---

**Deployment Date**: _____________  
**Deployed By**: _____________  
**Verification**: _____________
