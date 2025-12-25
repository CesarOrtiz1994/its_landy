import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPages } from '../../services/cmsService';
import { useAuth } from '../../context/AuthContext';
import { FileText, Image, Menu as MenuIcon, TrendingUp, Users, DollarSign } from 'lucide-react';

export const CMSDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
  });
  const [loading, setLoading] = useState(true);
  
  const isAdmin = ['SUPER_ADMIN', 'ADMIN'].includes(user?.role || '');
  const isEditor = user?.role === 'EDITOR';
  const isSales = user?.role === 'SALES';

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const pages = await getAllPages();
      setStats({
        totalPages: pages.length,
        publishedPages: pages.filter(p => p.status === 'PUBLISHED').length,
        draftPages: pages.filter(p => p.status === 'DRAFT').length,
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, link }: any) => (
    <Link
      to={link}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </Link>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard CMS</h1>
        <p className="text-gray-600">Gestiona el contenido de tu sitio web</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={FileText}
              title="Total de Páginas"
              value={stats.totalPages}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
              link="/cms/pages"
            />
            <StatCard
              icon={TrendingUp}
              title="Páginas Publicadas"
              value={stats.publishedPages}
              color="bg-gradient-to-r from-green-500 to-green-600"
              link="/cms/pages?status=PUBLISHED"
            />
            <StatCard
              icon={FileText}
              title="Borradores"
              value={stats.draftPages}
              color="bg-gradient-to-r from-yellow-500 to-yellow-600"
              link="/cms/pages?status=DRAFT"
            />
            <StatCard
              icon={Image}
              title="Multimedia"
              value="0"
              color="bg-gradient-to-r from-purple-500 to-purple-600"
              link="/cms/media"
            />
          </div>

          {/* Accesos rápidos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Accesos Rápidos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/cms/pages/new"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Nueva Página</h3>
                  <p className="text-sm text-gray-600">Crear contenido nuevo</p>
                </div>
              </Link>

              <Link
                to="/cms/media"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Image className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Multimedia</h3>
                  <p className="text-sm text-gray-600">Gestionar archivos</p>
                </div>
              </Link>

              <Link
                to="/cms/menus"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <MenuIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Menús</h3>
                  <p className="text-sm text-gray-600">Configurar navegación</p>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
