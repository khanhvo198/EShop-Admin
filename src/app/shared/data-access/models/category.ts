export interface Category {
  name: string;
  icon: string;
  color: string;
  id?: string;
}

export interface ResponseCategoryApi {
  status: string;
  data: {
    categories?: Category[];
    category?: Category;
    doc?: Category;
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
