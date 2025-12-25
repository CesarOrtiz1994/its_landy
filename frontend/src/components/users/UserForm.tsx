import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, getUserById } from '../../services/userService';
import type { CreateUserData, UpdateUserData, UserRole } from '../../types/user.types';
import { Save, X, User } from 'lucide-react';

export const UserForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<CreateUserData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'USER',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingUser, setLoadingUser] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      loadUser(parseInt(id));
    }
  }, [id, isEdit]);

  const loadUser = async (userId: number) => {
    try {
      setLoadingUser(true);
      const user = await getUserById(userId);
      setFormData({
        email: user.email,
        password: '', // No mostramos la contraseña
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuario');
    } finally {
      setLoadingUser(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEdit && id) {
        const updateData: UpdateUserData = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        };
        // Solo incluir password si se proporcionó uno nuevo
        if (formData.password) {
          updateData.password = formData.password;
        }
        await updateUser(parseInt(id), updateData);
      } else {
        await createUser(formData);
      }
      navigate('/cms/users');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al guardar usuario');
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <User className="w-8 h-8" />
          {isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="usuario@ejemplo.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña {isEdit ? '(dejar en blanco para no cambiar)' : '*'}
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required={!isEdit}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder={isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'}
              minLength={6}
            />
            <p className="mt-1 text-sm text-gray-500">
              Mínimo 6 caracteres
            </p>
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Nombre"
            />
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Apellido *
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Apellido"
            />
          </div>

          {/* Rol */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Rol
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="USER">🛒 Usuario (Comprador)</option>
              <option value="SALES">💰 Ventas</option>
              <option value="EDITOR">✏️ Editor</option>
              <option value="ADMIN">👤 Admin</option>
              <option value="SUPER_ADMIN">👑 Super Admin</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {formData.role === 'SUPER_ADMIN' && 'Control total del sistema (no puede ser eliminado)'}
              {formData.role === 'ADMIN' && 'Control total del sistema'}
              {formData.role === 'EDITOR' && 'Solo puede editar la landing page'}
              {formData.role === 'SALES' && 'Puede ver ventas y dar seguimiento'}
              {formData.role === 'USER' && 'Usuario comprador de la tienda'}
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/cms/users')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEdit ? 'Actualizar' : 'Crear'} Usuario
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
