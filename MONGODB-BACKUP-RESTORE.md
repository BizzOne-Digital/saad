# MongoDB Backup & Restore Guide

Complete guide for backing up and restoring your Soro Garage Door Services database using `mongodump` and `mongorestore`.

---

## 📦 Quick Reference

### Backup Database
```bash
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/backup-2024-01-15"
```

### Restore Database
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/backup-2024-01-15/soro-garage-doors"
```

---

## 🔧 Prerequisites

Make sure MongoDB tools are installed:

### Windows
```bash
# Check if mongodump is available
mongodump --version

# If not installed, download MongoDB Database Tools:
# https://www.mongodb.com/try/download/database-tools
```

### Installation (if needed)
1. Download from: https://www.mongodb.com/try/download/database-tools
2. Extract to: `C:\Program Files\MongoDB\Tools\`
3. Add to PATH environment variable
4. Restart terminal

---

## 💾 BACKUP Commands

### 1. Basic Backup (Local)
```bash
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors"
```
- Creates `dump/` folder in current directory
- Backs up entire database

### 2. Backup to Specific Folder
```bash
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/backup-2024-01-15"
```
- Creates organized backup with date
- Recommended for version control

### 3. Backup to Specific Location with Date
```bash
# Windows PowerShell
$date = Get-Date -Format "yyyy-MM-dd-HHmm"
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/backup-$date"
```

```bash
# Windows CMD
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/backup-%date:~0,10%"
```

### 4. Backup Specific Collection
```bash
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --collection=leads --out="./backups/leads-only"
```
- Backs up only the `leads` collection

### 5. Compressed Backup (Smaller File Size)
```bash
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --gzip --out="./backups/compressed-backup"
```
- Uses gzip compression
- Saves disk space
- Slightly slower

### 6. Backup with Authentication (Production)
```bash
mongodump --uri="mongodb://username:password@host:27017/soro-garage-doors" --out="./backups/prod-backup"
```

---

## 🔄 RESTORE Commands

### 1. Basic Restore (Replace Everything)
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./dump/soro-garage-doors"
```
- `--drop`: Drops existing collections before restoring
- **Warning**: This will delete current data!

### 2. Restore from Specific Backup Folder
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/backup-2024-01-15/soro-garage-doors"
```

### 3. Restore Without Dropping (Merge Data)
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" "./backups/backup-2024-01-15/soro-garage-doors"
```
- Keeps existing data
- Adds/updates from backup
- May create duplicates

### 4. Restore Specific Collection
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --collection=leads "./backups/leads-only/soro-garage-doors/leads.bson"
```

### 5. Restore from Compressed Backup
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --gzip --drop "./backups/compressed-backup/soro-garage-doors"
```

### 6. Restore to Different Database Name
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors-test" --drop "./backups/backup-2024-01-15/soro-garage-doors"
```
- Creates new database with different name
- Useful for testing

---

## 📁 Recommended Backup Structure

```
project-root/
├── backups/
│   ├── backup-2024-01-15-1030/     # Morning backup
│   │   └── soro-garage-doors/
│   │       ├── users.bson
│   │       ├── leads.bson
│   │       ├── services.bson
│   │       └── ...
│   ├── backup-2024-01-15-1800/     # Evening backup
│   │   └── soro-garage-doors/
│   ├── backup-2024-01-16-1030/
│   │   └── soro-garage-doors/
│   └── weekly/
│       └── backup-2024-01-week3/
│           └── soro-garage-doors/
```

---

## 🤖 Automated Backup Scripts

### Windows PowerShell Script

Create: `backup-database.ps1`

```powershell
# MongoDB Backup Script for Windows
$date = Get-Date -Format "yyyy-MM-dd-HHmm"
$backupPath = "./backups/backup-$date"

Write-Host "Starting MongoDB backup..." -ForegroundColor Cyan
Write-Host "Backup location: $backupPath" -ForegroundColor Yellow

# Create backup
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="$backupPath"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backup completed successfully!" -ForegroundColor Green
    Write-Host "Backup saved to: $backupPath" -ForegroundColor Green
} else {
    Write-Host "✗ Backup failed!" -ForegroundColor Red
}

# Optional: Delete backups older than 7 days
$oldBackups = Get-ChildItem -Path "./backups" -Directory | Where-Object { $_.CreationTime -lt (Get-Date).AddDays(-7) }
if ($oldBackups) {
    Write-Host "Cleaning up old backups..." -ForegroundColor Yellow
    $oldBackups | Remove-Item -Recurse -Force
    Write-Host "✓ Old backups removed" -ForegroundColor Green
}
```

**Run it:**
```bash
powershell -ExecutionPolicy Bypass -File backup-database.ps1
```

### Windows Batch Script

Create: `backup-database.bat`

```batch
@echo off
echo ================================
echo MongoDB Backup Script
echo ================================

set backupPath=./backups/backup-%date:~0,10%-%time:~0,2%%time:~3,2%

echo Starting backup...
echo Backup location: %backupPath%

mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="%backupPath%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] Backup completed!
    echo Saved to: %backupPath%
) else (
    echo.
    echo [ERROR] Backup failed!
)

pause
```

**Run it:**
```bash
backup-database.bat
```

---

## 🔒 Production Backup (MongoDB Atlas or Remote)

### Backup from Remote Server
```bash
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/soro-garage-doors" --out="./backups/production-backup"
```

### Restore to Remote Server
```bash
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/soro-garage-doors" --drop "./backups/production-backup/soro-garage-doors"
```

### Environment Variable URI
```bash
# Set in .env
MONGODB_BACKUP_URI=mongodb://127.0.0.1:27017/soro-garage-doors

# Use in command (PowerShell)
mongodump --uri="$env:MONGODB_URI" --out="./backups/backup-$(Get-Date -Format 'yyyy-MM-dd')"
```

---

## 📅 Backup Schedule Recommendations

### Development
- **Daily**: Before major changes
- **Weekly**: End of week backups
- **Before Deploy**: Always backup before deployment

### Production
- **Hourly**: For high-traffic sites
- **Daily**: Minimum requirement
- **Weekly**: Long-term storage
- **Monthly**: Archive backups

---

## 🚨 Emergency Restore Procedure

### Scenario: Database Corrupted or Deleted

**1. Stop the application:**
```bash
# Stop Next.js dev server (Ctrl+C)
```

**2. List available backups:**
```bash
ls backups/
```

**3. Restore from most recent backup:**
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/backup-2024-01-15/soro-garage-doors"
```

**4. Verify restoration:**
```bash
# Connect to MongoDB
mongosh mongodb://127.0.0.1:27017/soro-garage-doors

# Check collections
show collections

# Verify data
db.leads.countDocuments()
db.users.countDocuments()

exit
```

**5. Restart application:**
```bash
npm run dev
```

---

## 🔍 Verify Backup Integrity

### Check Backup Size
```bash
# PowerShell
Get-ChildItem -Path "./backups/backup-2024-01-15" -Recurse | Measure-Object -Property Length -Sum

# CMD
dir /s "./backups/backup-2024-01-15"
```

### List Collections in Backup
```bash
ls "./backups/backup-2024-01-15/soro-garage-doors"
```

Should see:
- `users.bson` + `users.metadata.json`
- `leads.bson` + `leads.metadata.json`
- `services.bson` + `services.metadata.json`
- `faqs.bson` + `faqs.metadata.json`
- `galleryprojects.bson` + `galleryprojects.metadata.json`
- `testimonials.bson` + `testimonials.metadata.json`
- `sitesettings.bson` + `sitesettings.metadata.json`

### Test Restore to Temporary Database
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/test-restore" "./backups/backup-2024-01-15/soro-garage-doors"

# Verify
mongosh mongodb://127.0.0.1:27017/test-restore --eval "db.leads.countDocuments()"

# Delete test database
mongosh mongodb://127.0.0.1:27017/test-restore --eval "db.dropDatabase()"
```

---

## 💡 Best Practices

### ✅ DO:
- Backup before major database changes
- Test your backups regularly
- Keep multiple backup versions
- Store backups in multiple locations
- Document your backup schedule
- Automate backups for production

### ❌ DON'T:
- Rely on a single backup
- Store backups only on same server
- Forget to test restore procedures
- Skip backups before deployments
- Keep backups indefinitely (disk space)

---

## 📦 Backup Before Production Deploy

```bash
# 1. Create pre-deployment backup
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/pre-deploy-$(Get-Date -Format 'yyyy-MM-dd-HHmm')"

# 2. Deploy your code
npm run build
# ... deploy to hosting ...

# 3. If something goes wrong, restore:
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/pre-deploy-2024-01-15-1430/soro-garage-doors"
```

---

## 🎯 Quick Commands Reference

| Task | Command |
|------|---------|
| **Backup entire DB** | `mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/backup-now"` |
| **Backup compressed** | `mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --gzip --out="./backups/backup-now"` |
| **Backup one collection** | `mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --collection=leads --out="./backups/leads"` |
| **Restore (replace all)** | `mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/backup-now/soro-garage-doors"` |
| **Restore (keep existing)** | `mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" "./backups/backup-now/soro-garage-doors"` |
| **Restore compressed** | `mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --gzip --drop "./backups/backup-now/soro-garage-doors"` |

---

## 🆘 Troubleshooting

### "mongodump is not recognized"
**Solution:** Install MongoDB Database Tools and add to PATH

### "Failed: error connecting to db server"
**Solution:** Make sure MongoDB is running:
```bash
# Check if MongoDB is running
mongosh mongodb://127.0.0.1:27017 --eval "db.version()"
```

### "Backup folder is empty"
**Solution:** Check the backup path. Use full path:
```bash
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="E:/2sri nokri/saad/backups/backup-now"
```

### "Cannot restore: ns not found"
**Solution:** Make sure you're pointing to the database folder inside backup:
```bash
# Wrong:
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" "./backups/backup-now"

# Correct:
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" "./backups/backup-now/soro-garage-doors"
```

---

## 📚 Summary

**Backup:**
```bash
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="./backups/backup-$(Get-Date -Format 'yyyy-MM-dd')"
```

**Restore:**
```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "./backups/backup-2024-01-15/soro-garage-doors"
```

**Remember:**
- ✅ Test your backups
- ✅ Automate for production
- ✅ Keep multiple versions
- ✅ Store in safe location
- ✅ Backup before major changes

---

**Need help?** Check MongoDB documentation:
- https://www.mongodb.com/docs/database-tools/mongodump/
- https://www.mongodb.com/docs/database-tools/mongorestore/
