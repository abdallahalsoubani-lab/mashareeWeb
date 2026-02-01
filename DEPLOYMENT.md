# دليل رفع المشروع على السيرفر 🚀

## معلومات السيرفر
- **IP**: http://34.136.2.116/
- **اسم VM**: saker-20260129-121439
- **نظام التشغيل**: Linux (Ubuntu/Debian)

---

## خطوات الـ Deployment

### 1️⃣ الاتصال بالسيرفر

```bash
# الاتصال بالـ VM عبر SSH
gcloud compute ssh saker-20260129-121439 --zone=<your-zone>

# أو إذا كان لديك SSH key مباشر
ssh username@34.136.2.116
```

### 2️⃣ تثبيت المتطلبات على السيرفر

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Docker
sudo apt install -y docker.io docker-compose

# تثبيت Git
sudo apt install -y git

# تفعيل Docker
sudo systemctl enable docker
sudo systemctl start docker

# إضافة المستخدم الحالي لمجموعة Docker
sudo usermod -aG docker $USER

# تسجيل خروج ودخول لتفعيل التغييرات
exit
# ثم اتصل مرة أخرى
```

### 3️⃣ رفع ملفات المشروع للسيرفر

**الطريقة 1: استخدام Git (الأفضل)**

```bash
# على السيرفر
cd ~
git clone <repository-url> masharee-app
cd masharee-app
```

**الطريقة 2: استخدام SCP**

```bash
# من جهازك المحلي
cd /Users/soubani/Desktop/mashareeWeb

# ضغط المشروع
tar -czf masharee-app.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=dist \
  --exclude=.git \
  .

# رفع للسيرفر
scp masharee-app.tar.gz username@34.136.2.116:/home/username/

# على السيرفر
cd ~
tar -xzf masharee-app.tar.gz -C masharee-app
cd masharee-app
```

**الطريقة 3: استخدام rsync (الأسرع)**

```bash
# من جهازك المحلي
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude 'dist' \
  --exclude '.git' \
  /Users/soubani/Desktop/mashareeWeb/ \
  username@34.136.2.116:/home/username/masharee-app/
```

### 4️⃣ إعداد البيئة على السيرفر

```bash
# على السيرفر
cd ~/masharee-app

# إنشاء ملف .env للإنتاج
cat > .env << 'EOF'
NODE_ENV=production
DATABASE_URL=postgresql://postgres:postgres@db:5432/masharee
JWT_SECRET=$(openssl rand -base64 32)
PORT=3000
EOF

# توليد JWT_SECRET عشوائي
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env

# عرض الملف للتأكد
cat .env
```

### 5️⃣ تشغيل المشروع بـ Docker

```bash
# بناء وتشغيل جميع الخدمات
docker-compose up -d --build

# مراقبة السجلات
docker-compose logs -f

# التأكد من أن الخدمات تعمل
docker-compose ps
```

### 6️⃣ إعداد Nginx كـ Reverse Proxy

```bash
# تثبيت Nginx
sudo apt install -y nginx

# إيقاف الـ nginx الحالي مؤقتاً
sudo systemctl stop nginx

# إنشاء ملف configuration للمشروع
sudo tee /etc/nginx/sites-available/masharee << 'EOF'
server {
    listen 80;
    server_name 34.136.2.116;

    # إعدادات أمان إضافية
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
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# تفعيل الموقع
sudo ln -sf /etc/nginx/sites-available/masharee /etc/nginx/sites-enabled/

# حذف الموقع الافتراضي
sudo rm -f /etc/nginx/sites-enabled/default

# اختبار التكوين
sudo nginx -t

# إعادة تشغيل Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 7️⃣ التحقق من عمل المشروع

```bash
# التحقق من Docker
docker-compose ps

# التحقق من Nginx
sudo systemctl status nginx

# التحقق من الـ logs
docker-compose logs web --tail=50

# اختبار من السيرفر نفسه
curl http://localhost:3000
curl http://localhost:80
```

### 8️⃣ فتح المنافذ في Firewall

```bash
# على GCP
gcloud compute firewall-rules create allow-http-masharee \
  --allow tcp:80,tcp:443 \
  --source-ranges 0.0.0.0/0 \
  --target-tags=http-server

# أو إذا كنت تستخدم UFW على السيرفر
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

### 9️⃣ اختبار المشروع من المتصفح

افتح في متصفحك:
- **الموقع**: http://34.136.2.116/
- **صفحة المشاريع**: http://34.136.2.116/projects
- **صفحة الدخول**: http://34.136.2.116/login

---

## الأوامر المفيدة للإدارة

### مراقبة وإدارة Docker

```bash
# عرض حالة الخدمات
docker-compose ps

# مراقبة السجلات
docker-compose logs -f web      # سجل Next.js
docker-compose logs -f db       # سجل PostgreSQL

# إعادة تشغيل خدمة معينة
docker-compose restart web

# إعادة بناء وتشغيل
docker-compose up -d --build

# إيقاف كل شيء
docker-compose down

# حذف كل شيء مع البيانات
docker-compose down -v
```

### إدارة قاعدة البيانات

```bash
# الدخول لقاعدة البيانات
docker-compose exec db psql -U postgres -d masharee

# عمل backup
docker-compose exec db pg_dump -U postgres masharee > backup.sql

# استعادة backup
docker-compose exec -T db psql -U postgres masharee < backup.sql

# تشغيل migrations
docker-compose exec web npx prisma migrate deploy

# إضافة البيانات التجريبية
docker-compose exec web npm run db:seed
```

### مراقبة موارد النظام

```bash
# استهلاك Docker
docker stats

# مساحة القرص
df -h

# الذاكرة والمعالج
htop

# سجلات النظام
journalctl -u docker -f
```

---

## استكشاف الأخطاء

### المشروع لا يعمل

```bash
# تحقق من السجلات
docker-compose logs web --tail=100

# تحقق من المنافذ
sudo netstat -tlnp | grep 3000
sudo netstat -tlnp | grep 80

# أعد تشغيل الخدمات
docker-compose restart
```

### قاعدة البيانات لا تعمل

```bash
# تحقق من سجل قاعدة البيانات
docker-compose logs db

# أعد تشغيل قاعدة البيانات
docker-compose restart db

# تحقق من الاتصال
docker-compose exec db pg_isready -U postgres
```

### Nginx لا يعمل

```bash
# تحقق من الحالة
sudo systemctl status nginx

# تحقق من الأخطاء
sudo nginx -t
sudo tail -f /var/log/nginx/error.log

# أعد التشغيل
sudo systemctl restart nginx
```

### مشاكل الذاكرة

```bash
# عرض استهلاك الذاكرة
free -m
docker stats

# حذف صور Docker غير المستخدمة
docker system prune -af
```

---

## التحديثات المستقبلية

### تحديث الكود

```bash
# على السيرفر
cd ~/masharee-app

# سحب آخر التحديثات
git pull origin main

# إعادة بناء وتشغيل
docker-compose up -d --build

# تطبيق migrations جديدة
docker-compose exec web npx prisma migrate deploy
```

---

## الأمان والصيانة

### النسخ الاحتياطي التلقائي

```bash
# إنشاء cron job للنسخ الاحتياطي اليومي
crontab -e

# أضف هذا السطر (نسخ احتياطي يومياً الساعة 2 صباحاً)
0 2 * * * cd ~/masharee-app && docker-compose exec -T db pg_dump -U postgres masharee > ~/backups/masharee-$(date +\%Y\%m\%d).sql
```

### تحديث النظام

```bash
# تحديث دوري للنظام
sudo apt update && sudo apt upgrade -y

# تحديث Docker images
docker-compose pull
docker-compose up -d --build
```

### تنظيف الموارد

```bash
# حذف logs قديمة
docker system prune -f

# حذف images غير مستخدمة
docker image prune -af

# حذف volumes غير مستخدمة (احذر!)
docker volume prune -f
```

---

## معلومات إضافية

### بيانات الدخول التجريبية

**حساب Admin:**
- البريد: `admin@masharee.sa`
- الرمز: `Admin@123456`

**حساب مستثمر:**
- البريد: `mohammed@test.com`
- الرمز: `Investor@123`

### المنافذ المستخدمة

- `80`: Nginx (HTTP)
- `3000`: Next.js App
- `5432`: PostgreSQL

### الملفات المهمة

- `/etc/nginx/sites-available/masharee`: تكوين Nginx
- `~/masharee-app/.env`: متغيرات البيئة
- `~/masharee-app/docker-compose.yml`: تكوين Docker

---

## الدعم

إذا واجهت أي مشاكل:
1. راجع السجلات: `docker-compose logs -f`
2. تحقق من الحالة: `docker-compose ps`
3. أعد التشغيل: `docker-compose restart`
4. تواصل مع فريق التطوير

---

✅ بالتوفيق! المشروع الآن جاهز للعمل على السيرفر.
