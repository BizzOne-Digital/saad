# Database Setup Guide

## Prerequisites

1. **Install MongoDB**
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## Local MongoDB Setup

### Windows:
1. Install MongoDB Community Server
2. MongoDB will automatically start as a Windows service
3. Default connection: `mongodb://127.0.0.1:27017`

### Verify MongoDB is Running:
```bash
# Open Command Prompt or PowerShell
mongosh
# or
mongo
```

## Environment Setup

1. **Create `.env` file** (already created)
   - The `.env` file has been created with default values
   - Update the values as needed

2. **Important Environment Variables:**
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/soro-garage-doors
   ADMIN_SEED_EMAIL=admin@sorogaragedoors.ca
   ADMIN_SEED_PASSWORD=Admin@2024!
   ```

## Run Database Seed

### Step 1: Install Dependencies (if not already done)
```bash
npm install
```

### Step 2: Run the Seed Script
```bash
npm run seed
```

## What Gets Seeded?

The seed script will create:

### ✅ Admin User
- **Email:** admin@sorogaragedoors.ca
- **Password:** Admin@2024!
- **⚠️ CHANGE THIS PASSWORD AFTER FIRST LOGIN!**

### ✅ Site Settings
- Business name: Soro Garage Door Services
- Phone: 647-299-0283
- Email: sorogaragedoors@gmail.com
- Service area: Greater Toronto Area
- Hours: Monday-Sunday, 8:00 AM - 8:00 PM

### ✅ Services (4)
1. New Garage Door Installation
2. Garage Door Repair
3. Spring Replacement
4. Garage Door Opener Installation

### ✅ FAQs (3)
- Same-day service info
- Pricing information
- Free estimates

### ✅ Gallery Projects (2)
- Sample installation projects

### ✅ Testimonials (2)
- Sample customer reviews

## Verify Database

After seeding, verify the data:

```bash
# Connect to MongoDB
mongosh

# Switch to database
use soro-garage-doors

# Check collections
show collections

# Count documents
db.users.countDocuments()
db.services.countDocuments()
db.faqs.countDocuments()
```

## Troubleshooting

### Error: "MongooseServerSelectionError"
- **Problem:** Can't connect to MongoDB
- **Solution:** 
  1. Make sure MongoDB is running
  2. Check connection string in `.env`
  3. Try: `mongodb://localhost:27017/soro-garage-doors` instead

### Error: "ECONNREFUSED"
- **Problem:** MongoDB service not running
- **Solution:** Start MongoDB service
  - Windows: Check Services app for "MongoDB"
  - Or restart computer

### Error: "bcrypt" or "tsx" not found
- **Problem:** Dependencies not installed
- **Solution:** Run `npm install`

## MongoDB Atlas (Cloud Option)

If you prefer cloud MongoDB:

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soro-garage-doors
   ```

## Next Steps

After seeding:

1. ✅ Run the development server: `npm run dev`
2. ✅ Test the site: http://localhost:3000
3. ⚠️ Login to admin panel and change password
4. ✅ Add real content (images, testimonials, etc.)

## Reseed Database

To clear and reseed:

```bash
npm run seed
```

This will:
- Delete all existing data
- Create fresh seed data
- Reset admin password to default

---

**Need Help?** Check the main README.md for full documentation.
