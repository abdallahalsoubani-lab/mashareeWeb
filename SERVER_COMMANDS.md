# أوامر السيرفر - مرجع سريع 🖥️

## الاتصال بالسيرفر

```bash
# الطريقة 1: عبر gcloud
gcloud compute ssh saker-20260129-121439

# الطريقة 2: عبر SSH
ssh username@34.136.2.116
```

---

## إدارة Docker 🐳

### حالة الخدمات
```bash
cd ~/masharee-app
docker-compose ps
```

### السجلات
```bash
# جميع السجلات
docker-compose logs -f

# سجل Next.js فقط
docker-compose logs -f web

# سجل PostgreSQL فقط
docker-compose logs -f db

# آخر 50 سطر
docker-compose logs --tail=50 web
```

### إعادة التشغيل
```bash
# إعادة تشغيل جميع الخدمات
docker-compose restart

# إعادة تشغيل Next.js فقط
docker-compose restart web

# إعادة تشغيل قاعدة البيانات فقط
docker-compose restart db
```

### إيقاف وتشغيل
```bash
# إيقاف جميع الخدمات
docker-compose down

# تشغيل جميع الخدمات
docker-compose up -d

# تشغيل مع إعادة بناء
docker-compose up -d --build
```

### تنظيف الموارد
```bash
# حذف containers و images غير مستخدمة
docker system prune -f

# حذف كل شيء (احذر!)
docker system prune -af

# حذف volumes (يحذف قاعدة البيانات!)
docker-compose down -v
```

---

## إدارة Nginx 🌐

### حالة Nginx
```bash
# التحقق من حالة الخدمة
sudo systemctl status nginx

# إعادة تشغيل
sudo systemctl restart nginx

# إعادة تحميل التكوين
sudo systemctl reload nginx

# اختبار التكوين
sudo nginx -t
```

### السجلات
```bash
# سجل الأخطاء
sudo tail -f /var/log/nginx/error.log

# سجل الوصول
sudo tail -f /var/log/nginx/access.log

# سجل المشروع
sudo tail -f /var/log/nginx/masharee-error.log
sudo tail -f /var/log/nginx/masharee-access.log
```

### تعديل التكوين
```bash
# تعديل ملف التكوين
sudo nano /etc/nginx/sites-available/masharee

# اختبار التكوين
sudo nginx -t

# تطبيق التغييرات
sudo systemctl reload nginx
```

---

## إدارة قاعدة البيانات 💾

### الاتصال بقاعدة البيانات
```bash
# الدخول لـ PostgreSQL
docker-compose exec db psql -U postgres -d masharee

# استعلام سريع
docker-compose exec db psql -U postgres -d masharee -c "SELECT * FROM users LIMIT 5;"
```

### النسخ الاحتياطي
```bash
# عمل backup
docker-compose exec db pg_dump -U postgres masharee > backup-$(date +%Y%m%d).sql

# استعادة backup
docker-compose exec -T db psql -U postgres masharee < backup-20260129.sql
```

### Migrations
```bash
# تطبيق migrations
docker-compose exec web npx prisma migrate deploy

# عرض حالة migrations
docker-compose exec web npx prisma migrate status

# إعادة توليد Prisma Client
docker-compose exec web npx prisma generate
```

### البيانات التجريبية
```bash
# إضافة البيانات التجريبية
docker-compose exec web npm run db:seed

# إعادة تعيين قاعدة البيانات (احذر!)
docker-compose exec web npm run db:reset
```

---

## المراقبة والصيانة 📊

### موارد النظام
```bash
# استهلاك الذاكرة والمعالج
htop

# مساحة القرص
df -h

# استهلاك Docker containers
docker stats

# استهلاك قاعدة البيانات
docker-compose exec db psql -U postgres -c "\l+"
```

### المنافذ
```bash
# التحقق من المنافذ المفتوحة
sudo netstat -tlnp

# التحقق من منفذ معين
sudo netstat -tlnp | grep 3000
sudo netstat -tlnp | grep 80
```

### العمليات
```bash
# عمليات Docker
docker ps

# جميع الـ containers (بما فيها المتوقفة)
docker ps -a

# استهلاك الموارد
top
```

---

## التحديثات 🔄

### تحديث الكود
```bash
cd ~/masharee-app

# سحب آخر التحديثات من Git
git pull origin main

# إعادة بناء وتشغيل
docker-compose up -d --build

# تطبيق migrations جديدة
docker-compose exec web npx prisma migrate deploy

# مراقبة السجلات
docker-compose logs -f web
```

### تحديث النظام
```bash
# تحديث الحزم
sudo apt update
sudo apt upgrade -y

# تحديث Docker
sudo apt install --only-upgrade docker.io docker-compose

# إعادة تشغيل النظام (إذا لزم)
sudo reboot
```

---

## اختبار المشروع 🧪

### اختبار من السيرفر نفسه
```bash
# اختبار Next.js (منفذ 3000)
curl http://localhost:3000

# اختبار Nginx (منفذ 80)
curl http://localhost:80

# اختبار API
curl http://localhost:3000/api/projects

# عرض headers
curl -I http://localhost:80
```

### اختبار من الخارج
```bash
# من جهازك المحلي
curl http://34.136.2.116/
curl http://34.136.2.116/api/projects
```

---

## استكشاف الأخطاء 🔍

### المشروع لا يعمل
```bash
# 1. تحقق من السجلات
docker-compose logs --tail=100 web

# 2. تحقق من حالة الخدمات
docker-compose ps

# 3. تحقق من ملف .env
cat .env

# 4. أعد التشغيل
docker-compose restart

# 5. إعادة بناء كاملة
docker-compose down
docker-compose up -d --build
```

### قاعدة البيانات لا تستجيب
```bash
# 1. تحقق من السجلات
docker-compose logs db --tail=50

# 2. تحقق من الاتصال
docker-compose exec db pg_isready -U postgres

# 3. أعد تشغيل قاعدة البيانات
docker-compose restart db

# 4. تحقق من الـ healthcheck
docker inspect masharee-app_db_1 | grep Health
```

### Nginx لا يعمل
```bash
# 1. تحقق من الحالة
sudo systemctl status nginx

# 2. اختبار التكوين
sudo nginx -t

# 3. تحقق من السجلات
sudo tail -f /var/log/nginx/error.log

# 4. أعد التشغيل
sudo systemctl restart nginx
```

### نفاذ المساحة
```bash
# تحقق من المساحة
df -h

# حذف logs قديمة
sudo journalctl --vacuum-time=7d

# تنظيف Docker
docker system prune -af
docker volume prune -f

# حذف backups قديمة (إذا وجدت)
rm -f ~/backup-*.sql
```

### بطء في الأداء
```bash
# التحقق من استهلاك الموارد
docker stats

# التحقق من logs للأخطاء
docker-compose logs web --tail=100 | grep -i error

# إعادة تشغيل
docker-compose restart

# إذا استمرت المشكلة، أعد تشغيل السيرفر
sudo reboot
```

---

## أوامر طوارئ 🚨

### إيقاف كل شيء
```bash
docker-compose down
sudo systemctl stop nginx
```

### بدء من جديد
```bash
cd ~/masharee-app
docker-compose down -v  # يحذف قاعدة البيانات!
docker-compose up -d --build
docker-compose logs -f
```

### استعادة من backup
```bash
# إيقاف الخدمات
docker-compose down

# بدء قاعدة البيانات فقط
docker-compose up -d db

# استعادة backup
docker-compose exec -T db psql -U postgres masharee < backup.sql

# تشغيل المشروع
docker-compose up -d
```

---

## معلومات مهمة 📌

### الملفات المهمة
- `/etc/nginx/sites-available/masharee` - تكوين Nginx
- `~/masharee-app/.env` - متغيرات البيئة
- `~/masharee-app/docker-compose.yml` - تكوين Docker

### المنافذ
- `80` - Nginx (HTTP)
- `3000` - Next.js
- `5432` - PostgreSQL

### بيانات الدخول
- **Admin**: admin@masharee.sa / Admin@123456
- **مستثمر**: mohammed@test.com / Investor@123

### روابط مفيدة
- الموقع: http://34.136.2.116/
- لوحة الإدارة: http://34.136.2.116/admin
- API: http://34.136.2.116/api/projects

---

## Cron Jobs مفيدة ⏰

### نسخ احتياطي يومي
```bash
# تعديل crontab
crontab -e

# إضافة backup يومياً الساعة 2 صباحاً
0 2 * * * cd ~/masharee-app && docker-compose exec -T db pg_dump -U postgres masharee > ~/backups/masharee-$(date +\%Y\%m\%d).sql

# حذف backups أقدم من 30 يوم
0 3 * * * find ~/backups -name "masharee-*.sql" -mtime +30 -delete
```

### تنظيف Docker أسبوعياً
```bash
# كل أحد الساعة 3 صباحاً
0 3 * * 0 docker system prune -f
```

---

✅ احفظ هذا الملف للرجوع إليه عند الحاجة!
