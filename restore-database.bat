@echo off
REM MongoDB Restore Script for Soro Garage Door Services
REM Use this to restore database from a backup

echo ========================================
echo MongoDB Database Restore
echo Soro Garage Door Services
echo ========================================
echo.

REM List available backups
echo Available backups:
echo.
dir /b backups
echo.

REM Prompt for backup folder name
set /p BACKUP_FOLDER="Enter backup folder name (e.g., backup-20240115-1030): "

if not exist "backups\%BACKUP_FOLDER%" (
    echo.
    echo [ERROR] Backup folder not found!
    echo Please check the folder name and try again.
    pause
    exit /b
)

echo.
echo ========================================
echo WARNING: This will DELETE all current data
echo and restore from backup!
echo ========================================
echo.
set /p CONFIRM="Are you sure? Type YES to continue: "

if /i not "%CONFIRM%"=="YES" (
    echo.
    echo [CANCELLED] Restore cancelled by user.
    pause
    exit /b
)

echo.
echo Starting restore...
echo Backup: backups\%BACKUP_FOLDER%\soro-garage-doors
echo.

REM Perform the restore
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --drop "backups\%BACKUP_FOLDER%\soro-garage-doors"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo [SUCCESS] Database restored successfully!
    echo ========================================
    echo Restored from: backups\%BACKUP_FOLDER%
    echo.
) else (
    echo.
    echo ========================================
    echo [ERROR] Restore failed!
    echo ========================================
    echo Please check the backup path and try again.
    echo.
)

pause
