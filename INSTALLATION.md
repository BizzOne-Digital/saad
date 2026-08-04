# 🚀 QUICK START GUIDE - Soro Garage Door Services

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14.2.3
- React 18.3.1
- Tailwind CSS 3.4.3
- Framer Motion 11.1.7
- GSAP 3.12.5
- MongoDB & Mongoose
- And all other dependencies

## Step 2: Add Your Logo

**⚠️ IMPORTANT: Add the client logo before running the site**

Place the logo file at:
```
/public/logo.png
```

Recommended specifications:
- Format: PNG with transparent background
- Size: 400x200 pixels
- Max file size: 500KB

## Step 3: Set Up MongoDB

### Option A: Local MongoDB (Development)

1. **Install MongoDB** (if not already installed)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use Homebrew: `brew install mongodb-community`
   - Or use Chocolatey (Windows): `choco install mongodb`

2. **Start MongoDB**
   ```bash
   # Mac/Linux
   mongod
   
   # Or as service
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   ```

3. **Verify MongoDB is running**
   - Default URL: `mongodb://127.0.0.1:27017`
   - You can connect with MongoDB Compass

### Option B: MongoDB Atlas (Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Use in `.env` file

## Step 4: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env file with your values
```

**Minimum required variables:**

```env
# Database
MONGODB_URI=mongodb://127.0.0.1:27017/soro-garage-doors

# Authentication
AUTH_SECRET=your-super-secret-key-here-use-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Admin Account
ADMIN_SEED_EMAIL=admin@sorogaragedoors.ca
ADMIN_SEED_PASSWORD=ChangeThisPassword123!
```

**Generate AUTH_SECRET:**
```bash
# Mac/Linux
openssl rand -base64 32

# Or use online generator
# https://generate-secret.vercel.app/32
```

## Step 5: Seed the Database

```bash
npm run seed
```

This will create:
- Admin user account
- Site settings
- Sample services
- Sample FAQs
- Sample gallery projects
- Sample testimonials

**Output should show:**
```
✅ Admin user created: admin@sorogaragedoors.ca
✅ Created 4 services
✅ Created 3 FAQs
✅ Created 2 gallery projects
✅ Created 2 testimonials
```

## Step 6: Run Development Server

```bash
npm run dev
```

The site will be available at:
**http://localhost:3000**

## Step 7: View the Site

Open your browser and visit:
```
http://localhost:3000
```

You should see:
1. ✅ 4-second cinematic garage door opening animation
2. ✅ Homepage with all sections
3. ✅ Fully responsive design
4. ✅ Smooth animations throughout

## Step 8: Test Admin Login (When Built)

```
URL: http://localhost:3000/admin/login
Email: admin@sorogaragedoors.ca
Password: (whatever you set in .env)
```

---

## 🔍 Verify Installation

### Check MongoDB Connection

```bash
# Connect with MongoDB Compass
mongodb://127.0.0.1:27017/soro-garage-doors
```

You should see:
- `users` collection (1 document)
- `services` collection (4 documents)
- `faqs` collection (3 documents)
- `galleryprojects` collection (2 documents)
- `testimonials` collection (2 documents)
- `sitesettings` collection (1 document)

### Test All Pages

Visit these URLs to test:
- ✅ http://localhost:3000 (Homepage)
- ✅ http://localhost:3000/about (About)
- ✅ http://localhost:3000/services (Services)
- ✅ http://localhost:3000/gallery (Gallery)
- ✅ http://localhost:3000/testimonials (Reviews)
- ✅ http://localhost:3000/faq (FAQ)
- ✅ http://localhost:3000/contact (Contact)

### Test Contact Form

1. Go to http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Should see success message

---

## 📱 Test on Mobile

1. Find your computer's IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. On your mobile device, visit:
   ```
   http://YOUR-IP-ADDRESS:3000
   ```

3. Test:
   - ✅ Mobile menu works
   - ✅ Bottom action bar appears
   - ✅ Forms are usable
   - ✅ Animations are smooth
   - ✅ All buttons work

---

## 🛠️ Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Make sure MongoDB is running: `mongod`
2. Check MONGODB_URI in `.env`
3. Try connecting with MongoDB Compass

### Issue: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Port 3000 is already in use"

**Solution:**
```bash
# Kill the process on port 3000
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Issue: Animations not working

**Solution:**
1. Clear browser cache
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check browser console for errors

### Issue: Images not loading

**Solution:**
1. Make sure logo is at `/public/logo.png`
2. Check image URLs in components
3. Verify Next.js Image component config

---

## 📊 Build for Production

```bash
# Type checking
npm run type-check

# Build
npm run build

# Test production build locally
npm start
```

Production build will:
- ✅ Optimize all code
- ✅ Compress images
- ✅ Generate static pages
- ✅ Create optimized bundles

---

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use Vercel dashboard:
1. Go to https://vercel.com
2. Import GitHub repository
3. Add environment variables
4. Deploy

**See `docs/deployment-guide.md` for full deployment instructions**

---

## 📝 Next Steps

1. ✅ Add real logo
2. ✅ Add real project images
3. ✅ Update content as needed
4. ⏳ Build admin portal
5. ⏳ Configure production email
6. ⏳ Set up MongoDB Atlas
7. ⏳ Deploy to production

---

## 🆘 Need Help?

- **Documentation**: Check README.md
- **Deployment**: See docs/deployment-guide.md
- **SEO**: See docs/seo-launch-checklist.md
- **Project Summary**: See PROJECT-SUMMARY.md

---

## ✅ Success Checklist

After installation, you should have:

- [x] All dependencies installed
- [x] MongoDB running locally
- [x] Database seeded with sample data
- [x] Development server running
- [x] Site accessible at localhost:3000
- [x] Cinematic intro animation working
- [x] All pages loading correctly
- [x] Mobile responsive design working
- [x] Forms functional
- [x] Navigation working

**You're ready to develop! 🎉**
