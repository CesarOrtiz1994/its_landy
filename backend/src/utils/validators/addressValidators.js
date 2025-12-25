import { body, param } from 'express-validator';

// Validación para crear dirección
export const createAddressValidation = [
  body('label')
    .notEmpty()
    .withMessage('La etiqueta es requerida')
    .trim(),
  body('fullName')
    .notEmpty()
    .withMessage('El nombre completo es requerido')
    .trim(),
  body('phone')
    .notEmpty()
    .withMessage('El teléfono es requerido')
    .matches(/^[0-9\s\-\+\(\)]+$/)
    .withMessage('Formato de teléfono inválido'),
  body('street')
    .notEmpty()
    .withMessage('La calle es requerida')
    .trim(),
  body('city')
    .notEmpty()
    .withMessage('La ciudad es requerida')
    .trim(),
  body('state')
    .notEmpty()
    .withMessage('El estado es requerido')
    .trim(),
  body('zipCode')
    .notEmpty()
    .withMessage('El código postal es requerido')
    .matches(/^[0-9]{5}$/)
    .withMessage('El código postal debe tener 5 dígitos'),
  body('country')
    .optional()
    .trim(),
  body('isDefault')
    .optional()
    .isBoolean()
    .withMessage('isDefault debe ser un booleano'),
];

// Validación para actualizar dirección
export const updateAddressValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID de dirección inválido'),
  ...createAddressValidation,
];

// Validación para obtener/eliminar dirección por ID
export const addressIdValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID de dirección inválido'),
];
