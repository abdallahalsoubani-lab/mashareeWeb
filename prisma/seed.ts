/**
 * Prisma Seed Script
 * Populates database with test data
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('\n🌱 Starting seed...\n');

  // ============================================
  // 1. Clear existing data
  // ============================================
  console.log('🧹 Cleaning database...');
  await prisma.adminAuditLog.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.investment.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Database cleaned\n');

  // ============================================
  // 2. Create Admin User
  // ============================================
  const adminPassword = await bcrypt.hash('Admin@123456', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@masharee.sa',
      name: 'مدير النظام',
      phone: '0500000000',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isVerified: true,
      wallet: {
        create: { balance: 0 },
      },
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // ============================================
  // 3. Create Test Investors
  // ============================================
  const investorPassword = await bcrypt.hash('Investor@123', 12);

  const investors = [
    {
      email: 'mohammed@test.com',
      name: 'محمد العتيبي',
      phone: '0501234567',
      balance: 100000,
    },
    {
      email: 'sara@test.com',
      name: 'سارة القحطاني',
      phone: '0507654321',
      balance: 75000,
    },
    {
      email: 'abdullah@test.com',
      name: 'عبدالله الشمري',
      phone: '0509876543',
      balance: 250000,
    },
    {
      email: 'fatima@test.com',
      name: 'فاطمة الدوسري',
      phone: '0502468135',
      balance: 50000,
    },
    {
      email: 'khalid@test.com',
      name: 'خالد المالكي',
      phone: '0501357924',
      balance: 500000,
    },
  ];

  console.log('\n📧 Creating test investors...');
  const investorUsers = [];
  for (const investor of investors) {
    const user = await prisma.user.create({
      data: {
        email: investor.email,
        name: investor.name,
        phone: investor.phone,
        passwordHash: investorPassword,
        role: 'INVESTOR',
        isVerified: true,
        wallet: {
          create: { balance: investor.balance },
        },
      },
      include: { wallet: true },
    });
    investorUsers.push(user);
    console.log('  ✅', user.name);
  }

  // ============================================
  // 4. Create Projects
  // ============================================
  console.log('\n🏢 Creating projects...');
  const projectsData = [
    {
      type: 'صندوق عقاري',
      title: 'صندوق الرياض السكني الأول',
      description:
        'صندوق استثمار عقاري مغلق يركز على تطوير المشاريع السكنية في مدينة الرياض، متوافق مع أحكام الشريعة الإسلامية.',
      location: 'الرياض - حي العليا',
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      ],
      badges: ['جديد', 'متوافق مع الشريعة'],
      expectedReturn: 20,
      durationMonths: 36,
      minimumAmount: 1000,
      unitPrice: 10,
      riskLevel: 'متوسطة',
      targetAmount: 15000000,
      fundedAmount: 9750000,
      daysRemaining: 18,
      category: 'سكني',
      fundManager: 'شركة الرياض المالية',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'عند التصفية',
      status: 'active',
      isActive: true,
      latitude: 24.7136,
      longitude: 46.6753,
      boardMembers: JSON.stringify([
        { name: 'عبدالرحمن خليل تلفت', position: 'رئيس مجلس الإدارة' },
        { name: 'خالد منير الحميد', position: 'عضو غير مستقل' },
        { name: 'محمد ال زومه الغامدي', position: 'عضو مستقل' },
      ]),
      attachments: JSON.stringify([
        { name: 'شروط وأحكام الصندوق', url: '/files/terms.pdf' },
        { name: 'الملخص التنفيذي', url: '/files/summary.pdf' },
      ]),
    },
    {
      type: 'صكوك',
      title: 'صكوك التعمير المتقدمة',
      description:
        'أدوات دين متوافقة مع الشريعة الإسلامية لتمويل مشروع تجاري على كورنيش جدة.',
      location: 'جدة - الكورنيش',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      images: [],
      badges: ['مميز', 'متوافق مع الشريعة'],
      expectedReturn: 18,
      durationMonths: 60,
      minimumAmount: 5000,
      unitPrice: 100,
      riskLevel: 'منخفضة',
      targetAmount: 30000000,
      fundedAmount: 26700000,
      daysRemaining: 5,
      category: 'تجاري',
      fundManager: 'تنمية كابيتال',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'ربع سنوي',
      status: 'active',
      isActive: true,
      latitude: 21.5433,
      longitude: 39.1727,
    },
    {
      type: 'مساهمة عقارية',
      title: 'مساهمة فلل الدرعية',
      description:
        'مساهمة عقارية لبناء مجمع فلل فاخرة في منطقة الدرعية التاريخية.',
      location: 'الرياض - الدرعية',
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      images: [],
      badges: ['حصري'],
      expectedReturn: 25,
      durationMonths: 24,
      minimumAmount: 10000,
      unitPrice: 50,
      riskLevel: 'متوسطة',
      targetAmount: 20000000,
      fundedAmount: 8400000,
      daysRemaining: 30,
      category: 'سكني',
      fundManager: 'دار الأركان',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'عند البيع',
      status: 'active',
      isActive: true,
      latitude: 24.815,
      longitude: 46.685,
    },
    {
      type: 'تمويل جماعي',
      title: 'مجمع الأندلس التجاري',
      description: 'تمويل جماعي لإنشاء مجمع تجاري متكامل في الدمام.',
      location: 'الدمام - الشاطئ الغربي',
      image:
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
      images: [],
      badges: ['جديد'],
      expectedReturn: 15,
      durationMonths: 18,
      minimumAmount: 500,
      unitPrice: 25,
      riskLevel: 'منخفضة',
      targetAmount: 5000000,
      fundedAmount: 4550000,
      daysRemaining: 3,
      category: 'تجاري',
      fundManager: 'رياض كابيتال',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'شهري',
      status: 'active',
      isActive: true,
      latitude: 26.1551,
      longitude: 50.2046,
    },
    {
      type: 'صندوق عقاري',
      title: 'صندوق المدينة المنورة',
      description:
        'صندوق استثماري لتطوير عقارات سكنية قريبة من الحرم النبوي الشريف.',
      location: 'المدينة المنورة - طريق الملك عبدالله',
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      images: [],
      badges: ['عوائد دورية', 'متوافق مع الشريعة'],
      expectedReturn: 17,
      durationMonths: 48,
      minimumAmount: 2000,
      unitPrice: 20,
      riskLevel: 'منخفضة',
      targetAmount: 20000000,
      fundedAmount: 11000000,
      daysRemaining: 25,
      category: 'سكني',
      fundManager: 'رياض كابيتال',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'سنوي',
      status: 'active',
      isActive: true,
      latitude: 24.4672,
      longitude: 39.6028,
    },
    {
      type: 'صكوك',
      title: 'صكوك فندق البحر الأحمر',
      description:
        'صكوك لتمويل فندق فاخر ضمن مشروع نيوم السياحي.',
      location: 'نيوم - منطقة تبوك',
      image:
        'https://images.unsplash.com/photo-1464938050520-ef2571e6f5e8?w=800&h=600&fit=crop',
      images: [],
      badges: ['فندقي', 'متوافق مع الشريعة'],
      expectedReturn: 22,
      durationMonths: 72,
      minimumAmount: 10000,
      unitPrice: 200,
      riskLevel: 'متوسطة-عالية',
      targetAmount: 50000000,
      fundedAmount: 19000000,
      daysRemaining: 45,
      category: 'فندقي',
      fundManager: 'السعودية للاستثمار',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'عند التصفية',
      status: 'active',
      isActive: true,
      latitude: 28.35,
      longitude: 34.71,
    },
    {
      type: 'صندوق عقاري',
      title: 'صندوق تنمية الفرص',
      description:
        'صندوق أسهم ملكية خاصة مغلق متوافق مع أحكام الشريعة الإسلامية.',
      location: 'الرياض - حي الرمال',
      image:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      images: [],
      badges: ['متوافق مع الشريعة'],
      expectedReturn: 18,
      durationMonths: 12,
      minimumAmount: 1000,
      unitPrice: 10,
      riskLevel: 'متوسطة',
      targetAmount: 100000000,
      fundedAmount: 41000000,
      daysRemaining: 0,
      category: 'صناعي',
      fundManager: 'تنمية كابيتال',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'عند التصفية',
      status: 'completed',
      isActive: true,
      latitude: 24.8607,
      longitude: 46.7875,
    },
    {
      type: 'صندوق عقاري',
      title: 'صندوق اطلالة الحرم',
      description:
        'صندوق استثماري لتطوير برج سكني فندقي مطل على الحرم المكي.',
      location: 'مكة المكرمة',
      image:
        'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800&h=600&fit=crop',
      images: [],
      badges: ['مميز', 'متوافق مع الشريعة'],
      expectedReturn: 101.67,
      durationMonths: 60,
      minimumAmount: 1000,
      unitPrice: 100,
      riskLevel: 'متوسطة',
      targetAmount: 250000000,
      fundedAmount: 250000000,
      daysRemaining: 0,
      category: 'فندقي',
      fundManager: 'ملاذ للاستثمار',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'عند التصفية',
      status: 'completed',
      isActive: true,
      latitude: 21.4225,
      longitude: 39.8265,
    },
    {
      type: 'صندوق عقاري',
      title: 'صندوق سدكو كابيتال العوالي',
      description:
        'صندوق عقاري لتطوير مجمع سكني متكامل في حي العوالي.',
      location: 'الرياض',
      image:
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
      images: [],
      badges: ['متوافق مع الشريعة'],
      expectedReturn: 68.25,
      durationMonths: 42,
      minimumAmount: 1000,
      unitPrice: 75,
      riskLevel: 'متوسطة',
      targetAmount: 130000000,
      fundedAmount: 130000000,
      daysRemaining: 0,
      category: 'سكني',
      fundManager: 'سدكو كابيتال',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'عند التصفية',
      status: 'completed',
      isActive: true,
      latitude: 24.7578,
      longitude: 46.7132,
    },
    {
      type: 'صندوق عقاري',
      title: 'صندوق رحاب المدينة الفندقي',
      description:
        'صندوق لتطوير فندق 5 نجوم قريب من الحرم النبوي.',
      location: 'المدينة المنورة',
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      images: [],
      badges: ['فندقي', 'متوافق مع الشريعة'],
      expectedReturn: 75,
      durationMonths: 60,
      minimumAmount: 1000,
      unitPrice: 150,
      riskLevel: 'متوسطة',
      targetAmount: 155000000,
      fundedAmount: 155000000,
      daysRemaining: 0,
      category: 'فندقي',
      fundManager: 'رحاب للاستثمار',
      distributor: 'أصيل',
      supervisor: 'هيئة السوق المالية',
      distributionPolicy: 'عند التصفية',
      status: 'completed',
      isActive: true,
      latitude: 24.4672,
      longitude: 39.6028,
    },
  ];

  const projects = [];
  for (const proj of projectsData) {
    const created = await prisma.project.create({ data: proj });
    projects.push(created);
    console.log('  ✅', created.title);
  }

  // ============================================
  // 5. Create Sample Investments
  // ============================================
  console.log('\n💰 Creating sample investments...');
  const sampleInvestments = [
    { userIndex: 0, projectIndex: 0, amount: 25000 },
    { userIndex: 0, projectIndex: 1, amount: 15000 },
    { userIndex: 1, projectIndex: 0, amount: 50000 },
    { userIndex: 2, projectIndex: 3, amount: 100000 },
    { userIndex: 4, projectIndex: 5, amount: 200000 },
    { userIndex: 1, projectIndex: 4, amount: 30000 },
    { userIndex: 3, projectIndex: 2, amount: 20000 },
  ];

  for (const inv of sampleInvestments) {
    const user = investorUsers[inv.userIndex];
    const project = projects[inv.projectIndex];

    if (user && project) {
      // Create investment
      await prisma.investment.create({
        data: {
          userId: user.id,
          projectId: project.id,
          amount: inv.amount,
          status: 'ACTIVE',
        },
      });

      // Create transaction
      if (user.wallet) {
        await prisma.transaction.create({
          data: {
            walletId: user.wallet.id,
            type: 'INVEST',
            amount: inv.amount,
            status: 'COMPLETED',
            description: `استثمار في ${project.title}`,
            projectId: project.id,
            reference: `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          },
        });
      }

      console.log(`  ✅ ${user.name} → ${project.title}`);
    }
  }

  // ============================================
  // 6. Create Sample Transactions
  // ============================================
  console.log('\n💳 Creating sample transactions...');
  for (const user of investorUsers.slice(0, 3)) {
    if (user.wallet) {
      await prisma.transaction.create({
        data: {
          walletId: user.wallet.id,
          type: 'DEPOSIT',
          amount: user.wallet.balance,
          status: 'COMPLETED',
          description: 'إيداع أولي',
          reference: `DEP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        },
      });
    }
  }
  console.log('  ✅ Sample transactions created');

  // ============================================
  // Final Output
  // ============================================
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('🎉 Seed completed successfully!');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log('📧 Admin Login:');
  console.log('   Email: admin@masharee.sa');
  console.log('   Password: Admin@123456\n');

  console.log('📧 Test Investor Login:');
  console.log('   Email: mohammed@test.com');
  console.log('   Password: Investor@123\n');

  console.log('📊 Seeded Data Summary:');
  console.log(`   ✓ 1 Admin User`);
  console.log(`   ✓ 5 Investor Users`);
  console.log(`   ✓ 10 Projects`);
  console.log(`   ✓ 7 Investments`);
  console.log('═══════════════════════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
