#!/bin/bash

###############################################################################
# Masharee Deployment Script
# هذا السكريبت يقوم برفع المشروع للسيرفر تلقائياً
###############################################################################

set -e  # إيقاف عند أي خطأ

# الألوان
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# معلومات السيرفر
SERVER_IP="34.136.2.116"
SERVER_USER="${SERVER_USER:-username}"  # غير username لاسم المستخدم الفعلي
VM_NAME="saker-20260129-121439"
APP_DIR="masharee-app"

###############################################################################
# الدوال المساعدة
###############################################################################

print_header() {
    echo ""
    echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

###############################################################################
# التحقق من المتطلبات المحلية
###############################################################################

check_local_requirements() {
    print_header "التحقق من المتطلبات المحلية"
    
    # التحقق من rsync
    if command -v rsync &> /dev/null; then
        print_success "rsync متوفر"
    else
        print_error "rsync غير متوفر. الرجاء تثبيته: brew install rsync"
        exit 1
    fi
    
    # التحقق من ssh
    if command -v ssh &> /dev/null; then
        print_success "ssh متوفر"
    else
        print_error "ssh غير متوفر"
        exit 1
    fi
}

###############################################################################
# رفع الملفات للسيرفر
###############################################################################

upload_files() {
    print_header "رفع ملفات المشروع للسيرفر"
    
    print_info "جاري الرفع إلى $SERVER_USER@$SERVER_IP..."
    
    rsync -avz --progress \
        --exclude 'node_modules' \
        --exclude '.next' \
        --exclude 'dist' \
        --exclude '.git' \
        --exclude '*.log' \
        --exclude '.env.local' \
        --exclude '.DS_Store' \
        ./ "$SERVER_USER@$SERVER_IP:~/$APP_DIR/"
    
    print_success "تم رفع الملفات بنجاح"
}

###############################################################################
# إعداد السيرفر
###############################################################################

setup_server() {
    print_header "إعداد السيرفر"
    
    ssh "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
        set -e
        
        # تحديث النظام
        echo "تحديث النظام..."
        sudo apt update -qq
        
        # تثبيت Docker إذا لم يكن موجوداً
        if ! command -v docker &> /dev/null; then
            echo "تثبيت Docker..."
            sudo apt install -y docker.io docker-compose
            sudo systemctl enable docker
            sudo systemctl start docker
            sudo usermod -aG docker $USER
        else
            echo "✓ Docker موجود بالفعل"
        fi
        
        # تثبيت Nginx إذا لم يكن موجوداً
        if ! command -v nginx &> /dev/null; then
            echo "تثبيت Nginx..."
            sudo apt install -y nginx
        else
            echo "✓ Nginx موجود بالفعل"
        fi
ENDSSH
    
    print_success "تم إعداد السيرفر"
}

###############################################################################
# إعداد البيئة
###############################################################################

setup_environment() {
    print_header "إعداد ملف البيئة (.env)"
    
    ssh "$SERVER_USER@$SERVER_IP" << ENDSSH
        set -e
        cd ~/$APP_DIR
        
        # إنشاء .env إذا لم يكن موجوداً
        if [ ! -f .env ]; then
            echo "إنشاء ملف .env..."
            cat > .env << 'EOF'
NODE_ENV=production
DATABASE_URL=postgresql://postgres:postgres@db:5432/masharee
PORT=3000
EOF
            # توليد JWT_SECRET عشوائي
            echo "JWT_SECRET=\$(openssl rand -base64 32)" >> .env
            echo "✓ تم إنشاء ملف .env"
        else
            echo "✓ ملف .env موجود بالفعل"
        fi
        
        # عرض محتوى الملف (بدون JWT_SECRET للأمان)
        echo ""
        echo "محتوى ملف .env:"
        grep -v "JWT_SECRET" .env || true
ENDSSH
    
    print_success "تم إعداد ملف البيئة"
}

###############################################################################
# إعداد Nginx
###############################################################################

setup_nginx() {
    print_header "إعداد Nginx"
    
    ssh "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
        set -e
        
        # إنشاء ملف التكوين
        sudo tee /etc/nginx/sites-available/masharee > /dev/null << 'EOF'
server {
    listen 80;
    server_name 34.136.2.116;

    client_max_body_size 50M;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF
        
        # تفعيل الموقع
        sudo ln -sf /etc/nginx/sites-available/masharee /etc/nginx/sites-enabled/
        sudo rm -f /etc/nginx/sites-enabled/default
        
        # اختبار التكوين
        sudo nginx -t
        
        # إعادة تشغيل Nginx
        sudo systemctl restart nginx
        sudo systemctl enable nginx
        
        echo "✓ تم إعداد Nginx"
ENDSSH
    
    print_success "تم إعداد Nginx"
}

###############################################################################
# بناء وتشغيل Docker
###############################################################################

deploy_docker() {
    print_header "بناء وتشغيل المشروع بـ Docker"
    
    print_info "هذه العملية قد تستغرق عدة دقائق..."
    
    ssh "$SERVER_USER@$SERVER_IP" << ENDSSH
        set -e
        cd ~/$APP_DIR
        
        # إيقاف الخدمات القديمة إذا كانت موجودة
        if [ -f docker-compose.yml ]; then
            echo "إيقاف الخدمات القديمة..."
            docker-compose down || true
        fi
        
        # بناء وتشغيل
        echo "بناء وتشغيل الخدمات..."
        docker-compose up -d --build
        
        # الانتظار حتى تصبح الخدمات جاهزة
        echo "انتظار جاهزية الخدمات..."
        sleep 10
        
        # عرض حالة الخدمات
        echo ""
        echo "حالة الخدمات:"
        docker-compose ps
        
        # عرض السجلات الأخيرة
        echo ""
        echo "السجلات الأخيرة:"
        docker-compose logs --tail=20
ENDSSH
    
    print_success "تم تشغيل المشروع"
}

###############################################################################
# التحقق من عمل المشروع
###############################################################################

verify_deployment() {
    print_header "التحقق من عمل المشروع"
    
    print_info "اختبار الاتصال بالمشروع..."
    
    # الانتظار قليلاً حتى يبدأ المشروع
    sleep 5
    
    # اختبار من السيرفر
    ssh "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
        set -e
        
        echo "اختبار المنفذ 3000 (Next.js)..."
        curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "لم ينجح"
        
        echo "اختبار المنفذ 80 (Nginx)..."
        curl -s -o /dev/null -w "%{http_code}" http://localhost:80 || echo "لم ينجح"
ENDSSH
    
    # اختبار من الجهاز المحلي
    print_info "اختبار من الجهاز المحلي..."
    if curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP" | grep -q "200\|301\|302"; then
        print_success "المشروع يعمل بنجاح!"
    else
        print_warning "قد تكون هناك مشكلة في الوصول للمشروع"
    fi
}

###############################################################################
# عرض المعلومات النهائية
###############################################################################

show_final_info() {
    print_header "معلومات المشروع"
    
    echo -e "${GREEN}تم رفع المشروع بنجاح! 🎉${NC}"
    echo ""
    echo "معلومات الوصول:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "  الموقع: ${BLUE}http://$SERVER_IP/${NC}"
    echo -e "  المشاريع: ${BLUE}http://$SERVER_IP/projects${NC}"
    echo -e "  تسجيل الدخول: ${BLUE}http://$SERVER_IP/login${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "بيانات الدخول التجريبية:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Admin:"
    echo "    البريد: admin@masharee.sa"
    echo "    الرمز: Admin@123456"
    echo ""
    echo "  مستثمر:"
    echo "    البريد: mohammed@test.com"
    echo "    الرمز: Investor@123"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "أوامر مفيدة على السيرفر:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  ssh $SERVER_USER@$SERVER_IP"
    echo "  cd ~/$APP_DIR"
    echo "  docker-compose ps              # حالة الخدمات"
    echo "  docker-compose logs -f         # السجلات"
    echo "  docker-compose restart         # إعادة تشغيل"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
}

###############################################################################
# الدالة الرئيسية
###############################################################################

main() {
    clear
    echo -e "${GREEN}"
    echo "  ╔═══════════════════════════════════════════════════════╗"
    echo "  ║                                                       ║"
    echo "  ║          Masharee Deployment Script 🚀               ║"
    echo "  ║                                                       ║"
    echo "  ╚═══════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    echo -e "${YELLOW}سيتم رفع المشروع على:${NC}"
    echo -e "  IP: ${BLUE}$SERVER_IP${NC}"
    echo -e "  VM: ${BLUE}$VM_NAME${NC}"
    echo ""
    
    # التأكيد من المستخدم
    read -p "هل تريد المتابعة؟ (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "تم الإلغاء"
        exit 1
    fi
    
    # تنفيذ الخطوات
    check_local_requirements
    upload_files
    setup_server
    setup_environment
    setup_nginx
    deploy_docker
    verify_deployment
    show_final_info
}

###############################################################################
# تشغيل السكريبت
###############################################################################

main "$@"
