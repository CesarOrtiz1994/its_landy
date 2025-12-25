import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPageBySlug } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import type { Page } from '../types/cms.types';
import { ArrowLeft, Calendar, User, LogIn, Settings } from 'lucide-react';

export const PublicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Si no hay slug, cargar la página "inicio" por defecto
    const pageSlug = slug || 'inicio';
    loadPage(pageSlug);
  }, [slug]);

  const loadPage = async (pageSlug: string) => {
    try {
      setLoading(true);
      const data = await getPageBySlug(pageSlug);
      setPage(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Página no encontrada');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">ITS SYSTEMS</span>
            </Link>
            
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  {user.role !== 'USER' && (
                    <Link
                      to="/cms"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
                    >
                      <Settings className="w-5 h-5" />
                      Administrar
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all"
                  >
                    <User className="w-5 h-5" />
                    Mi Cuenta
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Encabezado del artículo */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-8">
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
            
            {page.excerpt && (
              <p className="text-xl text-white/90 mb-4">{page.excerpt}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{page.author.firstName} {page.author.lastName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(page.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>

          {/* Contenido del artículo */}
          <div className="p-8">
            <style dangerouslySetInnerHTML={{ __html: `
              .hero-section {
                text-align: center;
                padding: 3rem 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 1rem;
                margin-bottom: 3rem;
                box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
              }
              .hero-title {
                font-size: 3rem;
                font-weight: 800;
                margin-bottom: 1rem;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
              }
              .hero-subtitle {
                font-size: 1.5rem;
                opacity: 0.95;
                font-weight: 300;
              }
              .services-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin: 3rem 0;
              }
              .service-card {
                background: white;
                border: 2px solid #e5e7eb;
                border-radius: 1rem;
                padding: 2rem;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
              }
              .service-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
                border-color: #667eea;
              }
              .service-card h2 {
                color: #667eea;
                font-size: 1.5rem;
                margin-bottom: 1rem;
                font-weight: 700;
              }
              .service-card p {
                color: #4b5563;
                line-height: 1.6;
                margin-bottom: 1rem;
              }
              .service-card ul {
                list-style: none;
                padding: 0;
                margin: 1rem 0;
              }
              .service-card ul li {
                padding: 0.5rem 0;
                color: #6b7280;
                position: relative;
                padding-left: 1.5rem;
              }
              .service-card ul li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #10b981;
                font-weight: bold;
              }
              .cta-section {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 3rem;
                border-radius: 1rem;
                text-align: center;
                margin: 3rem 0;
                box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
              }
              .cta-section h2 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                font-weight: 700;
              }
              .cta-section p {
                font-size: 1.2rem;
                margin-bottom: 2rem;
                opacity: 0.95;
              }
              .contact-info {
                display: flex;
                justify-content: center;
                gap: 2rem;
                flex-wrap: wrap;
                margin-top: 2rem;
              }
              .contact-info p {
                background: rgba(255,255,255,0.2);
                padding: 1rem 2rem;
                border-radius: 0.5rem;
                backdrop-filter: blur(10px);
                font-weight: 500;
              }
              .why-us {
                margin: 3rem 0;
              }
              .why-us h2 {
                text-align: center;
                font-size: 2.5rem;
                color: #1f2937;
                margin-bottom: 3rem;
                font-weight: 700;
              }
              .benefits {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
              }
              .benefit {
                background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                padding: 2rem;
                border-radius: 1rem;
                text-align: center;
                transition: all 0.3s ease;
                border: 2px solid transparent;
              }
              .benefit:hover {
                transform: translateY(-5px);
                border-color: #667eea;
                box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
              }
              .benefit h3 {
                color: #667eea;
                font-size: 1.3rem;
                margin-bottom: 1rem;
                font-weight: 700;
              }
              .benefit p {
                color: #4b5563;
                line-height: 1.6;
              }
              @media (max-width: 768px) {
                .hero-title {
                  font-size: 2rem;
                }
                .hero-subtitle {
                  font-size: 1.2rem;
                }
                .services-grid {
                  grid-template-columns: 1fr;
                }
                .contact-info {
                  flex-direction: column;
                  gap: 1rem;
                }
              }
            ` }} />
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </article>

        {/* SEO Metadata (si existe) */}
        {page.seoMetadata && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Información SEO</h2>
            <div className="space-y-2 text-sm text-gray-600">
              {page.seoMetadata.metaTitle && (
                <p><strong>Meta Título:</strong> {page.seoMetadata.metaTitle}</p>
              )}
              {page.seoMetadata.metaDescription && (
                <p><strong>Meta Descripción:</strong> {page.seoMetadata.metaDescription}</p>
              )}
              {page.seoMetadata.metaKeywords && (
                <p><strong>Keywords:</strong> {page.seoMetadata.metaKeywords}</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>© 2025 ITS SYSTEMS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
