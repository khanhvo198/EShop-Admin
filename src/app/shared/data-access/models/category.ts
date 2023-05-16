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
    doc?: Category;
  };
  length?: number;
}
