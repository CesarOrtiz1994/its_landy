import { useState, useEffect } from 'react';
import { MapPin, Plus, Edit, Trash2, Star } from 'lucide-react';
import { getAllAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from '../../services/addressService';
import type { Address, CreateAddressData } from '../../types/address.types';
import { AddressForm } from './AddressForm';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AddressBook = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; address: Address | null }>({
    isOpen: false,
    address: null,
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await getAllAddresses();
      setAddresses(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Error al cargar direcciones');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (address?: Address) => {
    setEditingAddress(address || null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingAddress(null);
  };

  const handleSaveAddress = async (data: CreateAddressData) => {
    if (editingAddress) {
      await updateAddress(editingAddress.id, data);
    } else {
      await createAddress(data);
    }
    await loadAddresses();
  };

  const handleDeleteClick = (address: Address) => {
    setDeleteDialog({ isOpen: true, address });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.address) return;

    try {
      await deleteAddress(deleteDialog.address.id);
      await loadAddresses();
      setDeleteDialog({ isOpen: false, address: null });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al eliminar dirección');
      setDeleteDialog({ isOpen: false, address: null });
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultAddress(id);
      await loadAddresses();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al establecer dirección predeterminada');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-7 h-7" />
              Direcciones de Envío
            </h2>
            <p className="text-gray-600 mt-1">Gestiona tus direcciones de entrega</p>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nueva Dirección
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Sin Direcciones
          </h3>
          <p className="text-gray-600 mb-6">
            No tienes direcciones de envío guardadas. <br />
            Agrega tu primera dirección para tus pedidos.
          </p>
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            Agregar Dirección
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{address.label}</p>
                  {address.isDefault && (
                    <span className="inline-block mt-1 px-2 py-1 bg-primary-100 text-primary-800 text-xs font-semibold rounded">
                      Predeterminada
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-yellow-600 hover:text-yellow-700 transition-colors"
                      title="Establecer como predeterminada"
                    >
                      <Star className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenForm(address)}
                    className="text-primary-600 hover:text-primary-700 transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(address)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{address.fullName}</p>
                <p>{address.street}</p>
                <p>{address.city}, {address.state}</p>
                <p>CP {address.zipCode}</p>
                <p>{address.country}</p>
                <p className="font-medium text-gray-900 mt-2">Tel: {address.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de formulario */}
      <AddressForm
        isOpen={formOpen}
        onClose={handleCloseForm}
        onSave={handleSaveAddress}
        address={editingAddress}
      />

      {/* Modal de confirmación */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, address: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Dirección"
        message={`¿Estás seguro de que deseas eliminar la dirección "${deleteDialog.address?.label}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};
