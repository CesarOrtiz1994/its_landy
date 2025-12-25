import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/user/ProfilePage';
import { PasswordPage } from './pages/user/PasswordPage';
import { CartPage } from './pages/user/CartPage';
import { OrdersPage } from './pages/user/OrdersPage';
import { AddressesPage } from './pages/user/AddressesPage';
import { CMSDashboard } from './pages/cms/CMSDashboard';
import { PagesPage } from './pages/cms/PagesPage';
import { PageFormPage } from './pages/cms/PageFormPage';
import { MediaPage } from './pages/cms/MediaPage';
import { MenusPage } from './pages/cms/MenusPage';
import { UsersPage } from './pages/users/UsersPage';
import { UserFormPage } from './pages/users/UserFormPage';
import { PublicPage } from './pages/PublicPage';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicPage />} />
          <Route path="/pages/:slug" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Dashboard de usuario */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/password"
            element={
              <ProtectedRoute>
                <PasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/addresses"
            element={
              <ProtectedRoute>
                <AddressesPage />
              </ProtectedRoute>
            }
          />
          
          {/* Rutas CMS - Todos excepto USER */}
          <Route
            path="/cms"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SALES']}>
                <AdminLayout>
                  <CMSDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms/pages"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                <AdminLayout>
                  <PagesPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms/pages/new"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout>
                  <PageFormPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms/pages/edit/:id"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                <AdminLayout>
                  <PageFormPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms/media"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                <AdminLayout>
                  <MediaPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms/menus"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                <AdminLayout>
                  <MenusPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms/users"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout>
                  <UsersPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms/users/new"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout>
                  <UserFormPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms/users/edit/:id"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout>
                  <UserFormPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
