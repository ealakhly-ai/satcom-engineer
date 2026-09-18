# 🛰️ Satcom Engineers - منصة وتطبيق العمل الحر لهندسة الاتصالات والأنظمة الفضائية

منصة تخصصية متكاملة لربط مهندسي وخبراء الاتصالات الفضائية (Satcom, RF, Microwave, DSP, SDR) بالعملاء والمشاريع، مع نموذج تسعير شفاف يعتمد على **رسم ثابت قدره 50 دولاراً أمريكياً** عند إتمام كل عقد مع حماية مالية كاملة (Escrow).

---

## 🏗️ البنية المعمارية للمشروع (Monorepo)

```text
satcom-engineers/
├── apps/
│   ├── api/          # الخادم الخلفي المبني بـ NestJS + Prisma + PostgreSQL + Redis
│   ├── web/          # منصة الويب الرئيسية (Next.js 14 + Tailwind CSS) للعملاء والمستقلين
│   ├── admin/        # لوحة تحكم الإدارة لمتابعة العقود وفض النزاعات والإيرادات المالية
│   └── mobile/       # تطبيق الجوال (React Native / Expo)
├── packages/
│   └── types/        # النماذج المشتركة وحسابات الرسوم (Financial Models, DTOs)
├── infrastructure/
│   └── docker/       # إعدادات الحاويات و Nginx
└── docker-compose.yml # تشغيل PostgreSQL و Redis و MinIO محلياً
```

---

## 💰 النموذج المالي وقاعدة الـ 50$ الثابتة

- **الرسم الثابت:** 50 دولاراً أمريكياً عن كل عقد مكتمل (الافتراضي: يدفعه العميل فوق قيمة عمل المستقل).
- **حساب الضمان (Escrow):** يحجز المبلغ الإجمالي بالكامل (قيمة العمل + 50$) عند بدء العقد.
- **تحرير الدفعة:** عند اعتماد العميل للتسليم النهائي، يُحرر كامل مبلغ العمل للمستقل دون خصم نسبة مئوية، وتُسجل الـ 50$ كإيراد للمنصة.

---

## 🚀 كيفية التشغيل والتطوير

### 1. تشغيل الخدمات الأساسية (قاعدة البيانات والذاكرة المؤقتة)
```bash
docker-compose up -d
```
يقوم هذا الأمر بتشغيل:
- PostgreSQL 16 على المنفذ `5432`
- Redis 7 على المنفذ `6379`
- MinIO (بديل S3 لتخزين الملفات) على المنفذ `9000` و `9001`

### 2. إعداد وتشغيل الخادم الخلفي (Backend API)
```bash
cd apps/api
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```
- واجهات الـ API ستعمل على: `http://localhost:4000/api`
- توثيق Swagger التفاعلي: `http://localhost:4000/api/docs`

### 3. تشغيل منصة الويب (Web App)
```bash
cd apps/web
npm install
npm run dev
```
- المنصة ستعمل على: `http://localhost:3000`

### 4. تشغيل لوحة الإدارة (Admin Dashboard)
```bash
cd apps/admin
npm install
npm run dev
```
- لوحة الإدارة ستعمل على: `http://localhost:3001`

### 5. تشغيل تطبيق الجوال (Mobile App)
```bash
cd apps/mobile
npm install
npx expo start
```