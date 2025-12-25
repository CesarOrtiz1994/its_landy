import { body, param } from 'express-validator';

// Validadores para Pages
export const createPageValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ min: 3, max: 200 })
    .withMessage('El título debe tener entre 3 y 200 caracteres'),
  
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('El slug es requerido')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('El slug debe ser válido (solo letras minúsculas, números y guiones)'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('El contenido es requerido'),
  
  body('excerpt')
    .optional()
    .trim(),
  
  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
    .withMessage('Estado inválido'),
  
  body('publishedAt')
    .optional()
    .isISO8601()
    .withMessage('Fecha de publicación inválida'),
];

export const updatePageValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('El título debe tener entre 3 y 200 caracteres'),
  
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('El slug debe ser válido (solo letras minúsculas, números y guiones)'),
  
  body('content')
    .optional()
    .trim(),
  
  body('excerpt')
    .optional()
    .trim(),
  
  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
    .withMessage('Estado inválido'),
  
  body('publishedAt')
    .optional()
    .isISO8601()
    .withMessage('Fecha de publicación inválida'),
];

export const pageIdValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
];

export const pageSlugValidation = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug requerido')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug inválido'),
];

// Validadores para Media
export const updateMediaValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
  
  body('alt')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('El texto alternativo debe tener máximo 200 caracteres'),
  
  body('caption')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('El caption debe tener máximo 500 caracteres'),
];

export const mediaIdValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
];

// Validadores para Menus
export const createMenuValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  
  body('location')
    .trim()
    .notEmpty()
    .withMessage('La ubicación es requerida')
    .isLength({ min: 3, max: 100 })
    .withMessage('La ubicación debe tener entre 3 y 100 caracteres'),
];

export const updateMenuValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('La ubicación debe tener entre 3 y 100 caracteres'),
];

export const menuIdValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
];

// Validadores para Menu Items
export const createMenuItemValidation = [
  body('label')
    .trim()
    .notEmpty()
    .withMessage('La etiqueta es requerida')
    .isLength({ min: 1, max: 100 })
    .withMessage('La etiqueta debe tener entre 1 y 100 caracteres'),
  
  body('url')
    .trim()
    .notEmpty()
    .withMessage('La URL es requerida'),
  
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El orden debe ser un número entero positivo'),
  
  body('parentId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de padre inválido'),
  
  body('menuId')
    .isInt({ min: 1 })
    .withMessage('ID de menú requerido'),
];

export const updateMenuItemValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
  
  body('label')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('La etiqueta debe tener entre 1 y 100 caracteres'),
  
  body('url')
    .optional()
    .trim(),
  
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El orden debe ser un número entero positivo'),
  
  body('parentId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de padre inválido'),
];

export const menuItemIdValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
];

// Validadores para SEO Metadata
export const createSEOValidation = [
  body('metaTitle')
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage('El meta título debe tener máximo 60 caracteres'),
  
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('La meta descripción debe tener máximo 160 caracteres'),
  
  body('metaKeywords')
    .optional()
    .trim(),
  
  body('ogTitle')
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage('El título OG debe tener máximo 60 caracteres'),
  
  body('ogDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('La descripción OG debe tener máximo 160 caracteres'),
  
  body('ogImage')
    .optional()
    .trim()
    .isURL()
    .withMessage('La imagen OG debe ser una URL válida'),
  
  body('twitterCard')
    .optional()
    .trim()
    .isIn(['summary', 'summary_large_image', 'app', 'player'])
    .withMessage('Tipo de tarjeta de Twitter inválido'),
  
  body('canonicalUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('La URL canónica debe ser una URL válida'),
  
  body('pageId')
    .isInt({ min: 1 })
    .withMessage('ID de página requerido'),
];

export const updateSEOValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
  
  body('metaTitle')
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage('El meta título debe tener máximo 60 caracteres'),
  
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('La meta descripción debe tener máximo 160 caracteres'),
  
  body('metaKeywords')
    .optional()
    .trim(),
  
  body('ogTitle')
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage('El título OG debe tener máximo 60 caracteres'),
  
  body('ogDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('La descripción OG debe tener máximo 160 caracteres'),
  
  body('ogImage')
    .optional()
    .trim()
    .isURL()
    .withMessage('La imagen OG debe ser una URL válida'),
  
  body('twitterCard')
    .optional()
    .trim()
    .isIn(['summary', 'summary_large_image', 'app', 'player'])
    .withMessage('Tipo de tarjeta de Twitter inválido'),
  
  body('canonicalUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('La URL canónica debe ser una URL válida'),
];
