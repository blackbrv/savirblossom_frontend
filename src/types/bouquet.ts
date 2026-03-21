import { Category } from "./category";

export interface BouquetGallery {
  id: number;
  bouquet_id: number;
  src: string;
  alt_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface BouquetGalleryCreateData {
  src: string;
  alt_text?: string;
}

export interface Bouquet {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  published: boolean;
  category?: Category;
  galleries?: BouquetGallery[];
  created_at: string;
  updated_at: string;
}

export interface BouquetCreateData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id: number;
  published?: boolean;
}

export interface BouquetUpdateData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category_id?: number;
  published?: boolean;
}
