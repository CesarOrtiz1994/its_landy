import { useState, useEffect } from 'react';
import { getAllMedia, deleteMedia, uploadMedia } from '../../services/cmsService';
import type { Media } from '../../types/cms.types';
import { Image, Upload, Trash2, Search, X } from 'lucide-react';

export const MediaList = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    loadMedia();
  }, [searchTerm]);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      
      const data = await getAllMedia(params);
      setMedia(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Error al cargar archivos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      await uploadMedia(selectedFile);
      setSelectedFile(null);
      loadMedia();
    } catch (err: any) {
      setError(err.message || 'Error al subir archivo');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number, filename: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${filename}"?`)) {
      return;
    }

    try {
      await deleteMedia(id);
      setMedia(media.filter(m => m.id !== id));
    } catch (err: any) {
      setError(err.message || 'Error al eliminar archivo');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Multimedia</h1>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Subir Archivo</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar archivo
            </label>
            <input
              type="file"
              onChange={handleFileSelect}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Subir
              </>
            )}
          </button>
          {selectedFile && (
            <button
              onClick={() => setSelectedFile(null)}
              className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">
            Archivo seleccionado: {selectedFile.name} ({formatFileSize(selectedFile.size)})
          </p>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar archivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : media.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay archivos</h3>
          <p className="text-gray-600">Sube tu primer archivo multimedia</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {media.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {item.mimeType.startsWith('image/') ? (
                <img
                  src={item.url}
                  alt={item.alt || item.originalName}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <Image className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate mb-1">{item.originalName}</h3>
                <p className="text-sm text-gray-500 mb-2">{formatFileSize(item.size)}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    Ver
                  </a>
                  <button
                    onClick={() => handleDelete(item.id, item.originalName)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
