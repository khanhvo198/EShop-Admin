export interface Category {
  name: string;
  icon: string;
  color: string;
  id?: string;
}

export interface ResponseCategoryApi {
  status: string;
  data: {
    categories: Category[];
  };
  length?: number;
}

export interface ResponseApi<T> {
  status: string;
  data: {
    doc: T[];
  };
  length?: number;
}
