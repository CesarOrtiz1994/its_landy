import { body, param, query } from 'express-validator';

// Validación para crear usuario
export const createUserValidation = [
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('firstName')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .trim(),
  body('lastName')
    .notEmpty()
    .withMessage('El apellido es requerido')
    .trim(),
  body('role')
    .optional()
    .isIn(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SALES', 'USER'])
    .withMessage('Rol inválido'),
];

// Validación para actualizar usuario
export const updateUserValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID de usuario inválido'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('firstName')
    .optional()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .trim(),
  body('lastName')
    .optional()
    .notEmpty()
    .withMessage('El apellido no puede estar vacío')
    .trim(),
  body('role')
    .optional()
    .isIn(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SALES', 'USER'])
    .withMessage('Rol inválido'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive debe ser un booleano'),
];

// Validación para obtener usuario por ID
export const getUserByIdValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID de usuario inválido'),
];

// Validación para eliminar usuario
export const deleteUserValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID de usuario inválido'),
];

// Validación para búsqueda de usuarios
export const getUsersQueryValidation = [
  query('role')
    .optional()
    .isIn(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SALES', 'USER'])
    .withMessage('Rol inválido'),
  query('search')
    .optional()
    .isString()
    .trim(),
  query('isActive')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('isActive debe ser true o false'),
];
