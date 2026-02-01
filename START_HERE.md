# 🚀 ابدأ من هنا - Masharee Deployment

<div dir="rtl">

## مرحباً! 👋

هذا المشروع **جاهز تماماً** للرفع على السيرفر. كل شيء معد ومجهز، فقط اتبع الخطوات البسيطة أدناه.

---

## ⚡ الطريقة السريعة (5 دقائق)

### الخطوة 1️⃣: عدل اسم المستخدم

افتح ملف `deploy.sh` واستبدل `username` باسم المستخدم الفعلي للسيرفر:

```bash
nano deploy.sh
# ابحث عن: SERVER_USER="${SERVER_USER:-username}"
# غيره إلى: SERVER_USER="${SERVER_USER:-your_actual_username}"
```

### الخطوة 2️⃣: شغل السكريبت

```bash
cd /Users/soubani/Desktop/mashareeWeb
chmod +x deploy.sh
./deploy.sh
```

### الخطوة 3️⃣: انتظر واختبر

- السكريبت سيقوم بكل شيء تلقائياً (10-15 دقيقة)
- بعد الانتهاء، افتح: http://34.136.2.116/
- جرب تسجيل الدخول بحساب Admin

**تم! مبروك! 🎉**

---

## 📚 الملفات المتوفرة

### للقراءة والاستخدام:

1. **`DEPLOYMENT_README.md`** 📖
   - دليل شامل لكل الملفات
   - اقرأه لفهم ما هو متوفر

2. **`QUICK_DEPLOY.md`** ⚡
   - دليل سريع للـ deployment
   - طريقتين: تلقائية ويدوية

3. **`DEPLOYMENT_CHECKLIST.md`** ✅
   - قائمة تحقق كاملة
   - استخدمها للتأكد من كل شيء

4. **`SERVER_COMMANDS.md`** 🖥️
   - مرجع شامل للأوامر
   - احفظه واستخدمه عند الحاجة

5. **`DEPLOYMENT.md`** 📚
   - دليل مفصل خطوة بخطوة
   - للتفاصيل الدقيقة

### للتنفيذ:

6. **`deploy.sh`** 🤖
   - سكريبت تلقائي للـ deployment
   - يقوم بكل شيء تلقائياً

7. **`nginx.conf`** 🌐
   - تكوين Nginx جاهز
   - ينسخ تلقائياً بواسطة السكريبت

8. **`env.production.example`** 🔐
   - مثال على ملف .env
   - للمرجع والتعديل

---

## 🎯 السيناريوهات الشائعة

### 🆕 أول مرة deployment؟
```
1. عدل deploy.sh (ضع اسم المستخدم)
2. شغل ./deploy.sh
3. انتظر 10-15 دقيقة
4. افتح http://34.136.2.116/
```

### 🔄 تحديث الكود؟
```bash
# على السيرفر
ssh username@34.136.2.116
cd ~/masharee-app
git pull
docker-compose up -d --build
```

### 🔍 المشروع لا يعمل؟
```bash
# على السيرفر
cd ~/masharee-app
docker-compose logs -f web
# ثم ارجع لـ SERVER_COMMANDS.md
```

### 💾 نسخ احتياطي؟
```bash
# على السيرفر
cd ~/masharee-app
docker-compose exec db pg_dump -U postgres masharee > backup.sql
```

---

## 📌 معلومات سريعة

### السيرفر:
```
IP: 34.136.2.116
VM: saker-20260129-121439
SSH: ssh username@34.136.2.116
```

### الروابط:
```
🌐 الموقع: http://34.136.2.116/
📁 المشاريع: http://34.136.2.116/projects
🔐 الدخول: http://34.136.2.116/login
⚙️ الإدارة: http://34.136.2.116/admin
```

### بيانات الدخول (للاختبار):
```
👤 Admin:
   البريد: admin@masharee.sa
   الرمز: Admin@123456

👤 مستثمر:
   البريد: mohammed@test.com
   الرمز: Investor@123
```

---

## 🛠️ أوامر سريعة

### على جهازك المحلي:
```bash
# رفع المشروع
./deploy.sh

# أو رفع يدوي
rsync -avz --exclude 'node_modules' --exclude '.next' \
  ./ username@34.136.2.116:~/masharee-app/
```

### على السيرفر:
```bash
# حالة الخدمات
docker-compose ps

# السجلات
docker-compose logs -f web

# إعادة تشغيل
docker-compose restart

# إيقاف
docker-compose down

# تشغيل من جديد
docker-compose up -d
```

---

## ✅ التحقق من النجاح

بعد الـ deployment، تحقق من:

- [ ] الموقع يفتح: http://34.136.2.116/
- [ ] تسجيل الدخول يعمل
- [ ] المشاريع تظهر
- [ ] لوحة الإدارة تعمل (للـ Admin)
- [ ] لا أخطاء في السجلات

---

## 🆘 عندك مشكلة؟

### الخطوات:
1. **تحقق من السجلات**: `docker-compose logs -f web`
2. **ارجع للتوثيق**: `SERVER_COMMANDS.md` → استكشاف الأخطاء
3. **جرب إعادة التشغيل**: `docker-compose restart`
4. **اسأل الفريق**: شارك رسالة الخطأ

### الأخطاء الشائعة:

**المشروع لا يفتح في المتصفح؟**
```bash
# تحقق من Nginx
sudo systemctl status nginx
sudo nginx -t
```

**قاعدة البيانات لا تعمل؟**
```bash
# تحقق من PostgreSQL
docker-compose logs db
docker-compose restart db
```

**أخطاء في البناء؟**
```bash
# أعد البناء
docker-compose down
docker-compose up -d --build
```

---

## 📖 ماذا بعد؟

### بعد نجاح الـ Deployment:

1. **إعداد النسخ الاحتياطي**
   - راجع `SERVER_COMMANDS.md` → Cron Jobs

2. **المراقبة**
   - راقب السجلات يومياً
   - راقب استهلاك الموارد

3. **الأمان**
   - غير JWT_SECRET عن القيمة الافتراضية
   - فكر في إضافة SSL (HTTPS)

4. **التوثيق**
   - وثق أي تغييرات تعملها
   - شارك المعلومات مع الفريق

---

## 🎓 موارد التعلم

### للمبتدئين:
- ابدأ بـ `QUICK_DEPLOY.md`
- استخدم `DEPLOYMENT_CHECKLIST.md`
- احفظ `SERVER_COMMANDS.md`

### للمتقدمين:
- اقرأ `DEPLOYMENT.md` للتفاصيل
- عدل `nginx.conf` حسب الحاجة
- أضف monitoring و alerts

---

## 🎉 خلاصة

**المشروع جاهز 100%!**

كل ما تحتاجه:
- ✅ عدل `deploy.sh` (اسم المستخدم)
- ✅ شغل `./deploy.sh`
- ✅ افتح http://34.136.2.116/

**خلاص! هيك بيكون المشروع نازل ع السيرفر! 🚀**

---

## 📞 الدعم

- 📧 راجع التوثيق في المجلد
- 💬 اسأل الفريق إذا احتجت
- 📝 وثق أي مشاكل تواجهها

---

</div>

<div align="center">

**صُنع بـ ❤️ للسهولة والسرعة**

**آخر تحديث**: 29 يناير 2026

---

### روابط سريعة:
[📖 دليل الملفات](./DEPLOYMENT_README.md) |
[⚡ Deployment سريع](./QUICK_DEPLOY.md) |
[✅ قائمة التحقق](./DEPLOYMENT_CHECKLIST.md) |
[🖥️ أوامر السيرفر](./SERVER_COMMANDS.md)

---

🌟 **بالتوفيق!** 🌟

</div>
