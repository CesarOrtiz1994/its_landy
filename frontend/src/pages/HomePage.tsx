import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';

export const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 p-4">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Bienvenido a ITS SYSTEMS
          </h1>
          
          {user && (
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-primary-600">
                Hola, {user.firstName} {user.lastName}!
              </h2>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center">
                  <span className="font-medium mr-2">Email:</span>
                  {user.email}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Rol:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === 'SUPER_ADMIN' ? 'bg-yellow-100 text-yellow-800' :
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'EDITOR' ? 'bg-green-100 text-green-800' :
                    user.role === 'SALES' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'SUPER_ADMIN' ? '👑 Super Admin' :
                     user.role === 'ADMIN' ? '👤 Admin' :
                     user.role === 'EDITOR' ? '✏️ Editor' :
                     user.role === 'SALES' ? '💰 Ventas' :
                     '🛒 Usuario'}
                  </span>
                </p>
              </div>
              
              <div className="flex gap-4 mt-6">
                {user.role !== 'USER' && (
                  <Link
                    to="/cms"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Settings className="w-5 h-5" />
                    Panel CMS
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
