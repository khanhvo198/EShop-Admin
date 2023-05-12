import { Category } from './category';

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  price?: string;
  category?: Category;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface ResponseProductApi {
  status: string;
  data: {
    products: Product[];
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
