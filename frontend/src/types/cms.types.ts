// Page Status Type
export type PageStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

// Page Types
export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: PageStatus;
  publishedAt?: string;
  authorId: number;
  author: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  seoMetadata?: SEOMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status?: PageStatus;
  publishedAt?: string;
}

export interface UpdatePageData {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  status?: PageStatus;
  publishedAt?: string;
}

// SEO Metadata Types
export interface SEOMetadata {
  id: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  pageId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSEOData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  pageId: number;
}

export interface UpdateSEOData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  canonicalUrl?: string;
}

// Media Types
export interface Media {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  alt?: string;
  caption?: string;
  uploadedById: number;
  uploadedBy: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMediaData {
  alt?: string;
  caption?: string;
}

// Menu Types
export interface Menu {
  id: number;
  name: string;
  location: string;
  items: MenuItem[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: number;
  label: string;
  url: string;
  order: number;
  parentId?: number;
  parent?: MenuItem;
  children?: MenuItem[];
  menuId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMenuData {
  name: string;
  location: string;
}

export interface UpdateMenuData {
  name?: string;
  location?: string;
}

export interface CreateMenuItemData {
  label: string;
  url: string;
  order?: number;
  parentId?: number;
  menuId: number;
}

export interface UpdateMenuItemData {
  label?: string;
  url?: string;
  order?: number;
  parentId?: number;
}

// API Response Types
export interface CMSResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

export interface PagesResponse extends CMSResponse<Page[]> {}
export interface PageResponse extends CMSResponse<Page> {}
export interface MediaListResponse extends CMSResponse<Media[]> {}
export interface MediaResponse extends CMSResponse<Media> {}
export interface MenusResponse extends CMSResponse<Menu[]> {}
export interface MenuResponse extends CMSResponse<Menu> {}
export interface MenuItemResponse extends CMSResponse<MenuItem> {}
