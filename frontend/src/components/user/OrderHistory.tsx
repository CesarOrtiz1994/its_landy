import { Package, Eye } from 'lucide-react';

export const OrderHistory = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-7 h-7" />
          Mis Pedidos
        </h2>
        <p className="text-gray-600 mt-1">Historial de tus compras realizadas</p>
      </div>

      {/* Placeholder para futuro módulo de e-commerce */}
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Sin Pedidos
        </h3>
        <p className="text-gray-600 mb-6">
          Aún no has realizado ningún pedido. <br />
          El módulo de e-commerce estará disponible próximamente.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Próximamente:</strong> Podrás ver el estado de tus pedidos, historial de compras, facturas y seguimiento de envíos.
          </p>
        </div>
      </div>

      {/* Vista previa de cómo se verá */}
      <div className="mt-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa (Ejemplo)</h3>
        <div className="space-y-4">
          {[1, 2].map((order) => (
            <div key={order} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow opacity-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">Pedido #{1000 + order}</p>
                  <p className="text-sm text-gray-500">25 de Diciembre, 2024</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  Entregado
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">3 productos</p>
                  <p className="text-lg font-bold text-gray-900">$1,250.00</p>
                </div>
                <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
                  <Eye className="w-4 h-4" />
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
