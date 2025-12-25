import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const { role, search, isActive } = req.query;
    
    const where = {};
    
    if (role) {
      where.role = role;
    }
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }
    
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message,
    });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }
    
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error.message,
    });
  }
};

// Crear usuario (solo SUPER_ADMIN y ADMIN)
export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array(),
      });
    }
    
    const { email, password, firstName, lastName, role } = req.body;
    
    // Verificar que el email no exista
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado',
      });
    }
    
    // Solo SUPER_ADMIN puede crear otros SUPER_ADMIN
    if (role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Solo el Super Admin puede crear otros Super Admins',
      });
    }
    
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || 'USER',
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
    
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: user,
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear usuario',
      error: error.message,
    });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
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
    const { email, firstName, lastName, role, isActive, password } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }
    
    // No se puede modificar el rol de SUPER_ADMIN
    if (user.role === 'SUPER_ADMIN' && role && role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'No se puede cambiar el rol del Super Admin',
      });
    }
    
    // Solo SUPER_ADMIN puede asignar rol SUPER_ADMIN
    if (role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Solo el Super Admin puede asignar este rol',
      });
    }
    
    const updateData = {};
    
    if (email) updateData.email = email;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (role) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });
    
    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar usuario',
      error: error.message,
    });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }
    
    // SUPER_ADMIN no se puede eliminar
    if (user.role === 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'El Super Admin no puede ser eliminado',
      });
    }
    
    // No se puede eliminar a sí mismo
    if (user.id === req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No puedes eliminar tu propia cuenta',
      });
    }
    
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    
    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario',
      error: error.message,
    });
  }
};

// Cambiar estado activo/inactivo
export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }
    
    // SUPER_ADMIN no se puede desactivar
    if (user.role === 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'El Super Admin no puede ser desactivado',
      });
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isActive: !user.isActive },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      },
    });
    
    res.json({
      success: true,
      message: `Usuario ${updatedUser.isActive ? 'activado' : 'desactivado'} exitosamente`,
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error al cambiar estado del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado del usuario',
      error: error.message,
    });
  }
};
