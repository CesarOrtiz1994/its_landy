import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Save, User } from 'lucide-react';

export const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.put('/api/auth/profile', formData);
      updateUser(response.data.data);
      setSuccess('Perfil actualizado exitosamente');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <User className="w-7 h-7" />
          Mi Perfil
        </h2>
        <p className="text-gray-600 mt-1">Actualiza tu información personal</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user?.email}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
          />
          <p className="mt-1 text-sm text-gray-500">El email no se puede cambiar</p>
        </div>

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
          />
        </div>

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
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(55) 1234-5678"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <p className="mt-1 text-sm text-gray-500">Opcional - Para contacto en caso de pedidos</p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
