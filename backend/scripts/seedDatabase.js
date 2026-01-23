import bcrypt from 'bcryptjs';
import pool, { initializeDatabase } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Initialize database schema
    await initializeDatabase();

    // Create admin user
    console.log('👑 Creating admin user...');
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await pool.query(
      `INSERT INTO users (username, email, password_hash, first_name, last_name, role, is_admin)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (email) DO NOTHING`,
      ['admin', 'admin@masharee.com', hashedPassword, 'مسؤول', 'النظام', 'admin', true]
    );

    console.log('✅ Admin user created');
    console.log('   Email: admin@masharee.com');
    console.log('   Password: admin123');

    // Create sample projects
    console.log('\n📋 Creating sample projects...');

    const projects = [
      {
        title: 'صندوق إطلالة الحرم العقاري',
        description: 'استثمار عقاري متميز في موقع حيوي بالمدينة المنورة',
        category: 'صندوق عقاري',
        image_url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
        target_amount: 250000000,
        duration_months: 60,
        return_percentage: 18.5,
        location: 'المدينة المنورة',
      },
      {
        title: 'صندوق سكوك كابيتال المالي',
        description: 'صندوق استثماري متخصص في الصكوك الإسلامية',
        category: 'صكوك',
        image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        target_amount: 130000000,
        duration_months: 42,
        return_percentage: 16.75,
        location: 'جدة',
      },
      {
        title: 'صندوق ريحان المدينة الفندقي',
        description: 'استثمار فندقي متطور في منطقة نيوم السياحية',
        category: 'فندقي',
        image_url: 'https://images.unsplash.com/photo-1464938050520-ef2571e6f5e8?w=800&q=80',
        target_amount: 155000000,
        duration_months: 60,
        return_percentage: 19.5,
        location: 'نيوم - منطقة تبوك',
      },
      {
        title: 'صندوق التمويل الجماعي للمشاريع الصغيرة',
        description: 'تمويل جماعي لدعم المشاريع الصغيرة والمتوسطة',
        category: 'تمويل جماعي',
        image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        target_amount: 50000000,
        duration_months: 36,
        return_percentage: 15.0,
        location: 'الرياض',
      },
      {
        title: 'صندوق التطوير العقاري المتكامل',
        description: 'مشروع تطوير عقاري شامل يضم سكن تجاري وخدمات',
        category: 'صندوق عقاري',
        image_url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
        target_amount: 180000000,
        duration_months: 48,
        return_percentage: 17.8,
        location: 'الدمام',
      },
      {
        title: 'صكوك البنية التحتية الحديثة',
        description: 'استثمار في مشاريع البنية التحتية الحديثة',
        category: 'صكوك',
        image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        target_amount: 200000000,
        duration_months: 54,
        return_percentage: 17.25,
        location: 'الرياض',
      },
    ];

    // Get admin user ID
    const adminResult = await pool.query('SELECT id FROM users WHERE email = $1', ['admin@masharee.com']);
    const adminId = adminResult.rows[0].id;

    for (const project of projects) {
      await pool.query(
        `INSERT INTO projects (title, description, category, image_url, target_amount, duration_months, return_percentage, location, created_by, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [project.title, project.description, project.category, project.image_url, project.target_amount, project.duration_months, project.return_percentage, project.location, adminId, 'active']
      );
    }

    console.log(`✅ ${projects.length} sample projects created`);

    console.log('\n✨ Database seeding completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📌 Next steps:');
    console.log('1. Ensure PostgreSQL is installed and running');
    console.log('2. Create database and user as configured in .env');
    console.log('3. Run: npm run server');
    console.log('4. Open http://localhost:5173 in your browser');
    console.log('5. Login with: admin@masharee.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
