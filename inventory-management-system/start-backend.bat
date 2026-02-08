@echo off
setlocal enabledelayedexpansion

echo.
echo ============================================
echo Inventory Management Backend
echo ============================================
echo.

REM Check if Maven is installed
where mvn >nul 2>nul
if errorlevel 1 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven and add it to PATH
    pause
    exit /b 1
)

REM Navigate to backend directory
cd backend || (
    echo ERROR: Backend directory not found
    pause
    exit /b 1
)

echo Starting Maven build...
call mvn clean install
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application on port 8080...
echo.
call mvn spring-boot:run

pause