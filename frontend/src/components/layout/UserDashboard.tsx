import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Lock, 
  ShoppingCart,
  Package,
  MapPin,
  LogOut, 
  Home,
  Settings
} from 'lucide-react';

interface UserDashboardProps {
  children: React.ReactNode;
}

export const UserDashboard = ({ children }: UserDashboardProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: User, label: 'Mi Perfil' },
    { path: '/dashboard/password', icon: Lock, label: 'Cambiar Contraseña' },
  ];

  // Agregar opciones de e-commerce solo para usuarios USER
  if (user?.role === 'USER') {
    menuItems.push(
      { path: '/dashboard/orders', icon: Package, label: 'Mis Pedidos' },
      { path: '/dashboard/cart', icon: ShoppingCart, label: 'Mi Carrito' },
      { path: '/dashboard/addresses', icon: MapPin, label: 'Direcciones' }
    );
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">ITS SYSTEMS</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="hidden md:inline">Inicio</span>
              </Link>
              
              {user?.role !== 'USER' && (
                <Link
                  to="/cms"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span className="hidden md:inline">Panel CMS</span>
                </Link>
              )}

              {user?.role === 'USER' && (
                <Link
                  to="/dashboard/cart"
                  className="relative text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.firstName[0]}{user?.lastName[0]}
                </div>
                <h3 className="font-semibold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  user?.role === 'SUPER_ADMIN' ? 'bg-yellow-100 text-yellow-800' :
                  user?.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                  user?.role === 'EDITOR' ? 'bg-green-100 text-green-800' :
                  user?.role === 'SALES' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {user?.role === 'SUPER_ADMIN' ? '👑 Super Admin' :
                   user?.role === 'ADMIN' ? '👤 Admin' :
                   user?.role === 'EDITOR' ? '✏️ Editor' :
                   user?.role === 'SALES' ? '💰 Ventas' :
                   '🛒 Usuario'}
                </span>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        active
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
