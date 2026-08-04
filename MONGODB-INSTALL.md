# MongoDB Installation Guide - Windows

## Method 1: Install MongoDB Community Server (Recommended)

### Step 1: Download MongoDB
1. Visit: https://www.mongodb.com/try/download/community
2. Select:
   - **Version:** 7.0.x (Current)
   - **Platform:** Windows
   - **Package:** MSI
3. Click **Download**

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **Complete** setup type
3. **IMPORTANT:** Check these options:
   - ✅ Install MongoDB as a Service
   - ✅ Run service as Network Service user
   - ✅ Install MongoDB Compass (GUI tool)
4. Click **Next** and **Install**

### Step 3: Verify Installation
Open Command Prompt or PowerShell:
```bash
# Check MongoDB version
mongod --version

# OR try
mongo --version
```

### Step 4: MongoDB Should Auto-Start
- MongoDB runs as Windows Service automatically
- No need to start manually

---

## Method 2: Use MongoDB Atlas (Cloud) - Free

If you don't want to install locally:

### Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (it's FREE)

### Step 2: Create Cluster
1. Click **"Build a Database"**
2. Choose **FREE** tier (M0 Sandbox)
3. Select region closest to you
4. Click **"Create Cluster"**

### Step 3: Create Database User
1. Go to **Database Access**
2. Click **"Add New Database User"**
3. Username: `soro_admin`
4. Password: `SoroPass2024` (or your choice)
5. User Privileges: **Read and write to any database**
6. Click **"Add User"**

### Step 4: Allow Network Access
1. Go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go to **Database** (left menu)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://soro_admin:<password>@cluster0.xxxxx.mongodb.net/
   ```

### Step 6: Update .env File
Replace the connection string in `.env`:
```env
MONGODB_URI=mongodb+srv://soro_admin:SoroPass2024@cluster0.xxxxx.mongodb.net/soro-garage-doors?retryWrites=true&w=majority
```
**Replace:**
- `<password>` with your actual password
- `cluster0.xxxxx` with your cluster address

---

## Connect with MongoDB Compass

### If MongoDB is Installed Locally:
1. Open **MongoDB Compass** (comes with MongoDB)
2. Connection String: `mongodb://localhost:27017`
3. Click **Connect**
4. Database will be `soro-garage-doors`

### If Using MongoDB Atlas:
1. Open **MongoDB Compass**
2. Use the connection string from Atlas
3. Format: `mongodb+srv://username:password@cluster.mongodb.net/`
4. Click **Connect**

---

## Quick Check if MongoDB is Running

### Windows:
1. Press `Win + R`
2. Type: `services.msc`
3. Look for **"MongoDB Server"**
4. Status should be **"Running"**

### OR Command Line:
```bash
# Try connecting
mongosh

# OR
mongo
```

If connected, you'll see:
```
test>
```

---

## Seed Database After MongoDB is Ready

Once MongoDB is installed/connected:

```bash
# Run seed script
npm run seed
```

This will create:
- Admin user
- Services
- FAQs
- Gallery projects
- Testimonials

---

## Troubleshooting

### Error: "mongosh not recognized"
- **Solution:** MongoDB not installed properly
- Reinstall MongoDB with "Add to PATH" checked
- OR use MongoDB Atlas (cloud)

### Error: "Connection refused"
- **Solution:** MongoDB service not running
- Open Services (`services.msc`)
- Find "MongoDB Server"
- Right-click → Start

### Can't find MongoDB Compass
- **Solution:** Download separately: https://www.mongodb.com/try/download/compass
- Or use MongoDB Atlas online interface

---

## Which Method Should You Choose?

### Use Local MongoDB If:
- ✅ You want full control
- ✅ You're comfortable installing software
- ✅ You want fastest performance

### Use MongoDB Atlas If:
- ✅ You don't want to install anything
- ✅ You want cloud backup
- ✅ You want to access from multiple computers
- ✅ You want zero configuration

**Both work perfectly with this project!**

---

## Next Steps

After MongoDB is ready:

1. ✅ Run: `npm run seed`
2. ✅ Start dev server: `npm run dev`
3. ✅ Visit: http://localhost:3000
4. ✅ Connect MongoDB Compass to see your data

---

**Need Help?** 
- MongoDB Docs: https://docs.mongodb.com/manual/
- MongoDB Compass Guide: https://docs.mongodb.com/compass/
