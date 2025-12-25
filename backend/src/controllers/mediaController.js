import prisma from '../config/database.js';
import logger from '../config/logger.js';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtener todos los archivos media
export const getAllMedia = async (req, res) => {
  try {
    const { mimeType, search } = req.query;
    
    const where = {};
    
    if (mimeType) {
      where.mimeType = { contains: mimeType };
    }
    
    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const media = await prisma.media.findMany({
      where,
      include: {
        uploadedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    res.json({
      success: true,
      data: media,
    });
  } catch (error) {
    logger.error(`Error en getAllMedia: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al obtener archivos',
    });
  }
};

// Obtener un archivo por ID
export const getMediaById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array(),
      });
    }
    
    const { id } = req.params;
    
    const media = await prisma.media.findUnique({
      where: { id: parseInt(id) },
      include: {
        uploadedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Archivo no encontrado',
      });
    }
    
    res.json({
      success: true,
      data: media,
    });
  } catch (error) {
    logger.error(`Error en getMediaById: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al obtener archivo',
    });
  }
};

// Subir un archivo
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se ha proporcionado ningún archivo',
      });
    }
    
    const { alt, caption } = req.body;
    const uploadedById = req.user.id;
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    const media = await prisma.media.create({
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        url: fileUrl,
        alt: alt || null,
        caption: caption || null,
        uploadedById,
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    
    logger.info(`Archivo subido: ${media.originalName} por usuario ${uploadedById}`);
    
    res.status(201).json({
      success: true,
      message: 'Archivo subido exitosamente',
      data: media,
    });
  } catch (error) {
    logger.error(`Error en uploadMedia: ${error.message}`);
    
    // Si hay error, eliminar el archivo subido
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al subir archivo',
    });
  }
};

// Actualizar información de un archivo
export const updateMedia = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array(),
      });
    }
    
    const { id } = req.params;
    const { alt, caption } = req.body;
    
    const existingMedia = await prisma.media.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!existingMedia) {
      return res.status(404).json({
        success: false,
        message: 'Archivo no encontrado',
      });
    }
    
    const updateData = {};
    if (alt !== undefined) updateData.alt = alt;
    if (caption !== undefined) updateData.caption = caption;
    
    const media = await prisma.media.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        uploadedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    
    logger.info(`Archivo actualizado: ${media.originalName}`);
    
    res.json({
      success: true,
      message: 'Archivo actualizado exitosamente',
      data: media,
    });
  } catch (error) {
    logger.error(`Error en updateMedia: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar archivo',
    });
  }
};

// Eliminar un archivo
export const deleteMedia = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array(),
      });
    }
    
    const { id } = req.params;
    
    const media = await prisma.media.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Archivo no encontrado',
      });
    }
    
    // Eliminar el archivo físico
    if (fs.existsSync(media.path)) {
      fs.unlinkSync(media.path);
    }
    
    // Eliminar el registro de la base de datos
    await prisma.media.delete({
      where: { id: parseInt(id) },
    });
    
    logger.info(`Archivo eliminado: ${media.originalName}`);
    
    res.json({
      success: true,
      message: 'Archivo eliminado exitosamente',
    });
  } catch (error) {
    logger.error(`Error en deleteMedia: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar archivo',
    });
  }
};
