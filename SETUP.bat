@echo off
echo ========================================
echo SORO GARAGE DOOR SERVICES - SETUP
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo Step 2: Checking MongoDB connection...
mongosh --eval "db.version()" >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: MongoDB is not running or not installed
    echo Please install MongoDB from: https://www.mongodb.com/try/download/community
    echo Or start MongoDB service
    pause
    exit /b 1
)
echo MongoDB is running!
echo.

echo Step 3: Seeding database...
call npm run seed
if %errorlevel% neq 0 (
    echo ERROR: Failed to seed database
    pause
    exit /b 1
)
echo.

echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo Admin Credentials:
echo Email: admin@sorogaragedoors.ca
echo Password: Admin@2024!
echo.
echo IMPORTANT: Change the password after first login!
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Then visit: http://localhost:3000
echo ========================================
pause
