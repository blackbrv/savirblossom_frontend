export interface Customer {
  id: number;
  email: string;
  username: string;
  phone_number: string | null;
  profile_picture: string | null;
  password_set: number;
  provider: string;
  google_id: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerCreateData {
  email: string;
  username: string;
  phone_number?: string;
}

export interface CustomerUpdateData {
  username?: string;
  phone_number?: string;
}
