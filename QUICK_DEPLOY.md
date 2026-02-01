# دليل الـ Deployment السريع ⚡

## الطريقة الأسهل (موصى بها) 🚀

### الخطوة 1: تعديل معلومات الاتصال

افتح ملف `deploy.sh` وعدل السطر التالي:

```bash
SERVER_USER="${SERVER_USER:-username}"  # غير username لاسم المستخدم الفعلي
```

### الخطوة 2: تشغيل السكريبت

```bash
cd /Users/soubani/Desktop/mashareeWeb
./deploy.sh
```

**هذا كل شيء!** السكريبت سيقوم بكل شيء تلقائياً:
- ✅ رفع الملفات
- ✅ تثبيت المتطلبات
- ✅ إعداد Docker و Nginx
- ✅ تشغيل المشروع

---

## الطريقة اليدوية (خطوة بخطوة) 📝

### 1. الاتصال بالـ VM

```bash
# استخدم أحد الأوامر التالية:

# الطريقة 1: عبر gcloud
gcloud compute ssh saker-20260129-121439

# الطريقة 2: عبر SSH مباشر (إذا كان لديك الصلاحيات)
ssh username@34.136.2.116
```

### 2. رفع المشروع

**من جهازك المحلي:**

```bash
cd /Users/soubani/Desktop/mashareeWeb

# رفع الملفات
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude 'dist' \
  --exclude '.git' \
  ./ username@34.136.2.116:~/masharee-app/
```

### 3. على السيرفر: تثبيت المتطلبات

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Docker
sudo apt install -y docker.io docker-compose git nginx

# تفعيل Docker
sudo systemctl enable docker
sudo systemctl start docker
```

### 4. إعداد البيئة

```bash
cd ~/masharee-app

# إنشاء ملف .env
cat > .env << 'EOF'
NODE_ENV=production
DATABASE_URL=postgresql://postgres:postgres@db:5432/masharee
PORT=3000
EOF

# إضافة JWT_SECRET عشوائي
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env
```

### 5. إعداد Nginx

```bash
# إنشاء ملف التكوين
sudo tee /etc/nginx/sites-available/masharee << 'EOF'
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

# إعادة تشغيل Nginx
sudo nginx -t
sudo systemctl restart nginx
```

### 6. تشغيل المشروع

```bash
cd ~/masharee-app

# بناء وتشغيل
docker-compose up -d --build

# مراقبة السجلات
docker-compose logs -f
```

### 7. التحقق من عمل المشروع

افتح في المتصفح: **http://34.136.2.116/**

---

## أوامر سريعة للإدارة 🛠️

```bash
# مراقبة السجلات
docker-compose logs -f web

# إعادة تشغيل
docker-compose restart

# إيقاف
docker-compose down

# حالة الخدمات
docker-compose ps

# تحديث المشروع
git pull && docker-compose up -d --build
```

---

## معلومات مهمة 📌

### بيانات الدخول:
- **Admin**: `admin@masharee.sa` / `Admin@123456`
- **مستثمر**: `mohammed@test.com` / `Investor@123`

### الروابط:
- الرئيسية: http://34.136.2.116/
- المشاريع: http://34.136.2.116/projects
- تسجيل الدخول: http://34.136.2.116/login
- لوحة الإدارة: http://34.136.2.116/admin

### المنافذ المستخدمة:
- `80` - Nginx (HTTP)
- `3000` - Next.js
- `5432` - PostgreSQL

---

## استكشاف الأخطاء 🔍

### المشروع لا يعمل؟

```bash
# تحقق من السجلات
docker-compose logs web --tail=100

# تحقق من حالة الخدمات
docker-compose ps

# أعد التشغيل
docker-compose restart
```

### لا يمكن الوصول للموقع؟

```bash
# تحقق من Nginx
sudo systemctl status nginx
sudo nginx -t

# تحقق من Firewall
sudo ufw status
sudo ufw allow 80/tcp
```

### قاعدة البيانات لا تعمل؟

```bash
# تحقق من سجل قاعدة البيانات
docker-compose logs db

# أعد تشغيل قاعدة البيانات
docker-compose restart db
```

---

## الدعم 💬

للمزيد من المعلومات، راجع ملف `DEPLOYMENT.md` للدليل الكامل.
