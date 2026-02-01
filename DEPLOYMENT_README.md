# دليل ملفات الـ Deployment 📚

هذا المشروع جاهز تماماً للـ deployment على السيرفر **34.136.2.116** (VM: saker-20260129-121439)

---

## الملفات المتوفرة 📄

### 1. `QUICK_DEPLOY.md` ⚡ (ابدأ من هنا!)
**الملف الأول الذي يجب قراءته**

يحتوي على:
- طريقتين للـ deployment (سريعة ويدوية)
- خطوات مختصرة وواضحة
- أوامر سريعة للإدارة

**استخدمه إذا كنت**: تريد البدء فوراً بدون تفاصيل كثيرة

---

### 2. `deploy.sh` 🤖 (السكريبت التلقائي)
**سكريبت يقوم بكل شيء تلقائياً**

الميزات:
- ✅ رفع الملفات تلقائياً
- ✅ تثبيت المتطلبات
- ✅ إعداد Docker و Nginx
- ✅ تشغيل المشروع
- ✅ اختبار التشغيل

**الاستخدام**:
```bash
# 1. عدل اسم المستخدم في السكريبت
nano deploy.sh  # ابحث عن SERVER_USER

# 2. شغل السكريبت
./deploy.sh
```

---

### 3. `DEPLOYMENT.md` 📖 (الدليل الشامل)
**دليل كامل ومفصل**

يحتوي على:
- شرح مفصل لكل خطوة
- أوامر استكشاف الأخطاء
- إدارة النظام والصيانة
- النسخ الاحتياطي والتحديثات

**استخدمه إذا كنت**: تواجه مشكلة أو تريد فهم التفاصيل

---

### 4. `SERVER_COMMANDS.md` 🖥️ (مرجع الأوامر)
**قائمة شاملة بجميع الأوامر المفيدة**

أقسام:
- إدارة Docker
- إدارة Nginx
- إدارة قاعدة البيانات
- المراقبة والصيانة
- استكشاف الأخطاء

**استخدمه إذا كنت**: تحتاج أمر معين بسرعة

---

### 5. `DEPLOYMENT_CHECKLIST.md` ✅ (قائمة التحقق)
**تأكد من أنك لم تنسى شيء**

يحتوي على:
- قائمة خطوات قبل البدء
- قائمة خطوات الـ deployment
- اختبارات وظيفية
- اختبارات الأمان والأداء

**استخدمه**: أثناء وبعد الـ deployment

---

### 6. `nginx.conf` 🌐 (تكوين Nginx)
**ملف جاهز لـ Nginx**

يحتوي على:
- Reverse proxy للـ Next.js
- WebSocket support
- Security headers
- Caching settings

**الاستخدام**:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/masharee
sudo ln -sf /etc/nginx/sites-available/masharee /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### 7. `env.production.example` 🔐 (إعدادات البيئة)
**مثال على ملف .env للإنتاج**

يحتوي على:
- متغيرات البيئة الضرورية
- شرح لكل متغير
- ملاحظات أمان

**الاستخدام**:
```bash
# على السيرفر
cp env.production.example .env
nano .env  # عدل JWT_SECRET
```

---

### 8. `docker-compose.yml` 🐳 (موجود مسبقاً)
**تكوين Docker للمشروع**

الخدمات:
- Next.js App (منفذ 3000)
- PostgreSQL 16 (منفذ 5432)
- Network مشترك
- Volume للبيانات

---

### 9. `Dockerfile` 🐋 (موجود مسبقاً)
**ملف بناء Docker**

مراحل البناء:
- Dependencies stage
- Builder stage
- Production runner stage

---

## خطة الـ Deployment الموصى بها 🎯

### المرة الأولى (Setup كامل):

```
1. اقرأ QUICK_DEPLOY.md (5 دقائق)
   ↓
2. عدل deploy.sh ووضع username الصحيح
   ↓
3. شغل ./deploy.sh (10-15 دقيقة)
   ↓
4. استخدم DEPLOYMENT_CHECKLIST.md للتحقق
   ↓
5. اختبر المشروع في المتصفح
   ↓
6. احفظ SERVER_COMMANDS.md للرجوع إليه
```

### التحديثات المستقبلية:

```bash
# على السيرفر
cd ~/masharee-app
git pull origin main
docker-compose up -d --build
docker-compose exec web npx prisma migrate deploy
```

---

## سيناريوهات الاستخدام 🎬

### سيناريو 1: أول مرة deployment
1. ✅ اقرأ `QUICK_DEPLOY.md`
2. ✅ شغل `deploy.sh`
3. ✅ استخدم `DEPLOYMENT_CHECKLIST.md`

### سيناريو 2: المشروع لا يعمل
1. 🔍 افتح `SERVER_COMMANDS.md`
2. 🔍 اذهب لقسم "استكشاف الأخطاء"
3. 🔍 نفذ الأوامر المقترحة

### سيناريو 3: تحديث الكود
1. 🔄 اتصل بالسيرفر
2. 🔄 استخدم أوامر التحديث من `SERVER_COMMANDS.md`
3. 🔄 راقب السجلات

### سيناريو 4: نسيت أمر معين
1. 📖 افتح `SERVER_COMMANDS.md`
2. 📖 ابحث في القسم المناسب
3. 📖 نسخ الأمر ونفذه

---

## معلومات سريعة 📌

### بيانات السيرفر
```
IP: 34.136.2.116
VM: saker-20260129-121439
SSH: ssh username@34.136.2.116
```

### الروابط
```
الموقع: http://34.136.2.116/
المشاريع: http://34.136.2.116/projects
الدخول: http://34.136.2.116/login
الإدارة: http://34.136.2.116/admin
```

### بيانات الدخول
```
Admin: admin@masharee.sa / Admin@123456
مستثمر: mohammed@test.com / Investor@123
```

### أوامر الطوارئ
```bash
# إعادة تشغيل سريعة
docker-compose restart

# عرض السجلات
docker-compose logs -f web

# حالة الخدمات
docker-compose ps

# اختبار الموقع
curl http://localhost:80
```

---

## ترتيب القراءة الموصى به 📚

### للمبتدئين:
1. 📗 `QUICK_DEPLOY.md` (اقرأ أولاً)
2. 📘 `DEPLOYMENT_CHECKLIST.md` (استخدم أثناء العمل)
3. 📙 `SERVER_COMMANDS.md` (احفظ للرجوع إليه)

### للمتقدمين:
1. 📗 `QUICK_DEPLOY.md` (نظرة سريعة)
2. 📘 `DEPLOYMENT.md` (للتفاصيل الدقيقة)
3. 📙 `SERVER_COMMANDS.md` (مرجع دائم)

### عند حدوث مشكلة:
1. 🔴 `SERVER_COMMANDS.md` → قسم استكشاف الأخطاء
2. 🔴 `DEPLOYMENT.md` → قسم استكشاف الأخطاء
3. 🔴 السجلات: `docker-compose logs -f`

---

## نصائح مهمة 💡

### ✅ افعل:
- ✅ اقرأ `QUICK_DEPLOY.md` قبل البدء
- ✅ استخدم `deploy.sh` للتوفير الوقت
- ✅ احفظ `SERVER_COMMANDS.md` في مكان سهل الوصول
- ✅ تابع السجلات بعد كل تغيير
- ✅ اعمل backup دوري لقاعدة البيانات

### ❌ لا تفعل:
- ❌ تنفيذ أوامر بدون فهمها
- ❌ حذف volumes بدون backup
- ❌ تعديل ملفات production مباشرة
- ❌ نسيان تغيير JWT_SECRET
- ❌ إهمال مراقبة السجلات

---

## الدعم والمساعدة 🆘

### إذا واجهت مشكلة:

1. **ابحث في الملفات**:
   - استخدم `Ctrl+F` للبحث في الملفات
   - كل مشكلة شائعة مذكورة في التوثيق

2. **تحقق من السجلات**:
   ```bash
   docker-compose logs -f web
   docker-compose logs -f db
   sudo tail -f /var/log/nginx/error.log
   ```

3. **جرب الحلول الشائعة**:
   - إعادة تشغيل: `docker-compose restart`
   - إعادة بناء: `docker-compose up -d --build`
   - تحقق من .env: `cat .env`

4. **اسأل الفريق**:
   - شارك السجلات
   - اشرح الخطوات التي اتبعتها
   - اذكر رسالة الخطأ بالضبط

---

## الخلاصة 🎯

هذا المشروع **جاهز تماماً** للـ deployment. لديك:

- ✅ سكريبت تلقائي (`deploy.sh`)
- ✅ دليل سريع (`QUICK_DEPLOY.md`)
- ✅ دليل شامل (`DEPLOYMENT.md`)
- ✅ مرجع أوامر (`SERVER_COMMANDS.md`)
- ✅ قائمة تحقق (`DEPLOYMENT_CHECKLIST.md`)
- ✅ تكوينات جاهزة (`nginx.conf`, `docker-compose.yml`)

**كل ما عليك**: تشغيل `./deploy.sh` والمشروع سيكون على الإنترنت! 🚀

---

## روابط الملفات 🔗

- [`QUICK_DEPLOY.md`](./QUICK_DEPLOY.md) - ابدأ من هنا
- [`deploy.sh`](./deploy.sh) - السكريبت التلقائي
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) - الدليل الشامل
- [`SERVER_COMMANDS.md`](./SERVER_COMMANDS.md) - مرجع الأوامر
- [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) - قائمة التحقق
- [`nginx.conf`](./nginx.conf) - تكوين Nginx
- [`env.production.example`](./env.production.example) - مثال .env

---

📅 **آخر تحديث**: 29 يناير 2026
🏢 **المشروع**: مشاريع - منصة الاستثمار العقاري
🌐 **السيرفر**: http://34.136.2.116/

---

✨ **بالتوفيق في الـ Deployment!** ✨
