export interface Category {
  id: number;
  name: string;
  description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryCreateData {
  name: string;
  description?: string;
}

export interface CategoryUpdateData {
  name?: string;
  description?: string;
}
