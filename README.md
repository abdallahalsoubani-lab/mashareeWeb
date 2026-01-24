# مشاريع - منصة الاستثمار العقاري 🏢

منصة استثمار عقاري سعودية متكاملة تجمع الصناديق العقارية والصكوك والتمويل الجماعي في مكان واحد.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-Private-red)
![Status](https://img.shields.io/badge/status-Active-green)

---

## 📋 المتطلبات

- **Node.js**: 20+ (يُفضل أحدث إصدار LTS)
- **PostgreSQL**: 16+ (أو Docker)
- **npm/yarn/pnpm**: مدير الحزم

---

## 🚀 التشغيل السريع

### الطريقة 1️⃣: Docker (الأسهل والأسرع) 🐳

```bash
# 1. استنساخ المستودع
git clone https://github.com/your-username/masharee.git
cd masharee

# 2. نسخ ملف البيئة
cp .env.example .env.local

# 3. تعديل JWT_SECRET في .env.local (اختياري)
# استخدم: openssl rand -base64 32

# 4. تشغيل مع Docker
docker compose up -d

# 5. الانتظار ~30 ثانية لجاهزية الخدمات
docker compose logs -f web

# 6. فتح في المتصفح
open http://localhost:3000
```

### الطريقة 2️⃣: التشغيل المحلي 💻

```bash
# 1. الاستنساخ والتثبيت
git clone https://github.com/your-username/masharee.git
cd masharee
npm install

# 2. إعداد البيئة
cp .env.example .env.local
# عدّل DATABASE_URL و JWT_SECRET

# 3. تشغيل قاعدة البيانات
# الخيار أ: استخدام PostgreSQL محلي
# الخيار ب: Docker للقاعدة فقط
docker compose up -d db

# 4. إعداد قاعدة البيانات
npm run db:push
npm run db:seed

# 5. تشغيل السيرفر
npm run dev

# 6. فتح في المتصفح
open http://localhost:3000
```

---

## 🔐 بيانات الدخول التجريبية

### حساب المسؤول (Admin)
```
البريد: admin@masharee.sa
الرمز: Admin@123456
```

### حساب مستثمر تجريبي
```
البريد: mohammed@test.com
الرمز: Investor@123
```

> **ملاحظة**: يمكنك تسجيل حسابات جديدة عبر صفحة التسجيل.

---

## 📁 هيكل المشروع

```
masharee/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # صفحات التسجيل والدخول
│   │   ├── (main)/              # صفحات المستخدم الرئيسية
│   │   ├── admin/               # لوحة التحكم الإدارية
│   │   ├── api/                 # API Routes
│   │   ├── layout.tsx           # التخطيط الرئيسي
│   │   ├── page.tsx             # الصفحة الرئيسية
│   │   ├── error.tsx            # صفحة الأخطاء
│   │   ├── loading.tsx          # حالة التحميل
│   │   └── not-found.tsx        # صفحة 404
│   ├── components/              # مكونات React
│   │   ├── ui/                 # مكونات عامة (Button, Card, إلخ)
│   │   ├── layout/             # رأس الصفحة والتذييل والشريط الجانبي
│   │   ├── sections/           # أقسام الصفحة الرئيسية
│   │   ├── dashboard/          # مكونات لوحة المستخدم
│   │   └── admin/              # مكونات لوحة الإدارة
│   ├── lib/                     # المرافق والدوال
│   │   ├── db.ts              # عميل Prisma
│   │   ├── auth.ts            # JWT والمصادقة
│   │   ├── audit.ts           # سجل العمليات
│   │   └── validations/       # Zod Schemas
│   ├── hooks/                   # React Hooks المخصصة
│   ├── types/                   # أنواع TypeScript
│   └── styles/                  # CSS والرموز التصميمية
├── prisma/
│   ├── schema.prisma           # تصميم قاعدة البيانات
│   └── seed.ts                 # بيانات الاختبار
├── public/                      # ملفات ثابتة
├── docker-compose.yml          # Docker Compose
├── Dockerfile                  # Docker build
├── .dockerignore               # ملفات استبعاد Docker
├── .env.example                # مثال على متغيرات البيئة
├── .env.local                  # متغيرات البيئة (محلي)
├── next.config.ts              # إعدادات Next.js
├── tsconfig.json               # إعدادات TypeScript
├── package.json                # الحزم والأوامر
└── README.md                   # هذا الملف
```

---

## 🛠️ الأوامر المتاحة

### تطوير وبناء
```bash
npm run dev              # تشغيل سيرفر التطوير
npm run build            # بناء للإنتاج
npm run start            # تشغيل الإنتاج
npm run lint             # فحص جودة الكود
npm run lint:fix         # إصلاح تلقائي للأخطاء
npm run type-check       # فحص أنواع TypeScript
```

### قاعدة البيانات
```bash
npm run db:generate      # إنشاء عميل Prisma
npm run db:push          # تحديث Schema
npm run db:migrate       # إنشاء migration جديد
npm run db:migrate:prod  # تطبيق migrations في الإنتاج
npm run db:seed          # إضافة بيانات الاختبار
npm run db:studio        # فتح Prisma Studio
npm run db:reset         # إعادة تعيين كاملة (يحذف البيانات!)
```

### Docker
```bash
npm run docker:up        # تشغيل Docker
npm run docker:down      # إيقاف Docker
npm run docker:build     # إعادة بناء الصور
npm run docker:logs      # عرض السجلات
npm run docker:clean     # حذف كل شيء بما فيه قاعدة البيانات
```

### الإعداد
```bash
npm run setup            # إعداد محلي كامل
npm run setup:docker     # إعداد مع Docker
```

---

## 🌐 الصفحات والمسارات

### الصفحات العامة (بدون تسجيل دخول)
| المسار | الوصف | ملاحظات |
|--------|-------|--------|
| `/` | الصفحة الرئيسية | عرض أبرز المشاريع |
| `/login` | تسجيل الدخول | إدخال البريد والرمز |
| `/register` | إنشاء حساب | نموذج التسجيل |

### صفحات المستخدم (يتطلب تسجيل دخول)
| المسار | الوصف | المميزات |
|--------|-------|----------|
| `/projects` | قائمة المشاريع | بحث وتصفية |
| `/projects/[id]` | تفاصيل المشروع | معلومات شاملة |
| `/investments` | استثماراتي | قائمة الاستثمارات |
| `/wallet` | المحفظة المالية | الرصيد والتحويلات |
| `/profile` | الملف الشخصي | بيانات المستخدم |
| `/profile/settings` | الإعدادات | تغيير البيانات |

### صفحات الإدارة (Admin فقط)
| المسار | الوصف | الصلاحيات |
|--------|-------|----------|
| `/admin` | لوحة التحكم | عرض الإحصائيات |
| `/admin/projects` | إدارة المشاريع | CRUD |
| `/admin/projects/new` | إضافة مشروع | إنشاء جديد |
| `/admin/projects/[id]/edit` | تعديل المشروع | تحديث |
| `/admin/users` | إدارة المستخدمين | عرض وتصفية |
| `/admin/investments` | إدارة الاستثمارات | مراقبة |
| `/admin/audit-logs` | سجل العمليات | إحصائيات المسؤولين |

---

## 🔒 الأمان والمصادقة

### ميزات الأمان
- ✅ **JWT في Cookies**: تخزين آمن للرموز في HttpOnly Cookies
- ✅ **Hashing**: كلمات المرور محمية مع bcrypt (12 جولة)
- ✅ **RBAC**: التحكم في الوصول بناءً على الأدوار (User/Admin)
- ✅ **Audit Logging**: تسجيل جميع عمليات المسؤولين
- ✅ **Protected Routes**: صفحات محمية تتطلب المصادقة

### متغيرات البيئة الحساسة
```bash
JWT_SECRET          # مفتاح التوقيع (32+ حرف)
DATABASE_URL        # رابط قاعدة البيانات
NODE_ENV            # بيئة التشغيل
```

---

## 📱 التوافق والمتصفحات

### أنظمة التشغيل
- ✅ Windows 10+ (مع WSL2 أو Docker)
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 20.04+)

### المتصفحات
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### الأجهزة
- ✅ Desktop (1920x1080+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x812)

### دعم RTL
- ✅ عربي بشكل كامل
- ✅ واجهة مرآة اليمين إلى اليسار
- ✅ تواريخ وأرقام عربية

---

## 🏗️ البنية التقنية

### Frontend
- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Fonts**: Tajawal (Google Fonts)

### Backend
- **Runtime**: Node.js 20
- **ORM**: Prisma 7
- **Database**: PostgreSQL 16
- **Auth**: JWT + bcryptjs
- **API**: RESTful Routes

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Build**: Multi-stage Docker build
- **Database**: PostgreSQL Alpine

---

## 🔄 سير العمل (Workflow)

### التطوير المحلي
```bash
1. git checkout -b feature/my-feature
2. npm run dev                          # تشغيل السيرفر
3. # عدّل الملفات
4. npm run lint:fix                    # إصلاح الأخطاء
5. git add .
6. git commit -m "feat: my feature"
7. git push origin feature/my-feature
8. اعمل Pull Request
```

### الإنتاج
```bash
1. docker compose up -d --build         # بناء وتشغيل
2. docker compose logs -f web           # مراقبة السجلات
3. docker compose exec web npm run db:migrate:prod  # migrations
```

---

## 🐛 استكشاف الأخطاء

### قاعدة البيانات لا تتصل
```bash
# تحقق من DATABASE_URL
echo $DATABASE_URL

# أعد ضبط
npm run db:push

# أو أعد التعيين كاملاً
npm run db:reset
npm run db:seed
```

### منفذ 3000 مشغول
```bash
# ابحث عن العملية
lsof -i :3000

# قتل العملية (على Linux/Mac)
kill -9 <PID>

# أو استخدم منفذ مختلف
PORT=3001 npm run dev
```

### أخطاء TypeScript
```bash
npm run type-check        # فحص الأخطاء
npm run build             # محاولة البناء
```

### مشاكل Docker
```bash
# أعد البناء
docker compose build --no-cache

# أعد ضبط كل شيء
npm run docker:clean
docker compose up -d --build
```

---

## 📚 الموارد والتوثيق

### الوثائق الرسمية
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### أدوات مفيدة
- [Prisma Studio](http://localhost:5555): متصفح قاعدة البيانات
- [Docker Desktop](https://www.docker.com/products/docker-desktop): تطبيق سطح المكتب

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى اتباع هذه الخطوات:

1. **Fork** المستودع
2. **انسخ فرع** جديد (`git checkout -b feature/AmazingFeature`)
3. **أضف تغييراتك** (`git commit -m 'Add amazing feature'`)
4. **أدفع إلى الفرع** (`git push origin feature/AmazingFeature`)
5. **افتح Pull Request**

### إرشادات المساهمة
- اتبع نمط الكود الموجود
- أضف اختبارات للميزات الجديدة
- حدّث التوثيق
- اكتب رسائل commit واضحة

---

## 📄 الترخيص

هذا المشروع مخصص للأغراض التعليمية والعرض فقط. جميع الحقوق محفوظة.

---

## 📞 التواصل والدعم

للأسئلة والمساعدة:
- 📧 البريد: support@masharee.sa
- 🐛 المشاكل: [GitHub Issues](https://github.com/your-username/masharee/issues)
- 💬 النقاشات: [GitHub Discussions](https://github.com/your-username/masharee/discussions)

---

## 🎯 الخطط المستقبلية

- [ ] إضافة الدفع الإلكتروني (Stripe, Telr)
- [ ] نظام الإشعارات (Email, SMS)
- [ ] تطبيق الهاتف الذكي (React Native)
- [ ] لوحة قياس متقدمة (Charts, Analytics)
- [ ] نظام التقييمات والتعليقات
- [ ] واجهة API عامة

---

<div align="center">

**صُنع بـ ❤️ في المملكة العربية السعودية 🇸🇦**

جميع الحقوق محفوظة © 2024

</div>
