import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeders...');

  const defaultPassword = await bcrypt.hash('admin123', 10);

  // SUPER_ADMIN - No se puede eliminar
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@itssystems.com' },
    update: {},
    create: {
      email: 'superadmin@itssystems.com',
      password: defaultPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  // ADMIN - Control total pero puede ser eliminado
  const admin = await prisma.user.upsert({
    where: { email: 'admin@itssystems.com' },
    update: {},
    create: {
      email: 'admin@itssystems.com',
      password: defaultPassword,
      firstName: 'Admin',
      lastName: 'ITS Systems',
      role: 'ADMIN',
      isActive: true,
    },
  });

  // EDITOR - Solo puede editar la landing
  const editor = await prisma.user.upsert({
    where: { email: 'editor@itssystems.com' },
    update: {},
    create: {
      email: 'editor@itssystems.com',
      password: defaultPassword,
      firstName: 'Editor',
      lastName: 'Contenido',
      role: 'EDITOR',
      isActive: true,
    },
  });

  // SALES - Puede ver ventas y dar seguimiento
  const sales = await prisma.user.upsert({
    where: { email: 'ventas@itssystems.com' },
    update: {},
    create: {
      email: 'ventas@itssystems.com',
      password: defaultPassword,
      firstName: 'Vendedor',
      lastName: 'ITS',
      role: 'SALES',
      isActive: true,
    },
  });

  // USER - Usuario comprador
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: defaultPassword,
      firstName: 'Usuario',
      lastName: 'Comprador',
      role: 'USER',
      isActive: true,
    },
  });

  console.log('✅ Usuarios creados (Password para todos: admin123):');
  console.log('👑 Super Admin:', superAdmin.email);
  console.log('👤 Admin:', admin.email);
  console.log('✏️  Editor:', editor.email);
  console.log('💰 Ventas:', sales.email);
  console.log('🛒 Usuario:', user.email);
}

main()
  .catch((e) => {
    console.error('❌ Error en seeders:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
