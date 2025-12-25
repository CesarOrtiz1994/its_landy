import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPages, deletePage } from '../../services/cmsService';
import { useAuth } from '../../context/AuthContext';
import type { Page } from '../../types/cms.types';
import { FileText, Edit, Trash2, Eye, Plus, Search } from 'lucide-react';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const PageList = () => {
  const { user } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; page: Page | null }>({
    isOpen: false,
    page: null,
  });
  
  const canCreateDelete = ['SUPER_ADMIN', 'ADMIN'].includes(user?.role || '');

  useEffect(() => {
    loadPages();
  }, [statusFilter, searchTerm]);

  const loadPages = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (statusFilter) params.status = statusFilter;
      if (searchTerm) params.search = searchTerm;
      
      const data = await getAllPages(params);
      setPages(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Error al cargar páginas');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (page: Page) => {
    setDeleteDialog({ isOpen: true, page });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.page) return;

    try {
      await deletePage(deleteDialog.page.id);
      setPages(pages.filter(p => p.id !== deleteDialog.page!.id));
      setDeleteDialog({ isOpen: false, page: null });
    } catch (err: any) {
      setError(err.message || 'Error al eliminar página');
      setDeleteDialog({ isOpen: false, page: null });
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      DRAFT: 'bg-yellow-100 text-yellow-800',
      PUBLISHED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-gray-100 text-gray-800',
    };
    return styles[status as keyof typeof styles] || styles.DRAFT;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Páginas</h1>
        {canCreateDelete && (
          <Link
            to="/cms/pages/new"
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nueva Página
          </Link>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar páginas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Todos los estados</option>
            <option value="DRAFT">Borrador</option>
            <option value="PUBLISHED">Publicado</option>
            <option value="ARCHIVED">Archivado</option>
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
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay páginas</h3>
          <p className="text-gray-600 mb-6">Comienza creando tu primera página</p>
          <Link
            to="/cms/pages/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            Nueva Página
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autor
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
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(page.status)}`}>
                      {page.status === 'DRAFT' ? 'Borrador' : page.status === 'PUBLISHED' ? 'Publicado' : 'Archivado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{page.author.firstName} {page.author.lastName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(page.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/pages/${page.slug}`}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Ver página"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/cms/pages/edit/${page.id}`}
                        className="text-primary-600 hover:text-primary-900 transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      {canCreateDelete && (
                        <button
                          onClick={() => handleDeleteClick(page)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, page: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Página"
        message={`¿Estás seguro de que deseas eliminar la página "${deleteDialog.page?.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};
