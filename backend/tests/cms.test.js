import request from 'supertest';
import express from 'express';
import cors from 'cors';
import cmsRoutes from '../src/routes/cms.routes.js';
import authRoutes from '../src/routes/auth.routes.js';
import prisma from '../src/config/database.js';
import errorHandler from '../src/middlewares/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/cms', cmsRoutes);
app.use(errorHandler);

let adminToken;
let userToken;
let testPageId;
let testMediaId;
let testMenuId;
let testMenuItemId;

describe('CMS API Tests', () => {
  beforeAll(async () => {
    // Login como admin para obtener token
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@itssystems.com',
        password: 'admin123',
      });
    
    adminToken = adminLogin.body.data.token;
    
    // Login como usuario normal
    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@test.com',
        password: 'user123',
      });
    
    userToken = userLogin.body.data.token;
  });

  // ==================== TESTS DE PAGES ====================
  
  describe('Pages API', () => {
    describe('POST /api/cms/pages', () => {
      it('Debe crear una nueva página como admin', async () => {
        const response = await request(app)
          .post('/api/cms/pages')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            title: 'Página de Prueba',
            slug: 'pagina-de-prueba',
            content: 'Este es el contenido de la página de prueba',
            excerpt: 'Extracto de la página',
            status: 'DRAFT',
          });
        
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe('Página de Prueba');
        expect(response.body.data.slug).toBe('pagina-de-prueba');
        
        testPageId = response.body.data.id;
      });

      it('No debe crear página con slug duplicado', async () => {
        const response = await request(app)
          .post('/api/cms/pages')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            title: 'Otra Página',
            slug: 'pagina-de-prueba',
            content: 'Contenido',
          });
        
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      });

      it('No debe crear página sin autenticación', async () => {
        const response = await request(app)
          .post('/api/cms/pages')
          .send({
            title: 'Página Sin Auth',
            slug: 'pagina-sin-auth',
            content: 'Contenido',
          });
        
        expect(response.status).toBe(401);
      });

      it('No debe crear página como usuario normal', async () => {
        const response = await request(app)
          .post('/api/cms/pages')
          .set('Authorization', `Bearer ${userToken}`)
          .send({
            title: 'Página Usuario',
            slug: 'pagina-usuario',
            content: 'Contenido',
          });
        
        expect(response.status).toBe(403);
      });
    });

    describe('GET /api/cms/pages', () => {
      it('Debe obtener todas las páginas', async () => {
        const response = await request(app)
          .get('/api/cms/pages');
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('Debe filtrar páginas por estado', async () => {
        const response = await request(app)
          .get('/api/cms/pages?status=DRAFT');
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });

      it('Debe buscar páginas por texto', async () => {
        const response = await request(app)
          .get('/api/cms/pages?search=prueba');
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });

    describe('GET /api/cms/pages/:id', () => {
      it('Debe obtener una página por ID', async () => {
        const response = await request(app)
          .get(`/api/cms/pages/${testPageId}`);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(testPageId);
      });

      it('Debe retornar 404 para página inexistente', async () => {
        const response = await request(app)
          .get('/api/cms/pages/99999');
        
        expect(response.status).toBe(404);
      });
    });

    describe('GET /api/cms/pages/slug/:slug', () => {
      it('Debe obtener una página por slug', async () => {
        const response = await request(app)
          .get('/api/cms/pages/slug/pagina-de-prueba');
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.slug).toBe('pagina-de-prueba');
      });
    });

    describe('PUT /api/cms/pages/:id', () => {
      it('Debe actualizar una página como admin', async () => {
        const response = await request(app)
          .put(`/api/cms/pages/${testPageId}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            title: 'Página Actualizada',
            status: 'PUBLISHED',
          });
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe('Página Actualizada');
        expect(response.body.data.status).toBe('PUBLISHED');
      });

      it('No debe actualizar página sin autenticación', async () => {
        const response = await request(app)
          .put(`/api/cms/pages/${testPageId}`)
          .send({
            title: 'Intento de Actualización',
          });
        
        expect(response.status).toBe(401);
      });
    });

    describe('DELETE /api/cms/pages/:id', () => {
      it('No debe eliminar página sin autenticación', async () => {
        const response = await request(app)
          .delete(`/api/cms/pages/${testPageId}`);
        
        expect(response.status).toBe(401);
      });

      it('No debe eliminar página como usuario normal', async () => {
        const response = await request(app)
          .delete(`/api/cms/pages/${testPageId}`)
          .set('Authorization', `Bearer ${userToken}`);
        
        expect(response.status).toBe(403);
      });

      it('Debe eliminar página como admin', async () => {
        const response = await request(app)
          .delete(`/api/cms/pages/${testPageId}`)
          .set('Authorization', `Bearer ${adminToken}`);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });
  });

  // ==================== TESTS DE MEDIA ====================
  
  describe('Media API', () => {
    describe('POST /api/cms/media/upload', () => {
      it('Debe subir un archivo como usuario autenticado', async () => {
        // Crear un archivo de prueba (PDF permitido)
        const testFilePath = path.join(__dirname, 'test-document.pdf');
        fs.writeFileSync(testFilePath, 'PDF test content');
        
        const response = await request(app)
          .post('/api/cms/media/upload')
          .set('Authorization', `Bearer ${adminToken}`)
          .field('alt', 'Documento de prueba')
          .field('caption', 'Caption de prueba')
          .attach('file', testFilePath);
        
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.originalName).toBe('test-document.pdf');
        
        testMediaId = response.body.data.id;
        
        // Limpiar archivo de prueba
        if (fs.existsSync(testFilePath)) {
          fs.unlinkSync(testFilePath);
        }
      });

      it('No debe subir archivo sin autenticación', async () => {
        const testFilePath = path.join(__dirname, 'test-document2.pdf');
        fs.writeFileSync(testFilePath, 'PDF test content');
        
        const response = await request(app)
          .post('/api/cms/media/upload')
          .attach('file', testFilePath);
        
        expect(response.status).toBe(401);
        
        if (fs.existsSync(testFilePath)) {
          fs.unlinkSync(testFilePath);
        }
      });
    });

    describe('GET /api/cms/media', () => {
      it('Debe obtener todos los archivos como usuario autenticado', async () => {
        const response = await request(app)
          .get('/api/cms/media')
          .set('Authorization', `Bearer ${adminToken}`);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('No debe obtener archivos sin autenticación', async () => {
        const response = await request(app)
          .get('/api/cms/media');
        
        expect(response.status).toBe(401);
      });
    });

    describe('PUT /api/cms/media/:id', () => {
      it('Debe actualizar metadata de archivo', async () => {
        const response = await request(app)
          .put(`/api/cms/media/${testMediaId}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            alt: 'Texto alternativo',
            caption: 'Descripción del archivo',
          });
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.alt).toBe('Texto alternativo');
      });
    });

    describe('DELETE /api/cms/media/:id', () => {
      it('Debe eliminar archivo como admin', async () => {
        const response = await request(app)
          .delete(`/api/cms/media/${testMediaId}`)
          .set('Authorization', `Bearer ${adminToken}`);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });
  });

  // ==================== TESTS DE MENUS ====================
  
  describe('Menus API', () => {
    describe('POST /api/cms/menus', () => {
      it('Debe crear un nuevo menú como admin', async () => {
        const response = await request(app)
          .post('/api/cms/menus')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            name: 'Menú de Prueba Test',
            location: 'sidebar',
          });
        
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe('Menú de Prueba Test');
        
        testMenuId = response.body.data.id;
      });

      it('No debe crear menú con nombre duplicado', async () => {
        const response = await request(app)
          .post('/api/cms/menus')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            name: 'Menú de Prueba Test',
            location: 'footer',
          });
        
        expect(response.status).toBe(400);
      });
    });

    describe('GET /api/cms/menus', () => {
      it('Debe obtener todos los menús', async () => {
        const response = await request(app)
          .get('/api/cms/menus');
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });

    describe('POST /api/cms/menu-items', () => {
      it('Debe crear un item de menú', async () => {
        const response = await request(app)
          .post('/api/cms/menu-items')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            label: 'Inicio',
            url: '/',
            order: 0,
            menuId: testMenuId,
          });
        
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.label).toBe('Inicio');
        
        testMenuItemId = response.body.data.id;
      });
    });

    describe('PUT /api/cms/menu-items/:id', () => {
      it('Debe actualizar un item de menú', async () => {
        const response = await request(app)
          .put(`/api/cms/menu-items/${testMenuItemId}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            label: 'Página Principal',
            order: 1,
          });
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.label).toBe('Página Principal');
      });
    });

    describe('DELETE /api/cms/menu-items/:id', () => {
      it('Debe eliminar un item de menú', async () => {
        const response = await request(app)
          .delete(`/api/cms/menu-items/${testMenuItemId}`)
          .set('Authorization', `Bearer ${adminToken}`);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });

    describe('DELETE /api/cms/menus/:id', () => {
      it('Debe eliminar un menú', async () => {
        const response = await request(app)
          .delete(`/api/cms/menus/${testMenuId}`)
          .set('Authorization', `Bearer ${adminToken}`);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });
  });
});
