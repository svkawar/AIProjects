@echo off
setlocal enabledelayedexpansion

echo.
echo ============================================
echo Inventory Management System
echo Starting Both Backend and Frontend
echo ============================================
echo.

REM Check if scripts exist
if not exist "start-backend.bat" (
    echo ERROR: start-backend.bat not found
    pause
    exit /b 1
)

if not exist "start-frontend.bat" (
    echo ERROR: start-frontend.bat not found
    pause
    exit /b 1
)

echo.
echo Starting Backend (Spring Boot) in new window...
start "Backend - Spring Boot" cmd /k start-backend.bat

echo Waiting 15 seconds for backend to start...
timeout /t 15 /nobreak

echo.
echo Starting Frontend (React) in new window...
start "Frontend - React" cmd /k start-frontend.bat

echo.
echo ============================================
echo Both services are starting!
echo ============================================
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo ============================================
echo.
echo Close the individual windows to stop the services.

pause