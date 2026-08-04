# MongoDB Atlas Backup & Restore Guide

Complete guide for backing up local database and restoring to MongoDB Atlas (Cloud).

---

## 🌐 MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free (Free tier: 512MB storage)
3. Create a cluster (select free M0 tier)
4. Wait for cluster to deploy (2-3 minutes)

### 2. Get Your Connection String
1. In Atlas Dashboard, click **"Connect"**
2. Select **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password

---

## 📦 BACKUP from Local → Atlas

### Step 1: Backup Local Database
```bash
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/atlas-upload"
```

### Step 2: Restore to Atlas
```bash
mongorestore --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors" --drop "./backups/atlas-upload/soro-garage-doors"
```

**Replace:**
- `username` - Your Atlas username
- `password` - Your Atlas password
- `cluster0.xxxxx.mongodb.net` - Your cluster URL

---

## 🔧 Complete Atlas Commands

### Backup FROM Atlas TO Local
```bash
mongodump --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors" --out="./backups/from-atlas"
```

### Restore FROM Local TO Atlas
```bash
mongorestore --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors" --drop "./backups/atlas-upload/soro-garage-doors"
```

### Restore FROM Atlas TO Local
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/from-atlas/soro-garage-doors"
```

---

## 🚀 Quick Migration: Local → Atlas

### Method 1: One-Step Migration (If you have local data)

```bash
# Backup local database
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/migrate-to-atlas"

# Upload to Atlas
mongorestore --uri="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/soro-garage-doors" --drop "./backups/migrate-to-atlas/soro-garage-doors"
```

### Method 2: Using Environment Variable

**Update your `.env` file:**
```env
# Local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/soro-garage-doors

# MongoDB Atlas (production)
MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors
```

**PowerShell Commands:**
```powershell
# Load environment variable
$env:MONGODB_ATLAS_URI = "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors"

# Backup local
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/to-atlas"

# Restore to Atlas
mongorestore --uri="$env:MONGODB_ATLAS_URI" --drop "./backups/to-atlas/soro-garage-doors"
```

---

## 📝 Real Example with Your Database

Assuming:
- **Atlas Username:** `soro-admin`
- **Atlas Password:** `SecurePass123!`
- **Atlas Cluster:** `cluster0.ab1cd.mongodb.net`
- **Database Name:** `soro-garage-doors`

### Complete Upload Command:
```bash
# 1. Backup from local
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/upload-to-atlas"

# 2. Upload to Atlas
mongorestore --uri="mongodb+srv://soro-admin:SecurePass123!@cluster0.ab1cd.mongodb.net/soro-garage-doors" --drop "./backups/upload-to-atlas/soro-garage-doors"
```

### Download from Atlas:
```bash
# 1. Download from Atlas
mongodump --uri="mongodb+srv://soro-admin:SecurePass123!@cluster0.ab1cd.mongodb.net/soro-garage-doors" --out="./backups/from-atlas"

# 2. Restore to local
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/from-atlas/soro-garage-doors"
```

---

## 🔒 Secure Connection (Recommended)

### Store Connection String Securely

**Create: `.env.production`**
```env
MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors
```

**PowerShell with .env file:**
```powershell
# Load from .env file
Get-Content .env.production | ForEach-Object {
    if ($_ -match '^MONGODB_ATLAS_URI=(.+)$') {
        $env:MONGODB_ATLAS_URI = $Matches[1]
    }
}

# Backup local
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/to-atlas"

# Upload to Atlas
mongorestore --uri="$env:MONGODB_ATLAS_URI" --drop "./backups/to-atlas/soro-garage-doors"
```

---

## 🔑 Atlas Connection String Formats

### Standard Format
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database-name
```

### With Options
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors?retryWrites=true&w=majority
```

### With Special Characters in Password
If password has special characters like `@`, `#`, `!`, encode them:
```
! → %21
@ → %40
# → %23
$ → %24
% → %25
^ → %5E
& → %26
```

**Example:**
- Password: `MyPass@123!`
- Encoded: `MyPass%40123%21`
- URI: `mongodb+srv://user:MyPass%40123%21@cluster0.xxxxx.mongodb.net/soro-garage-doors`

---

## 🎯 Atlas Whitelist (Important!)

Before connecting, add your IP to Atlas whitelist:

### Method 1: Add Current IP
1. Go to **Network Access** in Atlas
2. Click **"Add IP Address"**
3. Click **"Add Current IP Address"**
4. Click **"Confirm"**

### Method 2: Allow All IPs (Development Only)
1. Go to **Network Access** in Atlas
2. Click **"Add IP Address"**
3. Enter: `0.0.0.0/0`
4. Click **"Confirm"**

⚠️ **Warning:** `0.0.0.0/0` allows access from anywhere. Only use for development!

---

## 🛠️ Atlas Backup Scripts

### Upload to Atlas (Windows Batch)

**Create: `upload-to-atlas.bat`**
```batch
@echo off
echo ========================================
echo Upload Database to MongoDB Atlas
echo ========================================
echo.

REM Your Atlas connection details
set ATLAS_USER=your-username
set ATLAS_PASS=your-password
set ATLAS_CLUSTER=cluster0.xxxxx.mongodb.net
set DB_NAME=soro-garage-doors

REM Create backup from local
echo [Step 1/2] Backing up local database...
mongodump --uri="mongodb://127.0.0.1:27017/%DB_NAME%" --out="./backups/to-atlas"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Local backup failed!
    pause
    exit /b
)

echo [SUCCESS] Local backup completed!
echo.

REM Upload to Atlas
echo [Step 2/2] Uploading to Atlas...
mongorestore --uri="mongodb+srv://%ATLAS_USER%:%ATLAS_PASS%@%ATLAS_CLUSTER%/%DB_NAME%" --drop "./backups/to-atlas/%DB_NAME%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo [SUCCESS] Database uploaded to Atlas!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo [ERROR] Upload to Atlas failed!
    echo ========================================
    echo Check your connection string and credentials
)

pause
```

### Download from Atlas (Windows Batch)

**Create: `download-from-atlas.bat`**
```batch
@echo off
echo ========================================
echo Download Database from MongoDB Atlas
echo ========================================
echo.

REM Your Atlas connection details
set ATLAS_USER=your-username
set ATLAS_PASS=your-password
set ATLAS_CLUSTER=cluster0.xxxxx.mongodb.net
set DB_NAME=soro-garage-doors

REM Download from Atlas
echo [Step 1/2] Downloading from Atlas...
mongodump --uri="mongodb+srv://%ATLAS_USER%:%ATLAS_PASS%@%ATLAS_CLUSTER%/%DB_NAME%" --out="./backups/from-atlas"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Download from Atlas failed!
    pause
    exit /b
)

echo [SUCCESS] Download completed!
echo.

REM Restore to local
echo [Step 2/2] Restoring to local database...
mongorestore --uri="mongodb://127.0.0.1:27017/%DB_NAME%" --drop "./backups/from-atlas/%DB_NAME%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo [SUCCESS] Database restored locally!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo [ERROR] Local restore failed!
    echo ========================================
)

pause
```

---

## 🔄 Sync Local ↔ Atlas

### Sync Local TO Atlas (Upload Changes)
```bash
# Backup local
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/sync-to-atlas"

# Upload to Atlas (replace all)
mongorestore --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors" --drop "./backups/sync-to-atlas/soro-garage-doors"
```

### Sync Atlas TO Local (Download Changes)
```bash
# Backup Atlas
mongodump --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors" --out="./backups/sync-from-atlas"

# Restore to local (replace all)
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/sync-from-atlas/soro-garage-doors"
```

---

## 📊 Verify Atlas Upload

### Check Data in Atlas

**Method 1: Using mongosh**
```bash
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors"

# List collections
show collections

# Count documents
db.leads.countDocuments()
db.users.countDocuments()
db.services.countDocuments()

# Exit
exit
```

**Method 2: Using Atlas Web Interface**
1. Go to Atlas Dashboard
2. Click **"Browse Collections"**
3. Verify all collections and data

---

## 🚨 Troubleshooting

### Error: "IP not whitelisted"
**Solution:** Add your IP address in Atlas Network Access settings

### Error: "Authentication failed"
**Solution:** 
- Check username and password
- Encode special characters in password
- Verify database user has read/write permissions

### Error: "ENOTFOUND cluster0.xxxxx.mongodb.net"
**Solution:**
- Check internet connection
- Verify cluster URL is correct
- Try DNS flush: `ipconfig /flushdns`

### Error: "Cannot resolve SRV"
**Solution:** Use standard connection string instead of SRV:
```bash
# Instead of mongodb+srv://...
# Use:
mongodb://username:password@cluster0-shard-00-00.xxxxx.mongodb.net:27017,cluster0-shard-00-01.xxxxx.mongodb.net:27017,cluster0-shard-00-02.xxxxx.mongodb.net:27017/soro-garage-doors?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin
```

### Slow Upload/Download
**Solutions:**
- Use `--gzip` flag for compression
- Upload during off-peak hours
- Check your internet speed
- Upgrade Atlas cluster tier for faster speeds

---

## 📋 Production Deployment Checklist

When deploying to production with Atlas:

- [ ] Create Atlas account and cluster
- [ ] Add IP whitelist (or 0.0.0.0/0 for testing)
- [ ] Create database user with permissions
- [ ] Update `.env` with Atlas URI
- [ ] Backup local database
- [ ] Upload to Atlas
- [ ] Verify data in Atlas
- [ ] Update application code to use Atlas
- [ ] Test application with Atlas
- [ ] Set up automated backups in Atlas

---

## 🎯 Quick Command Reference

| Task | Command |
|------|---------|
| **Backup local DB** | `mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/local"` |
| **Upload to Atlas** | `mongorestore --uri="mongodb+srv://user:pass@cluster.net/soro-garage-doors" --drop "./backups/local/soro-garage-doors"` |
| **Backup from Atlas** | `mongodump --uri="mongodb+srv://user:pass@cluster.net/soro-garage-doors" --out="./backups/atlas"` |
| **Restore to local** | `mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/atlas/soro-garage-doors"` |

---

## 💰 Atlas Pricing

### M0 (Free Forever)
- 512 MB storage
- Shared RAM
- Good for development/testing
- **Price:** FREE

### M10 (Production)
- 10GB storage
- 2GB RAM
- Good for small production apps
- **Price:** ~$57/month

### Recommendation
- Start with **M0 Free** for development
- Upgrade to **M10** when going to production
- Enable automated backups (M10+)

---

## 🔐 Update Next.js Application

After uploading to Atlas, update your `.env`:

```env
# Old local MongoDB
# MONGODB_URI=mongodb://127.0.0.1:27017/soro-garage-doors

# New Atlas MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/soro-garage-doors?retryWrites=true&w=majority
```

Restart your application:
```bash
npm run dev
```

---

## 📚 Summary

**To upload your local database to Atlas:**

```bash
# 1. Backup local
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/to-atlas"

# 2. Upload to Atlas (replace with your credentials)
mongorestore --uri="mongodb+srv://YOUR_USER:YOUR_PASS@YOUR_CLUSTER.mongodb.net/soro-garage-doors" --drop "./backups/to-atlas/soro-garage-doors"
```

**Remember:**
- ✅ Add IP to whitelist first
- ✅ Encode special characters in password
- ✅ Verify upload using Atlas dashboard
- ✅ Update .env with Atlas URI
- ✅ Test application after switching

**Need help?** 
- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas/
- Connection Guide: https://www.mongodb.com/docs/atlas/driver-connection/
