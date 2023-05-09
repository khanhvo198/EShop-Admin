export interface Category {
  name: string;
  icon: string;
  color: string;
}

export interface NewCategory {
  name: string;
  icon: string;
  color: string;
}

export interface ResponseCategoryApi {
  status: string;
  data: {
    categories: Category[];
  };
  length?: number;
}
