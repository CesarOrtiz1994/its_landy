import { ShoppingCart as CartIcon, Package } from 'lucide-react';

export const ShoppingCart = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CartIcon className="w-7 h-7" />
          Mi Carrito
        </h2>
        <p className="text-gray-600 mt-1">Productos que deseas comprar</p>
      </div>

      {/* Placeholder para futuro módulo de e-commerce */}
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Carrito Vacío
        </h3>
        <p className="text-gray-600 mb-6">
          Tu carrito de compras está vacío. <br />
          El módulo de e-commerce estará disponible próximamente.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Próximamente:</strong> Podrás agregar productos, gestionar tu carrito y realizar compras.
          </p>
        </div>
      </div>
    </div>
  );
};
