import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeders...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@itssystems.com' },
    update: {},
    create: {
      email: 'admin@itssystems.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'ITS Systems',
      role: 'ADMIN',
      isActive: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: userPassword,
      firstName: 'Usuario',
      lastName: 'Prueba',
      role: 'USER',
      isActive: true,
    },
  });

  console.log('✅ Usuarios creados:');
  console.log('👤 Admin:', admin.email, '- Password: admin123');
  console.log('👤 User:', user.email, '- Password: user123');
}

main()
  .catch((e) => {
    console.error('❌ Error en seeders:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
