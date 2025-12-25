import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false,
  allowedRoles 
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="text-white text-xl font-semibold">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles permitidos, verificar
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user?.role || '')) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Si requiere admin (SUPER_ADMIN o ADMIN)
  if (requireAdmin && !['SUPER_ADMIN', 'ADMIN'].includes(user?.role || '')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
