import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';
import { generateToken } from '../config/jwt.js';
import { validate, registerSchema, loginSchema } from '../utils/validators/authValidators.js';
import logger from '../config/logger.js';

export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const validation = validate(req.body, registerSchema);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: validation.errors,
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    const token = generateToken({ userId: user.id, role: user.role });

    logger.info(`Usuario registrado: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    logger.error(`Error en register: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validation = validate(req.body, loginSchema);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: validation.errors,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuario inactivo',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    const token = generateToken({ userId: user.id, role: user.role });

    logger.info(`Usuario autenticado: ${email}`);

    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    logger.error(`Error en login: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
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

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error(`Error en getProfile: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    logger.info(`Perfil actualizado: ${user.email}`);

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: user,
    });
  } catch (error) {
    logger.error(`Error en updateProfile: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar perfil',
    });
  }
};
