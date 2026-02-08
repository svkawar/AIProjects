#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}Inventory Management System${NC}"
echo -e "${GREEN}Starting Both Backend and Frontend${NC}"
echo -e "${GREEN}==========================================${NC}"

# Check if scripts exist
if [ ! -f "start-backend.sh" ] || [ ! -f "start-frontend.sh" ]; then
    echo -e "${RED}Error: start-backend.sh or start-frontend.sh not found${NC}"
    echo -e "${RED}Please ensure both scripts are in the root directory${NC}"
    exit 1
fi

# Make scripts executable
chmod +x start-backend.sh
chmod +x start-frontend.sh

# Function to handle cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down services...${NC}"
    # Kill both processes
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to handle Ctrl+C
trap cleanup INT TERM

# Start backend in background
echo -e "${YELLOW}Starting Backend (Spring Boot)...${NC}"
./start-backend.sh &
BACKEND_PID=$!
echo -e "${GREEN}Backend PID: $BACKEND_PID${NC}"

# Wait for backend to start
echo -e "${YELLOW}Waiting for backend to start (15 seconds)...${NC}"
sleep 15

# Start frontend in background
echo -e "${YELLOW}Starting Frontend (React)...${NC}"
./start-frontend.sh &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend PID: $FRONTEND_PID${NC}"

echo -e "\n${GREEN}==========================================${NC}"
echo -e "${GREEN}✓ Both services are starting!${NC}"
echo -e "${GREEN}==========================================${NC}"
echo -e "${YELLOW}Backend: http://localhost:8080${NC}"
echo -e "${YELLOW}Frontend: http://localhost:3000${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both services${NC}"
echo -e "${GREEN}==========================================${NC}\n"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID