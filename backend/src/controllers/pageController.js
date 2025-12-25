import prisma from '../config/database.js';
import logger from '../config/logger.js';
import { validationResult } from 'express-validator';

// Obtener todas las páginas
export const getAllPages = async (req, res) => {
  try {
    const { status, search } = req.query;
    
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const pages = await prisma.page.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        seoMetadata: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    res.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    logger.error(`Error en getAllPages: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al obtener páginas',
    });
  }
};

// Obtener una página por ID
export const getPageById = async (req, res) => {
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
    
    const page = await prisma.page.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        seoMetadata: true,
      },
    });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Página no encontrada',
      });
    }
    
    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    logger.error(`Error en getPageById: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al obtener página',
    });
  }
};

// Obtener una página por slug
export const getPageBySlug = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array(),
      });
    }
    
    const { slug } = req.params;
    
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        seoMetadata: true,
      },
    });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Página no encontrada',
      });
    }
    
    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    logger.error(`Error en getPageBySlug: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al obtener página',
    });
  }
};

// Crear una nueva página
export const createPage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array(),
      });
    }
    
    const { title, slug, content, excerpt, status, publishedAt } = req.body;
    const authorId = req.user.id;
    
    // Verificar si el slug ya existe
    const existingPage = await prisma.page.findUnique({
      where: { slug },
    });
    
    if (existingPage) {
      return res.status(400).json({
        success: false,
        message: 'El slug ya está en uso',
      });
    }
    
    const pageData = {
      title,
      slug,
      content,
      excerpt,
      status: status || 'DRAFT',
      authorId,
    };
    
    if (publishedAt) {
      pageData.publishedAt = new Date(publishedAt);
    } else if (status === 'PUBLISHED') {
      pageData.publishedAt = new Date();
    }
    
    const page = await prisma.page.create({
      data: pageData,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    
    logger.info(`Página creada: ${page.title} por usuario ${authorId}`);
    
    res.status(201).json({
      success: true,
      message: 'Página creada exitosamente',
      data: page,
    });
  } catch (error) {
    logger.error(`Error en createPage: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al crear página',
    });
  }
};

// Actualizar una página
export const updatePage = async (req, res) => {
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
    const { title, slug, content, excerpt, status, publishedAt } = req.body;
    
    // Verificar si la página existe
    const existingPage = await prisma.page.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!existingPage) {
      return res.status(404).json({
        success: false,
        message: 'Página no encontrada',
      });
    }
    
    // Si se está cambiando el slug, verificar que no exista
    if (slug && slug !== existingPage.slug) {
      const slugExists = await prisma.page.findUnique({
        where: { slug },
      });
      
      if (slugExists) {
        return res.status(400).json({
          success: false,
          message: 'El slug ya está en uso',
        });
      }
    }
    
    const updateData = {};
    
    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (content) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (status) {
      updateData.status = status;
      if (status === 'PUBLISHED' && !existingPage.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (publishedAt) updateData.publishedAt = new Date(publishedAt);
    
    const page = await prisma.page.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        seoMetadata: true,
      },
    });
    
    logger.info(`Página actualizada: ${page.title}`);
    
    res.json({
      success: true,
      message: 'Página actualizada exitosamente',
      data: page,
    });
  } catch (error) {
    logger.error(`Error en updatePage: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar página',
    });
  }
};

// Eliminar una página
export const deletePage = async (req, res) => {
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
    
    const page = await prisma.page.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Página no encontrada',
      });
    }
    
    await prisma.page.delete({
      where: { id: parseInt(id) },
    });
    
    logger.info(`Página eliminada: ${page.title}`);
    
    res.json({
      success: true,
      message: 'Página eliminada exitosamente',
    });
  } catch (error) {
    logger.error(`Error en deletePage: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar página',
    });
  }
};
