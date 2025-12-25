import express from 'express';
import { authenticate, isAdmin } from '../middlewares/authenticate.js';
import { upload } from '../config/multer.js';
import {
  getAllPages,
  getPageById,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
} from '../controllers/pageController.js';
import {
  getAllMedia,
  getMediaById,
  uploadMedia,
  updateMedia,
  deleteMedia,
} from '../controllers/mediaController.js';
import {
  getAllMenus,
  getMenuById,
  getMenuByLocation,
  createMenu,
  updateMenu,
  deleteMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController.js';
import {
  createPageValidation,
  updatePageValidation,
  pageIdValidation,
  pageSlugValidation,
  updateMediaValidation,
  mediaIdValidation,
  createMenuValidation,
  updateMenuValidation,
  menuIdValidation,
  createMenuItemValidation,
  updateMenuItemValidation,
  menuItemIdValidation,
} from '../utils/validators/cmsValidators.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Pages
 *     description: Gestión de páginas del CMS
 *   - name: Media
 *     description: Gestión de archivos multimedia
 *   - name: Menus
 *     description: Gestión de menús de navegación
 */

// ==================== RUTAS DE PAGES ====================

/**
 * @swagger
 * /api/cms/pages:
 *   get:
 *     summary: Obtener todas las páginas
 *     tags: [Pages]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, PUBLISHED, ARCHIVED]
 *         description: Filtrar por estado
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar en título y contenido
 *     responses:
 *       200:
 *         description: Lista de páginas
 */
router.get('/pages', getAllPages);

/**
 * @swagger
 * /api/cms/pages/{id}:
 *   get:
 *     summary: Obtener una página por ID
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Página encontrada
 *       404:
 *         description: Página no encontrada
 */
router.get('/pages/:id', pageIdValidation, getPageById);

/**
 * @swagger
 * /api/cms/pages/slug/{slug}:
 *   get:
 *     summary: Obtener una página por slug
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Página encontrada
 *       404:
 *         description: Página no encontrada
 */
router.get('/pages/slug/:slug', pageSlugValidation, getPageBySlug);

/**
 * @swagger
 * /api/cms/pages:
 *   post:
 *     summary: Crear una nueva página
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - slug
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               content:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [DRAFT, PUBLISHED, ARCHIVED]
 *     responses:
 *       201:
 *         description: Página creada exitosamente
 */
router.post('/pages', authenticate, isAdmin, createPageValidation, createPage);

/**
 * @swagger
 * /api/cms/pages/{id}:
 *   put:
 *     summary: Actualizar una página
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Página actualizada
 */
router.put('/pages/:id', authenticate, isAdmin, updatePageValidation, updatePage);

/**
 * @swagger
 * /api/cms/pages/{id}:
 *   delete:
 *     summary: Eliminar una página
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Página eliminada
 */
router.delete('/pages/:id', authenticate, isAdmin, pageIdValidation, deletePage);

// ==================== RUTAS DE MEDIA ====================

/**
 * @swagger
 * /api/cms/media:
 *   get:
 *     summary: Obtener todos los archivos
 *     tags: [Media]
 *     parameters:
 *       - in: query
 *         name: mimeType
 *         schema:
 *           type: string
 *         description: Filtrar por tipo MIME
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar en nombre y alt
 *     responses:
 *       200:
 *         description: Lista de archivos
 */
router.get('/media', authenticate, getAllMedia);

/**
 * @swagger
 * /api/cms/media/{id}:
 *   get:
 *     summary: Obtener un archivo por ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Archivo encontrado
 */
router.get('/media/:id', authenticate, mediaIdValidation, getMediaById);

/**
 * @swagger
 * /api/cms/media/upload:
 *   post:
 *     summary: Subir un archivo
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               alt:
 *                 type: string
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Archivo subido exitosamente
 */
router.post('/media/upload', authenticate, upload.single('file'), uploadMedia);

/**
 * @swagger
 * /api/cms/media/{id}:
 *   put:
 *     summary: Actualizar información de un archivo
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Archivo actualizado
 */
router.put('/media/:id', authenticate, updateMediaValidation, updateMedia);

/**
 * @swagger
 * /api/cms/media/{id}:
 *   delete:
 *     summary: Eliminar un archivo
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Archivo eliminado
 */
router.delete('/media/:id', authenticate, isAdmin, mediaIdValidation, deleteMedia);

// ==================== RUTAS DE MENUS ====================

/**
 * @swagger
 * /api/cms/menus:
 *   get:
 *     summary: Obtener todos los menús
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: Lista de menús
 */
router.get('/menus', getAllMenus);

/**
 * @swagger
 * /api/cms/menus/{id}:
 *   get:
 *     summary: Obtener un menú por ID
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menú encontrado
 */
router.get('/menus/:id', menuIdValidation, getMenuById);

/**
 * @swagger
 * /api/cms/menus/location/{location}:
 *   get:
 *     summary: Obtener un menú por ubicación
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menú encontrado
 */
router.get('/menus/location/:location', getMenuByLocation);

/**
 * @swagger
 * /api/cms/menus:
 *   post:
 *     summary: Crear un nuevo menú
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Menú creado
 */
router.post('/menus', authenticate, isAdmin, createMenuValidation, createMenu);

/**
 * @swagger
 * /api/cms/menus/{id}:
 *   put:
 *     summary: Actualizar un menú
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Menú actualizado
 */
router.put('/menus/:id', authenticate, isAdmin, updateMenuValidation, updateMenu);

/**
 * @swagger
 * /api/cms/menus/{id}:
 *   delete:
 *     summary: Eliminar un menú
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Menú eliminado
 */
router.delete('/menus/:id', authenticate, isAdmin, menuIdValidation, deleteMenu);

// ==================== RUTAS DE MENU ITEMS ====================

/**
 * @swagger
 * /api/cms/menu-items:
 *   post:
 *     summary: Crear un item de menú
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Item creado
 */
router.post('/menu-items', authenticate, isAdmin, createMenuItemValidation, createMenuItem);

/**
 * @swagger
 * /api/cms/menu-items/{id}:
 *   put:
 *     summary: Actualizar un item de menú
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Item actualizado
 */
router.put('/menu-items/:id', authenticate, isAdmin, updateMenuItemValidation, updateMenuItem);

/**
 * @swagger
 * /api/cms/menu-items/{id}:
 *   delete:
 *     summary: Eliminar un item de menú
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Item eliminado
 */
router.delete('/menu-items/:id', authenticate, isAdmin, menuItemIdValidation, deleteMenuItem);

export default router;
