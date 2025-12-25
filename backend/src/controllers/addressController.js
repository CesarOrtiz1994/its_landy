import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Obtener todas las direcciones del usuario
export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' }
      ],
    });
    
    res.json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error('Error al obtener direcciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener direcciones',
      error: error.message,
    });
  }
};

// Obtener dirección por ID
export const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const address = await prisma.address.findFirst({
      where: { 
        id: parseInt(id),
        userId 
      },
    });
    
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Dirección no encontrada',
      });
    }
    
    res.json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.error('Error al obtener dirección:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener dirección',
      error: error.message,
    });
  }
};

// Crear dirección
export const createAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array(),
      });
    }
    
    const userId = req.user.id;
    const { label, fullName, phone, street, city, state, zipCode, country, isDefault } = req.body;
    
    // Si es la dirección predeterminada, quitar el flag de las demás
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }
    
    const address = await prisma.address.create({
      data: {
        userId,
        label,
        fullName,
        phone,
        street,
        city,
        state,
        zipCode,
        country: country || 'México',
        isDefault: isDefault || false,
      },
    });
    
    res.status(201).json({
      success: true,
      message: 'Dirección creada exitosamente',
      data: address,
    });
  } catch (error) {
    console.error('Error al crear dirección:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear dirección',
      error: error.message,
    });
  }
};

// Actualizar dirección
export const updateAddress = async (req, res) => {
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
    const userId = req.user.id;
    const { label, fullName, phone, street, city, state, zipCode, country, isDefault } = req.body;
    
    // Verificar que la dirección pertenece al usuario
    const existingAddress = await prisma.address.findFirst({
      where: { 
        id: parseInt(id),
        userId 
      },
    });
    
    if (!existingAddress) {
      return res.status(404).json({
        success: false,
        message: 'Dirección no encontrada',
      });
    }
    
    // Si se marca como predeterminada, quitar el flag de las demás
    if (isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId,
          id: { not: parseInt(id) }
        },
        data: { isDefault: false },
      });
    }
    
    const address = await prisma.address.update({
      where: { id: parseInt(id) },
      data: {
        label,
        fullName,
        phone,
        street,
        city,
        state,
        zipCode,
        country,
        isDefault,
      },
    });
    
    res.json({
      success: true,
      message: 'Dirección actualizada exitosamente',
      data: address,
    });
  } catch (error) {
    console.error('Error al actualizar dirección:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar dirección',
      error: error.message,
    });
  }
};

// Eliminar dirección
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Verificar que la dirección pertenece al usuario
    const address = await prisma.address.findFirst({
      where: { 
        id: parseInt(id),
        userId 
      },
    });
    
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Dirección no encontrada',
      });
    }
    
    await prisma.address.delete({
      where: { id: parseInt(id) },
    });
    
    res.json({
      success: true,
      message: 'Dirección eliminada exitosamente',
    });
  } catch (error) {
    console.error('Error al eliminar dirección:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar dirección',
      error: error.message,
    });
  }
};

// Establecer dirección como predeterminada
export const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Verificar que la dirección pertenece al usuario
    const address = await prisma.address.findFirst({
      where: { 
        id: parseInt(id),
        userId 
      },
    });
    
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Dirección no encontrada',
      });
    }
    
    // Quitar el flag de todas las direcciones del usuario
    await prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
    
    // Marcar esta como predeterminada
    const updatedAddress = await prisma.address.update({
      where: { id: parseInt(id) },
      data: { isDefault: true },
    });
    
    res.json({
      success: true,
      message: 'Dirección establecida como predeterminada',
      data: updatedAddress,
    });
  } catch (error) {
    console.error('Error al establecer dirección predeterminada:', error);
    res.status(500).json({
      success: false,
      message: 'Error al establecer dirección predeterminada',
      error: error.message,
    });
  }
};
