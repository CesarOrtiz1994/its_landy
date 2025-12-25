import { LoginForm } from '../components/auth/LoginForm';
import { Code2 } from 'lucide-react';

export const LoginPage = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Fondo animado con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600">
        {/* Patrón de grid tecnológico */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Círculos decorativos animados */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Card flotante con glassmorphism */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo flotante arriba del card */}
        <div className="flex justify-center mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-white blur-2xl opacity-50"></div>
            <div className="relative bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/30 shadow-2xl">
              <Code2 className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Card principal con efecto glassmorphism */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.02] transition-transform duration-300">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
              ITS SYSTEMS
            </h1>
            <p className="text-gray-600">Plataforma E-commerce + CMS</p>
          </div>

          {/* Formulario */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>© 2025 ITS SYSTEMS. Todos los derechos reservados.</p>
          </div>
        </div>

        {/* Efecto de brillo en los bordes */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-xl opacity-30 -z-10"></div>
      </div>
    </div>
  );
};
