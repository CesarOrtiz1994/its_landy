import prisma from '../config/database.js';
import logger from '../config/logger.js';
import { validationResult } from 'express-validator';

// Obtener todos los menús
export const getAllMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        items: {
          where: {
            parentId: null, // Solo items de nivel superior
          },
          include: {
            children: {
              include: {
                children: true, // Hasta 3 niveles de profundidad
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    res.json({
      success: true,
      data: menus,
    });
  } catch (error) {
    logger.error(`Error en getAllMenus: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al obtener menús',
    });
  }
};

// Obtener un menú por ID
export const getMenuById = async (req, res) => {
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
    
    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: {
          where: {
            parentId: null,
          },
          include: {
            children: {
              include: {
                children: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menú no encontrado',
      });
    }
    
    res.json({
      success: true,
      data: menu,
    });
  } catch (error) {
    logger.error(`Error en getMenuById: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al obtener menú',
    });
  }
};

// Obtener un menú por ubicación
export const getMenuByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    
    const menu = await prisma.menu.findFirst({
      where: { location },
      include: {
        items: {
          where: {
            parentId: null,
          },
          include: {
            children: {
              include: {
                children: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menú no encontrado',
      });
    }
    
    res.json({
      success: true,
      data: menu,
    });
  } catch (error) {
    logger.error(`Error en getMenuByLocation: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al obtener menú',
    });
  }
};

// Crear un nuevo menú
export const createMenu = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array(),
      });
    }
    
    const { name, location } = req.body;
    
    // Verificar si el nombre ya existe
    const existingMenu = await prisma.menu.findUnique({
      where: { name },
    });
    
    if (existingMenu) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del menú ya está en uso',
      });
    }
    
    const menu = await prisma.menu.create({
      data: {
        name,
        location,
      },
    });
    
    logger.info(`Menú creado: ${menu.name}`);
    
    res.status(201).json({
      success: true,
      message: 'Menú creado exitosamente',
      data: menu,
    });
  } catch (error) {
    logger.error(`Error en createMenu: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al crear menú',
    });
  }
};

// Actualizar un menú
export const updateMenu = async (req, res) => {
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
    const { name, location } = req.body;
    
    const existingMenu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!existingMenu) {
      return res.status(404).json({
        success: false,
        message: 'Menú no encontrado',
      });
    }
    
    // Si se está cambiando el nombre, verificar que no exista
    if (name && name !== existingMenu.name) {
      const nameExists = await prisma.menu.findUnique({
        where: { name },
      });
      
      if (nameExists) {
        return res.status(400).json({
          success: false,
          message: 'El nombre del menú ya está en uso',
        });
      }
    }
    
    const updateData = {};
    if (name) updateData.name = name;
    if (location) updateData.location = location;
    
    const menu = await prisma.menu.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        items: true,
      },
    });
    
    logger.info(`Menú actualizado: ${menu.name}`);
    
    res.json({
      success: true,
      message: 'Menú actualizado exitosamente',
      data: menu,
    });
  } catch (error) {
    logger.error(`Error en updateMenu: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar menú',
    });
  }
};

// Eliminar un menú
export const deleteMenu = async (req, res) => {
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
    
    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menú no encontrado',
      });
    }
    
    await prisma.menu.delete({
      where: { id: parseInt(id) },
    });
    
    logger.info(`Menú eliminado: ${menu.name}`);
    
    res.json({
      success: true,
      message: 'Menú eliminado exitosamente',
    });
  } catch (error) {
    logger.error(`Error en deleteMenu: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar menú',
    });
  }
};

// CRUD para Menu Items

// Crear un item de menú
export const createMenuItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array(),
      });
    }
    
    const { label, url, order, parentId, menuId } = req.body;
    
    // Verificar que el menú existe
    const menu = await prisma.menu.findUnique({
      where: { id: menuId },
    });
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menú no encontrado',
      });
    }
    
    // Si tiene parentId, verificar que el padre existe
    if (parentId) {
      const parent = await prisma.menuItem.findUnique({
        where: { id: parentId },
      });
      
      if (!parent) {
        return res.status(404).json({
          success: false,
          message: 'Item padre no encontrado',
        });
      }
    }
    
    const menuItem = await prisma.menuItem.create({
      data: {
        label,
        url,
        order: order || 0,
        parentId: parentId || null,
        menuId,
      },
    });
    
    logger.info(`Item de menú creado: ${menuItem.label}`);
    
    res.status(201).json({
      success: true,
      message: 'Item de menú creado exitosamente',
      data: menuItem,
    });
  } catch (error) {
    logger.error(`Error en createMenuItem: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al crear item de menú',
    });
  }
};

// Actualizar un item de menú
export const updateMenuItem = async (req, res) => {
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
    const { label, url, order, parentId } = req.body;
    
    const existingItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: 'Item de menú no encontrado',
      });
    }
    
    const updateData = {};
    if (label) updateData.label = label;
    if (url) updateData.url = url;
    if (order !== undefined) updateData.order = order;
    if (parentId !== undefined) updateData.parentId = parentId;
    
    const menuItem = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    
    logger.info(`Item de menú actualizado: ${menuItem.label}`);
    
    res.json({
      success: true,
      message: 'Item de menú actualizado exitosamente',
      data: menuItem,
    });
  } catch (error) {
    logger.error(`Error en updateMenuItem: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar item de menú',
    });
  }
};

// Eliminar un item de menú
export const deleteMenuItem = async (req, res) => {
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
    
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Item de menú no encontrado',
      });
    }
    
    await prisma.menuItem.delete({
      where: { id: parseInt(id) },
    });
    
    logger.info(`Item de menú eliminado: ${menuItem.label}`);
    
    res.json({
      success: true,
      message: 'Item de menú eliminado exitosamente',
    });
  } catch (error) {
    logger.error(`Error en deleteMenuItem: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar item de menú',
    });
  }
};
