export interface APIErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export class APIError extends Error {
  status: number;
  body: APIErrorResponse | undefined;

  constructor(message: string, status: number, body?: APIErrorResponse) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.body = body;
  }
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: PaginationMeta;
}

export interface SingleResponse<T> {
  data: T;
}

export interface MessageResponse {
  message: string;
}

export interface ApiErrorException {
  response: {
    status: number;
    data: APIErrorResponse;
  };
}
