import api from './api';
import type {
  Page,
  CreatePageData,
  UpdatePageData,
  Media,
  UpdateMediaData,
  Menu,
  CreateMenuData,
  UpdateMenuData,
  MenuItem,
  CreateMenuItemData,
  UpdateMenuItemData,
  PagesResponse,
  PageResponse,
  MediaListResponse,
  MediaResponse,
  MenusResponse,
  MenuResponse,
  MenuItemResponse,
} from '../types/cms.types';

// ==================== PAGES API ====================

export const getAllPages = async (params?: { status?: string; search?: string }): Promise<Page[]> => {
  const response = await api.get<PagesResponse>('/api/cms/pages', { params });
  return response.data.data || [];
};

export const getPageById = async (id: number): Promise<Page> => {
  const response = await api.get<PageResponse>(`/api/cms/pages/${id}`);
  if (!response.data.data) {
    throw new Error('Página no encontrada');
  }
  return response.data.data;
};

export const getPageBySlug = async (slug: string): Promise<Page> => {
  const response = await api.get<PageResponse>(`/api/cms/pages/slug/${slug}`);
  if (!response.data.data) {
    throw new Error('Página no encontrada');
  }
  return response.data.data;
};

export const createPage = async (data: CreatePageData): Promise<Page> => {
  const response = await api.post<PageResponse>('/api/cms/pages', data);
  if (!response.data.data) {
    throw new Error('Error al crear página');
  }
  return response.data.data;
};

export const updatePage = async (id: number, data: UpdatePageData): Promise<Page> => {
  const response = await api.put<PageResponse>(`/api/cms/pages/${id}`, data);
  if (!response.data.data) {
    throw new Error('Error al actualizar página');
  }
  return response.data.data;
};

export const deletePage = async (id: number): Promise<void> => {
  await api.delete(`/api/cms/pages/${id}`);
};

// ==================== MEDIA API ====================

export const getAllMedia = async (params?: { mimeType?: string; search?: string }): Promise<Media[]> => {
  const response = await api.get<MediaListResponse>('/api/cms/media', { params });
  return response.data.data || [];
};

export const getMediaById = async (id: number): Promise<Media> => {
  const response = await api.get<MediaResponse>(`/api/cms/media/${id}`);
  if (!response.data.data) {
    throw new Error('Archivo no encontrado');
  }
  return response.data.data;
};

export const uploadMedia = async (file: File, alt?: string, caption?: string): Promise<Media> => {
  const formData = new FormData();
  formData.append('file', file);
  if (alt) formData.append('alt', alt);
  if (caption) formData.append('caption', caption);

  const response = await api.post<MediaResponse>('/api/cms/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.data.data) {
    throw new Error('Error al subir archivo');
  }
  return response.data.data;
};

export const updateMedia = async (id: number, data: UpdateMediaData): Promise<Media> => {
  const response = await api.put<MediaResponse>(`/api/cms/media/${id}`, data);
  if (!response.data.data) {
    throw new Error('Error al actualizar archivo');
  }
  return response.data.data;
};

export const deleteMedia = async (id: number): Promise<void> => {
  await api.delete(`/api/cms/media/${id}`);
};

// ==================== MENUS API ====================

export const getAllMenus = async (): Promise<Menu[]> => {
  const response = await api.get<MenusResponse>('/api/cms/menus');
  return response.data.data || [];
};

export const getMenuById = async (id: number): Promise<Menu> => {
  const response = await api.get<MenuResponse>(`/api/cms/menus/${id}`);
  if (!response.data.data) {
    throw new Error('Menú no encontrado');
  }
  return response.data.data;
};

export const getMenuByLocation = async (location: string): Promise<Menu> => {
  const response = await api.get<MenuResponse>(`/api/cms/menus/location/${location}`);
  if (!response.data.data) {
    throw new Error('Menú no encontrado');
  }
  return response.data.data;
};

export const createMenu = async (data: CreateMenuData): Promise<Menu> => {
  const response = await api.post<MenuResponse>('/api/cms/menus', data);
  if (!response.data.data) {
    throw new Error('Error al crear menú');
  }
  return response.data.data;
};

export const updateMenu = async (id: number, data: UpdateMenuData): Promise<Menu> => {
  const response = await api.put<MenuResponse>(`/api/cms/menus/${id}`, data);
  if (!response.data.data) {
    throw new Error('Error al actualizar menú');
  }
  return response.data.data;
};

export const deleteMenu = async (id: number): Promise<void> => {
  await api.delete(`/api/cms/menus/${id}`);
};

// ==================== MENU ITEMS API ====================

export const createMenuItem = async (data: CreateMenuItemData): Promise<MenuItem> => {
  const response = await api.post<MenuItemResponse>('/api/cms/menu-items', data);
  if (!response.data.data) {
    throw new Error('Error al crear item de menú');
  }
  return response.data.data;
};

export const updateMenuItem = async (id: number, data: UpdateMenuItemData): Promise<MenuItem> => {
  const response = await api.put<MenuItemResponse>(`/api/cms/menu-items/${id}`, data);
  if (!response.data.data) {
    throw new Error('Error al actualizar item de menú');
  }
  return response.data.data;
};

export const deleteMenuItem = async (id: number): Promise<void> => {
  await api.delete(`/api/cms/menu-items/${id}`);
};
