#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       Starting Masharee Investment Platform         ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# Add Docker to PATH (macOS)
export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"

# Check PostgreSQL
echo -e "${YELLOW}🔍 Checking PostgreSQL...${NC}"
if docker ps 2>/dev/null | grep -q masharee_postgres; then
    echo -e "${GREEN}✅ PostgreSQL is running${NC}"
elif docker ps -a 2>/dev/null | grep -q masharee_postgres; then
    echo -e "${YELLOW}🐳 Starting PostgreSQL container...${NC}"
    docker start masharee_postgres
    echo -e "${GREEN}✅ PostgreSQL started${NC}"
    sleep 3
else
    echo -e "${YELLOW}🐳 Creating PostgreSQL container...${NC}"
    docker compose up -d db 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ PostgreSQL created and started${NC}"
        sleep 5
    else
        echo -e "${YELLOW}⚠️  Docker not available, assuming PostgreSQL is already running${NC}"
    fi
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 Starting Next.js Development Server...${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo ""

# Check if already running
if lsof -ti:3000 >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 3000 is already in use${NC}"
    echo -e "${YELLOW}   Killing existing process...${NC}"
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

# Start Next.js
npm run dev > /dev/null 2>&1 &
NEXT_PID=$!
echo $NEXT_PID > .next.pid

echo -e "${GREEN}✅ Next.js server started (PID: $NEXT_PID)${NC}"
echo ""

# Wait for server
echo -e "${YELLOW}⏳ Waiting for server to be ready...${NC}"
for i in {1..30}; do
    if curl -s http://localhost:3000 >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Server is ready!${NC}"
        break
    fi
    sleep 1
    echo -n "."
done
echo ""

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✨ All services are running!${NC}"
echo ""
echo -e "${YELLOW}🌐 Access the application:${NC}"
echo -e "   ${GREEN}http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}🔐 Quick Login:${NC}"
echo -e "   Admin:    ${GREEN}admin@masharee.sa${NC} / ${GREEN}Admin@123456${NC}"
echo -e "   Investor: ${GREEN}mohammed@test.com${NC} / ${GREEN}Investor@123${NC}"
echo ""
echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}💡 Commands:${NC}"
echo -e "   Stop server:  ${GREEN}./stop.sh${NC}"
echo -e "   View logs:    ${GREEN}tail -f ~/.cursor/projects/*/terminals/*.txt${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo ""
