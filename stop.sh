#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         Stopping Masharee Web Application              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"

BACKEND_PID_FILE=".backend.pid"
FRONTEND_PID_FILE=".frontend.pid"
STOPPED_COUNT=0

# Stop Backend
if [ -f "$BACKEND_PID_FILE" ]; then
  BACKEND_PID=$(cat "$BACKEND_PID_FILE")
  if kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo -e "${YELLOW}🛑 Stopping Backend Server (PID: $BACKEND_PID)...${NC}"
    kill "$BACKEND_PID" 2>/dev/null
    sleep 1
    if kill -0 "$BACKEND_PID" 2>/dev/null; then
      echo -e "${YELLOW}⚠️  Force killing Backend Server...${NC}"
      kill -9 "$BACKEND_PID" 2>/dev/null
    fi
    echo -e "${GREEN}✅ Backend Server stopped${NC}"
    STOPPED_COUNT=$((STOPPED_COUNT + 1))
  else
    echo -e "${YELLOW}⚠️  Backend Server not running${NC}"
  fi
  rm -f "$BACKEND_PID_FILE"
else
  echo -e "${YELLOW}⚠️  No Backend PID file found${NC}"
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Stop Frontend
if [ -f "$FRONTEND_PID_FILE" ]; then
  FRONTEND_PID=$(cat "$FRONTEND_PID_FILE")
  if kill -0 "$FRONTEND_PID" 2>/dev/null; then
    echo -e "${YELLOW}🛑 Stopping Frontend Server (PID: $FRONTEND_PID)...${NC}"
    kill "$FRONTEND_PID" 2>/dev/null
    sleep 1
    if kill -0 "$FRONTEND_PID" 2>/dev/null; then
      echo -e "${YELLOW}⚠️  Force killing Frontend Server...${NC}"
      kill -9 "$FRONTEND_PID" 2>/dev/null
    fi
    echo -e "${GREEN}✅ Frontend Server stopped${NC}"
    STOPPED_COUNT=$((STOPPED_COUNT + 1))
  else
    echo -e "${YELLOW}⚠️  Frontend Server not running${NC}"
  fi
  rm -f "$FRONTEND_PID_FILE"
else
  echo -e "${YELLOW}⚠️  No Frontend PID file found${NC}"
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ $STOPPED_COUNT -gt 0 ]; then
  echo -e "${GREEN}✨ All services stopped successfully!${NC}"
else
  echo -e "${YELLOW}⚠️  No services were running${NC}"
fi

# Clean up any remaining processes (optional, more aggressive)
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
