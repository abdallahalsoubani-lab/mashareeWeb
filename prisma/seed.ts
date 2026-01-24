/**
 * Prisma Seed Script
 * Populates database with test data
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.adminAuditLog.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.investment.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // Create test users
  const hashedPassword = await bcrypt.hash('Test@123456', 12);

  const testUser = await prisma.user.create({
    data: {
      name: 'عبد الله كايد',
      email: 'user@masharee.sa',
      phone: '+966501234567',
      passwordHash: hashedPassword,
      role: 'INVESTOR',
      isVerified: true,
      avatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=AbdullahKayed',
      wallet: {
        create: {
          balance: 500000,
        },
      },
    },
    include: { wallet: true },
  });

  const adminUser = await prisma.user.create({
    data: {
      name: 'المدير',
      email: 'admin@masharee.sa',
      phone: '+966509876543',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
      wallet: {
        create: {
          balance: 1000000,
        },
      },
    },
    include: { wallet: true },
  });

  console.log('✅ Users created');

  // Create test projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'صندوق تنمية الفرص',
        type: 'صندوق عقاري',
        description:
          'صندوق أسهم ملكية خاصة مغلق متوافق مع أحكام الشريعة الإسلامية',
        location: 'الرياض - حي الرمال',
        image:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1577421572935-8446dbf4f9df?w=800&h=600&fit=crop',
        ],
        badges: ['جديد', 'عوائد دورية', 'متوافق مع الشريعة'],
        expectedReturn: 18,
        durationMonths: 12,
        minimumAmount: 1000,
        unitPrice: 10,
        riskLevel: 'متوسطة',
        targetAmount: 41000000,
        fundedAmount: 41000000,
        daysRemaining: 0,
        category: 'سكني',
        fundManager: 'Anmeya Capital',
        distributor: 'أصيل',
        supervisor: 'هيئة السوق المالية',
        distributionPolicy: 'عند التصفية',
        status: 'completed',
        isActive: true,
        latitude: 24.756,
        longitude: 46.677,
      },
    }),

    prisma.project.create({
      data: {
        title: 'صندوق العقارات الذهبي',
        type: 'صندوق عقاري',
        description: 'صندوق متخصص في الاستثمارات العقارية الفاخرة',
        location: 'جدة - الواجهة البحرية',
        image:
          'https://images.unsplash.com/photo-1574909114451-8a5b64f8ba3b?w=800&h=600&fit=crop',
        images: [],
        badges: ['مميز', 'عالي العائد'],
        expectedReturn: 22,
        durationMonths: 18,
        minimumAmount: 5000,
        unitPrice: 100,
        riskLevel: 'متوسطة-عالية',
        targetAmount: 100000000,
        fundedAmount: 35000000,
        daysRemaining: 45,
        category: 'تجاري',
        fundManager: 'Alinma Investment',
        distributor: 'أصيل',
        supervisor: 'هيئة السوق المالية',
        distributionPolicy: 'نصف سنوي',
        status: 'active',
        isActive: true,
        latitude: 21.543,
        longitude: 39.172,
      },
    }),

    prisma.project.create({
      data: {
        title: 'صكوك التطوير العقاري',
        type: 'صكوك',
        description: 'صكوك إسلامية لتمويل مشاريع التطوير العقاري',
        location: 'الدمام - الخليج',
        image:
          'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop',
        images: [],
        badges: ['حصري', 'متوافق مع الشريعة'],
        expectedReturn: 15,
        durationMonths: 24,
        minimumAmount: 2000,
        unitPrice: 50,
        riskLevel: 'منخفضة',
        targetAmount: 50000000,
        fundedAmount: 28000000,
        daysRemaining: 60,
        category: 'صناعي',
        fundManager: 'NCB Capital',
        distributor: 'أصيل',
        supervisor: 'هيئة السوق المالية',
        distributionPolicy: 'ربع سنوي',
        status: 'active',
        isActive: true,
        latitude: 26.113,
        longitude: 50.201,
      },
    }),

    prisma.project.create({
      data: {
        title: 'تمويل جماعي - مشروع فندقي',
        type: 'تمويل جماعي',
        description:
          'تمويل جماعي لإنشاء فندق فاخر متوافق مع أحدث المعايير العالمية',
        location: 'أبها - المنتزه الوطني',
        image:
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        images: [],
        badges: ['جديد'],
        expectedReturn: 20,
        durationMonths: 36,
        minimumAmount: 500,
        unitPrice: 25,
        riskLevel: 'عالية',
        targetAmount: 25000000,
        fundedAmount: 8000000,
        daysRemaining: 15,
        category: 'فندقي',
        fundManager: 'AlRajhi Capital',
        distributor: 'أصيل',
        supervisor: 'هيئة السوق المالية',
        distributionPolicy: 'سنوي',
        status: 'active',
        isActive: true,
        latitude: 18.215,
        longitude: 42.505,
      },
    }),
  ]);

  console.log('✅ Projects created');

  // Create test investments
  const investment = await prisma.investment.create({
    data: {
      userId: testUser.id,
      projectId: projects[0].id,
      amount: 50000,
      units: 5000,
      status: 'ACTIVE',
      returns: 9000,
    },
  });

  console.log('✅ Investments created');

  // Create transactions
  await prisma.transaction.createMany({
    data: [
      {
        walletId: testUser.wallet!.id,
        type: 'DEPOSIT',
        amount: 500000,
        status: 'COMPLETED',
        description: 'إيداع أولي',
        reference: 'DEP-001',
      },
      {
        walletId: testUser.wallet!.id,
        type: 'INVEST',
        amount: 50000,
        status: 'COMPLETED',
        description: 'استثمار في صندوق تنمية الفرص',
        reference: 'INV-001',
        projectId: projects[0].id,
      },
      {
        walletId: testUser.wallet!.id,
        type: 'RETURN',
        amount: 9000,
        status: 'COMPLETED',
        description: 'عوائد استثمارية',
        reference: 'RET-001',
        projectId: projects[0].id,
      },
    ],
  });

  console.log('✅ Transactions created');

  console.log('🌱 Seed complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
