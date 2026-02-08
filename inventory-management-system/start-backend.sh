#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Inventory Management Backend...${NC}"

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo -e "${RED}Maven is not installed. Please install Maven first.${NC}"
    exit 1
fi

# Navigate to backend directory
cd backend || { echo -e "${RED}Backend directory not found${NC}"; exit 1; }

# Clean and build
echo -e "${YELLOW}Building the project...${NC}"
mvn clean install

# Check if build was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

# Run the Spring Boot application
echo -e "${GREEN}Starting Spring Boot application on port 8080...${NC}"
mvn spring-boot:run