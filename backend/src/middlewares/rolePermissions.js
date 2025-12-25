// Middleware para verificar si el usuario es SUPER_ADMIN
export const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requiere rol de Super Admin',
    });
  }
  next();
};

// Middleware para verificar si el usuario es SUPER_ADMIN o ADMIN
export const isAdminOrAbove = (req, res, next) => {
  if (!['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requiere rol de Admin o superior',
    });
  }
  next();
};

// Middleware para verificar si el usuario es EDITOR o superior
export const isEditorOrAbove = (req, res, next) => {
  if (!['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requiere rol de Editor o superior',
    });
  }
  next();
};

// Middleware para verificar si el usuario es SALES o superior
export const isSalesOrAbove = (req, res, next) => {
  if (!['SUPER_ADMIN', 'ADMIN', 'SALES'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requiere rol de Ventas o superior',
    });
  }
  next();
};

// Middleware para verificar roles específicos
export const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}`,
      });
    }
    next();
  };
};

// Middleware para verificar si el usuario está activo
export const isActiveUser = (req, res, next) => {
  if (!req.user.isActive) {
    return res.status(403).json({
      success: false,
      message: 'Tu cuenta ha sido desactivada. Contacta al administrador',
    });
  }
  next();
};
