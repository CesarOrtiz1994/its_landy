import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPage, updatePage, getPageById } from '../../services/cmsService';
import type { CreatePageData, UpdatePageData, PageStatus } from '../../types/cms.types';
import { Save, X, FileText } from 'lucide-react';

export const PageForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<CreatePageData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'DRAFT',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingPage, setLoadingPage] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      loadPage(parseInt(id));
    }
  }, [id, isEdit]);

  const loadPage = async (pageId: number) => {
    try {
      setLoadingPage(true);
      const page = await getPageById(pageId);
      setFormData({
        title: page.title,
        slug: page.slug,
        content: page.content,
        excerpt: page.excerpt || '',
        status: page.status,
      });
    } catch (err: any) {
      setError(err.message || 'Error al cargar página');
    } finally {
      setLoadingPage(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEdit && id) {
        await updatePage(parseInt(id), formData as UpdatePageData);
      } else {
        await createPage(formData);
      }
      navigate('/cms/pages');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al guardar página');
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FileText className="w-8 h-8" />
          {isEdit ? 'Editar Página' : 'Nueva Página'}
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
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Título de la página"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
              placeholder="url-de-la-pagina"
            />
            <p className="mt-1 text-sm text-gray-500">
              URL amigable para la página (se genera automáticamente del título)
            </p>
          </div>

          {/* Extracto */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Extracto
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Breve descripción de la página"
            />
          </div>

          {/* Contenido */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Contenido *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
              placeholder="Contenido HTML de la página"
            />
            <p className="mt-1 text-sm text-gray-500">
              Puedes usar HTML para formatear el contenido
            </p>
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as PageStatus })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="DRAFT">Borrador</option>
              <option value="PUBLISHED">Publicado</option>
              <option value="ARCHIVED">Archivado</option>
            </select>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/cms/pages')}
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
                {isEdit ? 'Actualizar' : 'Crear'} Página
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
