import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, deleteUser, toggleUserStatus } from '../../services/userService';
import type { User } from '../../types/user.types';
import { Users, Edit, Trash2, Search, Plus, Power, PowerOff } from 'lucide-react';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; user: User | null }>({
    isOpen: false,
    user: null,
  });

  useEffect(() => {
    loadUsers();
  }, [searchTerm, roleFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (roleFilter) params.role = roleFilter;
      if (searchTerm) params.search = searchTerm;
      
      const data = await getAllUsers(params);
      setUsers(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user: User) => {
    if (user.role === 'SUPER_ADMIN') {
      alert('El Super Admin no puede ser eliminado');
      return;
    }
    setDeleteDialog({ isOpen: true, user });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.user) return;

    try {
      await deleteUser(deleteDialog.user.id);
      setUsers(users.filter(u => u.id !== deleteDialog.user!.id));
      setDeleteDialog({ isOpen: false, user: null });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al eliminar usuario');
      setDeleteDialog({ isOpen: false, user: null });
    }
  };

  const handleToggleStatus = async (id: number, role: string) => {
    if (role === 'SUPER_ADMIN') {
      alert('El Super Admin no puede ser desactivado');
      return;
    }

    try {
      const updatedUser = await toggleUserStatus(id);
      setUsers(users.map(u => u.id === id ? updatedUser : u));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al cambiar estado');
    }
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      SUPER_ADMIN: 'bg-yellow-100 text-yellow-800',
      ADMIN: 'bg-purple-100 text-purple-800',
      EDITOR: 'bg-green-100 text-green-800',
      SALES: 'bg-orange-100 text-orange-800',
      USER: 'bg-blue-100 text-blue-800',
    };
    const labels = {
      SUPER_ADMIN: '👑 Super Admin',
      ADMIN: '👤 Admin',
      EDITOR: '✏️ Editor',
      SALES: '💰 Ventas',
      USER: '🛒 Usuario',
    };
    return { style: styles[role as keyof typeof styles], label: labels[role as keyof typeof labels] };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
        <Link
          to="/cms/users/new"
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Usuario
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por email, nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Todos los roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
            <option value="SALES">Ventas</option>
            <option value="USER">Usuario</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay usuarios</h3>
          <p className="text-gray-600 mb-6">Comienza creando tu primer usuario</p>
          <Link
            to="/cms/users/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            Nuevo Usuario
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => {
                const roleBadge = getRoleBadge(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleBadge.style}`}>
                        {roleBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(user.id, user.role)}
                          className={`${
                            user.isActive ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'
                          } transition-colors`}
                          title={user.isActive ? 'Desactivar' : 'Activar'}
                        >
                          {user.isActive ? <PowerOff className="w-5 h-5" /> : <Power className="w-5 h-5" />}
                        </button>
                        <Link
                          to={`/cms/users/edit/${user.id}`}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Eliminar"
                          disabled={user.role === 'SUPER_ADMIN'}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, user: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Usuario"
        message={`¿Estás seguro de que deseas eliminar al usuario "${deleteDialog.user?.email}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};
