import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCMS() {
  console.log('🌱 Iniciando seed del CMS...');

  try {
    // Obtener el usuario admin
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@itssystems.com' },
    });

    if (!admin) {
      console.error('❌ Usuario admin no encontrado. Ejecuta el seed principal primero.');
      return;
    }

    // Crear páginas de ejemplo
    console.log('📄 Creando páginas...');
    
    const homePage = await prisma.page.upsert({
      where: { slug: 'inicio' },
      update: {},
      create: {
        title: 'Soluciones Tecnológicas Integrales',
        slug: 'inicio',
        content: `
          <div class="hero-section">
            <h1 class="hero-title">Transformamos tu Infraestructura Digital</h1>
            <p class="hero-subtitle">Expertos en Tecnología de la Información, Servidores y Seguridad Electrónica</p>
          </div>

          <div class="services-grid">
            <div class="service-card">
              <h2>🖥️ Instalación de Servidores</h2>
              <p>Implementamos y configuramos infraestructura de servidores robusta y escalable para tu empresa. Desde servidores físicos hasta soluciones en la nube.</p>
              <ul>
                <li>Servidores Windows Server y Linux</li>
                <li>Virtualización con VMware y Hyper-V</li>
                <li>Configuración de Active Directory</li>
                <li>Backup y recuperación ante desastres</li>
              </ul>
            </div>

            <div class="service-card">
              <h2>📹 Circuito Cerrado (CCTV)</h2>
              <p>Sistemas de videovigilancia de última generación para proteger tu negocio las 24 horas del día.</p>
              <ul>
                <li>Cámaras IP de alta resolución (4K/8MP)</li>
                <li>Grabación en la nube y local</li>
                <li>Acceso remoto desde cualquier dispositivo</li>
                <li>Análisis inteligente con IA</li>
                <li>Integración con sistemas de alarma</li>
              </ul>
            </div>

            <div class="service-card">
              <h2>💻 Servicios de TI</h2>
              <p>Soporte técnico integral y gestión de infraestructura tecnológica para empresas de todos los tamaños.</p>
              <ul>
                <li>Soporte técnico 24/7</li>
                <li>Mantenimiento preventivo y correctivo</li>
                <li>Redes y telecomunicaciones</li>
                <li>Ciberseguridad y firewall</li>
                <li>Consultoría tecnológica</li>
              </ul>
            </div>

            <div class="service-card">
              <h2>☁️ Soluciones en la Nube</h2>
              <p>Migración y gestión de servicios cloud para optimizar costos y mejorar la disponibilidad.</p>
              <ul>
                <li>Microsoft Azure y AWS</li>
                <li>Office 365 / Microsoft 365</li>
                <li>Google Workspace</li>
                <li>Backup en la nube</li>
                <li>Disaster Recovery</li>
              </ul>
            </div>
          </div>

          <div class="cta-section">
            <h2>¿Listo para Modernizar tu Infraestructura?</h2>
            <p>Contáctanos hoy y descubre cómo podemos ayudarte a llevar tu empresa al siguiente nivel tecnológico.</p>
            <div class="contact-info">
              <p>📧 Email: contacto@itssystems.com</p>
              <p>📱 Teléfono: +52 (55) 1234-5678</p>
              <p>📍 Ciudad de México, México</p>
            </div>
          </div>

          <div class="why-us">
            <h2>¿Por Qué Elegirnos?</h2>
            <div class="benefits">
              <div class="benefit">
                <h3>✅ Experiencia Comprobada</h3>
                <p>Más de 10 años implementando soluciones tecnológicas exitosas</p>
              </div>
              <div class="benefit">
                <h3>🚀 Tecnología de Vanguardia</h3>
                <p>Trabajamos con las últimas tecnologías y mejores prácticas del mercado</p>
              </div>
              <div class="benefit">
                <h3>🛡️ Seguridad Garantizada</h3>
                <p>Implementamos los más altos estándares de seguridad en cada proyecto</p>
              </div>
              <div class="benefit">
                <h3>💼 Soporte Profesional</h3>
                <p>Equipo de expertos disponible para resolver cualquier incidencia</p>
              </div>
            </div>
          </div>
        `,
        excerpt: 'Soluciones profesionales en TI, servidores, CCTV y tecnología digital para empresas',
        status: 'PUBLISHED',
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });

    const aboutPage = await prisma.page.upsert({
      where: { slug: 'nosotros' },
      update: {},
      create: {
        title: 'Nosotros',
        slug: 'nosotros',
        content: `
          <h1>Acerca de ITS SYSTEMS</h1>
          <h2>Nuestra Misión</h2>
          <p>Proporcionar soluciones tecnológicas innovadoras que impulsen el crecimiento de nuestros clientes.</p>
          <h2>Nuestra Visión</h2>
          <p>Ser líderes en el desarrollo de plataformas e-commerce y CMS en América Latina.</p>
          <h2>Nuestros Valores</h2>
          <ul>
            <li>Innovación constante</li>
            <li>Calidad en cada proyecto</li>
            <li>Compromiso con el cliente</li>
            <li>Trabajo en equipo</li>
          </ul>
        `,
        excerpt: 'Conoce más sobre ITS SYSTEMS, nuestra misión y valores',
        status: 'PUBLISHED',
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });

    const servicesPage = await prisma.page.upsert({
      where: { slug: 'servicios' },
      update: {},
      create: {
        title: 'Servicios',
        slug: 'servicios',
        content: `
          <h1>Nuestros Servicios</h1>
          <h2>Desarrollo de E-commerce</h2>
          <p>Creamos tiendas online completas con gestión de productos, carrito de compras, pasarelas de pago y más.</p>
          <h2>Sistemas de Gestión de Contenidos (CMS)</h2>
          <p>Plataformas intuitivas para gestionar el contenido de tu sitio web sin conocimientos técnicos.</p>
          <h2>Integración con Cisco</h2>
          <p>Conectamos tu plataforma con sistemas empresariales para una gestión unificada.</p>
          <h2>Consultoría Tecnológica</h2>
          <p>Te asesoramos en la mejor estrategia digital para tu negocio.</p>
        `,
        excerpt: 'Descubre todos los servicios que ofrecemos',
        status: 'PUBLISHED',
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });

    const contactPage = await prisma.page.upsert({
      where: { slug: 'contacto' },
      update: {},
      create: {
        title: 'Contacto',
        slug: 'contacto',
        content: `
          <h1>Contáctanos</h1>
          <p>¿Tienes un proyecto en mente? ¡Nos encantaría escucharte!</p>
          <h2>Información de Contacto</h2>
          <ul>
            <li><strong>Email:</strong> info@itssystems.com</li>
            <li><strong>Teléfono:</strong> +52 (55) 1234-5678</li>
            <li><strong>Dirección:</strong> Ciudad de México, México</li>
          </ul>
          <h2>Horario de Atención</h2>
          <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
        `,
        excerpt: 'Ponte en contacto con nosotros',
        status: 'PUBLISHED',
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });

    const privacyPage = await prisma.page.upsert({
      where: { slug: 'privacidad' },
      update: {},
      create: {
        title: 'Política de Privacidad',
        slug: 'privacidad',
        content: `
          <h1>Política de Privacidad</h1>
          <p>Última actualización: ${new Date().toLocaleDateString()}</p>
          <h2>Recopilación de Información</h2>
          <p>Recopilamos información que nos proporcionas directamente cuando utilizas nuestros servicios.</p>
          <h2>Uso de la Información</h2>
          <p>Utilizamos tu información para proporcionar, mantener y mejorar nuestros servicios.</p>
          <h2>Protección de Datos</h2>
          <p>Implementamos medidas de seguridad para proteger tu información personal.</p>
        `,
        excerpt: 'Conoce cómo protegemos tu información',
        status: 'PUBLISHED',
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });

    console.log(`✅ ${homePage.title} creada`);
    console.log(`✅ ${aboutPage.title} creada`);
    console.log(`✅ ${servicesPage.title} creada`);
    console.log(`✅ ${contactPage.title} creada`);
    console.log(`✅ ${privacyPage.title} creada`);

    // Crear SEO metadata para las páginas
    console.log('🔍 Creando metadatos SEO...');

    await prisma.sEOMetadata.upsert({
      where: { pageId: homePage.id },
      update: {},
      create: {
        pageId: homePage.id,
        metaTitle: 'ITS SYSTEMS - Soluciones E-commerce y CMS',
        metaDescription: 'Plataforma líder en e-commerce y gestión de contenidos. Impulsa tu negocio digital con nuestras soluciones innovadoras.',
        metaKeywords: 'ecommerce, cms, plataforma digital, tienda online',
        ogTitle: 'ITS SYSTEMS - Tu Socio en Transformación Digital',
        ogDescription: 'Soluciones tecnológicas para impulsar tu negocio',
        twitterCard: 'summary_large_image',
      },
    });

    // Crear menús
    console.log('📋 Creando menús...');

    const headerMenu = await prisma.menu.upsert({
      where: { name: 'Menú Principal' },
      update: {},
      create: {
        name: 'Menú Principal',
        location: 'header',
      },
    });

    const footerMenu = await prisma.menu.upsert({
      where: { name: 'Menú Footer' },
      update: {},
      create: {
        name: 'Menú Footer',
        location: 'footer',
      },
    });

    console.log(`✅ ${headerMenu.name} creado`);
    console.log(`✅ ${footerMenu.name} creado`);

    // Crear items del menú principal
    console.log('🔗 Creando items de menú...');

    await prisma.menuItem.createMany({
      data: [
        {
          label: 'Inicio',
          url: '/',
          order: 0,
          menuId: headerMenu.id,
        },
        {
          label: 'Nosotros',
          url: '/nosotros',
          order: 1,
          menuId: headerMenu.id,
        },
        {
          label: 'Servicios',
          url: '/servicios',
          order: 2,
          menuId: headerMenu.id,
        },
        {
          label: 'Contacto',
          url: '/contacto',
          order: 3,
          menuId: headerMenu.id,
        },
      ],
      skipDuplicates: true,
    });

    // Crear items del menú footer
    await prisma.menuItem.createMany({
      data: [
        {
          label: 'Política de Privacidad',
          url: '/privacidad',
          order: 0,
          menuId: footerMenu.id,
        },
        {
          label: 'Términos y Condiciones',
          url: '/terminos',
          order: 1,
          menuId: footerMenu.id,
        },
        {
          label: 'Contacto',
          url: '/contacto',
          order: 2,
          menuId: footerMenu.id,
        },
      ],
      skipDuplicates: true,
    });

    console.log('✅ Items de menú creados');

    console.log('✨ Seed del CMS completado exitosamente!');
  } catch (error) {
    console.error('❌ Error en seed del CMS:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedCMS()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
