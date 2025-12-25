import express from 'express';
import {
  getUserAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from '../controllers/addressController.js';
import {
  createAddressValidation,
  updateAddressValidation,
  addressIdValidation,
} from '../utils/validators/addressValidators.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Obtener todas las direcciones del usuario
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de direcciones
 */
router.get('/', getUserAddresses);

/**
 * @swagger
 * /api/addresses/{id}:
 *   get:
 *     summary: Obtener dirección por ID
 *     tags: [Addresses]
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
 *         description: Dirección encontrada
 *       404:
 *         description: Dirección no encontrada
 */
router.get('/:id', addressIdValidation, getAddressById);

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Crear nueva dirección
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *               - fullName
 *               - phone
 *               - street
 *               - city
 *               - state
 *               - zipCode
 *             properties:
 *               label:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Dirección creada
 */
router.post('/', createAddressValidation, createAddress);

/**
 * @swagger
 * /api/addresses/{id}:
 *   put:
 *     summary: Actualizar dirección
 *     tags: [Addresses]
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
 *     responses:
 *       200:
 *         description: Dirección actualizada
 */
router.put('/:id', updateAddressValidation, updateAddress);

/**
 * @swagger
 * /api/addresses/{id}:
 *   delete:
 *     summary: Eliminar dirección
 *     tags: [Addresses]
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
 *         description: Dirección eliminada
 */
router.delete('/:id', addressIdValidation, deleteAddress);

/**
 * @swagger
 * /api/addresses/{id}/set-default:
 *   patch:
 *     summary: Establecer dirección como predeterminada
 *     tags: [Addresses]
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
 *         description: Dirección establecida como predeterminada
 */
router.patch('/:id/set-default', addressIdValidation, setDefaultAddress);

export default router;
