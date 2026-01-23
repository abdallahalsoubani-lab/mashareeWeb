# 🏠 منصة الصناديق الاستثمارية - دليل الإعداد

نظام احترافي لإدارة الصناديق الاستثمارية العقارية بواجهة عربية RTL متقدمة.

## 📋 المتطلبات

- **Node.js** (v18 أو أحدث)
- **PostgreSQL** (v12 أو أحدث)
- **npm** أو **yarn**

## 🚀 خطوات الإعداد

### 1️⃣ تثبيت PostgreSQL

**على Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**على macOS (باستخدام Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**على Windows:**
- حمّل من https://www.postgresql.org/download/windows/
- تابع خطوات المثبّت

### 2️⃣ إعداد قاعدة البيانات

```bash
# الدخول إلى PostgreSQL
sudo -u postgres psql

# تنفيذ الأوامر التالية في PostgreSQL:
CREATE DATABASE masharee_db;
CREATE USER masharee_user WITH PASSWORD 'masharee_password';
ALTER ROLE masharee_user SET client_encoding TO 'utf8';
ALTER ROLE masharee_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE masharee_user SET default_transaction_deferrable TO on;
ALTER ROLE masharee_user SET default_transaction_read_uncommitted TO off;
GRANT ALL PRIVILEGES ON DATABASE masharee_db TO masharee_user;
\q
```

### 3️⃣ تثبيت المشروع

```bash
# استنساخ أو فتح المشروع
cd mashareeWeb

# تثبيت المكتبات
npm install
```

### 4️⃣ تهيئة قاعدة البيانات

```bash
# ملء قاعدة البيانات ببيانات أولية (المشاريع والـ admin)
npm run seed
```

## ▶️ تشغيل التطبيق

### الخيار 1: استخدام البرنامج النصي (الأسهل) 🎯

```bash
# لتشغيل التطبيق
./run.sh

# لإيقاف التطبيق
./stop.sh
```

### الخيار 2: التشغيل اليدوي

**في نافذة الطرفية الأولى (Backend):**
```bash
npm run server:dev
```

**في نافذة طرفية جديدة (Frontend):**
```bash
npm run dev
```

## 🌐 الوصول للتطبيق

بعد التشغيل، افتح المتصفح:

- **الواجهة الأمامية:** http://localhost:5173
- **API:** http://localhost:5000/api
- **فحص صحة الخادم:** http://localhost:5000/api/health

## 👤 بيانات تسجيل الدخول الافتراضية

```
البريد الإلكتروني: admin@masharee.com
كلمة المرور: admin123
الدور: مسؤول (Admin)
```

## 📁 هيكل المشروع

```
mashareeWeb/
├── src/
│   ├── components/          # مكونات React
│   ├── api/
│   │   └── client.js       # عميل API (Axios)
│   ├── Masharee.jsx        # المكون الرئيسي
│   ├── Login.jsx           # صفحة تسجيل الدخول
│   ├── main.jsx            # نقطة الدخول
│   └── index.css           # الأنماط العامة
├── backend/
│   ├── config/
│   │   └── database.js     # إعدادات قاعدة البيانات
│   ├── routes/
│   │   ├── auth.js         # مسارات المصادقة
│   │   ├── projects.js     # مسارات المشاريع
│   │   └── users.js        # مسارات المستخدمين
│   ├── middleware/
│   │   └── auth.js         # middleware المصادقة
│   └── scripts/
│       └── seedDatabase.js # بيانات أولية
├── server.js               # خادم Express الرئيسي
├── run.sh                  # برنامج تشغيل شامل
├── stop.sh                 # برنامج إيقاف شامل
├── .env                    # متغيرات البيئة
└── package.json            # المكتبات والبرامج النصية
```

## 🔑 API Endpoints الرئيسية

### المصادقة (Auth)
- `POST /api/auth/register` - التسجيل
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/auth/me` - الحصول على بيانات المستخدم الحالي

### المشاريع (Projects)
- `GET /api/projects` - الحصول على جميع المشاريع
- `GET /api/projects/:id` - الحصول على مشروع محدد
- `POST /api/projects` - إنشاء مشروع (Admin فقط)
- `PUT /api/projects/:id` - تحديث مشروع (Admin فقط)
- `DELETE /api/projects/:id` - حذف مشروع (Admin فقط)

### المستخدمين (Users)
- `GET /api/users` - الحصول على جميع المستخدمين (Admin فقط)
- `GET /api/users/:id` - الحصول على مستخدم محدد
- `GET /api/users/:id/investments` - الحصول على استثمارات المستخدم
- `POST /api/users/:id/invest` - إضافة استثمار

## 🔐 الأمان

- جميع كلمات المرور يتم تشفيرها باستخدام bcryptjs
- المصادقة تستخدم JWT tokens
- جميع المسارات الحساسة محمية بـ middleware الـ authentication
- متغيرات البيئة حساسة (غير معروضة في البريد)

## 📝 ملاحظات مهمة

1. **تغيير كلمة المرور:** يُنصح بتغيير كلمة المرور الافتراضية للـ admin عند الاستخدام الفعلي
2. **JWT_SECRET:** غيّر `JWT_SECRET` في `.env` في بيئة الإنتاج
3. **Database Backups:** نسخ احتياطية منتظمة من قاعدة البيانات مهمة جداً
4. **CORS:** تم تفعيل CORS للسماح بطلبات من `localhost` فقط في الوضع الحالي

## 🛠️ استكشاف الأخطاء

### خطأ: "Connection refused" من قاعدة البيانات
- تأكد من تشغيل PostgreSQL: `sudo systemctl status postgresql`
- تحقق من البيانات في `.env`

### خطأ: "Port already in use"
```bash
# للبحث عن العملية التي تستخدم الميناء
lsof -i :5000  # للـ backend
lsof -i :5173  # للـ frontend

# إيقاف العملية
kill -9 <PID>
```

### الـ API لا يستجيب
- تأكد من أن `npm run server:dev` قيد التشغيل
- تحقق من الأخطاء في نافذة الخادم
- استخدم http://localhost:5000/api/health للتحقق

## 📞 الدعم والمساعدة

للمزيد من المعلومات أو الإبلاغ عن المشاكل، يرجى التواصل مع فريق التطوير.

---

**آخر تحديث:** 2026-01-23
**الإصدار:** 1.0.0
