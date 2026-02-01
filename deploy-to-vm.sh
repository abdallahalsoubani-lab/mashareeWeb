#!/bin/bash

# Deployment Script for Masharee to Google Cloud VM
# VM Name: saker-20260129-121439

set -e

echo "🚀 Starting deployment to Google Cloud VM..."

# Configuration
VM_NAME="saker-20260129-121439"
VM_USER="soubani"
VM_ZONE="us-central1-a"  # تحديث حسب المنطقة الفعلية

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 VM Details:${NC}"
echo "   Name: $VM_NAME"
echo "   User: $VM_USER"
echo ""

# Step 1: Export database
echo -e "${BLUE}1️⃣  Exporting current database...${NC}"
PGPASSWORD=masharee_password pg_dump -U masharee_user -h localhost -d masharee_db > database_backup.sql
echo -e "${GREEN}✅ Database exported${NC}"

# Step 2: Create deployment package
echo -e "${BLUE}2️⃣  Creating deployment package...${NC}"
tar -czf masharee-deploy.tar.gz \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='database_backup.sql' \
    --exclude='*.md' \
    .
echo -e "${GREEN}✅ Package created${NC}"

# Step 3: Copy to VM
echo -e "${BLUE}3️⃣  Copying files to VM...${NC}"
gcloud compute scp masharee-deploy.tar.gz $VM_USER@$VM_NAME:~/ --zone=$VM_ZONE
gcloud compute scp database_backup.sql $VM_USER@$VM_NAME:~/ --zone=$VM_ZONE
echo -e "${GREEN}✅ Files copied${NC}"

# Step 4: Setup and deploy on VM
echo -e "${BLUE}4️⃣  Setting up VM and deploying...${NC}"
gcloud compute ssh $VM_USER@$VM_NAME --zone=$VM_ZONE << 'ENDSSH'
set -e

echo "🧹 Cleaning up old files..."
sudo docker compose down -v 2>/dev/null || true
sudo docker system prune -af
rm -rf ~/masharee
mkdir -p ~/masharee

echo "📦 Extracting files..."
tar -xzf ~/masharee-deploy.tar.gz -C ~/masharee/
cd ~/masharee

echo "🐳 Installing Docker (if needed)..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
fi

echo "🔧 Installing Docker Compose (if needed)..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

echo "📝 Setting up environment..."
cat > .env.production << EOF
DATABASE_URL=postgresql://masharee_user:masharee_password_secure_2026@postgres:5432/masharee_db
NEXTAUTH_SECRET=masharee-production-secret-key-2026-very-secure
NEXTAUTH_URL=http://$(curl -s ifconfig.me):3000
NODE_ENV=production
EOF

echo "🏗️  Building and starting containers..."
sudo docker compose up -d --build

echo "⏳ Waiting for containers to be ready..."
sleep 10

echo "📊 Importing database..."
sudo docker exec -i masharee-postgres psql -U masharee_user -d masharee_db < ~/database_backup.sql || echo "Database import skipped (might already have data)"

echo "🔄 Running migrations..."
sudo docker exec masharee-app npx prisma migrate deploy || true

echo "✅ Deployment completed!"
echo ""
echo "🌐 Application URL: http://$(curl -s ifconfig.me):3000"
echo ""
echo "📊 Container status:"
sudo docker compose ps

ENDSSH

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}🔍 To check logs:${NC}"
echo "   gcloud compute ssh $VM_USER@$VM_NAME --zone=$VM_ZONE --command 'cd ~/masharee && sudo docker compose logs -f'"
echo ""
echo -e "${BLUE}🔄 To restart:${NC}"
echo "   gcloud compute ssh $VM_USER@$VM_NAME --zone=$VM_ZONE --command 'cd ~/masharee && sudo docker compose restart'"

# Cleanup local files
rm -f masharee-deploy.tar.gz database_backup.sql

echo ""
echo -e "${GREEN}🎉 All done!${NC}"
