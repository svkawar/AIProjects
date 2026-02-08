@echo off
setlocal enabledelayedexpansion

echo.
echo ============================================
echo Inventory Management Frontend
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js first
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if errorlevel 1 (
    echo ERROR: npm is not installed or not in PATH
    echo Please install Node.js and npm first
    pause
    exit /b 1
)

REM Navigate to frontend directory
cd frontend || (
    echo ERROR: Frontend directory not found
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo Starting React application on port 3000...
echo.
call npm start

pause