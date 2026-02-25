@echo off
REM ========================================
REM LMS Platform Startup Script
REM Run this from the project root directory
REM ========================================

echo.
echo ========================================
echo LMS Platform - Startup Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if MongoDB is running (optional check)
REM You can add MongoDB check if needed

REM Backend setup
echo ========================================
echo [1/4] Installing Backend Dependencies
echo ========================================
cd backend
if not exist node_modules (
    echo Installing npm packages...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed
)

REM Check .env file
if not exist .env (
    echo.
    echo Creating .env from template...
    copy .env.example .env
    echo NOTE: Edit backend\.env with your MongoDB URI!
)

cd ..
echo Backend setup completed!
echo.

REM Frontend setup
echo ========================================
echo [2/4] Installing Frontend Dependencies
echo ========================================
cd frontend
if not exist node_modules (
    echo Installing npm packages...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed
)

REM Check .env file
if not exist .env (
    echo.
    echo Creating .env file...
    echo REACT_APP_API_URL=http://localhost:5000/api > .env
    echo NOTE: Frontend .env created
)

cd ..
echo Frontend setup completed!
echo.

REM Display instructions
echo ========================================
echo [3/4] Setup Complete!
echo ========================================
echo.
echo IMPORTANT NEXT STEPS:
echo.
echo 1. Edit backend\.env file with:
echo    - MONGODB_URI (your MongoDB connection)
echo    - JWT_SECRET (a random secret string)
echo.
echo 2. Start MongoDB (if using local instance)
echo    mongod
echo.
echo 3. Start Backend (in Terminal 1):
echo    cd backend
echo    npm run dev
echo.
echo 4. Start Frontend (in Terminal 2):
echo    cd frontend
echo    npm start
echo.
echo Then visit: http://localhost:3000
echo.

REM Optional: Ask to view documentation
echo ========================================
echo [4/4] Documentation
echo ========================================
echo.
echo Key documentation files:
echo  - INDEX.md ...................... Navigation guide
echo  - QUICK_START.md ................ 5-minute setup
echo  - README.md ..................... Project overview
echo  - API_DOCUMENTATION.md .......... API endpoints
echo  - TESTING_GUIDE.md .............. Testing help
echo  - DEPLOYMENT_GUIDE.md ........... Deployment
echo.

echo.
echo Setup complete! Read INDEX.md next.
echo.
pause
