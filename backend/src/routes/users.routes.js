import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from '../controllers/userController.js';
import {
  createUserValidation,
  updateUserValidation,
  getUserByIdValidation,
  deleteUserValidation,
  getUsersQueryValidation,
} from '../utils/validators/userValidators.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isAdminOrAbove, isActiveUser } from '../middlewares/rolePermissions.js';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [SUPER_ADMIN, ADMIN, EDITOR, SALES, USER]
 *         description: Filtrar por rol
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por email, nombre o apellido
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filtrar por estado activo
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Sin permisos
 */
router.get(
  '/',
  authenticate,
  isActiveUser,
  isAdminOrAbove,
  getUsersQueryValidation,
  getAllUsers
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get(
  '/:id',
  authenticate,
  isActiveUser,
  isAdminOrAbove,
  getUserByIdValidation,
  getUserById
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [SUPER_ADMIN, ADMIN, EDITOR, SALES, USER]
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos
 */
router.post(
  '/',
  authenticate,
  isActiveUser,
  isAdminOrAbove,
  createUserValidation,
  createUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [SUPER_ADMIN, ADMIN, EDITOR, SALES, USER]
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put(
  '/:id',
  authenticate,
  isActiveUser,
  isAdminOrAbove,
  updateUserValidation,
  updateUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
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
 *         description: Usuario eliminado
 *       403:
 *         description: No se puede eliminar (Super Admin o usuario actual)
 *       404:
 *         description: Usuario no encontrado
 */
router.delete(
  '/:id',
  authenticate,
  isActiveUser,
  isAdminOrAbove,
  deleteUserValidation,
  deleteUser
);

/**
 * @swagger
 * /api/users/{id}/toggle-status:
 *   patch:
 *     summary: Activar/Desactivar usuario
 *     tags: [Users]
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
 *         description: Estado del usuario actualizado
 *       403:
 *         description: No se puede desactivar Super Admin
 *       404:
 *         description: Usuario no encontrado
 */
router.patch(
  '/:id/toggle-status',
  authenticate,
  isActiveUser,
  isAdminOrAbove,
  getUserByIdValidation,
  toggleUserStatus
);

export default router;
