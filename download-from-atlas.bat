@echo off
REM =====================================================
REM Download Database from MongoDB Atlas to Local
REM Soro Garage Door Services
REM =====================================================

echo.
echo ========================================
echo MongoDB Atlas Download
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
set BACKUP_PATH=backups\from-atlas-%TIMESTAMP%

echo ========================================
echo Step 1: Downloading from Atlas...
echo ========================================
echo.
echo This may take a few minutes...
echo.

mongodump --uri="mongodb+srv://%ATLAS_USER%:%ATLAS_PASS%@%ATLAS_CLUSTER%/%DB_NAME%" --out="%BACKUP_PATH%"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Download from Atlas failed!
    echo.
    echo Common issues:
    echo - IP not whitelisted in Atlas
    echo - Incorrect credentials
    echo - No internet connection
    echo.
    pause
    exit /b
)

echo.
echo [SUCCESS] Download completed!
echo Backup saved to: %BACKUP_PATH%
echo.

echo ========================================
echo Step 2: Restoring to local database...
echo ========================================
echo.
echo WARNING: This will replace your local database!
echo.
set /p CONFIRM="Continue? Type YES to proceed: "

if /i not "%CONFIRM%"=="YES" (
    echo.
    echo [CANCELLED] Restore cancelled.
    echo Atlas backup is saved at: %BACKUP_PATH%
    echo.
    pause
    exit /b
)

echo.
echo Restoring to local MongoDB...
echo.

mongorestore --uri="mongodb://127.0.0.1:27017/%DB_NAME%" --drop "%BACKUP_PATH%\%DB_NAME%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo [SUCCESS] Database restored locally!
    echo ========================================
    echo.
    echo Your local database has been updated with Atlas data.
    echo.
) else (
    echo.
    echo ========================================
    echo [ERROR] Local restore failed!
    echo ========================================
    echo.
    echo Make sure MongoDB is running locally.
    echo Backup is still saved at: %BACKUP_PATH%
    echo.
)

pause
