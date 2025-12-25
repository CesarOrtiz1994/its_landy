import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Menu as MenuIcon,
  Users,
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const allMenuItems = [
    { path: '/cms', icon: LayoutDashboard, label: 'Dashboard', roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SALES'] },
    { path: '/cms/pages', icon: FileText, label: 'Páginas', roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
    { path: '/cms/media', icon: Image, label: 'Multimedia', roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
    { path: '/cms/menus', icon: MenuIcon, label: 'Menús', roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
    { path: '/cms/users', icon: Users, label: 'Usuarios', roles: ['SUPER_ADMIN', 'ADMIN'] },
    // { path: '/cms/sales', icon: DollarSign, label: 'Ventas', roles: ['SUPER_ADMIN', 'ADMIN', 'SALES'] }, // Futuro
  ];

  // Filtrar menú según el rol del usuario
  const menuItems = allMenuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const isActive = (path: string) => {
    // Para el dashboard, solo activar si es exactamente /cms
    if (path === '/cms') {
      return location.pathname === '/cms';
    }
    // Para otras rutas, activar si coincide o es una subruta
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-primary-600 to-primary-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-primary-500">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold">ITS SYSTEMS</h1>
            ) : (
              <div className="text-xl font-bold">IT</div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-primary-700 rounded transition-colors"
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-white text-primary-600 shadow-lg'
                    : 'hover:bg-primary-700 text-white'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-primary-500">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors mb-2"
            title={!sidebarOpen ? 'Ir al sitio' : ''}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Ir al sitio</span>}
          </Link>
          
          {sidebarOpen && user && (
            <div className="px-4 py-2 mb-2">
              <p className="text-sm text-white/80">Conectado como:</p>
              <p className="font-medium truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-white/60 truncate">{user.email}</p>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors"
            title={!sidebarOpen ? 'Cerrar sesión' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Panel de Administración</h2>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
