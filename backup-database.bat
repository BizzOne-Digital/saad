@echo off
REM MongoDB Backup Script for Soro Garage Door Services
REM Run this anytime you want to backup your database

echo ========================================
echo MongoDB Database Backup
echo Soro Garage Door Services
echo ========================================
echo.

REM Create backups folder if it doesn't exist
if not exist "backups" mkdir backups

REM Generate timestamp for backup folder name
set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%-%time:~0,2%%time:~3,2%
set TIMESTAMP=%TIMESTAMP: =0%

set BACKUP_PATH=backups\backup-%TIMESTAMP%

echo Starting backup...
echo Database: soro-garage-doors
echo Location: %BACKUP_PATH%
echo.

REM Perform the backup
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out="%BACKUP_PATH%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo [SUCCESS] Backup completed successfully!
    echo ========================================
    echo Backup saved to: %BACKUP_PATH%
    echo.
) else (
    echo.
    echo ========================================
    echo [ERROR] Backup failed!
    echo ========================================
    echo Please make sure MongoDB is running.
    echo.
)

pause
