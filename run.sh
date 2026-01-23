#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script configuration
PROJECT_NAME="Masharee Web"
BACKEND_PID_FILE=".backend.pid"
FRONTEND_PID_FILE=".frontend.pid"

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         Starting ${PROJECT_NAME} Application          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
  echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
  if [ -f .env.example ]; then
    cp .env.example .env
    echo -e "${YELLOW}📝 Please update the .env file with your configuration before running the application.${NC}"
  else
    echo -e "${RED}❌ .env.example not found. Please create .env file manually.${NC}"
    exit 1
  fi
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}📦 Installing dependencies...${NC}"
  npm install
fi

# Kill any existing processes from previous runs
if [ -f "$BACKEND_PID_FILE" ]; then
  BACKEND_PID=$(cat "$BACKEND_PID_FILE")
  if kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo -e "${YELLOW}🛑 Stopping old backend process (PID: $BACKEND_PID)...${NC}"
    kill "$BACKEND_PID" 2>/dev/null
    sleep 1
  fi
  rm "$BACKEND_PID_FILE"
fi

if [ -f "$FRONTEND_PID_FILE" ]; then
  FRONTEND_PID=$(cat "$FRONTEND_PID_FILE")
  if kill -0 "$FRONTEND_PID" 2>/dev/null; then
    echo -e "${YELLOW}🛑 Stopping old frontend process (PID: $FRONTEND_PID)...${NC}"
    kill "$FRONTEND_PID" 2>/dev/null
    sleep 1
  fi
  rm "$FRONTEND_PID_FILE"
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Start Backend Server
echo -e "${BLUE}🚀 Starting Backend Server...${NC}"
npm run server:dev &
BACKEND_PID=$!
echo $BACKEND_PID > "$BACKEND_PID_FILE"
echo -e "${GREEN}✅ Backend Server started (PID: $BACKEND_PID)${NC}"
echo -e "${GREEN}   📡 API: http://localhost:5000/api${NC}"
sleep 2

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Start Frontend Development Server
echo -e "${BLUE}🚀 Starting Frontend Development Server...${NC}"
npm run dev &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$FRONTEND_PID_FILE"
echo -e "${GREEN}✅ Frontend Server started (PID: $FRONTEND_PID)${NC}"
echo -e "${GREEN}   🌐 Frontend: http://localhost:5173${NC}"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ All services are running!${NC}"
echo -e "${YELLOW}📝 Default Admin Credentials (you'll need to create these in database):${NC}"
echo -e "   Email: admin@masharee.com"
echo -e "   Password: admin123"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}💡 To stop the application, run: ./stop.sh${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Wait for processes
wait
