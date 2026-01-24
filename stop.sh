#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       Stopping Masharee Investment Platform         ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# Stop Next.js
if [ -f .next.pid ]; then
    NEXT_PID=$(cat .next.pid)
    echo -e "${YELLOW}🛑 Stopping Next.js (PID: $NEXT_PID)...${NC}"
    kill $NEXT_PID 2>/dev/null
    rm .next.pid
    echo -e "${GREEN}✅ Next.js stopped${NC}"
else
    echo -e "${YELLOW}⚠️  No PID file found, trying to find Next.js process...${NC}"
    pkill -f "next dev" 2>/dev/null && echo -e "${GREEN}✅ Next.js stopped${NC}" || echo -e "${YELLOW}⚠️  No Next.js process found${NC}"
fi

echo ""

# Ask if user wants to stop Docker
read -p "$(echo -e ${YELLOW}Do you want to stop PostgreSQL Docker container? [y/N]: ${NC})" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🐳 Stopping PostgreSQL...${NC}"
    export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"
    docker compose down
    echo -e "${GREEN}✅ PostgreSQL stopped${NC}"
else
    echo -e "${BLUE}ℹ️  PostgreSQL container kept running${NC}"
fi

echo ""
echo -e "${GREEN}✨ Application stopped successfully!${NC}"
echo ""
