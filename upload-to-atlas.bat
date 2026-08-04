@echo off
REM =====================================================
REM Upload Local Database to MongoDB Atlas
REM Soro Garage Door Services
REM =====================================================

echo.
echo ========================================
echo MongoDB Atlas Upload
echo ========================================
echo.

REM =====================================================
REM CONFIGURATION - UPDATE THESE VALUES
REM =====================================================

REM Your MongoDB Atlas credentials
set ATLAS_USER=your-username-here
set ATLAS_PASS=your-password-here
set ATLAS_CLUSTER=cluster0.xxxxx.mongodb.net
set DB_NAME=soro-garage-doors

REM =====================================================

echo Configuration:
echo   Database: %DB_NAME%
echo   Atlas Cluster: %ATLAS_CLUSTER%
echo   Username: %ATLAS_USER%
echo.

REM Check if credentials are set
if "%ATLAS_USER%"=="your-username-here" (
    echo [ERROR] Please update the script with your Atlas credentials!
    echo.
    echo Edit this file and set:
    echo   ATLAS_USER = Your Atlas username
    echo   ATLAS_PASS = Your Atlas password
    echo   ATLAS_CLUSTER = Your cluster URL
    echo.
    pause
    exit /b
)

REM Create backups folder
if not exist "backups" mkdir backups

REM Generate timestamp
set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%-%time:~0,2%%time:~3,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_PATH=backups\to-atlas-%TIMESTAMP%

echo ========================================
echo Step 1: Backing up local database...
echo ========================================
echo.

mongodump --uri="mongodb://127.0.0.1:27017/%DB_NAME%" --out="%BACKUP_PATH%"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Local backup failed!
    echo Make sure MongoDB is running locally.
    echo.
    pause
    exit /b
)

echo.
echo [SUCCESS] Local backup completed!
echo Backup saved to: %BACKUP_PATH%
echo.

echo ========================================
echo Step 2: Uploading to Atlas...
echo ========================================
echo.
echo This may take a few minutes...
echo.

REM Upload to Atlas
mongorestore --uri="mongodb+srv://%ATLAS_USER%:%ATLAS_PASS%@%ATLAS_CLUSTER%/%DB_NAME%" --drop "%BACKUP_PATH%\%DB_NAME%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo [SUCCESS] Database uploaded to Atlas!
    echo ========================================
    echo.
    echo Your database is now available at:
    echo mongodb+srv://%ATLAS_CLUSTER%/%DB_NAME%
    echo.
    echo Next steps:
    echo 1. Verify data in Atlas dashboard
    echo 2. Update your .env file with Atlas URI
    echo 3. Restart your application
    echo.
) else (
    echo.
    echo ========================================
    echo [ERROR] Upload to Atlas failed!
    echo ========================================
    echo.
    echo Common issues:
    echo - IP not whitelisted in Atlas
    echo - Incorrect credentials
    echo - Special characters in password (need encoding)
    echo - No internet connection
    echo.
)

pause
