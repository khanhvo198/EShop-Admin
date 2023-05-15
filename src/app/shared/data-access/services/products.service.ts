import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ResponseProductApi } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseURL = 'http://localhost:8080/api/v1/products';

  getProducts(): Observable<ResponseProductApi> {
    return this.httpClient.get<ResponseProductApi>(this.baseURL);
  }

  createNewProduct(product: FormData): Observable<ResponseProductApi> {
    return this.httpClient.post<ResponseProductApi>(this.baseURL, product);
  }

  deleteProduct(id: string): Observable<ResponseProductApi> {
    return this.httpClient.delete<ResponseProductApi>(`${this.baseURL}/${id}`);
  }

  getProductById(id: string): Observable<ResponseProductApi> {
    return this.httpClient.get<ResponseProductApi>(`${this.baseURL}/${id}`);
  }

  editProduct(id: string, Product: FormData): Observable<ResponseProductApi> {
    return this.httpClient.patch<ResponseProductApi>(
      `${this.baseURL}/${id}`,
      Product
    );
  }
}
