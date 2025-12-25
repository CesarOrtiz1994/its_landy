import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
                    user.role === 'ADMIN' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
